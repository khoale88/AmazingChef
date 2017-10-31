// Create a new Express application.
let express = require('express');
let app = express();

// Configure view engine to render EJS templates.
app.set('views', './views');
app.set('view engine', 'ejs');

// Configure static folder
app.use(express.static('public'));

//configure mongo db
const monk = require("monk");
const db = monk('localhost:27017/AMZC');
db.then(() => {
    console.log('Connected correctly to server')
});

// use mongodb middleware
app.use((req, res, next) => {
    req.db = db;
    next();
});


// Use application-level middleware for common functionality, including parsing, etc.
// app.use(require('body-parser').urlencoded({ extended: true }));
let bodyParser = require('body-parser');
app.use(bodyParser.json());
let session = require('express-session');
app.use(session({secret: 'HardToGuess Khoa Arpita Ipsha'}))
let cookieParser = require('cookie-parser');
app.use(cookieParser());

// setup routes
app.use('/', require('./routes/index'));
app.use('/auth/', require('./routes/auth'));
app.use('/khoa', require('./routes/khoa'));

// listen and print out host port to inform developers
app.listen(3000);