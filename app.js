const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.json({ msg: "HELLO WORD" });
});

module.exports = app;
