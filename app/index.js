const express = require("express");
const mongoose = require("mongoose");
const redis = require('redis');
const session = require('express-session');
const cors = require('cors');
const { MOUNGO_USERNAME, MOUNGO_PASS, MOUNGO_HOST, MOUNGO_PORT, SESSION_SECRET, REDIS_HOST, REDIS_PORT } = require("../config/config");

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
  port: REDIS_PORT,
  host: REDIS_HOST
})

const app = express();
app.use(cors({}));

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

app.enable('trust proxy');
app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore({ client: redisClient }),
  
  cookie: {
    httpOnly: true,
    saveUninitialized: false,
    resave: false,
    secure: false,
    maxAge: 10000
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
