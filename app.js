const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    seedDB = require('./seeds'),
    passport = require('passport'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    LocalStrategy = require('passport-local'),
    user = require('./models/user');

var movieRoutes = require('./route/movie');
var indexRoutes = require('./route/index'),
    cinemasRoutes = require('./route/cinema'),
    commentRoutes = require('./route/comment'),
    reserveRoutes = require('./route/reserve');
sessionRoutes = require('./route/session');
userRoutes = require('./route/user');;


mongoose.connect('mongodb://localhost/Yourmove');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.static(__dirname + 'public'));
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

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


app.use('/', indexRoutes);
app.use('/movie', movieRoutes);
app.use('', indexRoutes);
app.use('/user', userRoutes);
app.use('/cinemas', cinemasRoutes);
app.use('/reserve', reserveRoutes);
app.use('/session', sessionRoutes);
app.use('/movie/:id/comment', commentRoutes);


app.listen('1248', function () {
    console.log('Yourmove is started.');
});