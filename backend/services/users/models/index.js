const { ObjectId } = require('mongodb');
const { getDB } = require('../config/connection');
const { encrypt } = require('../helpers/encrypt');

class User {
  static connection() {
    return getDB().collection('Users');
  }
  static validate(user) {

    const isEmail = (str) => {
      const rxMatch = /^([^\s]+)@([^\s]+)$/.exec(`${str}`.trim());
      return !!rxMatch;
    }
    const isTelephone = (str) => {
      const rxMatch = /^([0-9\-\s]+)$/.exec(`${str}`.trim());
      return !!rxMatch;
    }

    for (let [field, value] of Object.entries(user)) {

      if (!user.username) throw { name: 'ValidationError', message: 'Username is required' };
      if (!user.email) throw { name: 'ValidationError', message: 'Email is required' };
      if (!user.password) throw { name: 'ValidationError', message: 'Password is required' };
      if (!user.role) throw { name: 'ValidationError', message: 'Username is required' };

      switch (field) {
        case 'username':
          if (!value) throw { name: 'ValidationError', message: 'Username is required' };
          break;
        case 'email':
          if (!value) throw { name: 'ValidationError', message: 'Email is required' };
          if (!isEmail(value)) throw { name: 'ValidationError', message: 'Email is invalid' };
          break;
        case 'password':
          if (!value) throw { name: 'ValidationError', message: 'Password is required' };
          if (value.length < 5) throw { name: 'ValidationError', message: 'Password must be at least 5 characters' };
          break;
        case 'role':
          if (!value) throw { name: 'ValidationError', message: 'Role is required' };
          if (!['Admin', 'Staff', 'User'].includes(value)) throw { name: 'ValidationError', message: 'Role must be \'Admin\', \'Staff\', or \'User\'.' };
          break;
        case 'phoneNumber':
          if (value && !isTelephone(value)) throw { name: 'ValidationError', message: 'Phone Number is invalid' };
          break;
        case 'address':
          // no validation needed
          break;
        default:
          // unrecognized field
      }
    }
    return true;
  }
  static findAll(where) {
    return this.connection().find(where, { password: 0 }).toArray();
  }
  static findByPk(id) {
    return this.connection().findOne({ _id: new ObjectId(id) }, { password: 0 })
  }
  static findOne(where) {
    return this.connection().findOne(where, { password: 0 });
  }
  static create(user) {
    this.validate(user);
    return this.findOne({ email: user.email })
      .then((data) => {
        if (data) throw { name: 'ValidationError', message: 'Email must be unique' }
      })
      .then(() => {
        if (user.password) user.password = encrypt(user.password);
        return this.connection().insertOne(user);
      })  
  }
  static update(id, user) {
    this.validate(user);
    if (user.password) user.password = encrypt(user.password);
    return this.connection().updateOne({
      _id: new ObjectId(id)
    }, { $set: user });
  }
  static delete(id) {
    return this.connection().deleteOne({
      _id: new ObjectId(id)
    })
  }
}

module.exports = User;