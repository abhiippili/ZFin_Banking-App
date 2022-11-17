const express = require("express");
const customersRouter = require("./Routers/customersRouter");
const transactionsRouter = require("./Routers/transactionsRouter");
const cors = require("cors");

const app = new express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  // console.log("A req has been made");
  next();
});

app.use("/api/customers", customersRouter);
app.use("/api/transactions", transactionsRouter);

module.exports = app;
