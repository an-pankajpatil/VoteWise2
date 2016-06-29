var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var helpers = require('../helpers/models');

module.exports = mongoose.model('Address', new Schema({

  city: String,
  county: String,
  street: String,
  state: String,
  zip: {
    type: Number
  },
  created: { type: Date, default: Date.now }


}));
