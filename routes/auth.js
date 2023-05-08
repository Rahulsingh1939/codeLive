var express = require('express');
var router = express.Router();
var passport = require('passport');

//Login Page
router.get('/login', function(req,res,next){
    res.render('login',{ title : 'Login - CodeLive'})
  });
  
  //Register Page
  router.route('/register')
  .get( function(req,res,next){
    res.render('register',{ title : 'Register - CodeLive'})
  })
  .post(function(req,res,next){
    
  });