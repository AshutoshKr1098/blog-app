const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to database locally

mongoose.connect('mongodb://localhost/blogSite',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(3000,()=>console.log('connected to database...')))
.catch(err=>console.log(err));

//testing the app

app.get('/',(req,res)=>{
    res.send('We are at homepage');
})

//404 page
app.use((req,res)=>res.status(404).send('404 page not found'));