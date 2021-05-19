var mongoose = require("mongoose");

var Top5Schema = new mongoose.Schema({
    name: String,
    image: String
});

module.exports = mongoose.model('top5' ,Top5Schema);