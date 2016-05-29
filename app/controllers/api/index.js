var Admin = require('./admin');
var Advocate = require('./advocate');
var Politician = require('./politician');
var Press = require('./press');
var User = require('./user');

module.exports = ( app ) => {
    Admin( app );
    Advocate( app );
    Politician( app );
    Press( app );
    User( app );
};
