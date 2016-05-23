
var express = require ('express');
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var auth = require('../../middleware/userAuth');

module.exports = function( app ) {
  var api = express.Router();
  auth( api, app, User );

  api.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

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

  api.get('/', function(req, res) {
    res.json({ message: 'VotWise API' });
  });

  api.get('/user', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });

  app.use('/api', api);


}
