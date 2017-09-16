function init_img(recipe) {
    var img = document.getElementById('recipe_img');
    img.setAttribute('src', recipe['image']['source']);
    img.setAttribute('width', '300px');
}

function init_ingredients(recipe) {
    var tbl = document.getElementById('ingredient_table');
    for (var i = tbl.rows.length - 1; i > 0; i--) {
        tbl.deleteRow(i);
    }
    for (var i = 0; i < recipe['ingredients'].length; i++) {
        row = tbl.insertRow(i + 1);
        var ingredient = row.insertCell(0);
        var quantity = row.insertCell(1);
        var note = row.insertCell(2);
        ingredient.innerHTML = recipe['ingredients'][i]['name'];
        quantity.innerHTML = recipe['ingredients'][i]['quantity'] + ' ' + recipe['ingredients'][i]['metric'];
        var note_text = recipe['ingredients'][i]['note']
        if (note_text) {
            note.innerHTML = note_text
        }
    }
}

function init_direction(recipe) {
    var direction = document.getElementById("direction");
    var steps = document.getElementById("steps");
    if (steps) {
        direction.removeChild();
    }

    var p = document.createElement('p');
    p.id = "steps";
    var ol = document.createElement('ol');
    for (var i in recipe['direction']) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(recipe['direction'][i]));
        ol.appendChild(li);
    }
    p.appendChild(ol);

    direction.appendChild(p);
}