const router = require("express").Router();
const Clothing = require("../models/clothingItem");
const {
  getClothing,
  removeClothing,
  addClothing,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothing);

router.delete("/:itemId", removeClothing);

router.post("/", addClothing);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

router.use("/", (data) => {
  if (!data) {
    res.status(404).send({ message: "Requested resources not found" });
  }
});

module.exports = router;
