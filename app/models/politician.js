// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Politician', new Schema({
    name: String,
    username: String,
    password: String,
    address: { street: String, city: String, state: String ,zip: String },
    position: String, // this will be another table
    contactInfo: { phone: String  }, // other info here
    website: String

}));
