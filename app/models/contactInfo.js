var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Address = require('./address');

module.exports = mongoose.model('ContactInfo', new Schema({
  phone: String

});
