let express = require('express');
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource');

  mongoose.connect('mongodb://localhost/EventAppDatabase', {useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    let eventSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      eventDate: Date
    });

    let Event = mongoose.model('Event', eventSchema);
    let testEvent = new Event({
      firstName: 'Bart',
      lastName: 'Mikolajczuk',
      email: 'bart.mikolajczuk@gmail.com',
      eventDate: '2019-12-12'
    });
    console.log(testEvent); // 'Silence'


    testEvent.save(function (err) {
      if (err) return console.error(err);
    });
  });

});

module.exports = router;
