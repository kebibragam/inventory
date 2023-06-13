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
  number: {
    type: Number,
    unique: true, // Ensure uniqueness of auto-incrementing values
  },
});

CustomerSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const latestCustomer = await this.constructor.findOne(
        {},
        {},
        { sort: { number: -1 } }
      );
      if (latestCustomer && latestCustomer.number) {
        this.number = latestCustomer.number + 1;
      } else {
        this.number = 100;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Customer", CustomerSchema);
