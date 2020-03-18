const nodemailer = require('nodemailer');
require('dotenv').config();



app.post('/send', function (req, res) {
    //const data = JSON.parse(event.body);
    console.log(event.body.name);

    // Here we are configuring our SMTP Server details.
    // STMP is mail server which is responsible for sending and recieving email.

    var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
    });


    let mailOptions={
        from: req.body.name,
        to: process.env.EMAIL,
        subject: req.body.subject,
        text: req.body.text
    }
    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          console.log(error);
        }else{
            console.log('Message %s sent: %s', info.messageId, info.response);
        }
    });

})