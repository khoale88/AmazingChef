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

// render home page
app.get("/", function(req, res) {
    res.render("home");
})

// api to search recipes based on ingredients
app.get('/search_recipes',
    function(req, res) {
        // getting form data (query in get request)
        var ingredients = req.query;
        // process form data
        var recipes = searching(ingredients)
            // dynamically generating page with data
        res.render("search", { recipes: recipes });
    }
)

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

// listen and print out host port to inform developers
var server = app.listen(3000,
    function() {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
    }
)