/**
 * setup recipe name and image
 * @param {*} recipe recipe data
 */
function init_img(recipe) {
    $('#recipe_name')
        .text = recipe['recipe_name'].replace("_", " ");

    $('#recipe_img')
        .attr('src', recipe['image']['source'])
        .attr('width', '300px');
}

/**
 * setup recipe ingredients. the function will first remove ingredients from old recipe,
 * and then add ingredients from new recipe
 * @param {*} recipe recipe data
 */
function init_ingredients(recipe) {
    var tbl = document.getElementById('ingredient_table');
    // remove old recipe's ingredients
    for (var i = tbl.rows.length - 1; i > 0; i--)
        tbl.deleteRow(i);

    // add new recipe's ingredients
    for (var i = 0; i < recipe['ingredients'].length; i++) {
        var ingr = recipe['ingredients'][i];
        row = tbl.insertRow(i + 1);
        var ingr_name = row.insertCell(0);
        var ingr_qntt = row.insertCell(1);
        var ingr_note = row.insertCell(2);
        ingr_name.innerHTML = ingr["name"];
        ingr_qntt.innerHTML = ingr["quantity"] + " " + ingr["metric"];
        if (ingr['note']) ingr_note.innerHTML = ingr['note'];
    }
}

/**
 * setup recipe direction.
 * function will first remove steps from old recipe, and replace them by new recipe's data
 * @param {*} recipe recipe data
 */
function init_direction(recipe) {
    var direction_div = document.getElementById("direction");
    //remove aold recipe's steps
    var steps = document.getElementById("steps");
    if (steps)
        direction_div.removeChild(steps);

    // adding new recipe's steps
    var p = document.createElement('p');
    p.id = "steps";
    var ol = document.createElement('ol');
    for (var i in recipe['direction']) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(recipe['direction'][i]));
        ol.appendChild(li);
    }
    p.appendChild(ol);
    direction_div.appendChild(p);
}