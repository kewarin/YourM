var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    path = require('path'),
    middleware = require('../middleware'),
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/images/user/');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        },
    }),
    imageFilter = function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return callback(new Error('Only JPG, jpeg, PNG and GIF image files are allowed!'), false);
        }
        callback(null, true);
    },
    upload = multer({ storage: storage, fileFilter: imageFilter }),

    Session = require('../models/session'),
    Reserve = require('../models/reserve'),
    user = require('../models/user');

router.get('/admin', middleware.checkAdmin, function (req, res) {
    User.find({ priority: 'user' }, function (err, allUser) {
        if (err) {
            console.log(err);
        } else {
            User.find({ priority: 'admin' }, function (err, allAdmin) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('./user/admin.ejs', { User: allUser, Admin: allAdmin });
                }
            });
        }
    });
});


router.post('/admin/delete/:id', middleware.checkAdmin, function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted User : ", result);
            res.redirect('back');
        }
    });
});


router.get('/:id', middleware.checkProfileOwner, function (req, res) {
    user.findById(req.params.id).exec(function (err, foundUsers) {
        if (err) {
            console.log(err);
        } else {
            user.findById(req.params.id).populate('likes').exec(function (err, likedMovies) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('./user/profile.ejs', { User: foundUsers, Movies: likedMovies });
                }
            });
        }
    });
});


router.get('/:id/ticket', middleware.checkProfileOwner, function (req, res) {
    user.findById(req.params.id).exec(function (err, foundUsers) {
        if (err) {
            console.log(err);
        } else {
            Reserve.find({ 'user.id': req.params.id }).exec(function (err, foundReserve) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('./user/ticket.ejs', { User: foundUsers, Reserve: foundReserve });
                }
            });
        }
    });
});

router.post('/:id', middleware.checkProfileOwner, upload.single('image'), function (req, res) {
    User.findByIdAndUpdate(req.params.id,
        {
            picture: '/images/user/' + req.file.filename
        },
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Updated User : ", result);
                res.redirect('back');
            }
        });
});


module.exports = router;