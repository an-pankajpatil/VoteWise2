var Address = require('../models/address');
var User = require('../models/user');
var Geo = require('../models/geoDivPa');
var Politician = require('../models/politician');
var AreaOfInterest = require('../models/category');

var saltRounds = 10;
var bcrypt = require('bcrypt');

var mailer = require('../middleware/mailer');
var jwt = require('jsonwebtoken');

var helpers = require('./controllers');

module.exports.storePolotician = function ( params, address, res ) {

  Geo.findOne({
  ZIPCensusTabulationArea: params.zip
}, function ( err, zip ) {
  if ( err ) { return res.json( helpers.response( false, err ) ); }

  if ( !zip ) { return res.json( helpers.response( false, "Not a valid zip" ) ); }

  bcrypt.hash( params.password, saltRounds, function(err, hash) {

      // create a userm, use adress id
      var user = new User({
        name: params.name,
        password: hash,
        admin: false,
        politician: true,
        press: false,
        advocate: false,
        address: address.id,
        email: params.email,
        geoDiv: zip.id,
        username: params.username

      });
      // save the user
      user.save( function( err, user ) {
        if ( err ) { return res.json( helpers.response( false, err ) ); }

        else {
          // mailer.mailTo( app, user.email, 'Thank you for signing up!' );
          return res.json( helpers.response( true, false ) );
        }

      });

      // Create politician
      var politician = new Politician({

        userId: user.id,
        positionWanted: params.positionWanted,
        website: params.website,
        questionsAnswered: 0,
        homeZip: params.homeZip,
        positionState: params.positionState,
        positionCity: params.city,
        positionCounty: params.county,
        additionalInfo: params.info

      });


      politician.save( function ( err ) {
        if ( err ) { return res.json( { success: false, error: err } ) }
      });
    });
});

}
