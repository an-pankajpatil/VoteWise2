const jwt    = require('jsonwebtoken');
const config = require('../../config');
const bcrypt = require('bcrypt');

module.exports = function ( api, app ) {

  app.set('superSecret', config.secret);

  api.use( function( req, res, next ) {
    'use strict';
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // console.log(token);

    // decode token
    if ( token ) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        // console.log(decoded);
        if ( err ) {
          return res.json({ success: false, message: 'Failed to authenticate token.', error: err });
        }
        else {
          console.log(req.decoded);
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
  });


}
