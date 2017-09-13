var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('views'));
// app.use(cookieParser());


app.get('/search_recipes', urlencodedParser, function(req, res) {
    res.sendFile(__dirname + "/recipes/" + "all.json");
})

app.post('/search_recipes', urlencodedParser, function(req, res) {
    res.sendFile(__dirname + "/recipes/" + "all.json");
})

var server = app.listen(8123, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})