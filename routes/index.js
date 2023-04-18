const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const { DOES_NOT_EXIST_CODE } = require("../utils/errors");
const { login, createUser } = require("../controllers/user");
const auth = require("../middlewares/auth");

router.use("/items", clothingItem);

router.use("/users", user, auth);

router.post("/signin", login);

router.post("/signup", createUser);

router.use((req, res) => {
  res.status(DOES_NOT_EXIST_CODE).send({
    message: `Route does not exist`,
  });
});

module.exports = router;
