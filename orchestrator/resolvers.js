const axios = require('axios');
const redis = require('./config/redisConnection');
const { throwError } = require('./utils/errorHandler');

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL;
const APP_SERVICE_URL = process.env.APP_SERVICE_URL;

const getUser = async (token) => {
  const { data } = await axios.get(
    USERS_SERVICE_URL + '/authenticate',
    {
      headers: {
        access_token: token
      }
    }
  )
  return data;
}

const resolvers = {
  Query : {
    categories: async () => {
      const cache = await redis.get("categories");
      if (cache) {
        const categories = JSON.parse(cache);
        return categories;
      } else {
        try {
          const { data } = await axios.get(
            APP_SERVICE_URL + '/categories'
          );
          await redis.set("categories", JSON.stringify(data));
          return data;
        } catch(err) {
          throwError(err);
        }
      }
    },
    cmsProducts: async (_, args, context) => {
      try {
        await getUser(context.access_token);
        const { data } = await axios.get(
          APP_SERVICE_URL + '/cms/products'
        );
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    products: async (_, args) => {
      let redisKey = `products?p=${args.p || 1}`;
      const cache = await redis.get(redisKey);
      if (cache) {
        const products = JSON.parse(cache);
        return products;
      } else {
        try {
          const { data } = await axios.get(
            APP_SERVICE_URL + '/' + redisKey
          );
          await redis.set(redisKey, JSON.stringify(data));
          return data;
        } catch(err) {
          throwError(err);
        }
      }
    },
    product: async (_, args) => {
      const { id, slug } = args;
      if (id) {
        try {
          const { data } = await axios.get(
            APP_SERVICE_URL + `/products/${id}`
          );
          const { authorId } = data;
          const { data: author } = await axios.get(
            USERS_SERVICE_URL + `/users/${authorId}`
          );
          data.author = author;
          return data;
        } catch(err) {
          throwError(err);
        }
      }
      if (slug) {
        try {
          const { data } = await axios.get(
            APP_SERVICE_URL + `/slug/${slug}`
          );
          const { authorId } = data;
          const { data: author } = await axios.get(
            USERS_SERVICE_URL + `/users/${authorId}`
          );
          data.author = author;
          return data;
        } catch(err) {
          throwError(err);
        }
      }
      return null;
    },
    searchProducts: async (_, args) => {
      let redisKey = `products?p=${args.p || 1}&search=${args.search}`;
      try {
        const { data } = await axios.get(
          APP_SERVICE_URL + '/' + redisKey
        );
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    users: async (_, args, context) => {
      try {
        const { data } = await axios.get(
          USERS_SERVICE_URL + '/users',
          {
            headers: {
              access_token: context.access_token
            }
          }
        );
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    user: async (_, args, context) => {
      const { id, email } = args;
      if (id) {
        try {
          const { data } = await axios.get(
            USERS_SERVICE_URL + `/users/${id}`
          );
          return data;
        } catch(err) {
          throwError(err);
        }
      }
      if (email) {
        try {
          const { data } = await axios.get(
            USERS_SERVICE_URL + `/users/email/${email}`
          );
          return data;
        } catch(err) {
          throwError(err);
        }
      }
      return null;
    }
  },
  Mutation: {
    async login(_, args) {
      const { email, password } = args.LoginDetails;
      try {
        const { data } = await axios.post(
          USERS_SERVICE_URL + '/login',
          { email, password }
        )
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    async registerUser(_, args) {
      let { username, email, password, phoneNumber, address } = args.RegistrationDetails;
      phoneNumber = phoneNumber || '';
      address = address || '';
      try {
        const { data } = await axios.post(
          USERS_SERVICE_URL + '/register',
          { username, email, password, phoneNumber, address }
        );
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    async registerStaff(_, args) {
      let { username, email, password, phoneNumber, address } = args.RegistrationDetails;
      phoneNumber = phoneNumber || '';
      address = address || '';
      try {
        const { data } = await axios.post(
          USERS_SERVICE_URL + '/staff/register',
          { username, email, password, phoneNumber, address }
        );
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    async deleteUser(_, args, context) {
      const { id } = args;
      try {
        const { data } = await axios.delete(
          USERS_SERVICE_URL + `/users/${id}`,
          {
            headers: context.access_token
          }
        );
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    async addCategory(_, args, context) {
      const { name } = args.NewCategory;
      try {
        await getUser(context.access_token);
        const { data } = await axios.post(
          APP_SERVICE_URL + `/categories`,
          { name }
        );
        redis.flushall();
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    async updateCategory(_, args, context) {
      const { id, name } = args.NewCategory;
      try {
        await getUser(context.access_token);
        const { data } = await axios.put(
          APP_SERVICE_URL + `/categories/${id}`,
          { name }
        );
        redis.flushall();
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    async addProduct(_, args, context) {
      const { name, description, price, mainImg, categoryId, images } = args.NewProduct;
      try {
        console.log(name);
        const { id } = await getUser(context.access_token);
        console.log(id);
        const { data } = await axios.post(
          APP_SERVICE_URL + `/products`,
          { name, description, price, mainImg, authorId: id, categoryId, images }
        );
        redis.flushall();
        console.log('Successfully added');
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    async updateProduct(_, args, context) {
      const { id, name, description, price, mainImg, categoryId, images } = args.NewProduct;
      try {
        await getUser(context.access_token);
        const { data } = await axios.put(
          APP_SERVICE_URL + `/products/${id}`,
          { id, name, description, price, mainImg, categoryId, images }
        );
        redis.flushall();
        return data;
      } catch(err) {
        throwError(err);
      }
    },
    async deleteProduct(_, args, context) {
      const { id } = args;
      try {
        await getUser(context.access_token);
        const { data } = await axios.delete(
          APP_SERVICE_URL + `/products/${id}`
        );
        redis.flushall();
        return data;
      } catch(err) {
        throwError(err);
      }
    }
  }
};

module.exports = resolvers;