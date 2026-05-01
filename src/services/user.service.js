const { User } = require('../models/user.model');

const createUser = async (userBody) => {
  return User.create(userBody);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

module.exports = {
  createUser,
  getUserByEmail,
};
