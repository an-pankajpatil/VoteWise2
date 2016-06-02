// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Advocate', new Schema({
    userId: {
      type: Schema.Types.ObjectId, ref: 'User',
      required: true
    },
    areaOfInterest: {
      type: Schema.Types.ObjectId, ref: 'Category',
      required: true
    },
    confirmed:{
      type: Boolean,
      required: true
    },
    url: {
      type: String,
      required: true
    } 
}));
