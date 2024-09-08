const axios = require('axios');
const redis = require("../config/redisConnection");

const BASE_URL = process.env.BASE_URL;
const USERS_PORT = process.env.USERS_PORT;
const APP_PORT = process.env.APP_PORT;

const USERS_SERVICE_URL = `${BASE_URL}:${USERS_PORT}`;
const APP_SERVICE_URL = `${BASE_URL}:${APP_PORT}`;

class Controller {

  static async getCategories(req, res, next) {
    try {
      let statusCode = 200;
      const cache = await redis.get("categories");
      if (cache) {
        const categories = JSON.parse(cache);
        res.status(statusCode).json(categories);
      } else {
        const { data } = await axios.get(
          APP_SERVICE_URL + req.originalUrl
        );
        await redis.set("categories", JSON.stringify(data));
        res.status(statusCode).json(data);
      }
    } catch(err) {
      next(err);
    }
  }

  static async getProducts(req, res, next) {
    try {
      let statusCode = 200;
      let redisKey = `products?p=${req.query.p || 1}`;
      const cache = await redis.get(redisKey);
      if (cache) {
        const products = JSON.parse(cache);
        res.status(statusCode).json(products);
      } else {
        const { data } = await axios.get(
          APP_SERVICE_URL + req.originalUrl
        );
        await redis.set(redisKey, JSON.stringify(data));
        res.status(statusCode).json(data);
      }
    } catch(err) {
      next(err);
    }
  }

  static async getSingleProductById(req, res, next) {
    try {
      let statusCode = 200;
      const { data } = await axios.get(
        APP_SERVICE_URL + req.originalUrl
      );
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async getSingleProductBySlug(req, res, next) {
    try {
      let statusCode = 200;
      const { data } = await axios.get(
        APP_SERVICE_URL + req.originalUrl
      );
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      let statusCode = 201;
      const { data } = await axios.post(
        APP_SERVICE_URL + req.originalUrl, 
        req.body
      );
      redis.flushdb();
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async editCategory(req, res, next) {
    try {
      let statusCode = 200;
      const { data } = await axios.put(
        APP_SERVICE_URL + req.originalUrl, 
        req.body
      );
      redis.flushdb();
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    try {
      let statusCode = 201;
      const { data } = await axios.post(
        APP_SERVICE_URL + req.originalUrl, 
        req.body
      );
      redis.flushdb();
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      let statusCode = 200;
      const { data } = await axios.put(
        APP_SERVICE_URL + req.originalUrl, 
        req.body
      );
      redis.flushdb();
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      let statusCode = 200;
      const { data } = await axios.delete(
        APP_SERVICE_URL + req.originalUrl
      );
      redis.flushdb();
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      let statusCode = 200;
      const { data } = await axios.post(
        USERS_SERVICE_URL + req.originalUrl,
        req.body
      );
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      let statusCode = 201;
      const { data } = await axios.post(
        USERS_SERVICE_URL + req.originalUrl,
        req.body
      );
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async registerNewStaff(req, res, next) {
    try {
      let statusCode = 201;
      const { data } = await axios.post(
        USERS_SERVICE_URL + req.originalUrl,
        req.body,
        req.headers
      );
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async getUsers(req, res, next) {
    try {
      let statusCode = 200;
      const { data } = await axios.get(
        USERS_SERVICE_URL + req.originalUrl,
        req.headers
      );
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      let statusCode = 200;
      const { data } = await axios.get(
        USERS_SERVICE_URL + req.originalUrl,
        req.headers
      );
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async getUserByEmail(req, res, next) {
    try {
      let statusCode = 200;
      const { data } = await axios.get(
        USERS_SERVICE_URL + req.originalUrl,
        req.headers
      );
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      let statusCode = 200;
      const { data } = await axios.delete(
        USERS_SERVICE_URL + req.originalUrl,
        req.headers
      );
      res.status(statusCode).json(data);
    } catch(err) {
      next(err);
    }
  }

}

module.exports = Controller;
