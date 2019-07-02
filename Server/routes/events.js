let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  eventDate: Date
});

let Event = mongoose.model('Event', eventSchema);
let testEvent;
router.post('/', function (req, res, next) {
  const formValues = req.body.formValues;
  // console.log(formValues);

  testEvent = new Event({
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    email: formValues.email,
    eventDate: formValues.eventDate
  });
  console.log(testEvent); // 'Silence'
  testEvent.save(function (err) {
    if (err) { return next(err); }
  });
  res.send(JSON.stringify(testEvent))
});

module.exports = router;
