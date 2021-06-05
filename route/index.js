const express       = require('express'),
      router  = express.Router(),
      user    = require('../models/user'),
      movies        = require('../models/movie'),
      passport  =  require('passport');

router.get('/', function(req, res){
    movies.find({}, function(err, allMovie){
        if (err) {
            console.log(err);
        } else {
            movies.find().sort({score: -1}).limit(3).exec(function (err, sortMovies) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('home.ejs',{Movies: allMovie, Sort: sortMovies});
                }
            });
        }
    });
    
});

router.get('/login', function(req, res){
    res.render('login.ejs');
});

router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function (req, res) {
});

router.get('/signup', function(req, res){
    res.render('signup.ejs');
});

router.post('/signup', function (req, res) {
   var newuser = new user({username: req.body.username});
   user.register(newuser, req.body.password, function (err, user) {
       if (err) {
           console.log(err);
           return res.render('/signup');
       }
        passport.authenticate('local')(req, res, function (){
            res.redirect('/');
        });
    }); 
});

router.get('/logout', function (req, res) {
   req.logout();
   res.redirect('/'); 
});

module.exports = router;
