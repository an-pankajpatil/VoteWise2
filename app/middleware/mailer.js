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

  app.get('/email', function (req, res) {
    app.mailer.send('email', {
      to: 'djtouchette1993@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
      subject: 'Test Email', // REQUIRED.
      otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
    }, function (err) {
      if (err) {
        // handle error
        console.log(err);
        res.send('There was an error sending the email');
        return;
      }
      res.send('Email Sent');
    });
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
      res.json({ success: false });
      return;
    }
    // res.send('Email Sent');

});

}
