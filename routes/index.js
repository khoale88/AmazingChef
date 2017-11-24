let express = require('express');
index = express.Router();
// Configure file system package to read file (replacement of database)
let fs = require('fs');

//render homepage
index.get("/", (req, res) => res.render("home4"));

// api to search recipes based on ingredients
index.get('/search', (req, res) => {
    // getting form data (query in get request)
    // console.log(req.query.ingredients);
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 0;
    if (req.query.ingredients) {
        let ingredients = JSON.parse(req.query.ingredients);
        let db = req.db;
        // process form data
        searchByIngredients(db, ingredients, skip, limit)
            .then(recipes => res.send(recipes));
    } else if (req.query.name) {
        let db = req.db;
        searchByName(db, req.query.name, skip, limit)
            .then(recipes => res.send(recipes));
    } else res.sendStatus(400);
});

index.get("/ingredients", (req, res) => {
    let ingredients = JSON.parse(fs.readFileSync("recipes/ingredient.json"));
    res.send(ingredients);
});

/**
 * helper function to search recipes based on ingredients
 * {'ingredients':{$elemMatch:{name:{$in:ingredients}}}, {ingredients:0, instruction:0}}
 *
 * @param db mongoDB
 * @param ingredients list of ingredients
 * @return  {Promise|Promise.<TResult>|*} Promise object with an array of recipes
 */
function searchByIngredients(db, ingredients, skip, limit) {
    let collection = db.get('recipes');
    return collection.find({'ingredients': {$elemMatch: {name: {$in: ingredients}}}}, {skip: skip, limit: limit})
        .then(docs => {
            let recipes = docs;
            db.close();
            return recipes;
        });
}

function searchByName(db, name, skip, limit) {
    let collection = db.get('recipes');
    return collection.find({'recipe_name': {$regex: name}}, {skip: skip, limit: limit})
        .then(docs => {
            let recipes = docs;
            db.close();
            return recipes;
        });
}

module.exports = index;