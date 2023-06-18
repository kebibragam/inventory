const mongoose = require("mongoose");

const SingleOrderItemSchema = mongoose.Schema({
  name: { type: String, required: true },

  sellingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productID: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: [true, "Please provide product"],
  },
});

const OrderSchema = new mongoose.Schema(
  {
    orderItems: [SingleOrderItemSchema],
    customerID: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please provide customer"],
    },
    customerName: {
      type: String,
      required: [true, "please provide customer name"],
    },
    total: {
      type: Number,
      required: true,
    },

    profitAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
