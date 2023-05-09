"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TbUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TbUser.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      noKtp: DataTypes.STRING,
      photoProfile: DataTypes.STRING,
      level: DataTypes.STRING,
      refreshToken: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "TbUser",
    }
  );
  return TbUser;
};
