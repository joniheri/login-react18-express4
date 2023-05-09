'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TbProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TbProduct.init({
    category: DataTypes.STRING,
    productName: DataTypes.STRING,
    productBrand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TbProduct',
  });
  return TbProduct;
};