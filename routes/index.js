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
module.exports = router;
