var express = require('express'),
    router  = express.Router(),
    movies  = require('../models/movie');


router.get('/', function(req, res){
    movies.find({}, function(err, allMovie){
        if (err) {
            console.log(err);
        } else {
            res.render('movies/movie.ejs', {Movies: allMovie});
        }
    });
});

router.get("/:id", isloggedIn, function(req, res){
    movies.findById(req.params.id).populate().exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            res.render("movies/details.ejs", {Movies: foundMovie});
        }
    });
});


function isloggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } 
    res.redirect('/login');
};

module.exports = router;