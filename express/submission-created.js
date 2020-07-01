const nodemailer = require("nodemailer");
require("dotenv").config();

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  console.log(data);

  // Here we are configuring our SMTP Server details.
  // STMP is mail server which is responsible for sending and recieving email.

  var smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: data.email,
    to: process.env.EMAIL,
    subject: data.subject,
    text: `This message is from:${data.name} Message:${data.text}`,
  };
  console.log(mailOptions);

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message %s sent: %s", response.messageId, response.response);
    }
  });
};
