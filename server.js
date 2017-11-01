// Create a new Express application.
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let fs = require('fs');

// Configure view engine to render EJS templates.
app.set('views', './views');
app.set('view engine', 'ejs');

// Configure static folder
app.use(express.static('public'));

//configure mongo db
const monk = require("monk");
// main database name is AMZC
const db = monk('localhost:27017/AMZC');
//initialize dbs with at least one recipe (omlette)
db.then(() => {
    console.log('Connected correctly to server');
    let collection = db.get('recipes');
    collection.findOne({'recipe_name':'omlette'})
        .then(doc => {
            if(!doc){
                let omlette = JSON.parse(fs.readFileSync('recipes/omlette.json'));
                collection.insert(omlette)
                    .then(()=> db.close());
            }
        });
    collection.findOne({'recipe_name':'potato_curry'})
        .then(doc => {
            if(!doc){
                let curry = JSON.parse(fs.readFileSync('recipes/potato_curry.json'));
                collection.insert(curry)
                    .then(()=> db.close());
            }
        });
});
// use mongodb middleware in all request
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Use application-level middleware for common functionality, including parsing, etc.
app.use(bodyParser.json());
app.use(session({secret: 'HardToGuess Khoa Arpita Ipsha'}))
app.use(cookieParser());

// setup routes
app.use('/', require('./routes/index'));
app.use('/auth/', require('./routes/auth'));
app.use('/khoa/', require('./routes/khoa'));
app.use('/recipes/', require('./routes/recipes'));

// run server
app.listen(3000);