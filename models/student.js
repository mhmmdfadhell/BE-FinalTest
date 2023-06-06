"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student.init(
    {
      fullname: DataTypes.STRING,
      age: DataTypes.INTEGER,
      born_date: DataTypes.DATE,
      grade: DataTypes.ENUM(
        "Mathematics",
        "Science",
        "Social",
        "Literature",
        "Martial Art",
        "Dance"
      ),
      address: DataTypes.STRING,
      hp: DataTypes.STRING,
      parent_name: DataTypes.STRING,
      parent_hp: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "student",
    }
  );
  return student;
};
