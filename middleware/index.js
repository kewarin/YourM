

var middlewareObj = {};

middlewareObj.checkProfileOwner = function(req, res, next){
    if(req.isAuthenticated()){
        if( req.user._id.equals(req.params.id) ){
            return next();
        }
        else {
            req.flash('error', 'You are not the profile owner!');
            res.redirect('/back');
        }
    } else {
        req.flash('error', 'Log in first!');
        res.redirect('/login');
    }
};

middlewareObj.checkAdmin = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.user._id, function(err, currentUser){
            if(err){
                req.flash('error', 'You can not acess this page!');
                res.redirect('back');
            } else {
                if( currentUser.priority === 'admin' ){
                    return next();
                }
            }
        });
    } else {
        req.flash('error', 'Log in first!');
        res.redirect('back');
    }
};



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Log in first!');
    res.redirect('/login');
}

module.exports = middlewareObj;