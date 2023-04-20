const User = require("../models/user");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const REACT_APP_JWT_SECRET = require("../utils/config");

const {
  ERROR_DOES_NOT_EXIST,
  INVALID_DATA_CODE,
  DOES_NOT_EXIST_CODE,
  DEFAULT_CODE,
  UNAUTHORIZED_CODE,
  CONFLICT_CODE,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(DEFAULT_CODE).send({ message: "Error with the server" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === "ValidationError") {
          res.status(INVALID_DATA_CODE).send({
            message: "Data provided is invalid",
          });
        } else if (err.code === 11000) {
          res
            .status(CONFLICT_CODE)
            .send({ message: "User with this email already exists" });
        } else {
          res.status(DEFAULT_CODE).send({ message: "Error with the server" });
        }
      });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, REACT_APP_JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED_CODE).send({ message: err.message });
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw ERROR_DOES_NOT_EXIST;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === DOES_NOT_EXIST_CODE) {
        res.status(DOES_NOT_EXIST_CODE).send({
          message: "Requested data could not be found",
        });
      } else if (err.name === "CastError") {
        res.status(INVALID_DATA_CODE).send({
          message: "Id provided was invalid",
        });
      } else {
        res.status(DEFAULT_CODE).send({ message: "Error with the server" });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name: name, avatar: avatar })
    .orFail(() => {
      throw ERROR_DOES_NOT_EXIST;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(INVALID_DATA_CODE).send({
          message: "Data provided is invalid",
        });
      } else if (err.statusCode === DOES_NOT_EXIST_CODE) {
        res.status(DOES_NOT_EXIST_CODE).send({
          message: "Requested data could not be found",
        });
      } else {
        res.status(DEFAULT_CODE).send({ message: "Error with the server" });
      }
    });
};
