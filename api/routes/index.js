var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const mySQL = require('mysql2');

require('../models/User');
const User = mongoose.model('user');
require('../models/Review');
const Review = mongoose.model('review');

// Connect to MySQL
const connection = mySQL.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.MY_SQL_PASSWORD,
  database: 'park_info'
});

// connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

/* GET home page. */
router.get('/', async function (req, res) {
  res.send('Hello, World!');
});

// Gets all parks MySQL
router.get('/parks/all', async function (req, res) {
  connection.query('SELECT Park_Name, Address, Park_URL FROM INFO', (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    res.json(results);
  });
})

// Gets parks based on State Abbreviation MyQSL
router.get('/parks/:SA', async function (req, res, next) {
  const State = req.params.SA;
  connection.query(`SELECT Park_Name, Address, Park_URL FROM INFO WHERE State_Abbreviation = '${State}'`, (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    res.json(results);
  });
});

// Gets a park based on Name MySQL
router.get('/park/:name', async function (req, res, next) {
  const Name = req.params.name;
  connection.query(`SELECT * FROM INFO WHERE Park_Name = '${Name}'`, (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    res.json(results);
  })
});

// Gets the reviews for a park and their user MongoDB -- Aggregate
router.get('/reviews/:name', async function (req, res) {
  const Name = req.params.name;
  try {
    const reviews = await Review.aggregate([
      { $match: {park_name: Name}},
      { $unwind: "$reviews" },
      {
        $addFields: {
          "converted_user_id": { $toObjectId: "$reviews.user_id" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "converted_user_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $project: {
          _id: 0,
          review: "$reviews.review",
          "username": { $arrayElemAt: ["$user.username", 0] },
          "review_id": "$reviews._id"
        }
      } // Project only the review field
    ]).exec();



    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Adds a new park MySQL
router.post('/add-park', async function (req, res) {
  console.log(req.body);
  var arc = req.body.arcade == "yes" ? true : false;
  var wp = req.body.water_park == "yes" ? true : false;
  var kp = req.body.kiddie_park == "yes" ? true : false;
  var food = req.body.sell_food == "yes" ? true : false;
  var fc = req.body.family_accommodations == "yes" ? true : false;
  connection.query(`insert into INFO values ("${req.body.park_name}",'${req.body.address}','${req.body.state}','${req.body.link}',${parseInt(req.body.roller_coasters)},${parseInt(req.body.flat_rides)},${parseInt(req.body.water_rides)},${arc},${wp},${kp},${food},${fc})`,
(err, results, fields) => {
  if (err) {
    console.error('Error executing query:', err);
    res.redirect(500);
  }
  res.redirect(`http://localhost:3000/park/${req.body.park_name}`);
})                                  
} );

module.exports = router;