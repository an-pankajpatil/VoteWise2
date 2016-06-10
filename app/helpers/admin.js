var Advocate = require('../models/advocate');
var AreaOfInterest = require('../models/category');
var Press = require('../models/press');
var Politician =require('../models/politician');

module.exports.rdmNum = function ( length ) {

if ( length === undefined ) {
  length = 8;
}

var text = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

for( var i=0; i < length; i++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
}

return text;
}

module.exports.findAdvocate = function ( user, res ) {
  Advocate.find({ userId: user.id }, function ( err, advocate ) {
    if ( err ) { return res.json( { sucess: false, err: err } ) };
      AreaOfInterest.findById( advocate.areaOfInterest, function ( err, interests ){
        console.log( interests );
        if ( err ) { return res.json( { sucess: false, err: err } ) };
        return res.json ( [ user, advocate ] );
      })
  });
}

module.exports.findPress = function ( user, res ) {
  Press.find({ userId: user.id }, function ( err, press ) {
    if ( err ) { return res.json( { sucess: false, err: err } ) };
      AreaOfInterest.findById( press.areaOfInterest, function ( err, interests ){
        console.log( interests );
        if ( err ) { return res.json( { sucess: false, err: err } ) };
        return res.json ( [ user, press ] );
      })
  });
}

module.exports.findPolitician = function ( user, res ) {
  Politician.find({ userId: user.id }, function ( err, politician ) {
    if ( err ) { return res.json( { sucess: false, err: err } ) };
      AreaOfInterest.findById( politician.areaOfInterest, function ( err, interests ){
        console.log( interests );
        if ( err ) { return res.json( { sucess: false, err: err } ) };
        return res.json ( [ user, politician ] );
      })
  });
}
