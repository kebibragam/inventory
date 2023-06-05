const express = require("express");
const router = express.Router();

const {
  getLowQuantityProducts,
  getMostSoldProducts,
} = require("../controllers/stats");

router.get("/lowstock", getLowQuantityProducts);
router.get("/mostsold", getMostSoldProducts);

module.exports = router;
