var express = require('express');
var Fips = require('../../models/fips');

module.exports = function ( app ) {

  app.get('/fips/:state', function( req, res ) {
    var state = req.params.state;

    Fips.findOne({
      stateAbr: state
    }, function ( err, fips ) {
      if ( err ) {
        return res.json({ success: false, error: err });
      }

      else { res.json({ fips }); }
    });

  });

  app.get('/fips/:code', function( req, res ) {
    var code = req.params.code;

    Fips.findOne({
      code: code
    }, function ( err, fips ) {
      if ( err ) { res.json({ success: false, error: err }); }

      else { res.json({ fips }); }

    });


  });


}
