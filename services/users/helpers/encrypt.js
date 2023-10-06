const bcryptjs = require('bcryptjs');
const SALT = bcryptjs.genSaltSync(10);

function encrypt(plaintext) {
  return bcryptjs.hashSync(plaintext, SALT);
}

function compare(plaintext, hashed) {
  return bcryptjs.compareSync(plaintext, hashed);
}

module.exports = { encrypt, compare }