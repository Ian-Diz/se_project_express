const User = require("../models/user");
const { ERROR_DEFAULT, ERROR_DOES_NOT_EXIST } = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      throw ERROR_DEFAULT;
    })
    .then((users) => res.send(users))
    .catch((err) =>
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      )
    );
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw ERROR_DOES_NOT_EXIST;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      )
    );
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  console.log(req.body);

  User.create({ name, avatar })
    .then((user) => res.send(user))
    .catch((err) =>
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      )
    );
};
