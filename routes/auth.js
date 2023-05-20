const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  register,
  login,
  logout,
  isAuthenticated,
} = require("../controllers/auth");

router.post(
  "/register",
  [authenticateUser, authorizePermissions("manager")],
  register
);

router.post("/login", login);
router.get("/logout", logout);
router.get("/isAuthenticated", isAuthenticated);

module.exports = router;
