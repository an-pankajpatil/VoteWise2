var Address = require('../models/address');
var User = require('../models/user');
var Geo = require('../models/geoDivPa');
var Advocate = require('../models/advocate');
var AreaOfInterest = require('../models/category');

var saltRounds = 10;
var bcrypt = require('bcrypt');

var mailer = require('../middleware/mailer');
var jwt = require('jsonwebtoken');

var helpers = require('./controllers');

module.exports.storeAdvocate = function ( params, address, interest, res, app ) {

  Geo.findOne({
  ZIPCensusTabulationArea: params.zip
}, function ( err, zip ) {
  if ( err ) { return res.json( helpers.response( false, err ) ); }

  bcrypt.hash( params.password, saltRounds, function(err, hash) {

      // create a userm, use adress id
      var user = new User({
        name: params.name,
        password: hash,
        admin: false,
        politician: false,
        press: false,
        advocate: true,
        address: address.id,
        email: params.email,
        geoDiv: zip.id,
        username: params.username

      });
      // save the user
      user.save( function( err, user ) {
        if ( err ) { return res.json( helpers.response( false, err ) ); }

        else {
          mailer.mailTo( app, user.email, 'Thank you for signing up!' );
          return res.json( helpers.response( true, false ) );
        }

      });

      var advocate = new Advocate({

        userId: user.id,
        url: params.url,
        areaOfInterest: interest,
        confirmed: false

      });

      advocate.save( function ( err ) {
        if (err) { return res.json( { success: false, error: err } ) }
      });

    });
});

}

module.exports.storeInterest = function ( params ) {

  var interest = new AreaOfInterest({
    civilLiberties: params.cl,
    crimeAndPunishment: params.cAp,
    education: params.education,
    energy: params.energy,
    enviroment: params.enviroment,
    gunControl: params.gunControl,
    healthAndSafety: params.healthAndSafety,
    immigration: params.immigration,
    infrastructure: params.infrastructure,
    internationalRelations: params.internationalRelations,
    jobs: params.jobs,
    qualityOfLife: params.qualityOfLife,
    reproduction: params.reproduction,
    taxes: params.taxes,
    socialServices: params.socialServices
  });

  interest.save( function ( err, interest ) {
    if ( err ) { return res.json({success: false, error: err}); }
  });

  return interest;

}
