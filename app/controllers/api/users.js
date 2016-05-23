
var express = require ('express');
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var auth = require('../../middleware/userAuth');

module.exports = function( app ) {
  var api = express.Router();
  auth( api, app, User );

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
