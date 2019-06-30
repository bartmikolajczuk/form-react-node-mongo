var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });


  MongoClient.connect('mongodb://localhost:27017/EventAppDatabase', function (err, client) {
    if (err) throw err

    var db = client.db('EventAppDatabase');
    db.collection('events').insertMany([{name: 'Togo'}, {name: 'Syd'}], (err, result) => {
      console.log(result)
    });
    db.collection('events').find().toArray(function (err, result) {
      if (err) throw err;

      console.log(result)
    })
  })
});

module.exports = router;
