const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();
const {allowAuth} = require('../middleware/authMiddleware');

router.get('/all-blogs',blogController.getBlogs);
router.get('/users/blogs-create',allowAuth,blogController.getCreateBlogs);
router.post('/users/blogs-create',allowAuth,blogController.postCreateBlogs);
router.post('/users/blog-delete',allowAuth,blogController.postDeleteBlog);
module.exports=router;