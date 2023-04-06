const router = require("express").Router();
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

router.use("/", (req, res) => {
  if (!req.body) {
    res.status(404).send({ message: "Requested resources not found" });
  }
});

module.exports = router;
