// ingredient count minimum
const INGR_MIN_CNT = 2;
let ingredients;

$(init);

function init() {
    initIngredients();
}

function initIngredients(){
    let request = new XMLHttpRequest();
    request.open("GET", "/ingredients");
    request.onreadystatechange = function () {
        if(request.readyState==4 && request.status == 200) {
            ingredients = JSON.parse(request.responseText);
            initIngreMenu();
        }
    };
    request.send(null);
    initIngreBar();
}

function initIngreMenu(){
    for(let i in ingredients){
        let ingre = ingredients[i];
        $("<div></div>").attr("id",ingre.name)
            .html(ingre.name)
            .addClass("ingreBut")
            .appendTo("#ingreMenu")
            .addClass("rounded-div")
            .draggable({
                // scope: "ingre",
                helper: "clone"
            });
    }
}

function initIngreBar(){
    $("#ingreBar").droppable({
        activeClass: "ui-state-highlight",
        // scope: "ingre",
        over: function (event, ui) {
            if(!$(this).find("#" + ui.draggable.attr("id")).length)
                ui.draggable.appendTo(this);
        },
        out: function (event, ui) {
            ui.draggable.appendTo("#ingreMenu");
        }
    });
}

function searches3(){
    let ingres = $("#ingreBar").find(".ingreBut");
    if(ingres.length < INGR_MIN_CNT){
        alert(`minimum ${INGR_MIN_CNT} ingredients are required`);
        return
    }
    let params = [];
    $.each(ingres, i => {params.push($(ingres[i]).attr("id"))});
    let request = new XMLHttpRequest();
    request.open("GET", `/search?ingredients=${JSON.stringify(params)}`);
    request.onreadystatechange = loadRecipes;
    request.send(null);
}


/**
 * display recipes when request is ready
 */
function loadRecipes() {
    if (this.readyState == 4 && this.status == 200) {
        let recipes = JSON.parse(this.responseText);
        //reload
        $("#searchResult").load("recipes/search_result.html", () => {
            //enable tab widget
            $("#recipe_tabs").tabs();
            // update message
            $("#notification").html(`${recipes.length} recipes have been found.`);
            // create recipe shortcut
            for (let i = 0; i < recipes.length; i++) {
                let recipe = recipes[i];
                let img = $("<img>").attr("src", recipe.image.source);
                // AJAX tabs
                img = $("<a></a>").attr("href", recipe.href)
                    .append(img);
                let div = $("<div></div>").attr("id", recipe.recipe_name)
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
    let container = $(`#${parentId}`).find(`.${className}`);
    if (!container.length)
        container = $("<div></div>").addClass(className).appendTo(`#${parentId}`);
    return container;
}