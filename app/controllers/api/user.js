var express = require ('express');

// Models
var User = require('../../models/user');
var Address = require('../../models/address');
var Geo = require('../../models/geoDivPa');

// Auth
var saltRounds = 10;
var bcrypt = require('bcrypt');
var mailer = require('../../middleware/mailer');
var jwt = require('jsonwebtoken');

//helpers
var helpers = require('../../helpers/controllers');

module.exports = function( app ) {

  app.post('/user/signup', function(req, res) {
    // Validations
    var params = req.body;
    var isValidZip = helpers.validZip( params.zip );
    var isValidEmail = helpers.validEmail( params.email );
    var isValidPassword = helpers.validPassword( params.password );
    var isValidUsername = helpers.validUsername( params.username );
    var allValid = helpers.allVallidate( isValidZip, isValidEmail, isValidPassword, isValidUsername );

    if ( allValid.validate ) {

    // Making new adress
    var address = new Address({
      city: params.city,
      street: params.street,
      zip: params.zip
    });

    // Saving adress
    address.save( function ( err, address ) {
      if ( err ) { res.json({ success: false, error: err }); }

    });

      Geo.findOne({
      ZIPCensusTabulationArea: params.zip
    }, function ( err, zip ) {
      if ( err ) { res.json({ success: false, error: err }); }
      console.log(params.password);
      bcrypt.hash( params.password, saltRounds, function(err, hash) {

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
            if ( err ) { console.log(err); res.json({ success: false, error: err }); }

            else {
              console.log(user);
              res.json({ success: true });
              mailer.mailTo( app, user.email, 'Thank you for signing up!' );
            }

          });
          // res.json({ success: true });
          return hash;
        });
    });
  }

  else {
    res.json({ success: allValid.validate, error: allValid.err });
  }
    // res.json({ success: true });
  });



  app.post('/authenticate', function(req, result) {

    User.findOne({
      email: req.body.email
    }, function(err, user ) {

      if ( err ) { result.json({ success: false, err: err  }); };

      // if ( !user ) {
      //   result.json({ success: false, err: 'Authentication failed.'  });
      // }

      if ( user ) {

        var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: '1440m' // expires in 24 hours
          });

          // If user is found and password is right
          // create a token
          // return the information including token as JSON
          result.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });


  }
      else {
        result.json({ sucess: false, err: 'Authentication failed.' });
      }



  });
  });
}
