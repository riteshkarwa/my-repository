const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport')

const auth = {
    auth: {
        api_key: '2c18471348fb57fb3ca03674f12bd3da-9a235412-457ad761',
        domain: 'sandbox0cc811060de343eea60117cd3f24c941.mailgun.org'
    }
}

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, subject, text, callback) =>{
    const mailOptions={
        from : name + " " + email + " ",
        to : process.env.EMAIL,
        subject : subject,
        text : text
    };

    transporter.sendMail(mailOptions, function(error, response){
        if(error){
          callback(error, null);
        }else{
          console.log("Message sent: " + response.message);
          callback(null, response);
        }
    });
}

module.exports = sendMail;