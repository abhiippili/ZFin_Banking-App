const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  fromCustomer: {
    type: Number,
    required: [true, "A transaction must have a from account number"]
  },
  toCustomer: {
    type: Number,
    required: [true, "A transaction must have a to account number"]
  },
  amount: {
    type: Number
  },
  timeOfTransaction: {
    type: String,
    default: Date,
    format: "YYYY-MM-DD"
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
