function init_img(recipe) {
    var img = document.getElementById('recipe_img');
    img.setAttribute('src', recipe['image']['source']);
    img.setAttribute('width', '304px');
    img.setAttribute('height', '228px');
}

function init_ingredients(recipe) {
    var tbl = document.getElementById('ingredient_table');
    tbl.setAttribute('border', '1');
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
    var p = document.createElement('p');
    var ol = document.createElement('ol');
    for (var i in recipe['direction']) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(recipe['direction'][i]));
        ol.appendChild(li);
    }
    p.appendChild(ol);
    document.getElementById("direction")
        .appendChild(p);
}