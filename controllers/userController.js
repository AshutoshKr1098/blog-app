const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleError= (err)=>{
    const errors = {username:'',email:'',password:''};
    console.log(err);
    if(err.name=='login error')
    {
        errors.email=err.email;
        errors.password= err.password;
        return errors;
    }
    if(err.code===11000){
        errors.email='This email is already registered';
        return errors;
    }
    if(err.message.includes('user validation failed')){
        // console.log(Object.values(err.errors)); //This returns to us an array of errors, we can cycle it
        Object.values(err.errors).forEach(({properties})=>{
            //console.log(properties.message,properties.path);
            errors[properties.path]=properties.message;
        });
    }
    return errors;
}
const createToken = (id)=> {
    return jwt.sign({id},'This is a secret key',{
        expiresIn: 3*24*60*60
    });
};

module.exports.login_get= (req,res)=>{
    res.render('login',{title:'Login'});    
}

module.exports.login_post= async (req,res)=>{
    const {email,password}=req.body;
     //first we need to see if this email exists or not in database
     try{
        const user = await User.login(email,password);
        console.log(user);
        //now add jwt token and send it
        const token = createToken(user._id);
        res.cookie('jwt',token,{maxAge:3*24*60*60*1000});
        res.status(200).json({user});        
    }
    catch(err){
        const loginError = handleError(err);
        console.log(err);
        res.status(400).json({error:loginError});
    }     
}

module.exports.signup_get= (req,res)=>{
    res.render('signup',{title:'Signup'});
}

module.exports.signup_post= async (req,res)=>{
    const {username,email,password}= req.body;
    try{
        const user= await User.create({username,email,password});
        console.log(user);
        res.status(201).json({user});

    }
    catch(err){
        console.log(err);
        const errors = handleError(err);
        res.status(400).json({error:errors});
    }
}

