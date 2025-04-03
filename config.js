require('dotenv').config();

const config = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT || 3000
};

module.exports = config;
