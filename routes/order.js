const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authentication");

const {
  getAllOrders,
  getSingleOrder,
  createOrder,
} = require("../controllers/order");

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, getAllOrders);

router.route("/:id").get(authenticateUser, getSingleOrder);

module.exports = router;
