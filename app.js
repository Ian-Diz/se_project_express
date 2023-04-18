const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const cors = require("cors");
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/wtwr_db");

const { PORT = 3001 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
