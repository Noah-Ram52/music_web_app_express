const express = require('express');
const router = express.Router();

const {
  getUser,  
  getUsers,
  createUser,
  userAuth
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/signup', createUser);
router.post('/login', userAuth);

module.exports = router;