'use strict';
const generateSlug = require('../helpers/slugGenerator');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, {
        foreignKey: 'productId',
        as: 'images'
      });
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Product name is required'},
        notEmpty: {msg: 'Product name is required'}
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'Product slug must be unique'},
      validate: {
        notNull: {msg: 'Product slug is required'},
        notEmpty: {msg: 'Product slug is required'}
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Product description is required'},
        notEmpty: {msg: 'Product description is required'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Product price is required'},
        notEmpty: {msg: 'Product price is required'},
        min: {
          args: 1000,
          msg: 'Minimum price is Rp 1.000'
        }
      }
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Product image is required'},
        notEmpty: {msg: 'Product image is required'},
        isUrl: {msg: 'Image Url is invalid'}
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id'
      },
      // validate: {
      //   notNull: {msg: 'Product category is required'},
      //   notEmpty: {msg: 'Product category is required'}
      // }
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   notNull: {msg: 'Author is required'},
      //   notEmpty: {msg: 'Author category is required'}
      // }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.beforeValidate((product, options) => {
    let name = product.dataValues.name;
    if (name) {
      let slug = generateSlug(name);
      product.dataValues.slug = slug;
    }
  })
  Product.beforeUpdate((product, options) => {
    let name = product.dataValues.name;
    if (name) {
      let slug = generateSlug(name);
      product.dataValues.slug = slug;
    }
  })
  return Product;
};