const router = require("express").Router();
const {
  getClothing,
  removeClothing,
  addClothing,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

router.get("/", getClothing);

router.delete("/:itemId", removeClothing, auth);

//router.post("/", addClothing, auth);

router.put("/:itemId/likes", likeItem, auth);

router.delete("/:itemId/likes", dislikeItem, auth);

module.exports = router;
