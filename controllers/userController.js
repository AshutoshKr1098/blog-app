const User = require('../models/User');

module.exports.login_get= (req,res)=>{
    res.render('login',{title:'Login'});
}

module.exports.login_post= (req,res)=>{
    
}

module.exports.signup_get= (req,res)=>{
    res.render('signup',{title:'Signup'});
}

module.exports.signup_post= (req,res)=>{
    
}

