const express = require("express");
const mongoose = require("mongoose");
const { MOUNGO_USERNAME, MOUNGO_PASS, MOUNGO_HOST, MOUNGO_PORT } = require("./config/config");
const app = express();
const postRouter = require('./routes/route');


const port = process.env.PORT || 3000;
const connectRepeatly = () => {
  const mongoURL = `mongodb://${MOUNGO_USERNAME}:${MOUNGO_PASS}@${MOUNGO_HOST}:${MOUNGO_PORT}/?authSource=admin`
  console.log(mongoURL)
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("succesfully connected to database");
    })
    .catch((err) => {
      console.log(err);
      setTimeout(connectRepeatly, 5000);
    });
}

connectRepeatly();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h3>Hello Yourself!!!</h3>");
});

app.use('/api/v1/posts', postRouter)

app.listen(port, () => {
  console.log("The server has been running on port 3000");
});
