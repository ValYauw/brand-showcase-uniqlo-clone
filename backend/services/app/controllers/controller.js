const { Category, Product, Image, sequelize } = require("../models");
const { Op } = require('sequelize');

class Controller {

  static async getProductsForCms(req, res, next) {
    try {
      const data = await Product.findAll({
        attributes: {
          exclude: ['categoryId', 'authorId', 'createdAt', 'updatedAt']
        },
        include: [
          {
            model: Category,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            as: 'category'
          }
        ],
        order: [['id', 'DESC']]
      })
      res.status(200).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async getProducts(req, res, next) {
    try {
      let { p, search } = req.query;
      if (!p || isNaN(p)) p = 1;

      const numProductsPerPage = 6;

      const options = {
        attributes: {
          exclude: ['categoryId', 'authorId', 'createdAt', 'updatedAt']
        },
        include: [
          {
            model: Category,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            as: 'category'
          }
        ],
        order: [['slug', 'ASC']],
        limit: numProductsPerPage,
        offset: (p-1) * numProductsPerPage
      };
      if (search) {
        options.where = {
          name: { [Op.iLike]: `%${search}%` }
        }
      };

      const data = await Product.findAndCountAll(options)
      res.status(200).json({
        count: data.count,
        page: +p,
        data: data.rows
      });
    } catch(err) {
      next(err);
    }
  }

  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        order: [['id', 'ASC']]
      });
      res.status(200).json(categories);
    } catch(err) {
      next(err);
    }
  }

  static async getSingleProductById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) throw { name: 'NotFoundError' };
      const product = await Product.findByPk(id, {
        attributes: {
          exclude: ['categoryId', 'createdAt', 'updatedAt']
        },
        include: [
          {
            model: Category,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            as: 'category'
          },
          {
            model: Image,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            as: 'images'
          }
        ]
      });
      if (!product) throw { name: 'NotFoundError' };
      res.status(200).json(product);
    } catch(err) {
      next(err);
    }
  }

  static async getSingleProductBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      if (!slug) throw { name: 'NotFoundError' };
      const product = await Product.findOne({
        where: { slug },
        attributes: {
          exclude: ['categoryId', 'createdAt', 'updatedAt']
        },
        include: [
          {
            model: Category,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            as: 'category'
          },
          {
            model: Image,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            as: 'images'
          }
        ]
      });
      if (!product) throw { name: 'NotFoundError' };
      res.status(200).json(product);
    } catch(err) {
      next(err);
    }
  } 

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      let category = await Category.create({ name });
      res.status(201).json(category);
    } catch(err) {
      next(err);
    }
  }

  static async editCategory(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    const t = await sequelize.transaction();
    try {
      if (!id || isNaN(id)) throw { name: 'BadCredentials' };
      let category = await Category.findByPk(id, { transaction: t });
      if (!category) throw { name: 'NotFoundError' };
      await Category.update(
        { name }, 
        { where: { id }, transaction: t }
      );
      category = await Category.findByPk(id, { transaction: t });
      await t.commit();
      res.status(200).json(category);
    } catch(err) {
      await t.rollback();
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    const { name, description, price, mainImg, categoryId, authorId, images } = req.body;
    // const authorId = req.user.id;
    const t = await sequelize.transaction();
    try {
      let product = await Product.create(
        { name, description, price, mainImg, categoryId, authorId }, 
        {transaction: t}
      );
      const addImages = images.map(image => {
        return Image.create({
          productId: product.id,
          imgUrl: image.imgUrl
        }, {
          transaction: t
        })
      });
      await Promise.all(addImages);
      product = await Product.findByPk(product.id, {
        include: {
          model: Image,
          as: 'images'
        },
        transaction: t
      });
      await t.commit();
      res.status(201).json(product);
    } catch(err) {
      console.log(err);
      await t.rollback();
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
      const product = await Product.findByPk(id, {transaction: t});
      if (!product) throw { name: 'NotFoundError' };
      await Product.destroy({
        where: { id: product.id },
        transaction: t
      })
      await t.commit();
      res.status(200).json({
        message: `Successfully deleted product with id #${id}`
      });
    } catch(err) {
      await t.rollback();
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    const { id: urlId } = req.params;
    const { id, name, description, price, mainImg, categoryId, images } = req.body;
    const t = await sequelize.transaction();
    try {
      if (+urlId !== +id) throw { name: 'BadCredentials' };
      let product = await Product.findByPk(id, { transaction: t });
      if (!product) throw { name: 'NotFoundError' };
      
      // Update main entity details
      await Product.update({
        name, description, price, mainImg, categoryId
      }, { 
        where: {id: product.id}, 
        transaction: t 
      });

      // Remove deleted sub-entities
      const existingImages = images.filter(el => el.hasOwnProperty('id'));
      await Image.destroy({
        where: {
          id: { [Op.notIn]: existingImages.map(el => el.id)},
          productId: product.id
        },
        transaction: t
      })

      // Update sub-entity details
      const updateImages = existingImages.map(image => {
        return Image.update({
          productId: product.id,
          imgUrl: image.imgUrl
        }, {
          where: {id: image.id},
          transaction: t
        })
      });
      await Promise.all(updateImages);

      // Add new sub-entities
      const newImages = images.filter(el => !el.hasOwnProperty('id'));
      const addImages = newImages.map(image => {
        return Image.create({
          productId: product.id,
          imgUrl: image.imgUrl
        }, {
          transaction: t
        })
      });
      await Promise.all(addImages);

      // Fetch product
      product = await Product.findByPk(id, { 
        include: {
          model: Image,
          as: 'images'
        },
        transaction: t 
      });

      await t.commit();
      res.status(200).json(product);
    } catch(err) {
      await t.rollback();
      next(err);
    }
  }

}

module.exports = Controller;
