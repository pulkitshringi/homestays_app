// controllers/user.js
const User = require('../models/user');

module.exports.signup = (req,res)=>{
    res.render('users/signup');
}
module.exports.signupPOST = async (req,res,next)=>{
    try{
    const {email,username,password} = req.body;
    const user = new User({email,username});
    const registeredUser = await User.register(user,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash('success','Welcome to Wanderlust');
        res.redirect('/listings');
    });
    } catch(e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }
}
module.exports.login = (req,res)=>{
    res.render('users/login');
}
module.exports.loginPOST = async (req,res)=>{
    req.flash('success','Welcome back :)');
    const redirectUrl = res.locals.redirect || '/listings';
    console.log(redirectUrl);
    res.redirect(redirectUrl);
}
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
     if(err){
         return next(err);
     }
     req.flash('success','You have successfully logged out');
     res.redirect('/listings');
    })
 }