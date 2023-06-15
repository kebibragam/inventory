const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
    maxlength: 50,
  },
  image: {
    type: String,
    default: "../img/product.jpg",
  },
  purchasePrice: {
    type: Number,
    required: [true, "Please provide product purchase price"],
  },
  sellingPrice: {
    type: Number,
    required: [true, "Please provide product selling price"],
  },
  profit: {
    type: Number,
    required: [true, "Please provide profit"],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  soldQuantity: {
    type: Number,
    default: 0,
  },
});

ProductSchema.pre("save", (next) => {
  if (this.isModified && !this.role === "manager") {
    return next(new Error("Only Manager can edit products"));
  }
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
