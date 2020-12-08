console.log("Loaded index.js");
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to Treasures - homepage.  GET on / in index working - modified again')
  // res.render('index', { title: 'Express' });
});

module.exports = router;
