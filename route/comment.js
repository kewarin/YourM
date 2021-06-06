// var express     = require('express'),
//     router      = express.Router({mergeParams: true}),
//     middleware  = require('../middleware'),
//     movies      = require('../models/movie'),
//     user = require('../models/user'),
//     comment     = require('../models/comment');

//     router.post('/', isLoggedIn, function(req, res){
//         movies.findById(req.params.id, function(err, foundMovie){
//             if(err){
//                 console.log(err);
//                 res.redirect('/movie');
//             } else {
//                 comment.create(req.body.comment, function(err, foundComment){
//                     if(err) {
//                         console.log(err);
//                     } else {
//                         comment.author.id = req.user._id;
//                         comment.author.username = req.user.username;
//                         comment.save();
//                         foundMovie.comment.push(foundComment);
//                         foundMovie.save();
//                         res.redirect('back');
//                     }
//                 });
//             }
//         });
//     });

// router.get('/new', isLoggedIn, function(req, res){
//     movies.findById(req.params.id, function(err, foundMovie){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("comment/new.ejs", {movies: foundMovie});
//         }
//     });    
// });

// // router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
// //     comment.findById(req.params.comment_id, function(err, foundComment){
// //         if(err){
// //             res.redirect('back');
// //         } else {
// //             res.render('comment/edit.ejs', {movies_id: req.params.id, comment: foundComment});
// //         }
// //     });
// // });

// // router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
// //     comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
// //         if(err){
// //             res.redirect('back');
// //         } else {
// //             res.redirect('/movie/'+ req.params.id);
// //         }
// //     });
// // });

// // router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
// //     comment.findByIdAndRemove(req.params.comment_id, function(err){
// //         if(err){
// //             res.redirect('back');
// //         } else {
// //             res.redirect('/movie/' + req.params.id);
// //         }
// //     });
// // });


// function isloggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// };

// module.exports = router;

var express = require('express'),
    router  = express.Router({mergeParams: true}),
    movies = require('../models/movie'),
    user = require('../models/user'),
    comment    = require('../models/comment');

router.get('/new',isLoggedIn, function(req, res){
    movies.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new.ejs", {movie: foundMovie});
        }
    });    
});

router.post('/', isLoggedIn, function(req, res){
    movies.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
            res.redirect('/movie');
        } else {
            comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    console.log(comment);
                    foundMovie.comment.push(comment);
                    foundMovie.save();
                    res.redirect('/movie/'+ foundMovie._id);
                }
            });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
        
    }
    res.redirect('/login');
}

module.exports = router;