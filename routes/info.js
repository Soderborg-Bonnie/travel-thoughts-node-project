const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createError = require('http-errors');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');
const app = express();

// thought model
const Thoughts = require('../models/Thoughts');

// router.get('/viewThoughtsList', (req, res) => res.render('viewThoughtsList', { name: req.body.name}));

// new info form
router.get('/additions', (req, res) => res.render('additions'));

// view saved info
router.get('/viewThoughts', (req, res) => {
  // Thoughts.find({_id: '5d17df1cd8fc2d58305796f2'})
  Thoughts.find()
          .sort({date: -1})
          .then(Thoughts => 
                name = res.json(Thoughts)
                
                )
          .catch(err => res.status(404).json({nothoughtsfound: "No thoughts found. Just tumbleweeds."}));
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
        res.render('savedThoughts', res)
      }});


      module.exports = router;

