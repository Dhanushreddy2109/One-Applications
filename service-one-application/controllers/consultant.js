const models = require('../models');

async function createAccesstoConsultant(data, userId) {
    try {
        const userExists = await models.User.findOne({ where: { id: userId, role: 'User' } });
        if(!userExists) throw new Error('User not exists');
        const consultantExists = await models.User.findOne({ where: { id: data.consultantUserId, role: 'Consultant' } });
        if(!consultantExists) throw new Error('Consultant not exists');
        const consultantAccessExists = await models.ConsultantAccesses.findOne({
            where: {
                consultantUserId: data.consultantUserId,
                userId
            }
        });
        if(consultantAccessExists) throw new Error('Consultant already exists');
        let consultantAccess = await models.ConsultantAccesses.create({
            userId,
            ...data
        })
        return consultantAccess;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createAccesstoConsultant
}