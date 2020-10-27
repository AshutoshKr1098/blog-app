const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    blogTitle:{
        type:String,
        required:[true,'Please give a name to your title']
    },
    blogSnippet:{
        type:String,
        required:[true,'Please give a snippet']
    },
    blogBody:{
        type:String,
        required:[true,'body cannot be empty']        
    }
});

const Blog = mongoose.model('blog',blogSchema);
module.exports=Blog;