const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);
module.exports = router;
