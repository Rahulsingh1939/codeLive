var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

var nodemailer = require('nodemailer');
var congif = require('../config/config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CodeLive - a Collaborative Coding platform.' });
});

//About Page
router.get('/about', function(req,res,next){
  res.render('about',{ title:'CodeLive - a Collaborative Coding platform.'})
})

//Contact Page
router.route('/contact')
  .get(function(req,res,next){
    res.render('contact',{ title : 'CodeLive - a Collaborative Coding platform.'})
  })
  .post(async function (req, res) {
    await body('name').notEmpty().withMessage('Invalid Name').run(req),
    await body('email').isEmail().withMessage('Invalid Email').run(req),
    await body('message').notEmpty().withMessage('Empty Message').run(req)
    var errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.render('contact', {
        title: 'CodeLive - a Collaborative Coding platform.',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors.array()
      });
    } else{
      res.render('thank',{ title : 'CodeLive - a Collaborative Coding platform.'});
    }
      });

  
module.exports = router;
