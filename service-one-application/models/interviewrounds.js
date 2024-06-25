'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class interviewRounds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  interviewRounds.init({
    interviewName: DataTypes.STRING,
    phase: DataTypes.STRING,
    interviewStatus: DataTypes.STRING,
    dateOfInterview: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'interviewRounds',
  });
  return interviewRounds;
};