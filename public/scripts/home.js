const INGR_CNT_MIN = 2
var ingre_counter = 0;

function init() {
    for (var i = 0; i < INGR_CNT_MIN; i++) {
        document.getElementById('addButton').click();
    }
}

function addIngredient() {
    var fc = ('0' + (ingre_counter + 1)).slice(-2);
    var newTextBoxDiv = $(document.createElement('div'))
        .attr("id", 'TextBoxDiv' + ingre_counter);
    var html =
        '<label>Ingredient #' + fc + ': </label>' +
        '<input type="text" name="textbox' + fc + '" id="textbox' + fc + '" value="">';
    newTextBoxDiv.after().html(html);
    console.log(newTextBoxDiv);
    newTextBoxDiv.appendTo("#TextBoxesGroup");
    ingre_counter++;
    if (ingre_counter == (INGR_CNT_MIN + 1)) {
        document.getElementById("removeButton").disabled = false;
    }
};

function removeIngredient() {
    ingre_counter--;
    $("#TextBoxDiv" + ingre_counter).remove();
    if (ingre_counter == INGR_CNT_MIN) {
        document.getElementById("removeButton").disabled = true;
    }
};

function search() {
    document.getElementById("ingreForm").submit();
}