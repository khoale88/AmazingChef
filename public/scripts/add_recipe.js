// ingredient count minimum
const INGR_MIN_CNT = 1;
const INST_MIN_CNT = 1;

let ingre_counter = 0;
let inst_counter = 0;

// html validation pattern for ingredient input
const ingre_validation = "^[a-zA-Z][a-zA-Z\s]+$";

$(document).ready(init);

function init() {
    // create addIngredient buttons 
    for (let i = 0; i < INGR_MIN_CNT; i++) {
        $('#add-ingr').click();
    }
    for (let i = 0; i < INST_MIN_CNT; i++) {
        $('#add-inst').click();
    }
};

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
        .attr("required", "")
        .addClass('ingr-note')
        .appendTo(div);
    if(ingre_counter >= INGR_MIN_CNT) {
        $('<button></button>')
            .click("ingreTBDiv" + count_label, removeIngredient)
            .appendTo(div)
            .html(' - ');
    }
    div.appendTo("#ingr-group");
    ingre_counter++;
};

function removeDiv(divId){
    $('#' + divId).remove();
};

/**
 * remove the last ingredient input box
 */
function removeIngredient(event) {
    removeDiv(event.data);
};

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
    if(inst_counter >= INST_MIN_CNT) {
        $('<button></button>')
            .click("instTBDiv" + count_label, removeInstruction)
            .appendTo(div)
            .html(' - ');
    }
    div.appendTo("#inst-group");
    inst_counter++;
};

/**
 * remove the last ingredient input box
 */
function removeInstruction(event) {
    removeDiv(event.data);
};

function submitRecipe(){
    data = {};
    data.ingredients = getIngr();
    data.instruction = getInst();
    d = getInfo();
    for (let k in d){
        data[k] = d[k];
    }
    let request = new XMLHttpRequest();
    request.open("POST", "/add_recipe", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        if(request.readyState==4 && request.status == 200)
            console.log('done');
    };
    request.send(JSON.stringify(data));
};

function getIngr(){
    let keys = ['name', 'quantity', 'unit', 'note'];
    let ingr = [];
    $('.ingre').each((index, item) => {
        let b = {};
        $(keys).each((i, k) => {
            b[k] = $(item).find('.ingr-' + k).val();
        });
        ingr.push(b);
    });
    return ingr;
};

function getInst(){
    let inst = [];
    $('.inst').each((index, item) => {
        inst.push($(item).val());
    });
    return inst;
};

function getInfo(){
    let info={};
    info.recipe_name = $('.recipe_name').val();
    info.cruisine_type = $('.cruisine_type').val().split(',');
    info.meal_type = $('.meal_type').val().split(',');
    info.image = {};
    info.image.source = $('.image_url').val();
    info.image.type = 'url';
    info.dietary = $('.dietary').val().split(',');
    info.cook_time = $('.cook_time').val();
    return info;
};