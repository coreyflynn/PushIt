# PushIt
Logging example with express, winston, and slack

![](demo.gif)

## Up and running
This project uses google's OAuth2 service for authentication and integrates with slack as an additional winston transport. The project expects to be run in an environment with the following variables defined
```
GOOGLE_CLIENT_ID=#### //app client ID
GOOGLE_CLIENT_SECRET=#### //app client secret
GOOGLE_CALLBACK_URL=#### //OAuth callback url
SESSION_SECRET=#### //session secret for use with express sessions. This can be anything you like
SLACK_WEBHOOK_URL=#### //slack webhook to use when logging to your slack integration
SLACK_CHANNEL=#### //the slack channel to post to
LOG_TO_SLACK=#### // Boolean that toggles logging to slack. set to 'true' to turn on slack logging
```
If you place those definitions in a file at the root of the project called `.env`, PushIt will pick them up. Any other method to supply them as environment variables works as well!

Make sure you have an up to date node install and then
```
npm install
npm start
```
