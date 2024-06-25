'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jobs.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Jobs.hasMany(models.InterviewRounds, {
        foreignKey: 'id'
      })
    }
  }
  Jobs.init({
    jobTitle: DataTypes.STRING,
    companyName: DataTypes.STRING,
    jobPlatform: DataTypes.STRING,
    applicationDate: DataTypes.DATE,
    description: DataTypes.STRING,
    applicationStatus: DataTypes.ENUM('Applied', 'Not Shortlisted', 'InProgress', 'Rejected'),
    followUpDate: DataTypes.DATE,
    notes: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jobs',
  });
  return Jobs;
};