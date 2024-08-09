// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const {loginRedirect} = require('../middleware');
const userController = require('../controllers/user');

router.route('/signup')
.get(userController.signup)
.post(wrapAsync(userController.signupPOST));

router.route('/login')
.get(userController.login)
.post(loginRedirect,passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),wrapAsync(userController.loginPOST));


router.get('/logout',userController.logout);

module.exports = router;