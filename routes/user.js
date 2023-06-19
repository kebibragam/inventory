const router = require("express").Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updatePassword,
} = require("../controllers/user");

router
  .route("/")
  .get([authenticateUser, authorizePermissions("manager")], getAllUsers);
router
  .route("/:id")
  .get(authenticateUser, getSingleUser)
  .patch([authenticateUser, authorizePermissions("manager")], updateUser)
  .delete([authenticateUser, authorizePermissions("manager")], deleteUser);
router.route("/changepassword/:id").patch(authenticateUser, updatePassword);
module.exports = router;
