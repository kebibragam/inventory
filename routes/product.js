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
  updateProductQuantity,
  deleteProduct,
} = require("../controllers/product");

router
  .route("/")
  .get(authenticateUser, getAllProducts)
  .post([authenticateUser, authorizePermissions("manager")], createProduct);
router
  .route("/:id")
  .get(getProduct, authenticateUser)
  .patch([authenticateUser, authorizePermissions("manager")], updateProduct)
  .delete([authenticateUser, authorizePermissions("manager")], deleteProduct);
router
  .route("/quantity/:id")
  .patch(
    [authenticateUser, authorizePermissions("manager")],
    updateProductQuantity
  );
module.exports = router;
