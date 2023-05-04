const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const { register, login, logout } = require("../controllers/auth");

router.post(
  "/register",
  [authenticateUser, authorizePermissions("manager")],
  register
);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
