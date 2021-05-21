const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      seedDB        = require('./seeds'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      user          = require('./models/user'),
      movies        = require('./models/movie'),
      comment       = require('./models/comment');      

var movieRoutes = require('./route/movie');
var indexRoutes = require('./route/index'),
    commentRoutes = require('./route/comment');


mongoose.connect('mongodb://localhost/Yourmove');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + 'public' ));
// seedDB();

app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function (req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.use('/', indexRoutes);
app.use('/movie', movieRoutes);
app.use('', indexRoutes);
app.use('/movie/:id/comment', commentRoutes);

app.get('/cinema', function(req, res){
    res.render('cinema.ejs');
});


function isloggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } 
    res.redirect('/login');
};


app.listen('3000', function(){
    console.log('Yourmove is started.');
});