const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  eventDate: Date
});

module.exports = mongoose.model('Event', EventSchema);