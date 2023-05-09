const Item = require("../models/clothingItem");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const BadRequestError = require("../errors/BadRequestError");

module.exports.getClothing = (req, res, next) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch(next);
};

module.exports.removeClothing = (req, res, next) => {
  const owner = req.user._id;

  Item.findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Item with this ID does not exist");
    })
    .then((item) => {
      if (String(item.owner) !== owner) {
        return Promise.reject(
          new ForbiddenError(
            "You do not have permission to delete this resource"
          )
        );
      }

      return item.deleteOne().then(() => res.send({ data: item }));
    })
    .catch(next);
};

module.exports.addClothing = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return Promise.reject(new BadRequestError("Data provided is invalid"));
      } else {
        next(err);
      }
    });
};

module.exports.likeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item with this ID does not exist");
    })
    .then((item) => res.send({ data: item }))
    .catch(next);
};

module.exports.dislikeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item with this ID does not exist");
    })
    .then((item) => res.send({ data: item }))
    .catch(next);
};
