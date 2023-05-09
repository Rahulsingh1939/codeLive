var express = require('express');
var router = express.Router();
var passport = require('passport');
const { body, validationResult } = require('express-validator');


//Login Page
router.route('/login')
  .get(function(req,res,next){
      res.render('login',{ title : 'Login - CodeLive'})
    })
    .post(passport.authenticate('local', {
      failureRedirect: '/login'
    }), function (req, res) {
      res.redirect('/');
    });
  
  //Register Page
  router.route('/register')
  .get( function(req,res,next){
    res.render('register',{ title : 'Register - CodeLive'})
  })
  .post(async function(req, res, next) {
    try {
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
      } else {
        var user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        user.save().then(() => {
          res.redirect('/login');
      }).catch((err) => {
          res.render('register', { title: 'Register - CodeLive', errorMessages: err });
      });
      
      }
    } catch (err) {
      next(err);
    }
  });

  router.get('/logout', function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}));

router.get('/auth/facebook/callback',passport.authenticate('facebook',{
  successRedirect:'/',
  failureRedirect:'/'
}));

  module.exports = router;