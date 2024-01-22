// const { MailtrapClient } = require("mailtrap");

// const TOKEN = process.env.MAIL_TOKEN;
// const ENDPOINT = "https://send.api.mailtrap.io/";

// const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

// const sendConfirmationEmail = (recipientEmail, collegeName, isUG) => {
    
//   const sender = {
//     email: "noreply@aantarya.tech",
//     name: "Registration Confirmation - Aantarya 2k24",
//   };

//   isUG = isUG ? "UG" : "PG";

//   const recipients = [
//     {
//       email: recipientEmail,
//     }
//   ];

//   client
//     .send({
//       from: sender,
//       to: recipients,
//       template_uuid: "8113b124-9ada-467c-9e41-8bc9707542dc",
//       template_variables: {
//         college_name: collegeName,
//         ug_pg: isUG
//     }
//     })
//     .then(console.log, console.error);
// };


// const mailgun = require("mailgun-js");
// const DOMAIN = "sandbox34524b430d974a658dbbea4015ad4991.mailgun.org";
// const API_KEY = "7e3dea714ca81d2d5507181a4aefc666-7ecaf6b5-3a7f647c"
// const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});
// const data = {
// 	from: "Aantarya 2k24 <noreply@aantarya.tech>",
// 	to: "muhammedafnan8184@gmail.com",
// 	subject: "Registration Confirmation - Aantarya 2k24",
// 	template: "registration confirmation",
// 	'h:X-Mailgun-Variables': {
//     college_name: "VCET",
//     ug_pg: "UG"
//   }
// };
// mg.messages().send(data, (error, body) => {
// 	console.log(body);
//   console.log(error)
// });




// module.exports = { sendConfirmationEmail };