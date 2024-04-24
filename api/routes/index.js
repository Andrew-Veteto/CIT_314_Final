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

// Gets the reviews for a park and their user MongoDB
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
          "username": { $arrayElemAt: ["$user.username", 0] }
        }
      } // Project only the review field
    ]).exec();



    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;