var express = require('express'),
    router      = express.Router(),
    middleware  = require('../middleware'),
    comment     = require('../models/comment');
    movies      = require('../models/movie');

    router.get('/', function(req, res){
        res.render('admin/home.ejs');
    });

    router.get('/cinema', function(req, res){
        res.render('admin/cinema.ejs');
    });

    router.get('/movie', function(req, res){
        res.render('admin/movie.ejs');
    });

    module.exports = router;