const jwt = require('jsonwebtoken');

const User = require('../models/User.js');
const { JWT_SECRET } = require('../utils/coolcode.js');

// #Response Codes

// #Succesful Responses
const { OK_REQUEST, CREATED_REQUEST } = require('../HTTP Response/Successful Responses/Successful.js');

// #Errors
const BadRequestError = require('../HTTP Response/Errors/BadRequestError.js');
const UnauthorizedRequestError = require('../HTTP Response/Errors/UnauthorizedError.js');
const ConflictRequestError = require('../HTTP Response/Errors/ConflictRequestError.js');
const NotFoundRequestError = require('../HTTP Response/Errors/NotFoundRequestError.js');


// GET Requests

// getUsers: GET /users

// It reads all users from the database with User.find({}), 
// so it is a GET request.
const getUsers = (req, res, next) => {
    User.find({})
      .then((users) => res.status(OK_REQUEST).send(users))
      .catch(next); // forward unexpected errors to error middleware
}

// getUser: GET /users/:userId 
// It reads one user by ID with User.findById(userId), so it is also GET.

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(OK_REQUEST).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundRequestError("User not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("User not found"));
      }
      return next(err);
    });
};


// getCurrentUser: GET /users/me

// It reads the currently logged-in user using req.user._id, so this is GET too.
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(OK_REQUEST).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundRequestError("User not found"));
      }
      return next(err);
    });
};


// POST Requests

// createUser: POST /signup

// It creates a new user with User.create(...), so this is POST.

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new BadRequestError("All fields are required"));
  }

  return User.create({ name, email, password })
    .then((user) => User.findById(user._id).select("+password"))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(CREATED_REQUEST).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Duplicate key error (email already exists)
        // Duplicate key -> conflict
        return next(new ConflictRequestError("A user with this email already exists"));
      }
      // Mongoose validation -> bad request
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};


// userAuth: POST /signin

//  It checks email and password, 
// then returns a JWT token, so this is POST as well.

const userAuth = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(OK_REQUEST).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedRequestError("Incorrect email or password"));
      }
      return next(err); // 500 for other errors
    });
};

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  userAuth
};
