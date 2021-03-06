var User = require('../models/user');
var Geo = require('../models/geoDivPa');
var Press = require('../models/press');

var saltRounds = 10;
var bcrypt = require('bcrypt');

var mailer = require('../middleware/mailer');
var helpers = require('./controllers');

module.exports.storePress = function ( params, address, interest, res, app ) {

  Geo.findOne({
  ZIPCensusTabulationArea: params.zip
}, function ( err, zip ) {

  if ( err ) {
    res.status = 400;
    return res.json( helpers.response( false, err ) );
   }

  if ( !zip ) {
    res.status = 400;
    return res.json( helpers.response( false, 'No zip found!' ) );
  }

  bcrypt.hash( params.password, saltRounds, function(err, hash) {

      // create a user, use adress id
      var user = new User({
        name: params.name,
        password: hash,
        admin: false,
        politician: false,
        press: true,
        advocate: false,
        address: address.id,
        email: params.email,
        geoDiv: zip.id,
        username: params.username

      });

      user.save( function( err, user ) {
        if ( err ) {
          res.status = 400;
          return res.json( helpers.response( false, err ) );
        }

        else {
          mailer.mailTo( app, user.email, 'Thank you for signing up!' );
          return res.json( helpers.response( true, false ) );
        }

      });

      var press = new Press({

        userId: user.id,
        mediaOutlet: params.mediaOutlet,
        areaOfInterest: interest.id,
        confirmed: false

      });

      press.save( function ( err ) {
        if (err) { return res.json( { success: false, error: err } ) }
      });

    });
});

}
