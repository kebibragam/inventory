const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const { register, login } = require("../controllers/auth");

router.post(
  "/register",
  [authenticateUser, authorizePermissions("manager")],
  register
);
router.post("/login", login);

module.exports = router;
