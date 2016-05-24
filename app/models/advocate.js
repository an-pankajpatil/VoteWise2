// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Advocate', new Schema({
    user: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    required: true,
    areaOfInterest: {
      type: Schema.Types.ObjectId, ref: 'Category'
    },
    required: true,
    confirmed: Boolean,
    required: true,
    url: String,
    required: true,
    geoLocation: String //This will be another table 
}));