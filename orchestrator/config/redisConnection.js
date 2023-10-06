const Redis = require("ioredis");
const redis = new Redis({
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST_URL,
  port: 13390
});
// const redis = new Redis();

module.exports = redis;