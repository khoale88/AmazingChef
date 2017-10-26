// Create a new Express application.
var express = require('express');
var app = express();
var mongo = require('mongodb');
var should = require("should");
const monk = require("monk");

const url = 'localhost:27017/recipes';

const db = monk(url);

db.then(() => {
    console.log('Connected correctly to server')
})

const collection = db.get('recipelist')
//for inserting documents
// collection.insert([{a: 2}, {a: 21}, {a: 31}])
//     .then((docs) => {
//     // docs contains the documents inserted with added **_id** fields
//     // Inserted 3 documents into the document collection
// }).catch((err) => {
//     // An error happened while inserting
// }).then(() => db.close())
//
//
// //for updating documents
// collection.insert([{a: 1}, {a: 2}, {a: 3}])
//     .then((docs) => {
//     // Inserted 3 documents into the document collection
// })
// .then(() => {
//
//     return collection.update({ a: 2 }, { $set: { b: 1 } })
//
// })
// .then((result) => {
//     // Updated the document with the field a equal to 2
// })
// .then(() => db.close())
//
// //delete a document
// collection.insert([{a: 31}, {a: 32}, {a: 33}])
//     .then((docs) => {
//     // Inserted 3 documents into the document collection
// })
// .then(() => collection.update({ a: 2 }, { $set: { b: 1 } }))
// .then((result) => {
//     // Updated the document with the field a equal to 2
// })
// .then(() => {
//
//     return collection.remove({ a: 31})
//
// }).then((result) => {
//     // Deleted the document with the field a equal to 3
// })
// .then(() => db.close())
//
//
// //For finding all documents
//
//
//
// .then(() => {
//     console.log(collection.find())
//     return collection.find()
//
//
// })
// .then((docs) => {
//     // docs === [{ a: 1 }, { a: 2, b: 1 }]
// })
// .then(() => db.close())



// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Configure static folder
app.use(express.static('public'));

var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
//var url = "mongodb://localhost:27017/recipes";

/*MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myobj = { recipename: "Company Inc", ingredients: "Highway 37",image:"" };
    db.collection("recipelist").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});*/




// Use application-level middleware for common functionality, including parsing, etc.
// app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
// let bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
// let urlencodedParser = bodyParser.urlencoded({ extended: false });
// let jsonParser = bodyParser.json();


// Configure file system package to read file (replacement of database)
let fs = require('fs');

// render home page
app.get("/", (req, res) => res.render("home4"));

// api to search recipes based on ingredients
app.get('/search', (req, res) => {
    // getting form data (query in get request)
    let ingredients = JSON.parse(req.query.ingredients);
    // process form data
    let recipes = searching(ingredients);
    recipes.forEach(function(recipe){recipe.href = `/recipes/${recipe.recipe_name}.html`});
    // dynamically generating page with data
    res.send(recipes);
});

app.get('/add_recipe', (req, res) => {
   res.render('add_recipe', {});
});

app.post('/add_recipe', (req, res) => {
    console.log(req.body);
    res.status(200).send(null);
});

app.get("/ingredients", (req, res) => {
    let ingredients = JSON.parse(fs.readFileSync(__dirname + "/recipes/ingredient.json"));
    res.send(ingredients);
});

app.get("/khoa", (req, res) => res.render("khoa", {}));

/**
 * helper function to search recipes based on ingredients
 * include omlette recipe data if ingrdients have egg
 * include potato_curry recipe data if ingredient have potato
 * 
 * @param {*} ingredients list of ingredients
 * @return  array of recipes
 * 
 */
function searching(ingredients) {
    let recipes = [];
    for (let i in ingredients) {
        if (ingredients[i] === "egg") {
            let recipe = JSON.parse(fs.readFileSync(__dirname + "/recipes/omlette.json", 'utf8'));
            recipes.push(recipe);
            continue;
        }
        if (ingredients[i] === "potato") {
            let recipe = JSON.parse(fs.readFileSync(__dirname + "/recipes/potato_curry.json", 'utf8'));
            recipes.push(recipe);
            continue;
        }
    }
    return recipes;
}

// listen and print out host port to inform developers
let server = app.listen(3000,
    () => {
        let host = server.address().address;
        let port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port);
    }
);