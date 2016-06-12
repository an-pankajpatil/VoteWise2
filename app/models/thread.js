// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Thread', new Schema({

  title: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  geo: {
    type: Schema.Types.ObjectId, ref: 'geoDivPA'
  },
  created: { type: Date, default: Date.now }

}));
