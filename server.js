
// =======================
// Import Packages========
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get config file
var User   = require('./app/models/user'); // get mongoose model
var Address = require('./app/models/address');
var UserRoutes = require('./app/controllers/api/users');
var mailer = require('./app/middleware/mailer');

var saltRounds = 10;
var myPlaintextPassword = 'password';
var someOtherPlaintextPassword = 'password';

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
mailer.apply( app ); // Initializing mailer

// =======================
// Home page =============
// =======================

app.get('/', function (req, res) {
  res.send(" Welcome to the VoteWise API, make a request to /api !");
});

// app.get('/email', function (req, res) {
//   app.mailer.send('email', {
//     to: 'djtouchette1993@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
//     subject: 'Test Email', // REQUIRED.
//     otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
//   }, function (err) {
//     if (err) {
//       // handle error
//       console.log(err);
//       res.send('There was an error sending the email');
//       return;
//     }
//     res.send('Email Sent');
//   });
// });

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.post('/signup', function(req, res) {
  var params = req.body;
  // console.log(req.body);
  bcrypt.hash(params.password, saltRounds, function(err, hash) {
    console.log(params);
    if ( err ) {
      res.json({ success: false, error: err });
    }

    var address = new Address({
      city: params.city,
      street: params.street,
      zip: params.zip
    });

    address.save( function ( err, address ) {
      if ( err ) { res.json({success: false, error: err}); }
    });
    console.log(address);
      // create a user
      var user = new User({
        name: params.name,
        password: hash,
        admin: false,
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
      result.json({ success: false, message: 'Authentication failed. no user'  });
    }

    else if ( user ) {

        var password = bcrypt.compareSync(req.body.password, user.password);
        // console.log(hello);
        if ( password  ) {

          var token = jwt.sign(user, app.get('superSecret'), {
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
          result.json({ sucess: false, message: 'Authentication failed. no password'});
    }

}
});
});



// API ROUTES -------------------
UserRoutes( app );


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
