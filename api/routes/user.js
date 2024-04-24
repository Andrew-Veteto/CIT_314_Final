const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('../models/User');
const User = mongoose.model('user');

require('../models/Review');
const Review = mongoose.model('review');

const ObjectId = mongoose.Types.ObjectId;

// Gets all reviews based on user
router.get('/reviews/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const reviews = await Review.aggregate([
            {
                $unwind: "$reviews"
            },
            {
                $match: {
                    "reviews.user_id": _id
                }
            },
            {
                $project: {
                    "_id": 0,
                    "park_name": "$park_name",
                    "review": "$reviews.review",
                    "review_id": "$reviews._id"
                }
            }
        ]);
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Submits a user review MongoDB
router.post('/submit/review', async (req, res) => {
    try {
        var { review, name, user_id } = req.body;
        user_id = user_id.replace(/^"(.*)"$/, '$1');
        // Check if there is an existing review document with the park name
        let reviewDocument = await Review.findOne({ park_name: name });
        if (!reviewDocument) {
            // If no review document exists, create a new one
            reviewDocument = new Review({ park_name: name, reviews: [] });
        }
        // Add the new review and user as an object to the reviews array
        console.log(req.body);
        reviewDocument.reviews.push({ review, user_id });
        // Save the updated review document
        await reviewDocument.save();
        res.status(201).json({ message: 'Review saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Creates a user MongoDB
router.post('/register', passport.authenticate('register', { session: false }), async (req, res) => {
    res.status(200).json({
        message: 'Registraion successful',
        user: req.user
    });
});

// Lets a user Login MongoDB
router.post('/login',
    passport.authenticate('login', { session: false, failWithError: true }),

    function (req, res) {
        console.log(req.user);
        const payload = {
            id: req.user._id,
            username: req.user.username,
        };
        const token = jwt.sign({ payload }, process.env.TOP_SECRET_KEY, { expiresIn: '3d' });
        const loginObject = {
            _id: req.user._id,
            username: req.user.username,
            accessToken: token
        };
        return res.status(200).json(loginObject);
    },
    function (err, req, res) {
        errorResponse = {
            "error": {
                "name": "LoginError"
            },
            "message": "User not found",
            "statusCode": 401,
            "data": [],
            "success": false
        }
        return res.status(401).json(errorResponse);
    }
);

module.exports = router;