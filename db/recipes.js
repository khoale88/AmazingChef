var recipes = [
    { id:1,recipe_name: '1',ingredients: 'A', recipe: 'B'}
  , { id:2,recipe_name: '2',ingredients: 'B',recipe: 'C'}
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (recipes[idx]) {
      cb(null, recipes[idx]);
    } else {
      cb(new Error('Recipe' + id + ' does not exist'));
    }
  });
}

exports.findByRecipename = function(recipe_name, cb) {
  process.nextTick(function() {
    for (var i = 0, len = recipes.length; i < len; i++) {
      var recipe = recipes[i];
      if (recipe.recipe_name === recipe_names) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
