const movie = require('../models/movie');
var movies = require('../models/movie'),
    comment    = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCollectionOwner = function(req, res, next){
    if(req.isAuthenticated()){
        movie.findById(req.params.id, function(err, foundMovie){
            if(err){
                res.redirect('back');
            } else {
                if(foundMovie.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = middlewareObj;