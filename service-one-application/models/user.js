'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ConsultantAccesses, {
        foreignKey: 'consultantUserId'
      })
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    pinCode: DataTypes.INTEGER,
    role: DataTypes.ENUM('User', 'Admin', 'Consultant')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};