/**
 * a recipe container displays essential information of all recipes it receives from server
 * @param {*} recipes all recipes to display in container
 */
function init_container(recipes) {
    document.getElementById("notification").innerHTML = recipes.length + " recipes have been found.";
    if (recipes.length === 0) {
        return
    }
    // enable visibility for the 1st time
    var recipeContainer = document.getElementById("recipeContainer");
    if (recipeContainer.style.display !== "flex") {
        recipeContainer.style.display = "flex";
    }
    // display essential recipes' info, including recipe image and recipe name
    for (var i = 0; i < recipes.length; i++) {
        var recipe = recipes[i];
        var img = '<img src="' + recipe['image']['source'] + '">';
        var div = document.createElement("div");
        div.innerHTML += '<p>' + img + '<br>' + recipe['recipe_name'] + '</p>';
        div.id = recipe['recipe_name'];
        div.setAttribute("data-r_index", i);
        // assign recipe-button class, style is defined in css
        div.setAttribute("class", "recipe-button");
        // assign clicked function which return the div itself
        div.setAttribute("onclick", "display_recipe(this)");
        recipeContainer.appendChild(div);
    }
}

/**
 * a recipe has 3 main parts title/image, ingredients and direction
 * @param {*} element the clicked object
 */
function display_recipe(element) {
    var recipe = recipes[element.getAttribute('data-r_index')];
    init_img(recipe);
    init_ingredients(recipe);
    init_direction(recipe);

    // enable visibility for the 1st time
    var recipeDisplay = document.getElementById("recipeDisplay");
    if (recipeDisplay.style.display === "none") {
        recipeDisplay.style.display = "block";
    }
}