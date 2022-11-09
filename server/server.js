const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 5000;

const conString = process.env.DB_STRING.replace(
  "<PASSWORD>",
  process.env.DB_PASS
);

mongoose
  .connect(conString, {
    useUnifiedTopology: true
  })
  .then((con) => {
    console.log("connected to the database");
  });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
