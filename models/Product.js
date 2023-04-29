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
  price: {
    type: Number,
    required: [true, "Please provide product price"],
  },
  quantity: {
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
