// ingredient count minimum
const INGR_MIN_CNT = 1;
const INST_MIN_CNT = 1;

let ingre_counter = 0;
let inst_counter = 0;

$(document).ready(init);

function init() {
    if (is_editing()) {
        initRecipe(recipe);
    } else {
        // create addIngredient buttons
        for (let i = 0; i < INGR_MIN_CNT; i++) {
            $('#add-ingr').click();
        }
        for (let i = 0; i < INST_MIN_CNT; i++) {
            $('#add-inst').click();
        }
    }
}

function is_editing(){
    return !$.isEmptyObject(recipe)
}

function initRecipe(recipe) {
    $("#recipe_name input").val(recipe.recipe_name);
    $("#image_url input").val(recipe.image.source);
    $("#cruisine_type input").val(recipe.cruisine_type.join(','));
    $("#meal_type input").val(recipe.meal_type.join(','));
    $("#dietary input").val(recipe.dietary.join(','));
    $("#cook_time input").val(recipe.cook_time);

    recipe.ingredients.forEach(ingr => {
        let count_label = ('0' + (ingre_counter + 1)).slice(-2);
        $("#add-ingr").click();
        $(`#ingr-${count_label}`).val(ingr.name);
        $(`#quantity-${count_label}`).val(ingr.quantity);
        $(`#metric-${count_label}`).val(ingr.metric);
        $(`#note-${count_label}`).val(ingr.note);
    });

    recipe.instruction.forEach(inst => {
        let count_label = ('0' + (inst_counter + 1)).slice(-2);
        $("#add-inst").click();
        $(`#inst-${count_label}`).val(inst);
    })
}

/**
 * create one new ingredient input box
 */
function addIngredient() {
    let count_label = ('0' + (ingre_counter + 1)).slice(-2);
    let div = $('<div></div>')
        .attr("id", "ingreTBDiv" + count_label)
        .css("display", "flex")
        .addClass("ingre");
    $('<input>').attr("id", "ingr-" + count_label)
        .attr("name", "ingr-" + count_label)
        .attr("type", "text")
        .attr("placeholder", "ingredient")
        .attr("required", "")
        .addClass('ingr-name')
        .appendTo(div);
    $('<input>').attr("id", "quantity-" + count_label)
        .attr("name", "quantity-" + count_label)
        .attr("type", "text")
        .attr("placeholder", "quantity")
        .attr("required", "")
        .addClass('ingr-quantity')
        .appendTo(div);
    $('<input>').attr("id", "metric-" + count_label)
        .attr("name", "metric-" + count_label)
        .attr("type", "text")
        .attr("placeholder", "metric")
        .attr("required", "")
        .addClass('ingr-metric')
        .appendTo(div);
    $('<input>').attr("id", "note-" + count_label)
        .attr("name", "note-" + count_label)
        .attr("type", "text")
        .attr("placeholder", "note")
        .addClass('ingr-note')
        .appendTo(div);
    if (ingre_counter >= INGR_MIN_CNT) {
        $('<button></button>')
            .click("ingreTBDiv" + count_label, removeIngredient)
            .appendTo(div)
            .html(' - ');
    }
    div.appendTo("#ingr-group");
    ingre_counter++;
}

function removeDiv(divId) {
    $('#' + divId).remove();
}

/**
 * remove the last ingredient input box
 */
function removeIngredient(event) {
    removeDiv(event.data);
}

function addInstruction() {
    let count_label = ('0' + (inst_counter + 1)).slice(-2);
    let div = $('<div></div>')
        .attr("id", "instTBDiv" + count_label)
        .css("display", "flex");
    $('<textarea>').attr("id", "inst-" + count_label)
        .attr("name", "inst-" + count_label)
        .attr("rows", "4").attr("cols", "50")
        .attr("placeholder", "instruction")
        .attr("required", "")
        .addClass("inst")
        .appendTo(div);
    if (inst_counter >= INST_MIN_CNT) {
        $('<button></button>')
            .click("instTBDiv" + count_label, removeInstruction)
            .appendTo(div)
            .html(' - ');
    }
    div.appendTo("#inst-group");
    inst_counter++;
}

/**
 * remove the last ingredient input box
 */
function removeInstruction(event) {
    removeDiv(event.data);
}

function submitRecipe() {
    data = {};
    data.ingredients = getIngr();
    data.instruction = getInst();
    d = getInfo();
    for (let k in d) {
        data[k] = d[k];
    }

    let method = "POST";
    let uri = "/recipes";
    if (is_editing()) {
        method = "PUT";
        uri += `/${recipe._id}`;
    }

    let request = new XMLHttpRequest();
    request.open(method, uri, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        if (request.readyState === 4){
            if(request.status === 201)
                $('#form-reset').click();
            else if (request.status === 200)
                document.location.href = "/";
        }
    };
    request.send(JSON.stringify(data));
}

function getIngr() {
    let keys = ['name', 'quantity', 'metric', 'note'];
    let ingr = [];
    $('.ingre').each((index, item) => {
        let b = {};
        $(keys).each((i, k) => {
            b[k] = $(item).find('.ingr-' + k).val();
        });
        ingr.push(b);
    });
    return ingr;
}

function getInst() {
    let inst = [];
    $('.inst').each((index, item) => {
        inst.push($(item).val());
    });
    return inst;
}

function getInfo() {
    let info = {};
    info.recipe_name = $('.recipe_name').val();
    info.cruisine_type = $('.cruisine_type').val().split(',');
    info.meal_type = $('.meal_type').val().split(',');
    info.image = {};
    info.image.source = $('.image_url').val();
    info.image.type = 'url';
    info.dietary = $('.dietary').val().split(',');
    info.cook_time = $('.cook_time').val();
    return info;
}