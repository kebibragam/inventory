const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
    maxlength: 50,
  },
  address: {
    type: String,
    required: [true, "Please provide product price"],
  },
  contact: {
    type: Number,
    required: [true, "Please provide product contact number"],
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
