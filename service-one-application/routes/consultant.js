const { createAccesstoConsultant, editAccesstoConsultant } = require('../controllers/consultant');
const Joi = require('joi');

const provideAccessSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
    accessLevel: Joi.string().valid('View', 'Edit'),
    expiryDate: Joi.date().required()
}).with('password', 'confirmPassword');

const editAccessSchema = Joi.object({
    accessLevel: Joi.string().valid('View', 'Edit'),
    expiryDate: Joi.date().required()
});

async function provideAccess(req, res) {
    try {
        const data = req.body;
        const { error, value } = provideAccessSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await createAccesstoConsultant(data, req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function editAccess(req, res) {
    try {
        const data = req.body;
        const { error, value } = editAccessSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await editAccesstoConsultant(req.params.id, data, req.userId);
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
    provideAccess,
    editAccess
}