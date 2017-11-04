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
    let db = req.db;
    // process form data
    searching(db, ingredients)
        .then(recipes => res.send(recipes));
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
function searching(db, ingredients) {
    let collection = db.get('recipes');
    return collection.find({'ingredients':{$elemMatch:{name:{$in:ingredients}}}},{ingredients:0, instruction:0})
        .then(docs => {
            let recipes = docs;
            db.close();
            return recipes;
        });
}

// export {index};
module.exports = index;