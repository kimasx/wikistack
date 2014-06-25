var express = require('express');
var router = express.Router();
var models = require('../models/');

router.get('/:url_name', function(req, res) {
 models.Page.findOne({url_name: req.params.url_name}, function (err, page) {
   res.render('show', { page: page });
 });
});

/* route for deleting page */
router.post('/:url_name/delete', function(req, res) {
  models.Page.findOneAndRemove({url_name: req.params.url_name}, function(err, page){
    res.redirect('/');
  });
});

/* route for editing page */
router.post('/:url_name/edit', function(req, res) {
//  //when button clicked,
//   models.Page.findOneAndUpdate({url_name: req.params.url_name}, function (err, page) {
//    res.render('add_page', { page: page });
//  });
// });

module.exports = router;