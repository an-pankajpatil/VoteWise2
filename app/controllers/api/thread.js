var express = require('express');
var Thread = require('../../models/thread');
var auth = require('../../middleware/userAuth');
var User = require('../../models/user');

module.exports = function( app ) {

  var api = express.Router();
  auth( api, app );

  api.post('/thread', function( req, res ) {
    var params = req.body;
    var userId = req.decoded._doc._id;

    // Finds user
    User.findById( userId, function( err, user ) {
      if ( err ) { return res.json( { sucess: false, err: err } ) };
      if ( !user ) { return res.json( { success: false, err: 'Couldnt validate, please sign in' } ) };

      // Takes Users ID, and geoDiv and stores it
      var thread = new Thread({
        title: params.title,
        authorId: userId,
        geo: user.geoDiv
      });

      thread.save( function( err, thread ) {
        if ( err ) { return res.json( { success: false, error: err } ); }

        else {
          return res.json( { success: true, thread: thread } );
        }
    });

    });



});

  api.delete('/thread/:id', function(req, res) {
    var id = req.param('id');

      Thread.findById( id ).remove().exec( function ( err, thread ) {
        if ( err ) { return res.json( { success: false, error: err } ) }

        return res.json( { success: true }  );
      });

  });

  api.get('/thread/all', function(req, res) {

      Thread.find( {} , function ( err, thread ) {
        if ( err ) { return res.json( { success: false, error: err } ) }

        return res.json( { success: true, thread: thread }  );
      });

  });

  api.get('/thread/:id', function(req, res) {
    var id = req.param('id');

      Thread.findById( id, function ( err, thread ) {
        if ( err ) { return res.json( { success: false, error: err } ) }
        if ( !thread ) { return res.json( { success: false, error: 'No thread by that ID found!' } ) }
        return res.json( { success: true, thread: thread }  );
      });

  });

  api.get( '/thread/geo/:geoDiv', function ( req, res ) {
    var geo = req.param('geoDiv');

    Thread.find( { geo: geo  } , function ( err, thread ) {
      if ( err ) { return res.json( { success: false, error: err } ) }
      if ( !thread ) { return res.json( { success: false, error: 'No thread by that ID found!' } ) }
      return res.json( { success: true, thread: thread }  );
    });
  });

  api.get( '/thread/user/geo', function ( req, res ) {
    var userId = req.decoded._doc._id;

      if ( userId ) {
        User.findById( userId, function( err, user ) {
          if ( err ) { return res.json( { sucess: false, err: err } ) };
          if ( !user ) { return res.json( { success: false, err: 'Couldnt validate, please sign in' } ) };

          Thread.find( { geo: user.geoDiv  } , function ( err, thread ) {
            if ( err ) { return res.json( { success: false, error: err } ) }
            if ( !thread ) { return res.json( { success: false, error: 'No thread by that ID found!' } ) }

            return res.json( { success: true, thread: thread }  );
          });
        });
    }

    });

    app.use('/api', api);

  }
