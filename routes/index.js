const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const {
  ERROR_DOES_NOT_EXIST,
  DOES_NOT_EXIST_CODE,
} = require("../utils/errors");

router.use("/items", clothingItem);

router.use("/users", user);

router.use((req, res) => {
  err = ERROR_DOES_NOT_EXIST;
  res.status(DOES_NOT_EXIST_CODE).send({
    message: `Error ${err.name} with the message ${err.message} has occurred while executing the code`,
  });
  throw ERROR_DOES_NOT_EXIST;
});

module.exports = router;
