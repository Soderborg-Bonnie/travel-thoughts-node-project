const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');
const createError = require('http-errors');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

// user model
const User = require('../models/Users');
// const { forwardAuthenticated } = require('../config/auth');

// thought model
const Thoughts = require('../models/Thoughts');

// Login page
router.get('/login', (req, res) => res.render('login'));

// Register page
router.get('/register', (req, res) => res.render('register'));

// Register handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    // fields can't be empty
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        // user  already exists
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        // create new user
        const newUser = new User({
          name,
          email,
          password
        });
        // encrypt password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // set password to hash
            newUser.password = hash;
            // save user
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You made it in! Please log in with your credentials'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});  

// login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// logout handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

// new info form
router.get('/additions', (req, res) => res.render('additions'));

  // view info
// router.get('/savedThoughts', (req, res) => res.render('savedThoughts', res));
// db.thoughts.find()
// db.thoughts.find({name: "Tuacahn"})
// router.get('/savedThoughts', (req, res) => res.render('savedThoughts', {name: req.name}));
// router.get('/savedThoughts', (req, res) => res.render('savedThoughts', {db.thoughts.find({name: "Tuacahn"})}));

router.get('/viewThoughts', (req, res) => {
  // Thoughts.find({_id: '5d17df1cd8fc2d58305796f2'})
  Thoughts.find()
         
          .sort({date: -1})
          .then(Thoughts => res.json(Thoughts))
          // .then(Thoughts => res.json.stringify(Thoughts, null, 2))
          // console.log(Thoughts.date)
          .catch(err => res.status(404).json({nothoughtsfound: "No thoughts found. Just tumbleweeds."}));
          // res.render('viewThoughtsList', res)
});


// new info handle
router.post('/saveForm', (req, res) => {
  const { name, date, description, myThoughts, locationGPS, locationCity, locationState, locationCountry, pass, cost, rating } = req.body;
  let errors = [];

  if (!name ) {
    // fields can't be empty
    errors.push({ msg: 'Please at least fill in the name' });
  }else{

        // create new thought
        const newThoughts = new Thoughts({
          name,
          date,
          description,
          myThoughts,
          locationGPS,
          locationCity,
          locationState,
          locationCountry,
          pass,
          cost,
          rating
        });
        newThoughts.save()
        // newThoughts.then(thoughts => {
          // res.redirect('/users/savedThoughts')
          // res.redirect('/savedThoughts')
//         router.get('savedThoughts', (req, res) => {
//           Thoughts.find()
//             .sort({date: -1})
//             .then(Thoughts => res.json(Thoughts))
//             console.log('THOUGHTS: ', Thoughts)
//             .catch(err => res.status(404).json({nothoughtsfound: "No thoughts found. Just tumbleweeds."}));
// });
        // })
        res.render('savedThoughts', res)
      }});


module.exports = router;
