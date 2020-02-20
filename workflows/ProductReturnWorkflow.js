const { workflow, duration } = require("zenaton");

module.exports.handle = function*(parcelReturn) {
  // save this for later
  this.parcelReturn = parcelReturn;

  const email = this.parcelReturn.email;

  /* Run task to create the parcel return inside application */
  yield this.run.task("CreateReturnParcel", this.parcelReturn);

  /* Get parcel return data from database */
  const status = yield this.run.task("GetParcelData", this.parcelReturn);

  /* If the reason for return is status 1 */
  if (status === "status_1") {
    /* Send a email template 1 with Sendgrid */
    yield this.run.task(
      "SendEmail",
      email,
      "Template 1",
      "This is template 1!"
    );
    /* Escalate the issue to an operator with Zendesk */
    this.run.task("AssignSupportOperatorZendesk", this.parcelReturn);

    /* If the reason for return is status 2 */
  } else if (status === "status_2") {
    /* Send a email template 2 with Sendgrid */
    yield this.run.task(
      "SendEmail",
      email,
      "Template 2",
      "This is template 2!"
    );
    /* Send a request for to the user a review with Trustpilot API */
    this.run.task("AskReviewTrustPilot");

    /* If the reason for return is the last status */
  } else {
    yield this.run.task(
      "SendEmail",
      email,
      "Template 3",
      "This is the third template"
    );
  }

  /* Wait for the parcel to ship event until 3 days */
  const shipped = yield this.wait.event("Shipped").for(duration.seconds(30));

  /* If the user hasn't sent the product in 3 days */
  if (!shipped) {
    /* Start sending reminders  */
    const nb_max_reminder = 3;
    let nb_reminder = 0;
    let event = null;

    do {
      // Wait for the event Shipped
      event = yield this.wait.event("Shipped").for(duration.seconds(10));
      if (event === null) {
        yield this.run.task(
          "SendEmail",
          email,
          `Reminder #${nb_reminder + 1}...`,
          "..."
        );
      }

      nb_reminder++;
    } while (nb_reminder < nb_max_reminder && event === null);

    if (!event) {
      // we'd cancel the return
    }
  }
};
