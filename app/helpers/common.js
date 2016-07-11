module.exports.verfiyRequiredFields = function ( params, reqParams) {
  var len = params.length;
  var notDefined = [];
  for (var i = 0; i < len; i++) {
    if(!reqParams[params[i]]){
      notDefined.push(params[i]);
    }
  }

  if(notDefined.length > 0){
    return( { success: false, error: "required fields: "+notDefined.join(", ")} );
  }
  else{
    return ( { success: true, error: null } );
  }
}

