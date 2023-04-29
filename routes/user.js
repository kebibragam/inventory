const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  updateUser,
} = require("../controllers/user");

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser).patch(updateUser);

module.exports = router;
