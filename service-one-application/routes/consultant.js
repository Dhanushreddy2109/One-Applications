const { createAccesstoConsultant } = require('../controllers/consultant');
const Joi = require('joi');

const provideAccessSchema = Joi.object({
    consultantUserId: Joi.number().required(),
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

module.exports = {
    provideAccess
}