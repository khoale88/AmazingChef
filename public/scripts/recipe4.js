/**
 * entry funtion to display a recipe
 */
function display_recipe() {
    //recipe id should be the div id
    let id = $(this).attr('id');
    fetchLoadRecipe(id);
}

/**
 * fetch recipe data given recipe_id
 * @param recipe_id
 */
function fetchLoadRecipe(recipe_id) {
    let request = new XMLHttpRequest();
    request.open("GET", `/recipes/${recipe_id}`);
    request.onreadystatechange = loadRecipe;
    request.send(null);
}

/**
 * load recipe when response is ready
 */
function loadRecipe() {
    if (this.readyState == 4 && this.status == 200) {
        let recipe = JSON.parse(this.responseText);
        $("#recipeDisplay").attr('data-r-id', recipe._id);
        loadImg(recipe);
        loadIngredients(recipe);
        loadInstruction(recipe);
        $('#recipeDisplay').show();
    }
}

/**
 * setup recipe name and image
 * @param {*} recipe recipe data
 */
function loadImg(recipe) {
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
function loadIngredients(recipe) {
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
function loadInstruction(recipe) {
    //remove old recipe's steps
    $("#steps").empty();
    recipe['instruction'].forEach(instruction => {
        $('<li>').appendTo("#steps").html(instruction);
    });
}

/**
 * delete recipe button action
 */
function delRecipe(){
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
function editRecipe(){
    let recipe_id = $("#recipeDisplay").attr('data-r-id');
    document.location.href = `/recipes/edit_recipe/${recipe_id}`;
}
