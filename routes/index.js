let express = require('express');
index = express.Router();
// Configure file system package to read file (replacement of database)
let fs = require('fs');

//render homepage
index.get("/", (req, res) => res.render("home4"));

// api to search recipes based on ingredients
index.get('/search', (req, res) => {
    // getting form data (query in get request)
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let db = req.db;
    if (req.query.ingredients) {
        let excluded = req.query.excluded ? JSON.parse(req.query.excluded) : [];
        searchByIngredients(db, JSON.parse(req.query.ingredients), excluded, skip, limit)
            .then(recipes => res.send(recipes));
    } else if (req.query.name) {
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
 * {'ingredients':{$elemMatch:{name:{$in:ingredients}}}, {skip: skip, limit:limit}}
 *
 * @param db mongoDB
 * @param ingredients list of ingredients
 * @skip: number of skipped doc
 * @limit: number of returned doc
 * @return  {Promise|Promise.<TResult>|*} Promise object with an array of recipes
 */
function searchByIngredients(db, ingredients, excluded, skip, limit) {
    let collection = db.get('recipes');
    return collection.find(
        {'ingredients.name': {$in: ingredients}, 'ingredients.name':{$nin: excluded}},
        {skip: skip, limit: limit})
        .then(docs => {
            let recipes = docs;
            db.close();
            return recipes;
        });
}

/**
 * helper function to search recipes based on name
 * {'recipe_name': {$regex: name}}, {skip: skip, limit: limit}
 *
 * @param db
 * @param name
 * @param skip
 * @param limit
 * @returns {Promise|Promise.<TResult>|*}
 */
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