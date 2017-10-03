// ingredient count minimum
const INGR_MIN_CNT = 2
var ingre_counter = 0;
// html validation pattern for ingredient input
const ingre_validation = "^[a-zA-Z][a-zA-Z\s]+$";

$(init);

function init() {
    // create addIngredient buttons 
    for (var i = 0; i < INGR_MIN_CNT; i++) {
        $('#addButton').click();
    }
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
 * remove the last ingredient input box
 */
function removeIngredient() {
    ingre_counter--;
    $("#ingreTBDiv" + ingre_counter).remove();
    // validation to ensure minimum count of ingredients by disabling remove button
    if (ingre_counter == INGR_MIN_CNT) {
        $("#removeButton").prop("disabled", true);
    }
};

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
    request = new XMLHttpRequest();
    request.open("GET", "/search?" + params);
    request.onreadystatechange = loadRecipes;
    request.send(null);
}

/**
 * display recipes when request is ready
 */
function loadRecipes() {
    if (request.readyState == 4 && request.status == 200) {
        var recipes = JSON.parse(request.responseText);
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
                        .append(img);
                    $("#All").append(div);
                    if (recipe.dietary.indexOf("vegetarian") >= 0)
                        $("#Vegetarian").append(div.clone());
                }
            });
    }
}