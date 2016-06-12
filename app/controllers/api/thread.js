var express = require('express');
var Thread = require('../../models/thread');

module.exports = function( app ) {

  app.post('/thread', function(req, res) {
    var params = req.body;

    var thread = new Thread({
      title: params.title,
      authorId: params.authorId,
      geo: params.geo,

    });

    thread.save( function( err, thread ) {
      if ( err ) { return res.json( { success: false, error: err } ); }

      else {
        return res.json( { success: true } );
      }
  });

  }

  app.delete('/thread', function(req, res) {
    var params = req.body;

      Thread.findById( params.threadId ).remove().exec( function ( err, thread ) {
        if ( err ) { return res.json( { success: false, error: err } ) }

        return res.json( { success: true }  );
      });

  }


}
