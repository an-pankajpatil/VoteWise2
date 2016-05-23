
module.exports.rdmNum = function ( length ) {

if ( length === undefined ) {
  length = 8;
}

var text = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

for( var i=0; i < length; i++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
}

return text;
}
