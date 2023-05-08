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
  .post(async function(req,res,next){
    await body('name').notEmpty().withMessage('Invalid Name').run(req),
    await body('email').isEmail().withMessage('Invalid Email').run(req),
    await body('password').notEmpty().withMessage('Empty Password').run(req),
    await body('password').notEmpty().equals(req.body.confirmPassword).withMessage('Password Do not match').run(req)
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register', {
            title: 'Register - CodeLive',
            name: req.body.name,
            email: req.body.email,
            errorMessages: errors.array()
        });
        }else{
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.setPassword(req.body.password);
            user.save(function(err){
                if(err){
                    res.render('register', { title: 'Register - CodeLive', errorMessages: err });
                } else{
                    res.redirect('/login');
                }
            });
        }
        });