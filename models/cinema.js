var mongoose = require('mongoose');

var cinemaSchema = new mongoose.Schema({
    name: String,
    address: String,

    //  Media
    image: String,
 
});

module.exports = mongoose.model('cinema', cinemaSchema);