require("dotenv").config();
// load dependencies
const { workflow, task } = require("zenaton");

// define tasks
task("AskReviewTrustPilot", require("./tasks/AskReviewTrustPilot"));
task("CreateReturnParcel", require("./tasks/CreateReturnParcel"));
task(
  "SendEmailWithSendgrid_axios",
  require("./tasks/SendEmailWithSendgrid_axios")
);
task(
  "AssignSupportOperatorZendesk",
  require("./tasks/AssignSupportOperatorZendesk")
);
task("GetParcelData", require("./tasks/GetParcelData"));
task("SendEmail", require("./tasks/SendEmailWithSendgrid_axios"));
// task("SendEmail", require("./tasks/SendEmailWithSendgrid_sdk"));

// define workflows
workflow(
  "ProductReturnWorkflow",
  require("./workflows/ProductReturnWorkflow.js")
);
