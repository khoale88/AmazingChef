// ingredient count minimum
const INGR_MIN_CNT = 2;
let ingredients; //ingredients = [egg, potato]

$(init);

function init() {        
    $('#dialog').hide() 
    initIngredients();

}

function initIngredients(){
    let request = new XMLHttpRequest();
    request.open("GET", "/ingredients");
    request.onreadystatechange = function () {
        if(request.readyState==4 && request.status == 200)
            ingredients = JSON.parse(request.responseText);
        initIngreMenu();

    };
    request.send(null);
    initIngreBar();
}

function initIngreMenu(){
    for(let catId in ingredients){
        let category = ingredients[catId];
        $("<h3></h3>").html(catId).appendTo("#ingreMenu");
        let div = $("<div></div>").appendTo("#ingreMenu");
        div = $("<div></div>").css("display","flex").attr("id",catId).addClass("ingreBar rounded-div").appendTo(div);
        for(let i in category) {
            let ingre = category[i];
            $("<div></div>").attr("id", `${catId}--${ingre.name}`)
                .html(ingre.name)
                .addClass("ingreBut")
                .appendTo(`#${catId}`)
                .addClass("rounded-div")
                .draggable({
                    scope: "ingre",
                    helper: "clone"
                });
        }
    }
    setTimeout(() => $("#ingreMenu").accordion(), 1);
}

function initIngreBar(){
    $("#ingreBar").resizable({
            containment: "parent",
            minWidth: 270
            })        
            .droppable({
            activeClass: "ui-state-highlight",
            scope: "ingre",
            over: function (event, ui) {
                if(!$(this).find("#" + ui.draggable.attr("id")).length)
                    ui.draggable.appendTo(this);
            },
            out: function (event, ui) {
                let catId = ui.draggable.attr("id");
                catId = catId.slice(0, catId.indexOf("--"));
                ui.draggable.appendTo(`#${catId}`);
            }
    });
}

function searches3(){
    let ingres = $("#ingreBar").find(".ingreBut");
    if(ingres.length < INGR_MIN_CNT){
        //alert(`minimum ${INGR_MIN_CNT} ingredients are required`);
        $('#dialog').show().effect( "shake" ).dialog({
          dialogClass:  "alert"
        });
        $('#dialog').hide()
        return
    }
    let params = [];
    $.each(ingres, i => {params.push($(ingres[i]).html())});
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
        })
        .effect("slide");
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