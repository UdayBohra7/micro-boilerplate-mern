const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (userId, expires, type, secret = process.env.JWT_SECRET) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = Math.floor(Date.now() / 1000) + 3600; // 1 hour
  const accessToken = generateToken(user.id, accessTokenExpires, 'access');
  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpires * 1000),
    },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
