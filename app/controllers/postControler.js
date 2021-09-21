const PostModel = require('../models/postModel');

exports.getAllPost = async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "faild",
      message: e
    })
  }
}

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById({ id: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "faild",
      message: e
    })
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const post = await PostModel.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "faild",
      message: e
    })
  }
}

exports.updatePost = async (req, res, next) => {
  try {
    const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "faild",
      message: e
    })
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: 'success',
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "faild",
      message: e
    })
  }
}