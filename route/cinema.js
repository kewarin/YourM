var express = require('express'),
    router = express.Router(),
    middleware = require('../middleware'),
    cinemas = require('../models/cinema');
movies = require('../models/movie');
user = require('../models/user');

router.get('/', function (req, res) {
    cinemas.find({}, function (err, allCinemas) {
        if (err) {
            console.log(err);
        } else {
            res.render('./cinema/cinema.ejs', { Cinemas: allCinemas });
        }
    });
});

router.get('/sorting-atoz', function (req, res) {
    cinemas.find({}, function (err, allCinemas) {
        if (err) {
            console.log(err);
        } else {
            res.render('cinema/cinema.ejs', { Cinemas: allCinemas });
        }
    }).sort({ name: 1 });
});

router.get('/sorting-ztoa', function (req, res) {
    cinemas.find({}, function (err, allCinemas) {
        if (err) {
            console.log(err);
        } else {
            res.render('cinema/cinema.ejs', { Cinemas: allCinemas });
        }
    }).sort({ name: -1 });
});

//  Show
router.get('/:id', function (req, res) {
    cinemas.findById(req.params.id).exec(function (err, foundCinemas) {
        if (err) {
            console.log(err);
        } else {
            movies.find({}, function (err, allMovies) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('./cinema/show.ejs', { Movies: allMovies, Cinemas: foundCinemas });
                }
            });
        }
    });
});

module.exports = router;