var express = require('express');
var router = express.Router();

router.get('/createTask', async function(req, res) {
  try {
    var newTask = new Task();
    var data = await newTask.save();
    res.redirect('/task/' + data._id);
  } catch (err) {
    console.log(err);
    res.render('error');
  }
});


router.get('/task/:id', async function(req, res) {
  try {
    const data = await Task.findOne({_id: req.params.id}).exec();
    if (data) {
      res.render('task', {data: data,roomId: data.id});
    } else {
      res.render('error');
    }
  } catch (err) {
    console.log(err);
    res.render('error');
  }
});


module.exports = router;
