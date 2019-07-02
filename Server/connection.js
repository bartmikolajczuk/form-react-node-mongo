const mongoose = require('mongoose');
let db = mongoose.connection;
mongoose.connect(
  'mongodb://localhost:27017/your-db',
  options,
  err => {
    console.log(err);
  },
);

module.exports = mongoose;