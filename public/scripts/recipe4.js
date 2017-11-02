/**
 * entry funtion to display a recipe
 */
function display_recipe() {
    //recipe id should be the div id
    let id = $(this).attr('id');
    fetch_and_load_recipe(id);
}

/**
 * fetch recipe data given recipe_id
 * @param recipe_id
 */
function fetch_and_load_recipe(recipe_id) {
    let request = new XMLHttpRequest();
    request.open("GET", `/recipes/${recipe_id}`);
    request.onreadystatechange = load_recipe;
    request.send(null);
}

/**
 * load recipe when response is ready
 */
function load_recipe() {
    if (this.readyState == 4 && this.status == 200) {
        let recipe = JSON.parse(this.responseText);
        $("#recipeDisplay").attr('data-r-id', recipe._id);
        init_img(recipe);
        init_ingredients(recipe);
        init_instruction(recipe);
        $('#recipeDisplay').show();
    }
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

/**
 * delete recipe button action
 */
function del_recipe(){
    let recipe_id = $("#recipeDisplay").attr('data-r-id');
    let request = new XMLHttpRequest();
    request.open("DELETE", `/recipes/${recipe_id}`);
    request.onreadystatechange = () => {
        if (request.readyState == 4){
            if(request.status == 204)
                $('#searchButton').click();
            else if (request.status === 404)
                // console.log(request);
                document.location.href = request.responseURL;
        }
    };
    request.send(null);
}

/**
 * edit recipe button action
 */
function edit_recipe(){
    let recipe_id = $("#recipeDisplay").attr('data-r-id');
    document.location.href = `/recipes/edit_recipe/${recipe_id}`;
}
