var express = require('express');
var Post = require('../../models/post');
var Thread = require('../../models/thread');
var User = require('../../models/user');
var auth = require('../../middleware/userAuth');

module.exports = function( app ) {

  var api = express.Router();
  auth( api, app );

  api.post('/thread/:id/post', function(req, res) {
    var params = req.body;
    var userId = req.decoded._doc._id;
    var threadId = req.param('id');

    // Seeing if thread exists
    Thread.findById( threadId, function ( err, thread ) {
      // No need to send error, valiations are already set.
    });

    User.findById( userId, function ( err, user ) {
      if ( err ) { return res.json( { success: false, error: err } ) }
      if ( !user ) { return res.json( { success: false, error: 'Cant find user, please login or signup' } ) }

      var post = new Post({
        content: params.content,
        authorId: userId,
        geo: user.geoDiv,
        threadId: threadId
      });

      post.save( function( err, post ) {
        if ( err ) { return res.json( { success: false, error: err } ); }

        return res.json( { success: true, post: post } );
    });

    });

  });

  api.delete('/thread/:threadId/post/:postId', function(req, res) {
    var threadId = req.param('threadId');
    var postId = req.param('postId');

    // Seeing if thread exists
    Thread.findById( threadId, function ( err, thread ) {
      // No need to send error, valiations are already set.
    });

      Post.findById( postId ).remove().exec( function ( err, post ) {
        if ( err ) { return res.json( { success: false, error: err } ); };
        if ( !post ) { return res.json( { success: false, error: 'No post by that ID found!' } ); };

        return res.json( { success: true }  );
      });

  });

  api.get('/thread/:threadId/post/:postId', function(req, res) {
    var threadId = req.param('threadId');
    var postId = req.param('postId');

    // Seeing if thread exists
    Thread.findById( threadId, function ( err, thread ) {
      // if ( !thread ) { return res.json( { success: false, error: 'Thread not found!' } ); };
      if ( err ) {  };
    });

      Post.findById( postId, function ( err, post ) {
        if ( err ) { return res.json( { success: false, error: err } ); };
        if ( !post ) { return res.json( { success: false, error: 'No post by that ID found!' } ); };

        return res.json( { success: true, post: post }  );
      });

  });

  api.get( '/post/thread/:threadId', function ( req, res ) {
    var thread = req.param('threadId');

    Post.find( { threadId: thread  } , function ( err, post ) {
      if ( err ) { return res.json( { success: false, error: err } ) }
      if ( !thread ) { return res.json( { success: false, error: 'No thread by that ID found!' } ) }

      return res.json( { success: true, post: post }  );
    });
  });


  app.use('/api', api);

}
