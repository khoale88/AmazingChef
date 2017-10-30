// Create a new Express application.
let express = require('express');
let app = express();
let mongo = require('mongodb');
let should = require("should");
const monk = require("monk");

let session = require('express-session');
// const url = 'localhost:27017/recipes';

// const db = monk(url);
//
// db.then(() => {
//     console.log('Connected correctly to server')
// })

// const collection = db.get('recipelist')
//for inserting documents
// collection.insert([{a: 2}, {a: 21}, {a: 31}])
//     .then((docs) => {
//     // docs contains the documents inserted with added **_id** fields
//     // Inserted 3 documents into the document collection
// }).catch((err) => {
//     // An error happened while inserting
// }).then(() => db.close())
//
//
// //for updating documents
// collection.insert([{a: 1}, {a: 2}, {a: 3}])
//     .then((docs) => {
//     // Inserted 3 documents into the document collection
// })
// .then(() => {
//
//     return collection.update({ a: 2 }, { $set: { b: 1 } })
//
// })
// .then((result) => {
//     // Updated the document with the field a equal to 2
// })
// .then(() => db.close())
//
// //delete a document
// collection.insert([{a: 31}, {a: 32}, {a: 33}])
//     .then((docs) => {
//     // Inserted 3 documents into the document collection
// })
// .then(() => collection.update({ a: 2 }, { $set: { b: 1 } }))
// .then((result) => {
//     // Updated the document with the field a equal to 2
// })
// .then(() => {
//
//     return collection.remove({ a: 31})
//
// }).then((result) => {
//     // Deleted the document with the field a equal to 3
// })
// .then(() => db.close())
//
//
// //For finding all documents
//
//
//
// .then(() => {
//     console.log(collection.find())
//     return collection.find()
//
//
// })
// .then((docs) => {
//     // docs === [{ a: 1 }, { a: 2, b: 1 }]
// })
// .then(() => db.close())



// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Configure static folder
app.use(express.static('public'));

var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
//var url = "mongodb://localhost:27017/recipes";

/*MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myobj = { recipename: "Company Inc", ingredients: "Highway 37",image:"" };
    db.collection("recipelist").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});*/




// Use application-level middleware for common functionality, including parsing, etc.
// app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
// let bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
// let urlencodedParser = bodyParser.urlencoded({ extended: false });
// let jsonParser = bodyParser.json();

app.use(session({secret: 'HaHaHa Khoa Arpita Ipsha'}))

app.use('/', require('./routes/index'));
app.use('/auth/', require('./routes/auth'))
// app.use('/khoa', );

// listen and print out host port to inform developers
let server = app.listen(3000,
    () => {
        let host = server.address().address;
        let port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port);
    }
);