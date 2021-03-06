var mongoose = require("mongoose");

var MovieSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    trailer: String,
    genre: String,
    runtime: String,
    type: String,
    score: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
});

module.exports = mongoose.model('movies' ,MovieSchema);
