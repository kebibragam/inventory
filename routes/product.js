const router = require("express").Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router
  .route("/")
  .get(getAllProducts)
  .post([authenticateUser, authorizePermissions("manager")], createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch([authenticateUser, authorizePermissions("manager")], updateProduct)
  .delete([authenticateUser, authorizePermissions("manager")], deleteProduct);

module.exports = router;
