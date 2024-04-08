const express = require('express');
const isAuth = require('../middleware/is-Auth');
const router = express.Router();

const postController = require('../controller/post');

router.post('/create-post',isAuth,postController.createPost)

router.get('/posts',isAuth,postController.getPosts)

module.exports = router;