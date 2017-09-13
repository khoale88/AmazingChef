var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
// var cookieParser = require('cookie-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static("views"));
// app.use(cookieParser());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/" + "home.html");
    // res.render("home.html");
})
app.get('/search_recipes', urlencodedParser, function(req, res) {
    console.log("get");
    res.sendFile(__dirname + "/recipes/" + "all.json");
})

app.post('/search_recipes', urlencodedParser, function(req, res) {
    // console.log("post")
    res.sendFile(__dirname + "/recipes/" + "all.json");
    // var obj = JSON.parse(fs.readFileSync(__dirname + "/recipes/" + "all.json", 'utf8'));
    // res.render("search.html", { data: all })
    // res.send(obj);
})

var server = app.listen(8123, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})