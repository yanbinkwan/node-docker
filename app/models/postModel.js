const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    require: [true, 'title is required']
  },
  body: {
    type: String,
    require: [true, 'body is required']
  }
});

const post = mongoose.model('Post', postSchema);

module.exports = post;
