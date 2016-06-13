
var express = require ('express');

// Models
var User = require('../../models/user');
var Advocate = require('../../models/advocate');
var Interest = require('../../models/category');
var Politician = require('../../models/politician');

var jwt = require('jsonwebtoken');
var auth = require('../../middleware/userAuth');
var helpers = require('../../helpers/admin');


module.exports = function( app ) {

  var admin = express.Router();
  auth( admin, app );

  admin.get('/', function(req, res) {
    res.send(" Welcome to the VoteWise Admin API, make a request to /admin. Good spot for a dashboard.");
  });

  admin.get('/user/all', function(req, res) {
    // Id passed in, find id

    User.find( {} , function(err, user) {
      if ( err ) { res.json( { sucess: flase, err: err } ) };
      res.json( user );
    });

  });

  admin.get('/user/:id', function(req, res, next) {
    var admin = req.decoded._doc.admin;
    console.log( admin );
    var id = req.param('id');
    var userResponse = [];

    // Check if user is admin
    if ( admin ) {
      if ( id ) {
        User.findById( id, function( err, user ) {
          if ( err ) { return res.json( { sucess: false, err: err } ) };
          if ( user.advocate ) {
            helpers.findAdvocate( user, res );
          }
          if ( user.press ) {
            helpers.findPress ( user, res );
          }
          if ( user.politician ) {
            helpers.findPolitician( user, res );
          }
        });
      }

    }

    else {
      res.json( { success: false } );
    }
  });

  admin.get('/advocate/all', function(req, res) {

    Advocate.find( {} , function(err, user) {
      if ( err ) { res.json( { sucess: flase, err: err } ) };
      // console.log(user);
      res.json( user );
    });

  });

  admin.get('/advocate/:id', function(req, res) {
    var id = req.param('id');

    Advocate.findById( id , function(err, advocate) {
      if ( err ) { res.json( { sucess: flase, err: err } ) };
      return res.json( advocate );
    });

  });

  admin.get('/politician/all', function(req, res) {

    Politician.find( {} , function(err, politician) {
      if ( err ) { res.json( { sucess: flase, err: err } ) };
      return res.json( politician );
    });

  });

  admin.get('/politician/:id', function(req, res) {
    var id = req.param('id');

    Politician.findById( id , function( err, politician ) {
      if ( err ) { res.json( { sucess: false, err: err } ) };
      return res.json( politician );
    });

  });

  admin.get('/interest/:id', function(req, res) {
    var id = req.param('id');
    Interest.findById( id , function( err, interest ) {
      if ( err ) { res.json( { sucess: flase, err: err } ) };
      return res.json( interest );
    });

  });

  admin.delete('/user/:id', function(req, res) {
    var id = req.param('id');

    // Id passed in, find id
    if ( id ) {
      User.findById( id ).remove().exec( function ( err, user ) {
        // console.log(user);
        res.json( { success: true }  );
      });
    }
  });

  admin.get('/randompass/:length', function ( req, res ) {
    var length = req.param('length');

    return res.json( { password: helpers.rdmNum( length ) } );

  });


  app.use('/admin', admin);

}
