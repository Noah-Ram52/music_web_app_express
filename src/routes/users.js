const express = require('express');
const router = express.Router();

const { getCurrentUser } = require('../controllers/users.js');

router.get('/me', getCurrentUser);

module.exports = router;