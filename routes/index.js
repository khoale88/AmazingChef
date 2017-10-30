
let express = require('express');
index = express.Router();
// Configure file system package to read file (replacement of database)
let fs = require('fs');

//render homepage
index.get("/", (req, res) => res.render("home4"));

// api to search recipes based on ingredients
index.get('/search', (req, res) => {
    // getting form data (query in get request)
    let ingredients = JSON.parse(req.query.ingredients);
    // process form data
    let recipes = searching(ingredients);
    recipes.forEach(function (recipe) {
        recipe.href = `/recipes/${recipe.recipe_name}.html`
    });
    // dynamically generating page with data
    res.send(recipes);
});

function isAdmin(req, res, next){
    let now = new Date().getTime() / 1000;
    if (req.session.admin && now - req.session.logTime <= 60){
        next();
    } else {
        res.redirect('/auth/login');
    }
}

index.get('/add_recipe', isAdmin, (req, res) => {

    res.render('add_recipe', {})
});

index.post('/add_recipe', isAdmin, (req, res) => {
    console.log(req.body);
    res.status(204).send(null);
});

index.get("/ingredients", (req, res) => {
    let ingredients = JSON.parse(fs.readFileSync(__dirname + "/../recipes/ingredient.json"));
    res.send(ingredients);
});

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
            let recipe = JSON.parse(fs.readFileSync(__dirname + "/../recipes/omlette.json", 'utf8'));
            recipes.push(recipe);
            continue;
        }
        if (ingredients[i] === "potato") {
            let recipe = JSON.parse(fs.readFileSync(__dirname + "/../recipes/potato_curry.json", 'utf8'));
            recipes.push(recipe);
            continue;
        }
    }
    return recipes;
}


// export {index};
module.exports = index;