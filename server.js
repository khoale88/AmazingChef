var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

app.use(express.static('public'));
// var cookieParser = require('cookie-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.use(express.static("views"));
// app.use(cookieParser());

var recipeURL = "/recipe"

// home page
app.get("/", function(req, res) {
    res.render("home.ejs");
})

// see each recipe
app.get("/recipe/:recipe_id", function(req, res) {
    var recipe = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + req.params["recipe_id"] + ".json", 'utf8'));
    res.render("recipe", { recipe: recipe });
})

// search recipes by get
app.get('/search_recipes', urlencodedParser, function(req, res) {
    var obj = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + "all.json", 'utf8'));
    res.render("search", obj);
})

// search recipes by post
app.post('/search_recipes', urlencodedParser, function(req, res) {
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
})

var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})