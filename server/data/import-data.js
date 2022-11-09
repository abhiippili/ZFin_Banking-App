const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Customer = require("./../Models/customersModel");
const Transaction = require("./../Models/transactionsModel");

const dbString = process.env.DB_STRING.replace(
  "<PASSWORD>",
  process.env.DB_PASS
);

mongoose.connect(dbString).then((con) => {
  console.log("Connected to the database");
});

// Extracting customers data
const customersData = JSON.parse(
  fs.readFileSync(`${__dirname}/customersData.json`)
);

const importData = async () => {
  try {
    await Customer.create(customersData);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Customer.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
