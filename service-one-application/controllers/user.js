const models =  require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger');
const Op = require('sequelize').Op;

async function register(data) {
    try {
        const userExists = await models.User.findOne({
            where: { email: data.email }
        })
        if (userExists) {
            throw new Error('User already registered');
        }
        const hashPassword = await bcrypt.hashSync(data.password, 10);
        const result = await models.User.create({
            userName: data.userName,
            password: hashPassword,
            email: data.email,
            role: 'User'
        })
        return {
            email: data.email,
            userName: data.userName
        }
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function login(data) {
    try {
        let userExists = await models.User.findOne({
            where: { email: data.email }
        })
        if (!userExists) throw new Error("User not Exists");
        if (userExists.role === 'Consultant') {
          const now = new Date();
          now.setUTCHours(0, 0, 0, 0);
          let response = await models.ConsultantAccesses.findOne({
             where: {
              consultantUserId: userExists.id,
              expiryDate: {
                [Op.gt]: now
              }
            } 
          });
          if(!response) {
            logger.error(`User don't have access to login`);
            throw new Error(`User don't have access to login`);
          }
          userExists.dataValues.accessLevel = response.accessLevel;
        }
        if (!userExists) {
            return {
                statusCode: 401,
                message: {
                  message: "We were unable to find a user for this email. Please SignUp!"
                }
              };
        }
        if (userExists) {
            if (await bcrypt.compare(data.password, userExists.password)) {
              const token = jwt.sign({ sub: userExists.id }, process.env.secret, {
                expiresIn: "7d",
              });

              return {
                statusCode: 200,
                message: {
                  message: "Login successful",
                  token: token,
                  ...omitPassword(userExists.get())
                }
              };
            } else {
              return {
                statusCode: 401,
                message: {
                  error: "Authentication failed"
                }
              };
            }
          } else {
            return {
              statusCode: 401,
              message: {
                error: "Authentication failed"
              }
            };
          }
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function validateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  jwt.verify(token, process.env.secret, function (err, decoded) {
    if (err) {
      return err;
    } else {
      logger.info(`Token verified successfully`);
      req.userId = decoded.sub;
      next();
    }
  });
}

async function getUser(userId) {
  try {
    if(!userId) throw new Error("User Id is required");
    const userExists = await models.User.findByPk(userId);
    if (!userExists) throw new Error("User not Exists");
    return {
      ...omitPassword(userExists.get())
    }
  } catch(error) {
    logger.error(error);
    throw error;
  }
}

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function updateUser(data, userId) {
  try {
    const userExists = await models.User.findByPk(userId);
    if (!userExists) throw new Error("User not Exists");
    const user = await models.User.update(data, { where: { id: userId }});
    return user;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}


async function passwordReset(email, password) {
  try {
    const user = await models.User.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found");
    }
    
    const passwordHash = await bcrypt.hashSync(password, 10);
    const result = await models.User.update(
      {
          password: passwordHash,
      },
      { where: { id: user.id } }
      );

    return {
      id: user.id,
      email: email,
    };
  } catch (err) {
    logger.error(error);
    throw err;
  }
}

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await models.User.findByPk(req.userId); // assuming userId is set in req object
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      logger.info(`Role verified!`)
      next();
    } catch (error) {
      logger.error(`Error in role middleware: ${error}`);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

async function listUsers() {
  try {
    const users = await models.User.findAll({ where: { role: 'User' } });
    const result = users.map(ele => {
      return {
        ...omitPassword(ele.get())
      }
    })
    return result;
  } catch(error) {
    logger.error(error);
    throw error;
  }
}

async function listConsultants(userId) {
  try {
    let queryObj = { role: 'Consultant' }
    const userExists = await models.User.findByPk(userId)
    if(userExists.role === 'User') {
      let consultantAccessExists = await models.ConsultantAccesses.findAndCountAll({
        where: { userId }
      });
      let consultantIds = consultantAccessExists.rows.map(ele => ele.consultantUserId);
      queryObj.id = {
        [Op.in]: consultantIds
      }
    }
    const users = await models.User.findAll({ 
      where: queryObj,
      include: [
        {
          model: models.ConsultantAccesses
        }
      ]
    });
    const result = users.map(ele => {
      return {
        ...omitPassword(ele.get())
      }
    })
    return result;
  } catch(error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
    register,
    login,
    validateToken,
    getUser,
    updateUser,
    passwordReset,
    checkRole,
    listUsers,
    listConsultants
}