const { sign, verify } = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'SECRET';

function signToken(payload, expiresIn) {
  let options = null;
  if (expiresIn) options = {expiresIn: expiresIn};
  return sign(payload, JWT_SECRET_KEY, options)
}

function verifyToken(token) {
  return verify(token, JWT_SECRET_KEY)
}

module.exports = { signToken, verifyToken };