var express = require('express');
var router = express.Router();
var models = require('../models/');

/* route for showing a particular page */
router.get('/:url_name/:id', function(req, res) {
  models.Page.findOne({url_name: req.params.url_name}, function (err, page) {
      res.render('show', {page: page});
  });
});

/* route for deleting page */
router.post('/:url_name/:id/delete', function(req, res) {
  models.Page.findOneAndRemove({url_name: req.params.url_name}, function(err, page){
    res.redirect('/');
  });
});

/* route for editing page */
router.get('/:url_name/:id/edit', function(req, res) {
  models.Page.findOne({url_name: req.params.url_name}, function (err, page) {
    res.render('edit_page', { page: page });
  });
});


/* POST route for submitting edited page */
router.post('/:url_name/:id/edit/submit', function(req, res) {
  models.Page.findOneAndUpdate({url_name: req.params.url_name}, {body: req.body.body}, function(err, page) {
      res.redirect('../');
  });
});

module.exports = router;