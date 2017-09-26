// ingredient count minimum
const INGR_MIN_CNT = 2
var ingre_counter = 0;
// html validation pattern for ingredient input
const ingre_validation = "^[a-zA-Z][a-zA-Z\s]+$";

function init() {
    // create addIngredient buttons 
    for (var i = 0; i < INGR_MIN_CNT; i++) {
        document.getElementById('addButton').click();
    }
}

/**
 * create one new ingredient input box
 */
function addIngredient() {
    var count_label = ('0' + (ingre_counter + 1)).slice(-2);
    count_label = "Ingredient #" + count_label;
    var div_id = "ingreTBDiv" + ingre_counter;
    var dd = (<div></div>);
    var div = $(document.createElement('div'))
        .attr("id", div_id);
    var label = $(document.createElement('label'))
        .after().html(count_label)
        .appendTo(div);
    var tbox = $(document.createElement('input'))
        .attr("type", "text")
        .attr("name", "textbox" + count_label)
        .attr("id", "textbox" + count_label)
        .attr("placeholder", "ingredient")
        .attr("pattern", ingre_validation)
        .attr("required", "")
        .appendTo(div);
    div.appendTo("#TextBoxesGroup");
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

function subbbmit() {
    console.log("test")
    alert("aaa");
}