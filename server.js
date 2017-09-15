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
var fs = require('fs');

// base URL to read a recipe
var recipeURL = "/recipe";

// render home page
app.get("/", function(req, res) {
    res.render("home");
})

/* 
 * Api view a recipe
 */
app.get(recipeURL + "/:recipe_name",
    function(req, res) {
        // dynamically read a recipe data given a recipe name
        // currently not handling not-found recipes
        var recipe = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + req.params["recipe_name"] + ".json", 'utf8'));
        // generate dynamic page with data
        res.render("recipe", { recipe: recipe });
    }
)

// api to search recipes based on ingredients
app.get('/search_recipes',
    function(req, res) {
        // getting form data (query in get request)
        var ingredients = req.query;
        // process form data
        var recipes = searching(ingredients)
        recipes = recipe_link_generation(recipes);

        // dynamically generating page with data
        res.render("search", { recipes: recipes });
    }
)

/*
 * helper function to search recipes based on ingredients
 * 
 * params: ingredients: list of ingredients
 * return: array of recipes
 * 
 */
function searching(ingredients) {
    var recipes = [];
    for (var i in ingredients) {
        if (ingredients[i] === "egg") {
            var recipe = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + "omlette.json", 'utf8'));
            recipes.push(recipe);
            continue;
        }
        if (ingredients[i] === "potato") {
            var recipe = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + "potato_curry.json", 'utf8'));
            recipes.push(recipe);
            continue;
        }
    }
    return recipes;
}

/*  
 * helper function to generate recipe link in href attribute
 * 
 * params: recipes: array of recipes
 * return: array of recipes with href attribute
 * 
 */
function recipe_link_generation(recipes) {
    for (var i = 0; i < recipes.length; i++) {
        var href = recipeURL + "/" + recipes[i]["recipe_name"].toLowerCase();
        recipes[i]["href"] = href;
    }
    return recipes;
}

// listen and print out host port to inform developers
var server = app.listen(3000,
    function() {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
    }
)