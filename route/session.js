
var express = require('express'),
    router = express.Router({ mergeParams: true }),
    passport = require('passport'),
    middleware = require('../middleware'),
    Session = require('../models/session'),
    movies = require('../models/movie'),
    cinemas = require('../models/cinema'),
    user = require('../models/user');

router.get('/:cinemasid/:movid', middleware.isLoggedIn, function (req, res) {
    cinemas.findById(req.params.cinemasid, function (err, foundCinemas) {
        if (err) {
            console.log(err);
        } else {
            movies.findById(req.params.moveid, function (err, foundMovies) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('reserve/session.ejs', { Cinemas: foundCinemas, Movies: foundMovies });
                }
            });
        }
    });
});

router.post('/:cinemasid/:moveid', middleware.isLoggedIn, function (req, res) {
    Session.find({ date: req.body.session.date, time: req.body.session.time, cinema: req.params.cenimasid, movies: req.params.moveid }, function (err, result) {
        if (err) {
            console.log(err);
        } else if (!result.length) {
            req.body.session.cinema = req.params.cinemasid;
            req.body.session.movies = req.params.moveid;
            Session.create(req.body.session, function (err, tSession) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/reserve/' + tSession._id);
                }
            });
        } else {
            result.forEach(function (oSession) {
                res.redirect('/reserve/' + oSession._id);
            });
        }
    });
});

module.exports = router;