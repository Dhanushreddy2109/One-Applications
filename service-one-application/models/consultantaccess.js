'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConsultantAccesses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ConsultantAccesses.belongsTo(models.User, {
        foreignKey: 'consultantUserId'
      })
    }
  }
  ConsultantAccesses.init({
    userId: DataTypes.INTEGER,
    consultantUserId: DataTypes.INTEGER,
    accessLevel: DataTypes.STRING,
    expiryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ConsultantAccesses',
  });
  return ConsultantAccesses;
};