const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    username:{
        type:String,
        required:[true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'password field must not be empty'],
        minlength:[8,'length should be greater than 8']
    }
})
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    next();
});
userSchema.statics.login = async function(email,password){
    
    const user = await this.findOne({email});
    // console.log('user found is ',user);
    // const found = await bcrypt.compare(password,user.password);
    // console.log('password matched? ',found);

    //trying something on my own
    const errors= {name:'login error',email:'',password:''};
    
    if(user){
        //console.log('inside the check function');
        if(await bcrypt.compare(password,user.password))
        {
            //console.log('thrown user');
            return user;
        }
        else 
        {
            //console.log('thrown error');
            errors.password='password does not match';
            //throw Error('password does not match');        
        }
    }
    else 
    {
        //console.log('thrown incorrect email');
        errors.email='email is incorrect';
        //throw Error('email is incorrect');    
    }
    throw errors;
}
const User = mongoose.model('user',userSchema);
module.exports=User;