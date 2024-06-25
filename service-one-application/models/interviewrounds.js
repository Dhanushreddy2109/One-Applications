'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InterviewRounds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InterviewRounds.belongsTo(models.Jobs, {
        foreignKey: 'jobId'
      })
    }
  }
  InterviewRounds.init({
    interviewName: DataTypes.STRING,
    jobId: DataTypes.INTEGER,
    phase: DataTypes.STRING,
    interviewStatus: DataTypes.STRING,
    dateOfInterview: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'InterviewRounds',
  });
  return InterviewRounds;
};