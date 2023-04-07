const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/wtwr_db");

const { PORT = 3001 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "642c79790442cd993928c3ba",
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
