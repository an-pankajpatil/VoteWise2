// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Post', new Schema({

  content: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  geo: {
    type: Schema.Types.ObjectId, ref: 'geoDivPA'
  },
  threadId: {
   type: Schema.Types.ObjectId, ref: 'Thread'
 },
  created: { type: Date, default: Date.now }

}));
