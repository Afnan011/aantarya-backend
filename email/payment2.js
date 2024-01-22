const nodemailer = require("nodemailer");
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "b16c88fed6ea33d0f6d7260985fb8c91",
    },
  });

// const transporter = nodemailer.createTransport({
//     host: "smtp.mailgun.org",
//     port: 587,
//     auth: {
//       user: "postmaster@sandbox34524b430d974a658dbbea4015ad4991.mailgun.org",
//       pass: "3ad62010d96ce09a902dd9f2206d9fa3-7ecaf6b5-90c21a6c",
//     },
//   });


const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve('./views'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./views'),
  extName: ".handlebars",
}

transporter.use('compile', hbs(handlebarOptions));



const sendConfirmationEmail = (recipientEmail) => {
  
  const senderName = 'Aantarya 2k24'
  const senderEmail = '<noreply@aantarya.tech>'

  const sender = `${senderName} ${senderEmail}`

  const mailOptions = {
    from: sender,
    to: recipientEmail,
    subject: 'Payment Verified- Aantarya 2k24',
    template: 'payment2',
  
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


// sendConfirmationEmail('muhammedafnan8184@gmail.com')

module.exports = { sendConfirmationEmail };
