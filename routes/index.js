const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const NotFoundError = require("../errors/NotFoundError");
const { login, createUser } = require("../controllers/user");
const auth = require("../middlewares/auth");
const {
  validateUserInfo,
  validateUserLogin,
} = require("../middlewares/validator");

router.use("/items", clothingItem);

router.use("/users", auth, user);

router.post("/signin", validateUserLogin, login);

router.post("/signup", validateUserInfo, createUser);

router.use(() => {
  throw new NotFoundError("This route does not exist");
});

module.exports = router;
