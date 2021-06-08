
var express = require('express'),
    router = express.Router({ mergeParams: true }),
    movies = require('../models/movie'),
    user = require('../models/user'),
    comment = require('../models/comment');

router.delete('/:id', function (req, res) {
    comment.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('back');
        }
    })
});

router.post('/', isLoggedIn, function (req, res) {
    movies.findById(req.params.id, function (err, foundMovie) {
        if (err) {
            console.log(err);
            res.redirect('/movie');
        } else {
            comment.create(req.body.comment, function (err, foundComment) {
                if (err) {
                    console.log(err);
                } else {
                    foundComment.author.id = req.user._id;
                    foundComment.author.username = req.user.username;
                    foundComment.save();
                    foundMovie.comment.push(foundComment);
                    foundMovie.save();
                    res.redirect('/movie/' + foundMovie._id);
                }
            });
        }
    });
});



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    }
    res.redirect('/login');
}

module.exports = router;