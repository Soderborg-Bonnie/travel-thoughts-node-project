const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createError = require('http-errors');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// thought model
const Thoughts = require('../models/Thoughts');

router.use(logRequest) 

router.get('/viewThoughtsList', (req, res) => res.render('viewThoughtsList', { name: req.body.name}));

// new info form
// router.get('/additions', (req, res) => res.render('additions'));
// router.get('/additions', (req, res, next) => res.send('<h1>trying to replace div for adding new thoughts</div>'));
// router.get('/additions', (req, res) => {
//   document.getElementById(newThoughtsPage).style.visibility = "visible"});
// router.get('/additions', (req, res) => 
//     // res.setHeader('Content-Type', 'application/json');
//     res.json({ a: 1 }));



// view saved info
router.get('/viewThoughts', (req, res) => {
  // Thoughts.find({_id: '5d17df1cd8fc2d58305796f2'})
  
  const arrX ='{'+
'  "draw": 1,'+
'  "length": 2,'+
'  "recordsTotal": 2,'+
'  "recordsFiltered": 2,'+
'  "dataX": ['+
'    ['+
'      "Airi",'+
'      "Satou",'+
'      "Accountant",'+
'      "Tokyo"'+
'    ],'+
'    ['+
'      "Angelica",'+
'      "Ramos",'+
'      "Chief Executive Officer (CEO)",'+
'      "London"'+
'    ]'+
'  ]'+
'}';

// let strBuilder='';
// result.rows.forEach((v) => {
//   if (strBuilder!='') {
//     strBuilder=strBuilder+',';}
//     strBuilder=strBuilder+'["'+v['name']+'","'+v['description']+'","'+v['myThoughts']+'", "'+v['rating']+'"]';
// // DEBUG ONLY -- console.log(strBuilder);
// });
// let data = {
// "data": strBuilder,
// "length": result.rows.length
//             }

  //  var sjson =
  //          '{' +
  //          '"draw": 1,' +
  //          '"recordsTotal": ' + result.length + ',' +
  //          '"recordsFiltered": ' + result.length + ',' +
  //          '"custcolumns": ["Name", "Date", "Description", "Thoughts""],' +
  //          '"dataf": [' + result.data + ']' +
  //          '}';
  //          res.setHeader('Content-Type', 'application/json');
  //          res.end(sjson);


  // Thoughts.find()
  Thoughts.find()
          .sort({date: -1})
          .then(Thoughts => {
                // res.send(Thoughts)
                
                // )
                
          res.setHeader('Content-Type', 'application/json')
          //has added [] around everything, dataTables error 1, res.send is the same
          res.json(Thoughts)

        // res.end("{draw:1, length:7, recordsTotal:7, recordsFiltered: 7, dataX:" + "["+JSON.stringify(Thoughts)+"]" + "}")
        // not correct format, get dataTable error 1, has \n added everywhere
        // res.end(JSON.stringify("{draw:1, length:7, recordsTotal:7, recordsFiltered: 7, dataX:" + Thoughts + "}"))

        // not correct format, get dataTable error 1 but looks better than the one above
        // res.end("draw:1, length:7, recordsTotal:7, recordsFiltered: 7, dataX:" + JSON.stringify(Thoughts))

        // not correct format, get dataTable error 1 
      //  res.end("{draw:1, length:2, recordsTotal:2, recordsFiltered: 2, dataX:" + "[[a,b,c,d],[a,b,c,d]]" + "}")

      // complains nothing found
      //  res.end("{draw:1, length:2, recordsTotal:2, recordsFiltered: 2, dataX:" + result.data + "}")

        // name = res.end(sjson)
      // complains nothing found
          // sjson = '{' +
          //  '"draw": 1,' +
          //  '"length": ' + result.rows.length + ',' +
          //  '"recordsTotal": ' + result.length + ',' +
          //  '"recordsFiltered": ' + result.length + ',' +
          //  '"custcolumns": ["name", "date", "description", "myThoughts"],' +
          //  '"dataX": [' + result.data + ']' +
          //  '}';

//gets stuck processing on site, no error, data shows though
          //           sjson = '{' +
          //  '"draw": 1,' +
          //  '"length": ' + 6 + ',' +
          //  '"recordsTotal": ' + 6 + ',' +
          //  '"recordsFiltered": ' + 6 + ',' +
          //  '"custcolumns": ["name", "date", "description", "myThoughts"],' +
          //  '"dataX": [' + Thoughts + ']' +
          //  '}';

//nothing found for data, page gets DT error 7
// let strBuilder='';
// result.rows.forEach((v) => {
//   if (strBuilder!='') {
//     strBuilder=strBuilder+',';}
//     strBuilder=strBuilder+'["'+v['name']+'","'+v['description']+'","'+v['myThoughts']+'", "'+v['rating']+'"]';
// // DEBUG ONLY -- console.log(strBuilder);
// });
// let data = {
// "data": strBuilder,
// "length": result.rows.length
//             }

          //  res.setHeader('Content-Type', 'application/json')
          //  res.end(sjson) 
          // res.end(arrX)
      
          })   
// name = res.json(Thoughts)
 
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
function logRequest(request, res, next)
{
    // DEBUG ONLY -- console.log('LOG: Time:', Date.now())
    console.log("LOG: Received a "+ request.method +" request for: " + request.url);


    next()
}


      module.exports = router;

