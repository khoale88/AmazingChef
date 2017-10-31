let recipes = require('express').Router();

function isAdmin(req, res, next) {
    let now = new Date().getTime() / 1000;
    // session valid for 10 mins only
    if (req.session.admin && now - req.session.logTime <= 600) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

recipes.get('/add_recipe', isAdmin, (req, res) => {
    res.render('add_recipe', {})
});

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

recipes.get('/:id', (req, res) =>{
    let collection = req.db.get('recipes');
    collection.findOne({_id:req.params.id})
        .then(doc => res.status(200).send(doc))
        .catch(err => console.log(err));
});

recipes.delete('/:id', (req, res) => {
    let collection = req.db.get('recipes');
    collection.remove({_id:req.params.id})
        .then(doc => res.status(204).send(null))
        .catch(err => console.log(err));
});

recipes.put('/:id', (req, res) =>{
    let collection = req.db.get('recipes');
    let recipe = req.body;
    collection.update({_id:req.params.id}, {$set:recipe})
        .then(doc => res.send(doc))
        .catch(err => console.log(err));
});

module.exports = recipes;