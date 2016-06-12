// Helpers
var userHelpers = require('../../helpers/user');
var pressHelpers = require('../../helpers/press');
var advocateHelpers = require('../../helpers/advocate');

// Auth
var saltRounds = 10;
var bcrypt      = require('bcrypt');
var mailer = require('../../middleware/mailer');
var jwt    = require('jsonwebtoken');

module.exports = function( app ) {

  app.post('/press/signup', function(req, res) {
    var params = req.body;

    bcrypt.hash(params.password, saltRounds, function(err, hash) {
      if ( err ) {
        return res.json({ success: false, error: err });
      }

      // Making new adress
      var address = userHelpers.storeAddress( params.city, params.street, params.zip, res );
      // new interest
      var interest = advocateHelpers.storeInterest( params );
      // Store press
      pressHelpers.storePress( params, address, interest, res, app );

      });
  });

}
