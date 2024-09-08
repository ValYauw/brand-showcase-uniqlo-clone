function authorizeStaff(req, res, next) {
  try {
    if (!req.user) throw { name: 'Forbidden' };
    const { role } = req.user;
    if (role !== 'Admin' && role !== 'Staff') throw { name: 'Forbidden' };
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = { authorizeStaff };