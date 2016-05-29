// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('geoDivPA', new Schema({
  ZIPCensusTabulationArea: Number,
  FIPSstate: Number,
  vtd: Number,
  fedRep: Number,
  stateSen: Number,
  stateRep: Number,
  sduni: Number,
  sdelm: Number,
  sdsec: Number,
  statePostalCode: String,
  county: String,
  votingDistrictName: String,
  ElementarySchoolDistrict: Number,
  SecondarySchoolDistrict: Number,
  UnifiedSchoolDistrictName: String
  

}));
