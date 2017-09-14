exports.checkingredient = function(req, res) {
    var ingredient1 = req.param("ingredient1");
    console.log('Ingredient1');
    var json_responses;

    console.log('API Called checklogin...');
    console.log(req.param);


        res.render("omlette", {ingredient1 : 'eggs'});


};