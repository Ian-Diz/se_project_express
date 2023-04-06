const router = require("express").Router();
const { getUsers, findUser, createUser } = require("../controllers/user");

router.get("/", getUsers);

router.get("/:userId", findUser);

router.post("/", createUser);

router.use("/", (req, res) => {
  if (!req.body) {
    res.status(404).send({ message: "Requested resources not found" });
  }
});

module.exports = router;
