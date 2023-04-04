const router = require("express").Router();
const User = require("../models/user");
const { getUsers, findUser, createUser } = require("../controllers/user");

router.get("/", getUsers);

router.get("/:userId", findUser);

router.post("/", createUser);

router.use("/", (data) => {
  if (!data) {
    res.status(404).send({ message: "Requested resources not found" });
  }
});

module.exports = router;
