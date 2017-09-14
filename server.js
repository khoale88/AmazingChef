var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

// var cookieParser = require('cookie-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.use(express.static("views"));
// app.use(cookieParser());

app.get("/", function(req, res) {
    res.render("home.ejs");
})
app.get('/search_recipes', urlencodedParser, function(req, res) {
    var obj = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + "all.json", 'utf8'));
    res.render("search", obj);
})

app.post('/search_recipes', urlencodedParser, function(req, res) {
    var obj = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + "all.json", 'utf8'));
    res.render("search", obj);
})

var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})