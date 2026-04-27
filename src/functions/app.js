const serverless = require('serverless-http');
const app = require('../server'); // Import your existing express app

module.exports.handler = serverless(app);