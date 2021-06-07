const { find } = require('../models/movie');

var ejs = require('ejs'),
    express = require('express'),
    router = express.Router({ mergeParams: true }),
    multer = require('multer'),
    path = require('path'),
    middleware = require('../middleware'),
    comment = require('../models/comment');
movies = require('../models/movie');
storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/movies/uploads');
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
upload = multer({
    storage: storage,
    fileFilter: imageFilter,
}),

Cinemas = require('../models/cinema');
User    = require('../models/user');
Liked   = require('../models/liked'); storage = multer.diskStorage({
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

    Session     = require('../models/session'),
    Reserve     = require('../models/reserve');


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

//  New
router.get('/new', middleware.checkAdmin, function(req,res){
    res.render('./movies/new.ejs');
});

router.post('/new', upload.fields([{ name: 'image' }     ]), function(req, res){
    req.body.movies.image = '/images/movies/uploads/' + req.files['image'][0].filename;
    movies.create(req.body.movies, function(err, newMovies){
        if(err){
            console.log(err);
        } else {
            res.redirect('/movies');
        }
    });
});
//  End of New

//  Edit
router.get('/:id/edit', middleware.checkAdmin,  function(req, res){
    movies.findById(req.params.id, function( err, foundMovies ){
        if(err) {
            console.log(err);
        } else {
            res.render('./movies/edit.ejs', {Movies: foundMovies})
        }
    });
});

router.put('/:id', upload.fields([{ name: 'image' } ]), function(req, res){
    if ( req.files['image'] ){
        req.body.movies.image = '/images/movies/uploads/' + req.files['image'][0].filename;
    }
    movies.findByIdAndUpdate(req.params.id, req.body.movies, function( err, updatedMovies ){
        if(err) {
            console.log(err);
            res.redirect('/movie/')
        } else {
            res.redirect('/movie/' + req.params.id);
        }
    });
});
//  End of Edit

//  Delete
router.delete('/:id', function(req, res){
    movies.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/movie');
        }
    })
});
//  End of delete

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


router.get('/:id', function(req,res){
    movies.findById(req.params.id).populate('comment').exec(function(err, foundMovies){
        if(err){
            console.log(err);
        } else {
            Cinemas.find({}, function(err, allCinemas){
                if(err){
                    console.log(err);
                } else {
                    res.render('./movies/details.ejs', {Movies: foundMovies, Cinemas: allCinemas});
                }
            });
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