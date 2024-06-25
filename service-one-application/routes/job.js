const { createJobAppliedRecord, updateJobAppliedRecord, deleteJobAppliedRecord, getAppliedJobs } = require('../controllers/job');
const Joi = require('joi');

const addJobAppliedSchema = Joi.object({
    jobTitle: Joi.string().label('Job Title').required(),
    companyName: Joi.string().label('Company Name').required(),
    jobPlatform: Joi.string().allow(null),
    applicationDate: Joi.date().required(),
    description: Joi.string().allow(null),
    applicationStatus: Joi.string().valid('Applied', 'Not Shortlisted', 'InProgress', 'Rejected').required(),
    followUpDate: Joi.date(),
    notes: Joi.string().allow(null) 
});

const getJobAppliedSchema = Joi.object({
    applicationStatus: Joi.string().valid('Applied', 'Not Shortlisted', 'InProgress', 'Rejected')
});

async function addJobApplied(req, res) {
    try {
        const data = req.body;
        const { error, value } = addJobAppliedSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await createJobAppliedRecord(data, req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function updateJobApplied(req, res) {
    try {
        const data = req.body;
        const { error, value } = addJobAppliedSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await updateJobAppliedRecord(req.params.id, data, req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function deleteJobApplied(req, res) {
    try {
        const result = await deleteJobAppliedRecord(req.params.id, req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function listAppliedJobs(req, res) {
    try {
        if (req.query.applicationStatus) {
            const { error, value } = getJobAppliedSchema.validate(req.query);
            if (error) {
                throw new Error(error.details[0].message);
            }
        }
        const result = await getAppliedJobs(req.query, req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

module.exports = {
    addJobApplied,
    updateJobApplied,
    deleteJobApplied,
    listAppliedJobs
}