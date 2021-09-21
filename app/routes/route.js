const express = require('express');

const postControler = require('../controllers/postControler');

const router = express.Router();

router.route('/')
  .get(postControler.getAllPost)
  .post(postControler.createPost);

router.route('/:id')
  .get(postControler.getOnePost)
  .patch(postControler.updatePost)
  .delete(postControler.deletePost);

module.exports = router;