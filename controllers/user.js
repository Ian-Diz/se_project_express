const User = require("../models/user");
const {
  ERROR_DEFAULT,
  ERROR_DOES_NOT_EXIST,
  ERROR_INVALID_DATA,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      res.status(500).send({ message: "Error with the server" });
    });
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail((err) => {
      throw ERROR_DOES_NOT_EXIST;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        console.error(
          `Error ${err.name} with the message ${err.message} has occurred while executing the code`
        );
        res.status(404).send({
          message: `Error ${err.name} with the message ${err.message} has occurred while executing the code`,
        });
      } else if (err.name === "CastError") {
        console.error(
          `Error ${err.name} with the message ${err.message} has occurred while executing the code`
        );
        res.status(400).send({
          message: `Error ${err.name} with the message ${err.message} has occurred while executing the code`,
        });
      } else {
        console.error(
          `Error ${err.name} with the message ${err.message} has occurred while executing the code`
        );
        res.status(500).send({ message: "Error with the server" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error(
          `Error ${err.name} with the message ${err.message} has occurred while executing the code`
        );
        res.status(400).send({
          message: `Error ${err.name} with the message ${err.message} has occurred while executing the code`,
        });
      } else {
        console.error(
          `Error ${err.name} with the message ${err.message} has occurred while executing the code`
        );
        res.status(500).send({ message: "Error with the server" });
      }
    });
};
