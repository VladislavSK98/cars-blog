const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', postController.getAllPosts);
router.post('/', auth(), postController.createPost);
router.get('/:id', postController.getPostById);
router.post('/:postId/comments', auth(), postController.addComment);
router.get('/:postId/comments', postController.getComments);
router.get('/api/posts/:id', postController.getPost);



module.exports = router