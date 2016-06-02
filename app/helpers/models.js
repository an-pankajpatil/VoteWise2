
module.exports.validate = function ( v, regex, message, required ) {
  return {
    funcition( v ) {
      return regex.test(v)
    },

    message: message,

    required: required
  }
}

module.exports.addSpace = function ( str ) {
  
  return str.replace(/-/g, ' ');

}
