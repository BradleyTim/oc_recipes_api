const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const recipes = require("./routes/recipes");

mongoose
  .connect(
    'mongodb://recipe:recipe1234@ds139869.mlab.com:39869/meowers',
  { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connected successfully");
  })
  .catch(error => {
    console.log("There was an error");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/recipes", recipes);

app.use("/", (req, res, next) => {
  res.status(200).send('<h1 style="text-align: center">RECIPE API</h1>');
  next();
});

module.exports = app;
