const express = require("express");
const router = express.Router();

const {
  getLowQuantityProducts,
  getMostSoldProducts,
  getExpiryProducts,
  getSalesAndProfitAmount,
  weeklySalesData,
} = require("../controllers/stats");

router.get("/lowstock", getLowQuantityProducts);
router.get("/mostsold", getMostSoldProducts);
router.get("/getExpiryProducts", getExpiryProducts);
router.get("/salesAndProfit", getSalesAndProfitAmount);
router.get("/weeklySalesData", weeklySalesData);

module.exports = router;
