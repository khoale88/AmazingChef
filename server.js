var express = require('express');

// Create a new Express pplication.
var app = express();
var fs = require('fs');
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

// Use application-level middleware for common functionality, including
// parsing, 
// app.use(require('body-parser').urlencoded({ extended: true }));
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// base URL to read a recipe
var recipeURL = "/recipe"

// home page
app.get("/", function(req, res) {
    res.render("home.ejs");
})

// see each recipe
app.get("/recipe/:recipe_id",
    function(req, res) {
        var recipe = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + req.params["recipe_id"] + ".json", 'utf8'));
        res.render("recipe", { recipe: recipe });
    }
)

// search recipes by get
app.get('/search_recipes', urlencodedParser,
    function(req, res) {
        var omlette = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + "omlette.json", 'utf8'));
        var potato_curry = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + "potato_curry.json", 'utf8'));
        var recipes = [];
        recipes.push(omlette);
        recipes.push(potato_curry);
        for (var i = 0; i < recipes.length; i++) {
            var href = recipeURL + "/" + recipes[i]["recipe_name"].toLowerCase();
            recipes[i]["href"] = href;
        }
        res.render("search", { recipes: recipes });
    }
)

// search recipes by post
app.post('/search_recipes', urlencodedParser,
    function(req, res) {
        var omlette = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + "omlette.json", 'utf8'));
        var potato_curry = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + "potato_curry.json", 'utf8'));
        var recipes = [];
        recipes.push(omlette);
        recipes.push(potato_curry);
        for (var i = 0; i < recipes.length; i++) {
            var href = recipeURL + "/" + recipes[i]["recipe_name"].toLowerCase();
            recipes[i]["href"] = href;
        }
        res.render("search", { recipes: recipes });
    }
)

var server = app.listen(3000,
    function() {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
    }
)