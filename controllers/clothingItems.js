const Item = require("../models/clothingItem");
const { ERROR_DOES_NOT_EXIST, FORBIDDEN_CODE } = require("../utils/errors");

module.exports.getClothing = (req, res) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch(next);
};

module.exports.removeClothing = (req, res) => {
  const owner = req.user._id;

  Item.findById(req.params.itemId)
    .orFail(() => {
      throw ERROR_DOES_NOT_EXIST;
    })
    .then((item) => {
      if (String(item.owner) !== owner) {
        return res.status(FORBIDDEN_CODE).send({
          message: "You do not have permission to delete this resource",
        });
      }

      return item.deleteOne().then(() => res.send({ data: item }));
    })
    .catch(next);
};

module.exports.addClothing = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201);
      res.send({ data: item });
    })
    .catch(next);
};

module.exports.likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw ERROR_DOES_NOT_EXIST;
    })
    .then((item) => res.send({ data: item }))
    .catch(next);
};

module.exports.dislikeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw ERROR_DOES_NOT_EXIST;
    })
    .then((item) => res.send({ data: item }))
    .catch(next);
};
