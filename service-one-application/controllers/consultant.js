const models = require('../models');
const bcrypt = require('bcryptjs');
const logger = require('../helpers/logger');

async function createAccesstoConsultant(data, userId) {
    try {
        const userExists = await models.User.findOne({ where: { id: userId, role: 'User' } });
        if(!userExists) throw new Error('User not exists');
        const consultantExists = await models.User.findOne({
            where: { email: data.email }
        })
        if (consultantExists) {
            logger.error('Consultant already registered')
            throw new Error('Consultant already registered');
        }
        const hashPassword = await bcrypt.hashSync(data.password, 10);
        const result = await models.User.create({
            userName: data.userName,
            password: hashPassword,
            email: data.email,
            role: 'Consultant'
        })

        const consultantAccessExists = await models.ConsultantAccesses.findOne({
            where: {
                consultantUserId: result.id,
                userId
            }
        });
        if(consultantAccessExists) {
            logger.error('Consultant already exists')
            throw new Error('Consultant already exists');
        }
        let consultantAccess = await models.ConsultantAccesses.create({
            userId,
            consultantUserId: result.id,
            ...data
        })
        logger.info('Access to consultant created successfully');
        return consultantAccess;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function editAccesstoConsultant(consultantAccessId, data, userId) {
    try {
        const userExists = await models.User.findOne({ where: { id: userId, role: 'User' } });
        if(!userExists) {
            logger.error('User not exists')
            throw new Error('User not exists');
        }
        const consultantAccessExists = await models.ConsultantAccesses.findByPk(consultantAccessId);
        if(!consultantAccessExists) {
            logger.error('Consultant access not exists')
            throw new Error('Consultant access not exists');
        }
        let consultantAccess = await models.ConsultantAccesses.update({
            ...data
        }, { where: { id: consultantAccessId } });
        logger.info('Consultant Access updated successfully');
        return consultantAccess;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    createAccesstoConsultant,
    editAccesstoConsultant
}