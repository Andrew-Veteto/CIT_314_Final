const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    park_name: {
        type: String,
        required: true
    },
    reviews: [
        {
            user_id: {
                type: String,
                required: true
            },
            review: {
                type: String,
                required: true
            }
        }
    ]
});

const reviewModel = mongoose.model('review', ReviewSchema);

module.exports = reviewModel;