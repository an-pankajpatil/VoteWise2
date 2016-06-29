var express = require ('express');

// Auth
var saltRounds = 10;
var bcrypt = require('bcrypt');

// Helpers
var helpers = require('../../helpers/controllers');
var userHelpers = require('../../helpers/user');
var advocateHelpers = require('../../helpers/advocate');


module.exports = function( app ) {

  app.post('/advocate/signup', function(req, res) {
    var params = req.body;

      bcrypt.hash(params.password, saltRounds, function(err, hash) {

        if ( err ) {
          return res.json({ success: false, error: err });
        }

        // Making new adress, Returns address model
        var address = userHelpers.storeAddress( params.city, params.street, params.zip, res );

        // Saving interests
        var interest = advocateHelpers.storeInterest( params );

        // Store advocate
        advocateHelpers.storeAdvocate( params, address, interest, res, app );

        });
      });
    }

    
