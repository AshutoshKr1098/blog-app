const Blog = require('../models/Blog');

module.exports.getBlogs= async (req,res)=>{
    const allBlogs = await Blog.find();
    try{
        res.render('blogs',{title:'All Blogs',blogs:allBlogs});                
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getCreateBlogs= (req,res)=>{
    res.render('blogCreate',{title:'Create your blog'});
}

module.exports.postCreateBlogs = (req,res)=>{
    const {blogTitle,blogSnippet,blogBody}= req.body;
    console.log('request body',blogTitle,blogSnippet,blogBody);  

    //saving blog to our database
    const blog = new Blog({blogTitle,blogSnippet,blogBody});
    blog.save()
    .then(result=>{
        console.log('database save result',result);
        res.redirect('/blogs/all-blogs');
        
    })
    .catch(err=>{
        console.log('database save error',err);
        res.status(400).json(err);
    });

};

module.exports.postDeleteBlog = (req,res)=>{
    console.log('now we will delete blogs');
    const id = req.body.blogId;
    Blog.findByIdAndRemove(id)
    .then(()=>{
        res.redirect('/blogs/all-blogs');
    })
    .catch(err=>console.log(err));
}