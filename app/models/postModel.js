const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema({
  title: {
    type: String,
    require: [true, 'title is required']
  },
  body: {
    type: String,
    require: [true, 'body is required']
  }
});


module.exports.PostModel = mongoose.model("Post", post);
