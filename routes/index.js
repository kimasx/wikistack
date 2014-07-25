var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET home page. */
router.get('/', function(req, res) {
  models.Page.find({}, function(err, pages) {
    res.render('index', { docs: pages });
  });
});

//route for logging out
router.get('/logout', function(req, res){
  req.logout(); //this logout function is provided by passport
  res.redirect('/');
})

module.exports = router;