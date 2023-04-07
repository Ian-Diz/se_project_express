const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const { ERROR_DOES_NOT_EXIST } = require("../utils/errors");

router.use("/items", clothingItem);

router.use("/users", user);

router.use((req, res) => {
  if (!req.body) {
    err = ERROR_DOES_NOT_EXIST;

    res.status(404).send({
      message: `Error ${err.name} with the message ${err.message} has occurred while executing the code`,
    });
    throw ERROR_DOES_NOT_EXIST;
  }
});

module.exports = router;
