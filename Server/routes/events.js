let express = require('express');
let router = express.Router();
let Event = require('../models/event');


router.post('/', function (req, res, next) {
  const formValues = req.body.formValues;
  // console.log(formValues);


  let event = new Event({
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    email: formValues.email,
    eventDate: formValues.eventDate
  });
  console.log(event); // 'Silence'
  event.save(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.send(JSON.stringify(event))
});

module.exports = router;
