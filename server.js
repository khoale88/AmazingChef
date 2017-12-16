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
const db = monk('mongodb://localhost:27017/amzc');
//initialize dbs with recipes from json
db.then(() => {
    let recipes = ['omlette', 'potato_curry'];
    console.log('Connected correctly to server');
    let collection = db.get('recipes');
    recipes.forEach(recipeName => {
        dbFindOrInsertRecipeFromFile(collection, recipeName);
    })
});

function dbFindOrInsertRecipeFromFile(collection, recipeName) {
    collection.findOne({'recipe_name': recipeName}, {'_id': 1})
        .then(doc => {
            if (!doc) {
                let recipe = JSON.parse(fs.readFileSync(`recipes/${recipeName}.json`));
                collection.insert(recipe).then(() => db.close());
            }
        });
}

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
app.listen(3001);