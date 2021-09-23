const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: [true, 'username is required']
  },
  password: {
    type: String,
    require: [true, 'password is required']
  }
});

const user = mongoose.model('User', userSchema);

module.exports = user;