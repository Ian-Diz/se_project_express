const Item = require("../models/clothingItem");
const {
  ERROR_DEFAULT,
  ERROR_DOES_NOT_EXIST,
  ERROR_INVALID_DATA,
} = require("../utils/errors");

module.exports.getClothing = (req, res) => {
  Item.find({})
    .orFail(() => {
      throw ERROR_DEFAULT;
    })
    .then((items) => res.send(items))
    .catch((err) =>
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      )
    );
};

module.exports.removeClothing = (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .orFail(() => {
      throw ERROR_DOES_NOT_EXIST;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) =>
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      )
    );
};

module.exports.addClothing = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user.id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
    .catch((err) =>
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      )
    );
};

module.exports.likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user.id } },
    { new: true }
  )
    .orFail(() => {
      throw ERROR_INVALID_DATA;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) =>
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      )
    );
};

module.exports.dislikeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user.id } },
    { new: true }
  )
    .orFail(() => {
      throw ERROR_INVALID_DATA;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) =>
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      )
    );
};
