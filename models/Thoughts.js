const mongoose = require('mongoose');

const ThoughtsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String, 
    required: false
  },
  myThoughts: {
    type: String, 
    required: false
  },
  locationGPS: {
    type: Array,
    required: false
  },
  locationCity: {
    type: String, 
    required: false
  },
  locationState: {
    type: String,
    required: false 
  },
  locationCountry: {
    type: String, 
    required: false
  },
  pass: {
    type: String,
    required: false 
  },
  cost: {
    type: String,
    required: false 
  },
  rating: {
    type: Number,
    required: false 
  }
});

const Thoughts = mongoose.model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;