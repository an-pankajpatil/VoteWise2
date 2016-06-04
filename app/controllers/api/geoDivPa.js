var express = require('express');
var Geo = require('../../models/geoDivPa');

module.exports = function ( app ) {

  app.get('/geodivpa/fips/:fips', function( req, res ) {
    var fips = req.params.fips;

    Geo.find({
      FIPSstate: fips
    }, function ( err, fips ) {
      if ( err ) { res.json({ success: false, error: err }); }

      else { res.json({ fips }); }
    });

  });

  app.get('/geodivpa/id/:id', function( req, res ) {
    var id = req.params.id;

    Geo.findById({
      id
    }, function ( err, county ) {
      if ( err ) { return res.json({ success: false, error: err }); }
      // console.log(county);
      else { return res.json({ county }); }
    });

  });

  app.get('/geodivpa/statesen/:statesen', function( req, res ) {
    var stateSen = req.params.statesen;

    Geo.find({
      stateSen: stateSen
    }, function ( err, statesen ) {
      if ( err ) { return res.json({ success: false, error: err }); }

      else { return res.json({ statesen }); }
    });

  });

  app.get('/geodivpa/staterep/:staterep', function( req, res ) {
    var stateRep = req.params.staterep;

    Geo.find({
      stateRep: stateRep
    }, function ( err, stateRep ) {
      if ( err ) { return res.json({ success: false, error: err }); }

      else { return res.json({ stateRep }); }
    });

  });

  app.get('/geodivpa/zip/:zip', function( req, res ) {
    var zip = req.params.zip;

    Geo.findOne({
      ZIPCensusTabulationArea: zip
    }, function ( err, zip ) {
      if ( err ) { return res.json({ success: false, error: err }); }

      else { res.json({ zip }); }
    });

  });

  app.get('/geodivpa/fedrep/:fedrep', function( req, res ) {
    var fedRep = req.params.fedrep;

    Geo.find({
      fedRep: fedRep
    }, function ( err, fedRep ) {
      if ( err ) { return res.json({ success: false, error: err }); }

      else { return res.json({ fedRep }); }
    });

  });

  app.get('/geodivpa/all', function( req, res ) {

    Geo.find( {} , function(err, geo) {
      if ( err ) { return res.json( { sucess: flase, err: err } ) };

      return res.json( geo );
    });

  });

}
