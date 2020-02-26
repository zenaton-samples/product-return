const sendGridApiToken = process.env.SENDGRID_API_KEY;
const fromEmail = "contact@your-company.com";

const sgMail = require("@sendgrid/mail");

module.exports.handle = async function(email, subject, content) {
  sgMail.setApiKey(sendGridApiToken);
  const msg = {
    to: email,
    from: fromEmail,
    subject,
    text: content,
    html: content
  };
  sgMail.send(msg);
};
