const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/all-blogs',blogController.getBlogs);
router.get('/users/blogs-create',blogController.getCreateBlogs);
router.post('/users/blogs-create',blogController.postCreateBlogs);
router.post('/users/blog-delete',blogController.postDeleteBlog);
module.exports=router;