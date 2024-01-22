const nodemailer = require("nodemailer");
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "b16c88fed6ea33d0f6d7260985fb8c91",
    },
  });


const sendConfirmationMail = async(email) => {
    const htmlPage = await fs.readFileSync('../views/mailTemplate.html', 'utf8');
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'noreply@aantarya.tech', // sender address
      to: 'muhammedafnan8184@gmail.com', // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: htmlPage
      // html: "<h1>HTML</h1>"// html body
    });
  
    console.log("Message sent: %s", info.messageId);

}
  
sendConfirmationMail().catch(console.error);

module.exports = {sendConfirmationMail}