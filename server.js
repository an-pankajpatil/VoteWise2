// =======================
// Import Packages========
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var config = require('./config'); // get config file
// =======================
// Import Controllers=====
// =======================
var AdminRoutes = require('./app/controllers/api/admin');
var mailer = require('./app/middleware/mailer');
var UserRoutes = require('./app/controllers/api/user');
var PoliticianRoutes = require('./app/controllers/api/politician');
var PressRoutes = require('./app/controllers/api/press');
var AdvocateRoutes = require('./app/controllers/api/advocate');

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

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// API ROUTES -------------------
AdminRoutes( app );
UserRoutes( app );
PoliticianRoutes ( app );
PressRoutes ( app );
AdvocateRoutes ( app );


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
