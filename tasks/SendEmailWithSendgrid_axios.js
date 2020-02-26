const sendGridApiToken = process.env.SENDGRID_API_KEY;
const fromEmail = "contact@your-company.com";

const axios = require('axios');

module.exports.handle = async function(email, subject, content) {
  axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${sendGridApiToken}`,
    },
    url: 'https://api.sendgrid.com/v3/mail/send',
    data: {
      personalizations: [
        {
          to: [ {email: email} ],
          subject: subject
        }
      ],
      content: [
        {
          type: "text/plain",
          value: content
        }
      ],
      from: { email: fromEmail }
    }
  })
};