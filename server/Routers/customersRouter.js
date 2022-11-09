const express = require("express");
const customersController = require("./../Controllers/customersController");

const router = express.Router();

router
  .route("/")
  .get(customersController.getAllCustomers)
  .post(customersController.addAccNumber, customersController.createCustomer);

router
  .route("/:id")
  .get(customersController.getCustomer)
  .patch(customersController.updateCustomer);

module.exports = router;
