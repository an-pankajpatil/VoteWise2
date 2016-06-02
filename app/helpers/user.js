var Address = require('../models/address');
var User = require('../models/user');
var Geo = require('../models/geoDivPa');
var Advocate = require('../models/advocate');

var saltRounds = 10;
var bcrypt = require('bcrypt');

var mailer = require('../middleware/mailer');
var jwt = require('jsonwebtoken');

var helpers = require('./controllers');

module.exports.storeAddress = function ( city, street, zip, res ) {
  // Making new adress
  var address = new Address({
    city: city,
    street: street,
    zip: zip
  });

  // Saving adress
  address.save( function ( err, address ) {
    if ( err ) { return res.json( helpers.response( false, err ) ); }
  });

  return address;

}

module.exports.storeUser = function ( params, address, res ) {

  Geo.findOne({
  ZIPCensusTabulationArea: params.zip
}, function ( err, zip ) {
  if ( err ) { return res.json( helpers.response( false, err ) ); }

    bcrypt.hash( password, saltRounds, function(err, hash) {

        // create a userm, use adress id
        var user = new User({
          name: params.name,
          password: hash,
          admin: false,
          politician: false,
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
            res.json( helpers.response( false ) );
            // mailer.mailTo( app, user.email, 'Thank you for signing up!' );
          }

        });
        return user;
      });
});

}
