const axios = require("axios");
module.exports.handle = async function(parcelReturn) {
  /* In order to keep this sample simple, this does not send an actual invitation to
   * TrustPilot. That would take much more configuration than we'd like you to do for
   * this sample.
   *
   * That said, this can serve as an example of what it might look like.
   */

  // your credentials should be in your `.env` file.
  const trustPilotAuthToken = "your token"; // e.g. process.env.TRUST_PILOT_TOKEN;
  const trustPilotBusinessUnit = "business unit"; // e.g. process.env.TRUST_PILOT_BUSINESS_UNIT;

  /* This is all commented out because we don't want to actually run it.

  const url = `https://invitations-api.trustpilot.com/v1/private/business-units/${trustPilotBusinessUnit}/email-invitations`;

  const request_data = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${trustPilotAuthToken}`
    },
    url: url,
    data: {
      consumerEmail: parcelReturn.email,
      replyTo: "your@email.com",
      productReviewInvitation: {
        productSkus: parcelReturn.item
      },
      consumerName: parcelReturn.name,
      locale: "en-US",
      senderEmail: "your@email.com",
      senderName: "John Doe"
    }
  };

  // then send it via axios
  axios(request_data);

  */

  // you can get more information here: https://developers.trustpilot.com/invitation-api#create-invitation(s)

  // return true as a no-op
  return true;
};
