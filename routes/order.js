const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getAllOrders,
  getSingleOrder,
  createOrder,
} = require("../controllers/order");

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions("manager"), getAllOrders);

router.route("/:id").get(authenticateUser, getSingleOrder);

module.exports = router;
