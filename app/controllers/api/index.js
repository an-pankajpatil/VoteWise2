var Admin = require('./admin');
var Advocate = require('./advocate');
var Politician = require('./politician');
var Press = require('./press');
var User = require('./user');
var Fips = require('./fips');
var Zip = require('./zipToState');
var Geo = require('./geoDivPa');

module.exports = ( app ) => {
    Admin( app );
    Advocate( app );
    Politician( app );
    Press( app );
    User( app );
    Fips( app );
    Zip( app );
    Geo( app );
};
