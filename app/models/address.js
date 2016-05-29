var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var helpers = require('../helpers/models');

module.exports = mongoose.model('Address', new Schema({

  city: String,
  county: String,
  street: String,
  streetNumber: Number,
  zip: String
  
}));
