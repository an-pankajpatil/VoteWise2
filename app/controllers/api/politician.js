var express = require ('express');

// Models
var User = require('../../models/user');
var Address = require('../../models/address');
var Politician = require('../../models/politician');

// Auth
var saltRounds = 10;
var bcrypt      = require('bcrypt');
var mailer = require('../../middleware/mailer');
var jwt    = require('jsonwebtoken');

module.exports = function( app ) {

  app.post('/politician/signup', function(req, res) {
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

      // Saving adress
      address.save( function ( err, address ) {
        if ( err ) { res.json({success: false, error: err}); }
      });
      console.log(address);
        // create a userm, use adress id
        var user = new User({
          name: params.name,
          password: hash,
          politician: true,
          address: address.id,
          email: params.email,
          questionsAnswered: 0
        });

        var politician = new Politician({

          userId: user.id,
          position: params.string,
          website: params.website

        })

        politician.save( function ( err ) {
            if (err) { console.log(err) }
        });
        // save the user
        user.save(function(err) {
          if (err) { console.log(err) }
          mailer.mailTo( app, user.email, 'Thank you for signing up!' );
          res.json({ success: true });
        });
        return hash;
      });
  });

}
