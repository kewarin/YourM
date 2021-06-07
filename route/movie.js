const { find } = require('../models/movie');

var ejs = require('ejs'),
    express = require('express'),
    router = express.Router({ mergeParams: true }),
    middleware = require('../middleware'),
    comment = require('../models/comment');
movies = require('../models/movie');

router.get('/', function (req, res) {
    movies.find({}, function (err, allMovie) {
        if (err) {
            console.log(err);
        } else {
            res.render('movies/movie.ejs', { Movies: allMovie });
        }
    });
});

router.get('/sorting-atoz', function (req, res) {
    movies.find({}, function (err, allMovie) {
        if (err) {
            console.log(err);
        } else {
            res.render('movies/movie.ejs', { Movies: allMovie });
        }
    }).sort({ name: 1 });
});

router.get('/sorting-ztoa', function (req, res) {
    movies.find({}, function (err, allMovie) {
        if (err) {
            console.log(err);
        } else {
            res.render('movies/movie.ejs', { Movies: allMovie });
        }
    }).sort({ name: -1 });
});

router.get('/genre/:genre', function (req, res) {
    movies.find({ genre: new RegExp(req.params.genre, 'i') }, function (err, foundMovies) {
        if (err) {
            console.log(err);
        } else {
            res.render('./movies/movie.ejs', { Movies: foundMovies, sort: req.params.genre });
        }
    });
});

router.post('/search', function (req, res) {
    var name = req.body.search;
    res.redirect('/movie/search/' + name);

});

router.get('/search/:name', function (req, res,) {
    movies.find({ name: new RegExp(req.params.name, 'i') }, function (err, foundMovies) {
        if (err) {
            console.log(err);
        } else {
            res.render('./movies/movie.ejs', { Movies: foundMovies, sort: req.params.name });
        }
    });
});


router.get("/:id", function (req, res) {
    movies.findById(req.params.id).populate("comment").exec(function (err, foundMovie) {
        if (err) {
            console.log(err);
        } else {
            res.render("movies/details.ejs", { Movies: foundMovie });
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