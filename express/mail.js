const nodemailer = require('nodemailer');

exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body);
    console.log(event.body);

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
        from : data.name + " " + data.email + " ",
        to : process.env.EMAIL,
        subject : data.subject,
        text : data.text
    }
    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          console.log(error);
        }else{
          console.log("Message sent: " + response.message);
        }
    });

}