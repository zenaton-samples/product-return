# Zenaton Project Boilerplate

This Workflow optimizes a customer product return process by automating internal processes and interfacing with external services: a shipping company, Sengrid, Zendesk and TrustPilot API. This workflow automates a customer product return by generating and sending information to the customer and then sending status updates and notifications to the customer and internal team when events occur - or trigger other actions if they don't occur.

Because this is an example, no shipping information is created, and no invitations for reviews will be sent from TrustPilot. However, there is information in the code for how you can implement those features.

## Development

The `boot.js` file is where you tell the Zenaton Agent where to find - by name - the source code of your tasks and workflows.

> If you add a task or a workflow to your project, do not forget to update the `boot.js` file.

Look at Zenaton documentation to learn how to implement [workflows](https://docs.zenaton.com/workflows/implementation/) and [tasks](https://docs.zenaton.com/tasks/implementation/).

## Run

You can dispatch tasks and workflows by name from everywhere using [Zenaton API](https://docs.zenaton.com/client/graphql-api/). They will be processed as soon as you run this project.

> Note: tasks and workflows are dispatched in an environment (`AppEnv`) of your Zenaton application (`AppId`). They will be processed by this project, **if** you setup it with the same `AppId` and `AppEnv`. You must also provide an `Api Token` to authorize access to this application (found at https://app.zenaton.com/api)

### Run Locally

First, install dependencies:

```
npm install
```

then, fill-in `ZENATON_APP_ID` and `ZENATON_API_TOKEN` in the `.env` file.

Install a Zenaton Agent:

```sh
curl https://install.zenaton.com | sh
```

and run it:

```sh
zenaton listen --boot=boot.js
```

### Run in Docker

Create your `.env` file

```
cp -n .env.sample .env
```

and fill-in `ZENATON_APP_ID` and `ZENATON_API_TOKEN` in it.

Then start your container:

```
cd docker && docker-compose up
```

### Run on Heroku

Follow this button [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy), then fill in the env variables and click "deploy".

### Run somewhere else

Check our [documentation](https://docs.zenaton.com/going-to-production/) for more options (AWS, Google Cloud, Clever Cloud ...)

### Checking that your project is running

Whatever your installation method, you should see that a new Agent is listening from this url: https://app.zenaton.com/agents (if you do not see it, please check again that you have selected the right application and environment).

## Dispatching Tasks and Workflows

### Using Zenaton API

Tasks and workflows can be dispatched by name from everywhere using the [Zenaton API](https://docs.zenaton.com/client/graphql-api/) or our [Node.js SDK](https://github.com/zenaton/zenaton-node).

You can test it from your command line interface:

Dispatching a `"ProductReturnWorkflow"` workflow:

```bash
curl -X POST https://gateway.zenaton.com/graphql \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -d '{"query":"mutation($input: DispatchWorkflowInput!) { dispatchWorkflow(input: $input) { id } }","variables":{"input":{"appId":"<APP_KEY>","environment":"dev","name":"ProductReturnWorkflow","input":"[{\"email\":\"my@email.com\", \"status\":\"status1\"}]"}}}'
```

> Do not forget to replace `<APP_ID>` and `<API_TOKEN>` by your Zenaton AppId and api token. You will also need to enter your other API keys (see `.env.sample` for more information)

Sending a `"Shipped"` event to this workflow:

```bash
curl -X POST https://gateway.zenaton.com/graphql \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <APP_TOKEN>" \
  -d '{"query":"mutation($input: SendEventToWorkflowsInput!) { sendEventToWorkflows(input: $input) { status } }","variables":{"input":{"appId":"<APP_ID>","environment":"dev","name":"Shipped","data":"[]","selector":{"id":"<WORKFLOW_ID>"}}}}'
```

> Do not forget to replace `<APP_ID>` and `<API_TOKEN>` by your Zenaton AppId and api token. And <WORKFLOW_ID> by your workflow's id that you have received when dispatched.

### Example App

We have provided an [example app](https://github.com/zenaton/nodejs-example-app) with basic UI to dispatch workflows and events with associated data to your Zenaton project. After installation, you can (optionaly) add your workflows and some examples of input and event in the `public/config.json` file. eg.

```json
{
  "workflows": [
    {
      "name": "HelloWorld",
      "input": ["Me"]
    }
  ]
}
```

> You need to rebuild your example app after having modified this file. If you prefer, you can update directly `dist/config.json` and simply reload the page - but your changes will be lost at the next rebuild.

## Monitoring Tasks and Worklows Processing

Look at your [dashboard](https://app.zenaton.com/workflows) (if you do not see your dispatched tasks or workflows, please check that you have selected the right application and environment).
