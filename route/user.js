var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    path = require('path'),
    middleware = require('../middleware');
    user        = require('../models/user');

    router.get('/:id', middleware.checkProfileOwner, function (req, res) {
        user.findById(req.params.id).exec(function (err, foundUsers) {
            if (err) {
                console.log(err);
            } else {
                user.findById(req.params.id).populate('likes').exec(function(err, likedMovies){
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('./user/profile.ejs', { User: foundUsers, Movies: likedMovies });
                    }
                });
            }
        });
    });
    

module.exports = router;