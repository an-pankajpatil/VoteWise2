var express = require ('express');

// Models
var User = require('../../models/user');
var Address = require('../../models/address');
var Press = require('../../models/press');
var AreaOfInterest = require('../../models/category');

// Auth
var saltRounds = 10;
var bcrypt      = require('bcrypt');
var mailer = require('../../middleware/mailer');
var jwt    = require('jsonwebtoken');

module.exports = function( app ) {

  app.post('/press/signup', function(req, res) {
    var params = req.body;
    // console.log(req.body);
    bcrypt.hash(params.password, saltRounds, function(err, hash) {
      console.log(params);
      if ( err ) {
        res.json({ success: false, error: err });
      }

      // Making new adress
      var address = new Address({
        city: params.city,
        street: params.street,
        zip: params.zip
      });

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
        if ( err ) { res.json({success: false, error: err}); }
      });

      // Saving adress
      address.save( function ( err, address ) {
        if ( err ) { res.json({success: false, error: err}); }
      });
      console.log(address);
        // create a userm, use adress id
        var user = new User({
          name: params.name,
          password: hash,
          press: true,
          address: address.id,
          email: params.email,
          questionsAnswered: 0
        });

        var press = new Press({

          userId: user.id,
          mediaOutlet: params.mediaOutlet,
          areaOfInterest: interest.id,
          confirmed: false

        })

        // save the user
        user.save(function(err) {
          if (err) throw err;
          mailer.mailTo( app, user.email, 'Thank you for signing up!' );
          res.json({ success: true });
        });
        return hash;
      });
  });

}
