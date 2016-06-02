var express = require('express');
var Zip = require('../../models/zipToState');
var helpers = require('../../helpers/models');

module.exports = function ( app ) {

    app.get('/ziplookup/:id', function( req, res ) {
      var id = req.params.id;

      Zip.findById(id, function(err, zip) {
        if ( err ) { res.json( { success: false, err: err } ) }
        res.json( zip );
      });
    });

    app.get('/ziplookup/state/:state', function( req, res ) {
      var state = req.params.state;

      Zip.find({
        state: state
      }, function ( err, zip ) {
        if ( err ) { res.json({ success: false, error: err }); }

        else { res.json({ zip }); }
      });
    });

    app.get('/ziplookup/city/:city', function( req, res ) {
      var city = helpers.addSpace( req.params.city );

      Zip.findOne({
        city: city
      }, function ( err, zip ) {
        if ( err ) { res.json({ success: false, error: err }); }

        else { res.json({ zip }); }
      });
    });


    }
