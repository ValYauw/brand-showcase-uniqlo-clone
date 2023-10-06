const User = require("../models");
const { verifyToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: 'Unauthorized' };
    const decoded = verifyToken(access_token);
    const { id, email } = decoded;
    if (!id || !email ) throw { name: 'Unauthorized' };
    const user = await User.findByPk(id);
    if (!user || user.email !== email) throw { name: 'Unauthorized' };
    req.user = user;
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = authentication;