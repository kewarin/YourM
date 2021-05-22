const { find } = require('../models/movie');

var express = require('express'),
    router      = express.Router(),
    middleware  = require('../middleware'),
    comment     = require('../models/comment');
    movies      = require('../models/movie');

router.get('/', function(req, res){
    movies.find({}, function(err, allMovie){
        if (err) {
            console.log(err);
        } else {
            res.render('movies/movie.ejs', {Movies: allMovie});
        }
    });
});

router.get('/sorting-atoz', function(req, res){
    movies.find({}, function(err, allMovie){
        if (err) {
            console.log(err);
        } else {
            res.render('movies/movie.ejs', {Movies: allMovie});
        }
    }).sort({name:1});
});

router.get('/sorting-ztoa', function(req, res){
    movies.find({}, function(err, allMovie){
        if (err) {
            console.log(err);
        } else {
            res.render('movies/movie.ejs', {Movies: allMovie});
        }
    }).sort({name:-1});
});


router.get("/:id", function(req, res){
    movies.findById(req.params.id).populate().exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            res.render("movies/details.ejs", {Movies: foundMovie});
        }
    });
});

router.post('/:id', middleware.isLoggedIn, function(req, res){
   console.log('comment');
    movies.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
            res.redirect('/movie');
        } else {
            console.log(foundMovie);
            comment.create(req.body.comment, function(err, foundComment){
                if(err) {
                    console.log(err);
                } else {
                    console.log(foundComment);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundMovie.comment.push(foundComment);
                    foundMovie.save();
                    res.redirect('/movie/'+ foundMovie._id);
                }
            });
        }
    });
});

router.post('/search', function(req,res){
    var name = req.body.search;
    res.redirect('/movie/search/' + name);
});

router.get('/search/:name', function(req,res){
    Movies.find({name: new RegExp(req.params.name, 'i')}, function(err, foundMovies){
        if(err){
            console.log(err);
        } else {
            res.render('./movie/movie.ejs', {Movies: foundMovies, sort: req.params.name});
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