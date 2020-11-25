console.log("Loaded apps.js");


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

var app = express();


// Should this section on the database should be in the blogs routes?
// const url = `mongodb+srv://appUser:Shal0m@treasures.mbm8r.mongodb.net/Treasures?retryWrites=true&w=majority`; // the url replaces the "process.env.DATABASE_ACCESS"
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Connect to MongoDB on Atlas
dotenv.config();
const connectionParams = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };
mongoose.connect(process.env.DATABASE_ACCESS, connectionParams)
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
