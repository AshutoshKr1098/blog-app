const Blog = require('../models/Blog');

module.exports.getBlogs= (req,res)=>{
    res.render('blogs');
}

module.exports.getCreateBlogs= (req,res)=>{
    res.render('blogCreate');
}

module.exports.postCreateBlogs = (req,res)=>{
    const {blogTtle,blogSnippet,blogBody}= req.body;
    console.log(blogTitle,blogSnippet,blogBody);  
};