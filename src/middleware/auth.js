const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const auth = () => async (req, res, next) => {
  const { headers } = req;
  const accessToken = headers.authorization ? headers.authorization.split(' ')[1] : null;
  if (accessToken === null) {
    return next(new ApiError(400, 'Bearer Token is required.'));
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.sub });
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }
    req.user = user;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Token has expired.'));
    }
    return next(new ApiError(401, err.message));
  }
};

module.exports = auth;