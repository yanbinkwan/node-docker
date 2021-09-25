const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs')

exports.signup = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const hashedPwd = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
      username,
      password: hashedPwd
    });
    req.session.user = user;
    res.status(201).json({
      status: "success",
      data: {
        user
      }
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "fail",
      message: e
    })
  }
}

exports.signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(404).json({
        status: "faild",
        message: "This user not exist."
      })
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: "success",
      })
    } else {
      re.status(404).json({
        status: "faild",
        message: "This username or password is not correct."
      })
    }

  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "fail",
      message: e
    })
  }
}