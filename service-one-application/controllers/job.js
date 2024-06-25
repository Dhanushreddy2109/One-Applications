const models = require('../models');
const Op = require('sequelize').Op;

async function createJobAppliedRecord(data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) throw new Error('User not exists');
        const jobExists = await models.Jobs.findOne({ 
            where: { 
                jobTitle: data.jobTitle, 
                companyName: data.companyName, 
                applicationStatus: { [Op.in]: ['Applied', 'InProgress'] } 
            }
        });
        if(jobExists) throw new Error('Already applied to the Job');
        const job = await models.Jobs.create({
            userId: userId,
            ...data
        });
        return job

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateJobAppliedRecord(jobId, data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) throw new Error('User not exists');
        const jobExists = await models.Jobs.findByPk(jobId);
        if(!jobExists) throw new Error('Job not Exists');
        const job = await models.Jobs.update({
            ...data
        }, { where: { id: jobId } });
        return job

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteJobAppliedRecord(jobId) {
    try {
        const jobExists = await models.Jobs.findByPk(jobId);
        if(!jobExists) throw new Error('Job not Exists');
        await models.Jobs.destroy({ where: {id: jobId }});
        return {
            id: itemId
        }
    } catch(error) {
        console.log(error);
        throw error;
    }
}

async function getAppliedJobs(data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) throw new Error('User not exists');
        let queryObj = { userId }
        if (data.applicationStatus) queryObj.applicationStatus = data.applicationStatus
        const jobs = await models.Jobs.findAndCountAll({
            where: queryObj,
        })
        return jobs;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createJobAppliedRecord,
    updateJobAppliedRecord,
    deleteJobAppliedRecord,
    getAppliedJobs
}