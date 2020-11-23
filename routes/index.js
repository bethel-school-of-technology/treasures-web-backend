console.log("Loaded index.js");
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to Treasures - homepage.  GET on / in index working')
  // res.render('index', { title: 'Express' });
});

router.get('/peter', function(req, res, next) {
  res.send('GET on /peter in index working')
});

module.exports = router;
