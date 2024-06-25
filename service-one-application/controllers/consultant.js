const models = require('../models');
const bcrypt = require('bcryptjs');

async function createAccesstoConsultant(data, userId) {
    try {
        const userExists = await models.User.findOne({ where: { id: userId, role: 'User' } });
        if(!userExists) throw new Error('User not exists');
        const consultantExists = await models.User.findOne({
            where: { email: data.email }
        })
        if (consultantExists) {
            throw new Error('Consultant already registered');
        }
        const hashPassword = await bcrypt.hashSync(data.password, 10);
        const result = await models.User.create({
            userName: data.userName,
            password: hashPassword,
            email: data.email,
            role: 'Consultant'
        })
        console.log(result.User);
        const consultantAccessExists = await models.ConsultantAccesses.findOne({
            where: {
                consultantUserId: result.id,
                userId
            }
        });
        if(consultantAccessExists) throw new Error('Consultant already exists');
        let consultantAccess = await models.ConsultantAccesses.create({
            userId,
            consultantUserId: result.id,
            ...data
        })
        return consultantAccess;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function editAccesstoConsultant(consultantAccessId, data, userId) {
    try {
        const userExists = await models.User.findOne({ where: { id: userId, role: 'User' } });
        if(!userExists) throw new Error('User not exists');
        const consultantAccessExists = await models.ConsultantAccesses.findByPk(consultantAccessId);
        if(!consultantAccessExists) throw new Error('Consultant access not exists');
        let consultantAccess = await models.ConsultantAccesses.update({
            ...data
        }, { where: { id: consultantAccessId } });
        return consultantAccess;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createAccesstoConsultant,
    editAccesstoConsultant
}