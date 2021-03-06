
var mongoose = require('mongoose');

var likedSchema = new mongoose.Schema({
    movies: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'movies'
        },
        image: String,
        desc: String,
        name: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Liked', likedSchema);