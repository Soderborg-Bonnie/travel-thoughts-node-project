const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const PORT = process.env.PORT || 5000;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const infoRouter = require('./routes/info');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const $       = require( 'jquery' );
const app = express();

// thought model
const Thoughts = require('./models/Thoughts');

// controller for db crud
const thoughtController = require('./controllers/thoughtController');

// Passport Config
require('./config/passport')(passport);

// DB config
dotenv.config();
// const url = process.env.Mongo_URI;
const db = process.env.Mongo_URI;
// connect to Mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//EJS layouts
app.use(expressLayouts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Express body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Express session
app.use(
  session({
    secret: 'super',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//routes
// app.use ('/', require('.routes/index'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/info', infoRouter);

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

app
.route("/thoughts")
.get(thoughtController.listAllThoughts)
.post(thoughtController.createNewThought);

app
.route("/thoughts/:thoughtid")
.get(thoughtController.readThought)
// .put(thoughtController.updateThought)
// .delete(thoughtController.deleteThought);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
module.exports = app;
