const { sign, verify } = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'SECRET';

function verifyToken(token) {
  return verify(token, JWT_SECRET_KEY)
}

module.exports = { verifyToken };