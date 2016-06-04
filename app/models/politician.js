// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Politician', new Schema({
    user: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    website: String,
    questionsAnswered: Number,
    homeState: String,
    homeCity: String,
    homeZip: String,
    positionWanted: String,
    positionState: String,
    positionCity: String,
    positionCounty: String,
    additionalInfo: Boolean

}));
