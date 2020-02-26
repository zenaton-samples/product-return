const zendeskApiToken = process.env.ZENDESK_API_TOKEN;
const zendeskEmail = process.env.ZENDESK_EMAIL;
const zendeskSubdomain = process.env.ZENDESK_SUBDOMAIN;

const axios = require("axios");

module.exports.handle = async function(parcelReturn) {
  /* This is a very simple example. For production, you will obviously want to have more information. */

  // get the auth string
  const buff = new Buffer(`${zendeskEmail}/token:${zendeskApiToken}`);
  const authString = buff.toString("base64");

  const url = `https://${zendeskSubdomain}.zendesk.com/api/v2/tickets.json`;

  axios({
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Authorization: Basic ${authString}`
    },
    url: url,
    data: {
      ticket: {
        subject: "Product return",
        comment: { body: `Product return initiated by ${parcelReturn.email}` }
      }
    }
  });
};
