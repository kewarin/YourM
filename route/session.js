
var express = require('express'),
    router = express.Router({ mergeParams: true }),
    passport = require('passport'),
    middleware = require('../middleware'),
    Session = require('../models/session'),
    movies = require('../models/movie'),
    cinemas = require('../models/cinema'),
    user = require('../models/user');

router.get('/:cid/:mid', middleware.isLoggedIn, function (req, res) {
    cinemas.findById(req.params.cid, function (err, foundCinemas) {
        if (err) {
            console.log(err);
        } else {
            movies.findById(req.params.mid, function (err, foundMovies) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('reserve/session.ejs', { Cinemas: foundCinemas, Movies: foundMovies });
                }
            });
        }
    });
});

router.post('/:cid/:mid', middleware.isLoggedIn, function (req, res) {
    Session.find({ date: req.body.session.date, time: req.body.session.time, cinema: req.params.cid, movies: req.params.mid }, function (err, result) {
        if (err) {
            console.log(err);
        } else if (!result.length) {
            req.body.session.cinema = req.params.cid;
            req.body.session.movies = req.params.mid;
            Session.create(req.body.session, function (err, thisSession) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/reserve/' + thisSession._id);
                }
            });
        } else {
            result.forEach(function (oldSession) {
                res.redirect('/reserve/' + oldSession._id);
            });
        }
    });
});

module.exports = router;