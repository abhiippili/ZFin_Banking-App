const Transaction = require("./../Models/transactionsModel");
const APIFeatures = require("./../utils/apiFeatures");
const Customer = require("./../Models/customersModel");

exports.makeTransaction = async (req, res) => {
  try {
    const fromCustomer = await Customer.findOne({
      accountNumber: req.body.fromCustomer
    });
    const toCustomer = await Customer.findOne({
      accountNumber: req.body.toCustomer
    });
    const newFromBalance = fromCustomer.balance - req.body.amount;
    if (newFromBalance < 0) {
      return res.status(400).json({
        status: "fail",
        message: "Insufficient Balance"
      });
    }
    const newFrom = await Customer.findByIdAndUpdate(
      fromCustomer._id,
      { balance: newFromBalance },
      {
        new: true
      }
    );
    const newToBalance = toCustomer.balance + req.body.amount;
    const newTo = await Customer.findByIdAndUpdate(
      toCustomer.id,
      { balance: newToBalance },
      {
        new: true
      }
    );
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        transactionData: newTransaction,
        fromCustomer: newFrom,
        toCustomer: newTo
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const features = new APIFeatures(Transaction.find(), req.query)
      .filter()
      .sort();
    const transactions = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        transactions
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
