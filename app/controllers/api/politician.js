var express = require ('express');

// Models
var Address = require('../../models/address');
var Politician = require('../../models/politician');
var userHelpers = require('../../helpers/user');
var politicianHelper = require('../../helpers/politician');

// Auth
var saltRounds = 10;
var bcrypt      = require('bcrypt');


module.exports = function( app ) {

  app.post('/politician/signup', function(req, res) {
    var params = req.body;

    bcrypt.hash(params.password, saltRounds, function(err, hash) {

      if ( err ) {
        return res.json({ success: false, error: err });
      }

      // Making new adress
      var address = userHelpers.storeAddress( params.city, params.street, params.zip, res );

      // Make and store politician
      politicianHelper.storePolotician( params, address, res );

      });
  });
}
