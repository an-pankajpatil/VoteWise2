// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    name:{
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    voterDistrict: String,
    fedRepresentative: String,
    stateSenate: String,
    StateRepresentative: String,
    schoolDistrict: String,
    judicialDistrict1: String,
    judicialDistrict2: String,
    judicialDistrict3: String,
    admin: Boolean,
    politician: Boolean,
    advocate: Boolean,
    press: Boolean,
    
    address: {
      type: Schema.Types.ObjectId, ref: 'Address'
   }


}));


