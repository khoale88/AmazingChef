// ingredient count minimum
const INGR_MIN_CNT = 2;
let ingredients; //ingredients = [egg, potato]

$(init);

function init() {
    $(':header').addClass('ui-widget-header').addClass('ui-corner-all');
    $('#dialog').hide();
    initIngredients();

}

function initIngredients() {
    let request = new XMLHttpRequest();
    request.open("GET", "/ingredients");
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200)
            ingredients = JSON.parse(request.responseText);
        initIngreMenu();
    };
    request.send(null);
    initIngreBar();
}

function initIngreMenu() {
    for (let catId in ingredients) {
        let category = ingredients[catId];
        $("<h3>").html(catId).appendTo("#ingreMenu");
        let div = $("<div>").appendTo("#ingreMenu");
        div = $("<div>").css("display", "flex").attr("id", catId).addClass("ingreBar rounded-div").appendTo(div);
        category.forEach(ingr => {
            $("<div>").attr("id", `${catId}--${ingr.name}`)
                .html(ingr.name)
                .addClass("ingreBut")
                .appendTo(`#${catId}`)
                .addClass("rounded-div")
                .draggable({
                    scope: "ingre",
                    helper: "clone"
                });
        })
    }
    setTimeout(() => $("#ingreMenu").accordion(), 1);
}

function initIngreBar() {
    $("#ingreBar")
        .resizable({
            containment: "parent",
            minWidth: 270
        })
        .droppable({
            activeClass: "ui-state-highlight",
            scope: "ingre",
            over: function (event, ui) {
                if (!$(this).find("#" + ui.draggable.attr("id")).length)
                    ui.draggable.appendTo(this);
            },
            out: function (event, ui) {
                let catId = ui.draggable.attr("id");
                catId = catId.slice(0, catId.indexOf("--"));
                ui.draggable.appendTo(`#${catId}`);
            }
        })
        .addClass('ui-widget')
        .addClass('ui-widget-content')
        .addClass('ui-corner-all');
}

function searches() {
    $('#recipeDisplay').hide();
    let ingres = $("#ingreBar").find(".ingreBut");
    if (ingres.length < INGR_MIN_CNT) {
        //alert(`minimum ${INGR_MIN_CNT} ingredients are required`);
        $('#dialog').show().effect("shake").dialog({
            dialogClass: "alert"
        });
        $('#dialog').hide();
        return;
    }
    let params = [];
    $.each(ingres, i => {
        params.push($(ingres[i]).html())
    });
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
            recipes.forEach(recipe => {
                let img = $("<img>").attr("src", recipe.image.source);
                // store recipe._id as div id, and name as data-name
                let div = $("<div>").attr("id", recipe._id)
                    .attr("data-name", recipe.recipe_name)
                    .addClass("recipe-button")
                    .click(display_recipe)
                    .append(img);
                findOrCreateDivWithClass("All", "recipeContainer").append(div);
            })
        })
            .effect("slide");
    }
}

/**
 * look for div with the class of className in div by parentId, if not, create a new one
 * @param parentId
 * @param className
 * @returns {*}
 */
function findOrCreateDivWithClass(parentId, className) {
    let container = $(`#${parentId}`).find(`.${className}`);
    if (!container.length)
        container = $("<div>").addClass(className).appendTo(`#${parentId}`);
    return container;
}