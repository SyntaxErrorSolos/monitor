//  <<--- DotENV --->>
require("dotenv").config();

//  <<--- Express Server --->>
const express = require("express");
const app = express();
const cors = require("cors");
app.listen(5000);
app.use(cors());
console.log("App started");

//  <<--- Mongo DB --->>
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO;
const artSchema = require("./schema");
mongoose.connect(mongoDB, {}).then(() => {
  console.log("Connected to MongoDB");
});

//  <<--- Art fetch --->>
app.get("/fetch-art", (req, res) => {
  res.json({ yoo: "wassup homie" });
});
