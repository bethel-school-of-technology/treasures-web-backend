console.log("Loaded blogs.js")

var express = require('express');
var router = express.Router();
const blogTemplate = require('../models/blogs');


router.post('/', function(req, res, next) {
  // res.send('POST to / in blogs working')
  console.log('Doing a POST to /blogs')
  const newBlog = new blogTemplate({
    title:req.body.title,
    description:req.body.description,
    mainBody:req.body.mainBody,
    date:req.body.date
  })
  newBlog.save()
  .then(data =>{res.json(data)})
  .catch(error =>{res.json(error)})
});

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('GET / in blogs working')
});

router.put('/', function(req, res, next) {
  res.send('PUT / in blogs working')
});

router.delete('/', function(req, res, next) {
  res.send('DELETE / in blogs working')
});

router.get('/tom', function(req, res, next) {
  res.send('GET /tom in blogs working')
});


module.exports = router;
