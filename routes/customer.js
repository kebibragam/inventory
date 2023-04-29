const router = require("express").Router();

const {
  createCustomer,
  getAllCustomers,
  getSingleCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer");

router.route("/").get(getAllCustomers).post(createCustomer);
router
  .route("/:id")
  .get(getSingleCustomers)
  .patch(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
