const httpStatus = require('http-status').status;
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

const loginUserWithEmailAndPassword = async (email, password, model) => {
  const user = await userService.getUserByEmail(email, model);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};
