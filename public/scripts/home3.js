// ingredient count minimum
const INGR_MIN_CNT = 2
var ingredients;

$(init);

function init() {
    // create addIngredient buttons 
    for (var i = 0; i < INGR_MIN_CNT; i++) {
        $('#addButton').click();
    }
    initIngredients();
}

function initIngredients(){
    var request = new XMLHttpRequest();
    request.open("GET", "/ingredients");
    request.onreadystatechange = function () {
        if(request.readyState==4 && request.status == 200) {
            ingredients = JSON.parse(request.responseText);
            initIngreMenu();
        }
    }
    request.send(null);
    initIngreBar();
}

function initIngreMenu(){
    for(var i in ingredients){
        var ingre = ingredients[i];
        $("<div></div>").attr("id",ingre.name)
            .html(ingre.name)
            .addClass("ingreBut")
            .appendTo("#ingreMenu")
            .draggable({
                scope: "ingre",
                helper: "clone"
            });
    }
}

function initIngreBar(){
    $("#ingreBar").droppable({
        activeClass: "ui-state-highlight",
        scope: "ingre",
        over: function(event, ui){
            if(!$(this).find("#" + ui.draggable.attr("id")).length)
                ui.draggable.appendTo(this);
        },
        out: function(event, ui){
            ui.draggable.appendTo("#ingreMenu");
        }
    });
}

function searches3(){
    var ingres = $("#ingreBar").find(".ingreBut");
    if(ingres.length < INGR_MIN_CNT){
        alert(INGR_MIN_CNT + " minimum");
        return
    }
    var params = [];
    ingres.each(function(){params.push($(this).attr("id"))})
    var request = new XMLHttpRequest();
    request.open("GET", "/search?ingredients=" + JSON.stringify(params));
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
                    var img = $("<img>").attr("src", recipe.image.source);
                    // AJAX tabs
                    img = $("<a></a>").attr("href", recipe.href)
                        .append(img);
                    var div = $("<div></div>")
                        .attr("id", recipe.recipe_name)
                        .addClass("recipe-button")
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