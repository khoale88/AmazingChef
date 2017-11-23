/**
 * created by Khoa on 10/28/2017
 * router for recipes-related api
 */
let recipes = require('express').Router();

/**
 * helper fuction to determined if admin is login
 * @param req
 * @param res
 * @param next
 */
function isAdmin(req, res, next) {
    // let now = new Date().getTime() / 1000;
    // // session valid for 60 mins only
    // if (req.session.admin && now - req.session.logTime <= 3600) {
    //     next();
    // } else {
    //     res.redirect('/auth/login');
    // }
    next();
}

/**
 * get form for adding a recipe, admin login required
 */
recipes.get('/add_recipe', isAdmin, (req, res) => {
    res.render('addEditRecipe4', {recipe:{}})
});

/**
 * handle recipe adding request
 */
recipes.post('/', isAdmin, (req, res) => {
    let recipe = req.body;
    console.log(recipe);
    let db = req.db;
    let collection = db.get('recipes');
    collection.insert(recipe)
        .then(doc => {
            res.status(201).send({success: true, recipe: doc})
        })
        .then(() => db.close);
});

/**
 * read a recipe given the recipe id
 */
recipes.get('/:id', (req, res) =>{
    let collection = req.db.get('recipes');
    collection.findOne({_id:req.params.id})
        .then(doc => res.status(200).send(doc))
        .catch(err => console.log(err));
});

/**
 * delete a recipe given hte recipe id
 */
recipes.delete('/:id', isAdmin, (req, res) => {
    let collection = req.db.get('recipes');
    collection.remove({_id:req.params.id})
        .then(doc => res.status(204).send(null))
        .catch(err => console.log(err));
});

/**
 * modify a recipe given the recipe id
 */
recipes.put('/:id', isAdmin, (req, res) =>{
    let collection = req.db.get('recipes');
    let recipe = req.body;
    collection.update({_id:req.params.id}, {$set:recipe})
        .then(doc => res.status(200).send(doc))
        .catch(err => console.log(err));
});

/**
 * get modification form given the recipe id
 */
recipes.get('/edit_recipe/:id', isAdmin, (req, res) =>{
    let collection = req.db.get('recipes');
    collection.findOne({_id:req.params.id})
        .then(doc => res.render('addEditRecipe4', {recipe:doc}))
        .catch(err => console.log(err));
});

module.exports = recipes;