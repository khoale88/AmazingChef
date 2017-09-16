function init_container(recipes) {
    document.getElementById("notification").innerHTML = recipes.length + " recipes have been found.";
    if (recipes.length === 0) {
        return
    }
    var recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.style.display = "flex";
    for (var i = 0; i < recipes.length; i++) {
        var recipe = recipes[i];
        var img = '<img src="' + recipe['image']['source'] + '">';
        var div = document.createElement("div");
        div.innerHTML = '<p>' + img + '<br>' + recipe['recipe_name'] + '</p>';
        div.id = recipe['recipe_name'];
        div.setAttribute("data-r_index", i);
        div.setAttribute("class", "recipe");
        div.setAttribute("onclick", "display_recipe(this)");
        recipeContainer.appendChild(div);
    }
}

function display_recipe(element) {
    var recipe = recipes[element.getAttribute('data-r_index')];
    document.getElementById('recipe_name')
        .innerHTML = recipe['recipe_name'].replace("_", " ");
    init_img(recipe);
    init_ingredients(recipe);
    init_direction(recipe);

    var recipeDisplay = document.getElementById("recipeDisplay");

    if (recipeDisplay.style.display === "none") {
        recipeDisplay.style.display = "block";
    }
}