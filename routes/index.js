const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

// thought model



// welcome page
router.get('/', (req, res) => res.render('welcome'));

// dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
  res.render('dashboard', {
    name: req.user.name
  }));

// router.get('/viewThoughtsList', (req, res) => res.render('viewThoughtsList', { name: req.body.name}));

module.exports = router;
