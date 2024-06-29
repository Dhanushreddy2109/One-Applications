const models = require('../models');
const Op = require('sequelize').Op;
const logger = require('../helpers/logger');


async function createJobAppliedRecord(data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) {
            logger.error('User not exists')
            throw new Error('User not exists');
        }
        let queryObj = {
            jobTitle: data.jobTitle, 
            companyName: data.companyName, 
            applicationStatus: { [Op.in]: ['Applied', 'InProgress'] } 
        }
        if(userExists.role === 'Consultant') {
            let user = await models.ConsultantAccesses.findOne({
                where: {
                    consultantUserId: userId,
                    accessLevel: 'Edit'
                }
            })

            if(!user) {
                logger.error(`User don't have access to create Job`);
                throw new Error(`User don't have access to create Job`)
            }
            let consultants = await models.ConsultantAccesses.findAll({
                where: {
                    userId: {
                        [Op.in]: user.userId
                    }
                }
            })
            consultants = consultants.map(ele => ele.consultantUserId)
            let userIds = [user.userId, ...consultants]
            queryObj.userId = {
                [Op.in]: userIds
            }

        }

        if(userExists.role === 'User') {
            let consultantAccessExists = await models.ConsultantAccesses.findAll({
                where: {
                    userId
                }
            })
            consultantAccessExists = consultantAccessExists.map(ele => ele.consultantUserId)
            consultantAccessExists = [...consultantAccessExists, userId]
            queryObj.userId = {
                [Op.in]: consultantAccessExists
            }

        }
        
        const jobExists = await models.Jobs.findOne({
            where: queryObj
        });
        if(jobExists) {
            logger.error('Already applied to the Job')
            throw new Error('Already applied to the Job');
        }
        const job = await models.Jobs.create({
            userId: userId,
            ...data
        });
        logger.info('Job tracked successfully');
        return job

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function updateJobAppliedRecord(jobId, data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) {
            logger.error('User not exists')
            throw new Error('User not exists');
        }
        if (userExists.role === 'Consultant') {
            let user = await models.ConsultantAccesses.findOne({
                where: {
                    consultantUserId: userId,
                    accessLevel: 'Edit'
                }
            })

            if(!user) {
                logger.error(`User don't have access to update Job`);
                throw new Error(`User don't have access to update Job`)
            }
        }
        const jobExists = await models.Jobs.findByPk(jobId);
        if(!jobExists) throw new Error('Job not Exists');
        const job = await models.Jobs.update({
            ...data
        }, { where: { id: jobId } });
        logger.info(`Job updated succesfully`);
        return job

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function deleteJobAppliedRecord(jobId, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) {
            logger.error('User not exists')
            throw new Error('User not exists');
        }
        if (userExists.role === 'Consultant') {
            let user = await models.ConsultantAccesses.findOne({
                where: {
                    consultantUserId: userId,
                    accessLevel: 'Edit'
                }
            })

            if(!user) {
                logger.error(`User don't have access to update Job`);
                throw new Error(`User don't have access to update Job`)
            }
        }
        const jobExists = await models.Jobs.findByPk(jobId);
        if(!jobExists) throw new Error('Job not Exists');
        await models.Jobs.destroy({ where: {id: jobId }});
        logger.info(`${jobExists.jobTitle} job deleted successfully`);
        return {
            id: jobId
        }
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function getAppliedJobs(data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) 
        {
            logger.error(`User not exists for getting list of jobs`)
            throw new Error('User not exists');
        }
        let queryObj = {}
        if (userExists.role === 'User') {
            let consultantAccessExists = await models.ConsultantAccesses.findAndCountAll({
                where: { userId }
            });
            let consultantIds = consultantAccessExists.rows.map(ele => ele.consultantUserId);
        
            if (data.applicationStatus === 'Consultant') {
                queryObj.userId = {
                    [Op.in]: consultantIds
                }
            } else {
                queryObj.userId = {
                    [Op.in]: [userId, ...consultantIds]
                }
            }
        }
        if (userExists.role === 'Consultant') {
            queryObj.userId = userId
        }
        if (data.applicationStatus && data.applicationStatus !== 'Consultant') queryObj.applicationStatus = data.applicationStatus
        const jobs = await models.Jobs.findAndCountAll({
            where: queryObj,
            include: [
                {
                    model: models.User,
                    attributes: ['userName', 'email', 'role']
                }
            ]
        })
        logger.info(`Jobs fetched successfully for the user`)
        return jobs;
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    createJobAppliedRecord,
    updateJobAppliedRecord,
    deleteJobAppliedRecord,
    getAppliedJobs
}