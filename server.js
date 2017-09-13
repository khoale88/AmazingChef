var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var routes	= require('./routes');
var home = require("./routes/home");


// Create a new Express pplication.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static("styles"));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


//app.post('/checkingredients', home.checkingredient);


//app.post('/', home.checkingredient);

app.post('/',
    function(req, res) {
        console.log("Inside login not failure");

        res.redirect('/omlette');
    });

// Define routes.
app.get('/eggs',
  function(req, res) {
    res.render('omlette', { user: req.user });
  });

app.get('/potato',
    function(req, res) {
        res.render('potatocurry', { user: req.user });
    });


app.get('/', routes.index);



/*app.post('/',

    function(req, res) {
        console.log("After clicking search recipe");

        res.render('/potatocurry');
    });*/



app.listen(3000);
