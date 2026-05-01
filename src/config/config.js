const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVars = process.env

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoDbUrl: envVars.MONGODB_URL,
  jwtSecret: envVars.JWT_SECRET
};
