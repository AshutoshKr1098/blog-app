const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to database locally

mongoose.connect('mongodb://localhost/blogSite',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(4000,()=>console.log('connected to database...')))
.catch(err=>console.log(err));

//middlewares
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//testing the app

app.get('/',(req,res)=>{
    res.render('home',{title:'Home'});
});

app.get('/blogs',(req,res)=>{
    res.render('blogs',{title:'Blogs'})
});
app.get('/users/blogs-create',(req,res)=>{
    res.render('blogCreate',{title:'Create your blog'})
});
// 404 page
app.use((req,res)=>res.status(404).render('404'));