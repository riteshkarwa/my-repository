const nodemailer = require('nodemailer');

exports.handler = (event, context, callback) => {
    //const data = JSON.parse(event.body);
    console.log(event.body.name);

    // Here we are configuring our SMTP Server details.
    // STMP is mail server which is responsible for sending and recieving email.

    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
    });

    console.log("in mail controller");
    var mailOptions={
        from : event.body.name + " " + event.body.email + " ",
        to : process.env.EMAIL,
        subject : event.body.subject,
        text : event.body.text
    }
    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          console.log(error);
          return callback(null, {
            statusCode: 400,
            body: JSON.stringify(error)
          })
        }else{
          console.log("Message sent: " + response.message);
          return callback(null, {
            statusCode: 200,
            body: response.message
          })
        }
    });

}