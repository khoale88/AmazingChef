// Create a new Express application.
var express = require('express');
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Configure static folder
app.use(express.static('public'));

// Use application-level middleware for common functionality, including parsing, etc.
// app.use(require('body-parser').urlencoded({ extended: true }));
// var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Configure file system package to read file (replacement of database)
let fs = require('fs');

// render home page
app.get("/", (req, res) => res.render("home3"));

// api to search recipes based on ingredients
app.get('/search_recipes', (req, res) => {
    // getting form data (query in get request)
    let ingredients = req.query;
    // process form data
    let recipes = searching(ingredients);
    // dynamically generating page with data
    res.render("search3", { recipes: recipes });
});

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