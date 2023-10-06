'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product, {
        foreignKey: 'productId',
        // as: 'products'
      });
    }
  }
  Image.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // validate: {
      //   notNull: {msg: 'Associated Product is required'},
      //   notEmpty: {msg: 'Associated Product is required'}
      // }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Image Url is required'},
        notEmpty: {msg: 'Image Url is required'},
        isUrl: {msg: 'Image Url is invalid'}
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};