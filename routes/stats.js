const express = require("express");
const router = express.Router();

const {
  getLowQuantityProducts,
  getMostSoldProducts,
  getSalesAndProfitAmount,
  weeklySalesData,
} = require("../controllers/stats");

router.get("/lowstock", getLowQuantityProducts);
router.get("/mostsold", getMostSoldProducts);
router.get("/salesAndProfit", getSalesAndProfitAmount);
router.get("/weeklySalesData", weeklySalesData);

module.exports = router;
