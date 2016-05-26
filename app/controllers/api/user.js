var express = require ('express');

// Models
var User = require('../../models/user');
var Address = require('../../models/address');

// Auth
var saltRounds = 10;
var bcrypt      = require('bcrypt');
var mailer = require('../../middleware/mailer');
var jwt    = require('jsonwebtoken');

module.exports = function( app ) {

  app.post('/user/signup', function(req, res) {
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
          admin: false,
          politician: false,
          press: false,
          address: address.id,
          email: params.email
        });

        // save the user
        user.save(function(err) {
          if (err) throw err;
          mailer.mailTo( app, user.email, 'Thank you for signing up!' );
          console.log('User saved successfully');
          console.log(user);
          res.json({ success: true });
        });
        return hash;
      });
  });

  app.post('/authenticate', function(req, result) {
    console.log(req.body);
    // find the user
  User.findOne({
    name: req.body.name
  }, function ( err, user ) {
    if ( err ) throw err;

  });

    User.findOne({
      name: req.body.name
    }, function(err, user ) {
      console.log(user);
      if ( err ) throw err;

      if ( !user ) {
        result.json({ success: false, message: 'Authentication failed.'  });
      }

      else if ( user ) {

          var password = bcrypt.compareSync(req.body.password, user.password);
          console.log(password);
          if ( password  ) {

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
            result.json({ sucess: false, message: 'Authentication failed.' });
      }

  }
  });
  });
}
