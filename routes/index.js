const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./user");

router.use("/items", itemRouter);

router.use("/users".userRouter);

router.use((req, res) => {
  res.status(500).send({ message: "Requested resource not found" });
});
