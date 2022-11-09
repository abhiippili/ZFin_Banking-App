const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A customer must have a name"],
    trim: true
  },
  accountNumber: {
    type: Number,
    required: [true, "A customer must have a account number"],
    unique: [true, "Account Number must be unique"]
  },
  balance: {
    type: Number,
    default: 0
  }
});

const Customer = mongoose.model("Customer", customersSchema);
module.exports = Customer;
