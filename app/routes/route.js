const express = require('express');

const postControler = require('../controllers/postControler');
const protect = require('../../middleware/protectMiddleware')

const router = express.Router();

router.route('/')
  .get(postControler.getAllPost)
  .post(protect,postControler.createPost);

router.route('/:id')
  .get(protect, postControler.getOnePost)
  .patch(protect, postControler.updatePost)
  .delete(protect, postControler.deletePost);

module.exports = router;