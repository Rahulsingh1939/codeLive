var express = require('express');
var router = express.Router();

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
  .post(function(req,res,next){
    req.checkBody('name','Invalid Name').notEmpty();
    req.checkBody('email','Invalid Email').isEmail();
    req.checkBody('message','Empty Mesaage').notEmpty();
    var errors=req.validationErrors();
    

    res.render('thank',{ title : 'CodeLive - a Collaborative Coding platform.'})
  });
  
module.exports = router;
