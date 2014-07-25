var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET home page. */
//we want this protected so you have to be logged in to visit
//we'll use route middleware to verify this ()
router.get('/', function(){

});

module.exports = router;