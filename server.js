
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

// Dev Test User
app.post('/sigup', function(req, res) {
  console.log(req);
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//
//     // create a sample user
//
//     var nick = new User({
//       name: 'Jim Jones',
//       password: hash,
//       admin: true
//     });
//   console.log(nick);
//     // save the sample user
//     nick.save(function(err) {
//       if (err) throw err;
//
//       console.log('User saved successfully');
//       res.json({ success: true });
//     });
//     return hash;
//   });

});

// API ROUTES -------------------

// get an instance of the router for api routes
// var apiRoutes = express.Router();

// API ROUTES -------------------
UserRoutes( app );


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
