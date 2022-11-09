const Customer = require("./../Models/customersModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllCustomers = async (req, res) => {
  try {
    const features = new APIFeatures(Customer.find(), req.query)
      .filter()
      .sort();
    const customers = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        customers
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        customer
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.addAccNumber = (req, res, next) => {
  const min = 100000;
  const max = 1000000;
  req.body.forEach((el) => {
    el.accountNumber = Math.floor(Math.random() * (max - min) + min);
  });
  // console.log(req.body);
  next();
};

exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newCustomer
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: "success",
      data: {
        customer
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
