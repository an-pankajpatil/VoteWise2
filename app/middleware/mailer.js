var mailer = require('express-mailer');

module.exports.apply = function ( app ) {
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  mailer.extend(app, {
    from: 'no-reply@example.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
      user: 'votewisenoreply@gmail.com',
      pass: 'NO4CyUuG'
    }
  });

}

module.exports.mailTo = function ( app, email, subject ) {

  app.mailer.send('email', {
    to: email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
    subject: subject, // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      return false;
    }
    else {
      return true;
    }


});

}
