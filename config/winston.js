var winston = require('winston')
var slackWinston = require('slack-winston').Slack

var options = {
  webhook_url: process.env.SLACK_WEBHOOK_URL,
  channel: process.env.SLACK_CHANNEL,
  level: 'info'
}

winston.add(slackWinston, options)

module.exports = winston;
