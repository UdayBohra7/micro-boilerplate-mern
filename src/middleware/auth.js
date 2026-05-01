const jwt = require('jsonwebtoken');
const httpStatus = require('http-status').status;
const { User } = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const auth = () => async (req, res, next) => {
  const { headers } = req;
  const accessToken = headers.authorization ? headers.authorization.split(' ')[1] : null;
  if (accessToken === null) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'Bearer Token is required.'));
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.sub });
    if (!user) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'User not found'));
    }
    req.user = user;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Token has expired.'));
    }
    return next(new ApiError(httpStatus.UNAUTHORIZED, err.message));
  }
};

module.exports = auth;