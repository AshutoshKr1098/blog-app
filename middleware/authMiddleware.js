const jwt = require('jsonwebtoken');

const allowAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'This is a secret key',(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/users/login');
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }   
    else 
    {
        console.log('token not found');
        res.redirect('/users/login');
    }
}

module.exports={allowAuth};