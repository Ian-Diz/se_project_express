const Item = require("../models/clothingItem");
const {
  ERROR_DEFAULT,
  ERROR_DOES_NOT_EXIST,
  ERROR_INVALID_DATA,
} = require("../utils/errors");

module.exports.getClothing = (req, res) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      res.status(500).send({ message: "Error with the server" });
    });
};

module.exports.removeClothing = (req, res) => {
  Item.findByIdAndDelete(req.params.itemId)
    .orFail(() => {
      if (!req.body === 404) {
        throw ERROR_DOES_NOT_EXIST;
      } else if (err.name === "CastError") {
        throw ERROR_INVALID_DATA;
      }
    })
    .then((item) => res.send({ data: item }))
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

module.exports.addClothing = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201);
      res.send({ data: item });
    })
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

module.exports.likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user.id } },
    { new: true }
  )
    .orFail(() => {
      throw ERROR_DOES_NOT_EXIST;
    })
    .then((item) => res.send({ data: item }))
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

module.exports.dislikeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user.id } },
    { new: true }
  )
    .orFail(() => {
      throw ERROR_DOES_NOT_EXIST;
    })
    .then((item) => res.send({ data: item }))
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
