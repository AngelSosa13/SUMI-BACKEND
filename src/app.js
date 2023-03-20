const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const username = "angelsebasthians";
const password = "UQBuOaa5APksrGBU";
const cluster = "notes-cluster";
const dbname = "SUMIDB";

app.use(require("./routes/server"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://angelsebasthians:UQBuOaa5APksrGBU@notes-cluster.1jsioe0.mongodb.net/SUMIDB?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully Mongoose");
});

module.exports = app;
