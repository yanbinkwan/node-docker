const express = require("express");
const mongoose = require("mongoose");
const redis = require('redis');
const session = require('express-session');
const { MOUNGO_USERNAME, MOUNGO_PASS, MOUNGO_HOST, MOUNGO_PORT, SESSION_SECRIT, REDIS_HOST, REDIS_PORT } = require("../config/config");

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
  port: REDIS_PORT,
  host: REDIS_HOST
})

const app = express();
const postRouter = require('./routes/route');
const authRouter = require('./routes/authRoute')


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

app.use(session({
  store: new RedisStore({ client: redisClient }),
  saveUninitialized: false,
  resave: false,
  secret: SESSION_SECRIT,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 5000
  }
}))

app.get("/", (req, res) => {
  res.send("<h3>Hello Yourself!!!</h3>");
});

app.use('/api/v1/posts', postRouter)
app.use('/api/v1/auth', authRouter)

app.listen(port, () => {
  console.log("The server has been running on port 3000");
});
