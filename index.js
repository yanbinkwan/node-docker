const express = require("express");
const mongoose = require("mongoose");
const { MOUNGO_USERNAME, MOUNGO_PASS, MOUNGO_HOST, MOUNGO_PORT } = require("./config/config");

const app = express();
const port = process.env.PORT || 3000;

const mongoURL = `mongodb://${MOUNGO_USERNAME}:${MOUNGO_PASS}@${MOUNGO_HOST}}:${MOUNGO_PORT}/?authSource=admin`
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("succesfully connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("The server has been running on port 3000");
});

app.get("/", (req, res) => {
  res.send("<h3>Hello Yourself!!!</h3>");
});
