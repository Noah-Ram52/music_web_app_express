require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "WOWZers2194514saA@$!$!%@#$%*(",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/music_app"
};