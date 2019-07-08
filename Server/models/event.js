var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let EventSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  eventDate: Date
});

module.exports = mongoose.model('Event', EventSchema);