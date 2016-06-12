var express = require('express');
var Post = require('../../models/post');

module.exports = function( app ) {

  app.post('/thread/:id/post', function(req, res) {
    var params = req.body;
    var id = req.param('id');

    Thread.findById( id, function ( err, thread ) {
      if ( err ) { return res.json( { success: false, error: err } ) }

      var post = new Post({
        content: params.content,
        authorId: params.authorId,
        geo: params.geo,
        threadId: thread.id
      });

      post.save( function( err, post ) {
        if ( err ) { return res.json( { success: false, error: err } ); }

        else {
          return res.json( { success: true, post: post } );
        }
    });

      return res.json( { success: true, post: post }  );
    });

  }

  app.delete('/thread/post/:id', function(req, res) {
    var id = req.param('id');

      Post.findById( id ).remove().exec( function ( err, thread ) {
        if ( err ) { return res.json( { success: false, error: err } ) }

        return res.json( { success: true }  );
      });

  }


}
