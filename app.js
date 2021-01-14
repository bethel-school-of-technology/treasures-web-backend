console.log("Loaded app.js");


// Not installed or setup body-parser
// Installed cors but NOT setup


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

// Define the router paths
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogsRouter = require('./routes/blogs');
var contactsRouter = require('./routes/contacts');

var app = express();

//const port = process.env.PORT || 4000;  // this is already done in the bin/www file

// Connect to MongoDB on Atlas
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.DATABASE_ACCESS
console.log(`uri = ${uri}`)
const connectionParams = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };
mongoose.connect(uri, connectionParams)
  .then(() => {
    console.log('Connected to Treasures DB')
  })
  .catch((err) => {
    console.error(`ERROR: Unable to connect to the database. \n${err}`);
  });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors()); // this will alow everyone to connect - needs to be fixed for production
app.use(bodyParser.json());

// Connect url to the router path
app.use('/', indexRouter);
app.use('/blogs', blogsRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(port, () => {
//  console.log(`server running http://localhost:${port}`);
//  console.log(`press CTRL+C to stop server`);
//});

module.exports = app;
