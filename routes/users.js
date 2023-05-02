const router = require("express").Router();
const { getCurrentUser, updateUser, getUsers } = require("../controllers/user");
const { validateIds } = require("../middlewares/validator");

router.get("/", validateIds, getUsers);

router.get("/me", validateIds, getCurrentUser);

router.patch("/me", validateIds, updateUser);

module.exports = router;
