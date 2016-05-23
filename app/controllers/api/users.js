
var express = require ('express');
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var auth = require('../../middleware/userAuth');
var helpers = require('../../helpers/admin');

module.exports = function( app ) {
  var admin = express.Router();
  auth( admin, app, User );

  admin.get('/', function(req, res) {
    res.send(" Welcome to the VoteWise Admin API, make a request to /admin. Good spot for a dashboard.");
  });

  admin.get('/user', function(req, res) {
    var admin = req.decoded._doc.admin;
    var id = req.param('id');
    // console.log(id);
    // Id passed in, find id
    if ( admin ) {
      if ( id ) {
        User.findById( id, function(err, user) {
          if ( err ) { res.json( { sucess: flase, err: err } ) };
          // console.log(user);
          res.json( user );
        });
      }
      // return list of users if no id
      else {
        User.find({}, function(err, users) {
          res.json( users );
        });
      }
    }

    else {
      res.json( { success: false } );
    }
  });

  admin.delete('/user', function(req, res) {
    var id = req.param('id');
    // console.log(id);
    // Id passed in, find id
    if ( id ) {
      User.findById( id ).remove().exec( function ( err, user ) {
        // console.log(user);
        res.json( { success: true }  );
      });
    }
  });

  admin.get('/randompass', function ( req, res ) {
    var length = req.param('length');
    res.json( { password: helpers.rdmNum( length ) } );

  });


  app.use('/admin', admin);

}
