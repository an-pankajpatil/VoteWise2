// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    name: String,
    // required: true,
    username: String,
    // required: true,
    email: String,
    // required: true,
    password: String,
    // required: true,
    admin: Boolean,
    politician: Boolean,
    advocate: Boolean,
    press: Boolean,
    address: {
      type: Schema.Types.ObjectId, ref: 'Address'
   }


}));
