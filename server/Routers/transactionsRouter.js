const express = require("express");
const router = express.Router();
const transactionsController = require("./../Controllers/transactionsController");

router
  .route("/")
  .post(transactionsController.makeTransaction)
  .get(transactionsController.getAllTransactions);

module.exports = router;
