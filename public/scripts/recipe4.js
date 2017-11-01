function display_recipe() {
    let recipe = recipes.filter(recipe => recipe.recipe_name === $(this).attr('id'));
    if (recipe) {
        get_and_load_recipe(recipe[0]['_id']);
    }
}

function get_and_load_recipe(recipe_id) {
    let request = new XMLHttpRequest();
    request.open("GET", `/recipes/${recipe_id}`);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let recipe = JSON.parse(this.responseText);
            load_recipe(recipe);
        }
    };
    request.send(null);
}

function load_recipe(recipe){
    init_img(recipe);
    init_ingredients(recipe);
    init_instruction(recipe);
    $('#recipeDisplay').show();
}

/**
 * setup recipe name and image
 * @param {*} recipe recipe data
 */
function init_img(recipe) {
    $('#recipe_name')
        .html(recipe['recipe_name'].replace("_", " "));

    $('#recipe_img')
        .attr('src', recipe['image']['source'])
        .attr('width', '300px');
}

/**
 * setup recipe ingredients. the function will first remove ingredients from old recipe,
 * and then add ingredients from new recipe
 * @param {*} recipe recipe data
 */
function init_ingredients(recipe) {
    $('#ingr_body').empty();
    recipe['ingredients'].forEach(ingr => {
        let tr = $('<tr>').appendTo('#ingr_body');
        $('<td>').appendTo(tr).html(ingr.name);
        $('<td>').appendTo(tr).html(ingr.quantity);
        $('<td>').appendTo(tr).html(ingr.note);
    })
}

/**
 * setup recipe direction.
 * function will first remove steps from old recipe, and replace them by new recipe's data
 * @param {*} recipe recipe data
 */
function init_instruction(recipe) {
    //remove old recipe's steps
    $("#steps").empty();
    recipe['instruction'].forEach(instruction => {
        $('<li>').appendTo("#steps").html(instruction);
    });
}