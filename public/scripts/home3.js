// ingredient count minimum
const INGR_MIN_CNT = 2
var ingre_counter = 0;
// html validation pattern for ingredient input
const ingre_validation = "^[a-zA-Z][a-zA-Z\s]+$";
var ingredients;

$(init);

function init() {
    // create addIngredient buttons 
    for (var i = 0; i < INGR_MIN_CNT; i++) {
        $('#addButton').click();
    }
    initIngredients();
}

/**
 * create one new ingredient input box
 */
function addIngredient() {
    var count_label = ('0' + (ingre_counter + 1)).slice(-2);
    var label = $("<label></label>").html("Ingredient #" + count_label);
    var tbox = $("<input>")
        .attr("type", "text")
        .attr("name", "textbox" + count_label)
        .attr("id", "textbox" + count_label)
        .attr("placeholder", "ingredient")
        .attr("pattern", ingre_validation)
        .attr("required", "");

    defaultIngredients(tbox);

    var div = $("<div></div>")
        .attr("id", "ingreTBDiv" + ingre_counter)
        .append(label)
        .append(tbox)
        .appendTo("#TextBoxesGroup");
    ingre_counter++;
    // enable remove button
    if (ingre_counter == (INGR_MIN_CNT + 1)) {
        $("#removeButton").prop("disabled", false);
    }
};

/**
 * helper function to set default values for ingredient boxes
 * @param box
 */
function defaultIngredients(box){
    if(!(ingre_counter % 2))
        box.val("egg");
    else
        box.val("potato");
}

/**
 * remove the last ingredient input box
 */
function removeIngredient() {
    ingre_counter--;
    $("#ingreTBDiv" + ingre_counter).remove();
    // validation to ensure minimum count of ingredients by disabling remove button
    if (ingre_counter == INGR_MIN_CNT) {
        $("#removeButton").prop("disabled", true);
    }
}

function initIngredients(){
    var request = new XMLHttpRequest();
    request.open("GET", "/ingredients");
    request.onreadystatechange = function () {
        if(request.readyState==4 && request.status == 200)
            ingredients = JSON.parse(request.responseText);
    }
    request.send(null);
}

/**
 * validation and send ajax request
 */
function searches() {
    // minor validation
    if (!$("#ingreForm")[0].checkValidity()) {
        alert("Make sure you fill all ingredient correctly");
        return;
    }

    var params = $("#ingreForm").serialize();
    var request = new XMLHttpRequest();
    request.open("GET", "/search?" + params);
    request.onreadystatechange = loadRecipes;
    request.send(null);
}

/**
 * display recipes when request is ready
 */
function loadRecipes() {
    if (this.readyState == 4 && this.status == 200) {
        var recipes = JSON.parse(this.responseText);
        //reload
        $("#searchResult").load("recipes/search_result.html",
            //after load
            function() {
                //enable tab widget
                $("#recipe_tabs").tabs();
                // update message
                $("#notification").html(recipes.length + " recipes have been found.");
                // create recipe shortcut
                for (var i = 0; i < recipes.length; i++) {
                    var recipe = recipes[i];
                    var img = $("<img>")
                        .attr("src", recipe.image.source);
                    // AJAX tabs
                    img = $("<a></a>")
                        .attr("href", recipe.href)
                        .append(img);
                    var div = $("<div></div>")
                        .attr("id", recipe.recipe_name)
                        .addClass("recipe-button")
                        // .css("background-image","url("+recipe.image.source+")");
                        .append(img);
                    findOrCreateDivWithClass("All", "recipeContainer").append(div);
                    if (recipe.dietary.indexOf("vegetarian") >= 0)
                        findOrCreateDivWithClass("Vegetarian", "recipeContainer").append(div.clone());
                }
            });
    }
}

/**
 *
 * @param parentId
 * @param className
 * @returns {*}
 */
function findOrCreateDivWithClass(parentId, className){
    var container = $("#"+parentId).find("."+className);
    if (!container.length)
        container = $("<div></div>").addClass(className).appendTo("#"+parentId);
    return container;
}