const jwt    = require('jsonwebtoken');
const config = require('../../config');
const bcrypt = require('bcrypt');

module.exports = function ( api, app, User ) {

  app.set('superSecret', config.secret);

  api.post('/authenticate', function(req, result) {
    'use strict';
    // find the user
  User.findOne({
    name: req.body.name
  }, ( err, user ) => {
    if ( err ) throw err;

  })

    User.findOne({
      name: req.body.name
    }, function(err, user ) {

      if ( err ) throw err;

      if ( !user ) {
        result.json({ success: false, message: 'Authentication failed.' });
      }

      else if ( user ) {

          const password = bcrypt.compareSync(req.body.password, user.password);
          // console.log(hello);
          if ( password  ) {

            const token = jwt.sign(user, app.get('superSecret'), {
              // expiresInMinutes: 1440 // expires in 24 hours
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
            result.json({ sucess: false, message: 'Authentication failed.'});
      }

  }
});
});



  api.use(function(req, res, next) {
    'use strict';
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if ( token ) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
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
