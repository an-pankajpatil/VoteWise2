
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
var UserRoutes = require('./app/controllers/api/users');

var saltRounds = 10;
var myPlaintextPassword = 'password';
var someOtherPlaintextPassword = 'password';

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// =======================
// Home page =============
// =======================

app.get('/', function (req, res) {
  res.send(" Welcome to the VoteWise API, make a request to /api !");
});

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
    if ( err ) throw err;
      // create a user
      var user = new User({
        name: params.name,
        password: hash,
        admin: false
      });

      // save the user
      user.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
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
