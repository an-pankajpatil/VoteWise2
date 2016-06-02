var express = require ('express');

// Models
var User = require('../../models/user');
var Address = require('../../models/address');
var Advocate = require('../../models/advocate');
var AreaOfInterest = require('../../models/category');
var Geo = require('../../models/geoDivPa');

// Auth
var saltRounds = 10;
var bcrypt      = require('bcrypt');
var mailer = require('../../middleware/mailer');

var helpers = require('../../helpers/controllers');
var userHelpers = require('../../helpers/user');
var advocateHelpers = require('../../helpers/advocate');


module.exports = function( app ) {

  app.post('/advocate/signup', function(req, res) {
    var params = req.body;

    bcrypt.hash(params.password, saltRounds, function(err, hash) {
      console.log(params);
      if ( err ) {
        return res.json({ success: false, error: err });
      }

      // Making new adress
      var address = userHelpers.storeAddress( params.city, params.street, params.zip, res );

      // Saving interests
      var interest = advocateHelpers.storeInterest( params );
      // Store advocate
      advocateHelpers.storeAdvocate( params, address, interest, res, app );

      });
  });

}
