

var express = require('express'),
    router = express.Router({ mergeParams: true }),
    passport = require('passport'),
    middleware = require('../middleware'),
    Session = require('../models/session'),
    Reserve = require('../models/reserve'),
    Movies = require('../models/movie'),
    Cinemas = require('../models/cinema');

router.get('/:id', middleware.isLoggedIn, function (req, res) {
    Session.findById(req.params.id, function (err, foundSession) {
        if (err) {
            console.log(err);
        } else {
            Cinemas.findById(foundSession.cinema, function (err, foundCinemas) {
                if (err) {
                    console.log(err);
                } else {
                    Movies.findById(foundSession.movies, function (err, foundMovies) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('reserve/reserve.ejs', { Session: foundSession, Cinemas: foundCinemas, Movies: foundMovies });
                        }
                    });
                }
            });
        }
    });
});

router.post('/:id', middleware.isLoggedIn, function (req, res) {
    Session.findById(req.params.id, function (err, foundSession) {
        if (err) {
            console.log(err);
        } else {
            Reserve.create(req.body.reserve, function (err, rese) {
                if (err) {
                    console.log(err);
                } else {
                    rese.user.id = req.user._id;
                    rese.user.username = req.user.username;
                    rese.save();
                    foundSession.reservation.push(reser);
                    foundSession.save();

                    if (req.body.A1 == 'y') {
                        reserveSeat('A1', reser._id);
                    }
                    if (req.body.A2 == 'y') {
                        reserveSeat('A2', reser._id);
                    }
                    if (req.body.A3 == 'y') {
                        reserveSeat('A3', reser._id);
                    }
                    if (req.body.A4 == 'y') {
                        reserveSeat('A4', reser._id);
                    }ve
                    if (req.body.A5 == 'y') {
                        reserveSeat('A5', reser._id);
                    }
                    if (req.body.A6 == 'y') {
                        reserveSeat('A6', reser._id);
                    }
                    if (req.body.B1 == 'y') {
                        reserveSeat('B1', reser._id);
                    }
                    if (req.body.B2 == 'y') {
                        reserveSeat('B2', reser._id);
                    }
                    if (req.body.B3 == 'y') {
                        reserveSeat('B3', reser._id);
                    }
                    if (req.body.B4 == 'y') {
                        reserveSeat('B4', reser._id);
                    }
                    if (req.body.B5 == 'y') {
                        reserveSeat('B5', reser._id);
                    }
                    if (req.body.B6 == 'y') {
                        reserveSeat('B6', reser._id);
                    }
                    if (req.body.C1 == 'y') {
                        reserveSeat('C1', reser._id);
                    }
                    if (req.body.C2 == 'y') {
                        reserveSeat('C2', reser._id);
                    }
                    if (req.body.C3 == 'y') {
                        reserveSeat('C3', reser._id);
                    }
                    if (req.body.C4 == 'y') {
                        reserveSeat('C4', reser._id);
                    }
                    if (req.body.C5 == 'y') {
                        reserveSeat('C5', reser._id);
                    }
                    if (req.body.C6 == 'y') {
                        reserveSeat('C6', reser._id);
                    }

                    res.redirect('/user/' + req.user._id + '/ticket');

                }
            });
        }
    });

    function reserveSeat(seat, reserve) {
        Session.findByIdAndUpdate(req.params.id, { $pull: { seats: seat } }, function (err, foundSession) {
            if (err) {
                console.log(err);
            } else {
                Reserve.findByIdAndUpdate(reserve._id, { $push: { seats: seat } }, function (err, foundReserve) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Seat : ' + seat);
                    }
                });
            }
        });
    }
});

module.exports = router;