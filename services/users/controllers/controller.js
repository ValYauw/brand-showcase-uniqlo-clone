const User = require("../models");
const { compare } = require('../helpers/encrypt');
const { signToken } = require('../helpers/jwt');

class Controller {

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: 'InvalidLogin' };
      const user = await User.findOne({ email });
      if (!user) throw { name: 'InvalidLogin' };
      if (!compare(password, user.password)) throw { name: 'InvalidLogin' };
      const accessToken = signToken({
        id: user._id.toString(),
        username: user.username,
        email: user.email
      }, '30d');
      res.status(200).json({
        access_token: accessToken
      });
    } catch(err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const role = "User";
      await User.create({
        username, email, password, role, phoneNumber, address
      });
      res.status(201).json({
        message: 'Registered new user'
      });
    } catch(err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) throw { name: 'NotFoundError' };
      res.status(200).json(user);
    } catch(err) {
      next(err);
    }
  }

  static async getUserByEmail(req, res, next) {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
      if (!user) throw { name: 'NotFoundError' };
      res.status(200).json(user);
    } catch(err) {
      next(err);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch(err) {
      next(err);
    }
  }

  static async registerNewStaff(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const role = "Staff";
      await User.create({
        username, email, password, role, phoneNumber, address
      });
      res.status(201).json({
        message: 'Registered new staff'
      });
    } catch(err) {
      next(err);
    }
  }

  // static async editUser(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const { email, username, phoneNumber, address } = req.body;
  //     let user = await User.findOne({ email });
  //     if (!user) throw { name: 'NotFoundError' };
  //     const updated = await User.update(id, {
  //       email, username, phoneNumber, address
  //     });
  //     console.log(updated);
  //     res.status(200).json({
  //       message: 'Successfully updated user details'
  //     })
  //   } catch(err) {
  //     next(err);
  //   }
  // }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) throw { name: 'NotFoundError' };
      await User.delete(id);
      res.status(200).json({
        message: 'Successfully deleted user'
      });
    } catch(err) {
      next(err);
    }
  }

}

module.exports = Controller;
