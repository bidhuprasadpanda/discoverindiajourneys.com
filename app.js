var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var csrf = require('csurf');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var config = require('./config');
var http = require('http');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var routes = require('./routes/index');
var adminRoutes = require('./routes/admin');
var userRoutes = require('./routes/user');
var methodOverride = require('method-override');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/dreamdestinationz');
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

var hbs = require('hbs');

var csrfProtection = csrf({ cookie: true });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method')); // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));
app.use(validator());
app.use(cookieParser());
app.use(session({ secret: 'mysupersecret', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
process.env.TMPDIR = config.TEMPDIR;

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.providers = req.providers;
    res.locals.continents = req.continents;
    res.locals.destinations = req.destinations;
    res.locals.categories = req.categories;
    res.locals.accomodation = req.accomodation;
    res.locals.packages = req.packages;
    res.locals.packageaccomodation = req.packageaccomodation;
    res.locals.packageroomoccupancy = req.packageroomoccupancy;
    res.locals.places = req.places;
    res.locals.subscriber = req.subscribers;
    res.locals.corporatetours = req.corporatetours;
    res.locals.honeymoontours = req.honeymoontours;
    res.locals.inquiry = req.inquiry;
    next();
});


app.use('/user', userRoutes);
app.use('/admin', adminRoutes)
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(validator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
});

module.exports = app;