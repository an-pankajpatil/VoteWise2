// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Politician', new Schema({
    user: {
      type: Schema.Types.ObjectId, ref: 'User'
    }
    position: String, // this will be another table
    required: true,
    contactInfo: { phone: String email:  }, // other info here
    website: String,
    questionsAnswered: Number

}));
