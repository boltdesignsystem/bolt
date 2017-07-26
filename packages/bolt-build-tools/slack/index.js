/*-------------------------------------------------------------------
// Post to Slack
-------------------------------------------------------------------*/
require('dotenv').config();
const Slack = require('node-slack');
const merge = require('merge').recursive;
const defaultConfig = require('./config.default');

function slackNotification(userConfig) {
  const config = merge(defaultConfig, userConfig);
  const slack = new Slack(config.hookUrl);

  function slackNotificationTask(done) {
    slack.send({
      channel: config.slackChannel,
      text: config.slackText,
      icon_emoji: config.slackEmoji,
      attachments: {
        fallback: `Success! Bolt deployed to <${process.env.SURGE_DEPLOY_URL}|here>`,
        pretext: `Success! Bolt deployed to <${process.env.SURGE_DEPLOY_URL}|here>`,
        color: '#FFCC4C'
      }
    });
    done();
  }

  slackNotificationTask.displayName = 'slack';
  slackNotificationTask.description = 'Send notification via Slack';
  return slackNotificationTask;
}


export { slackNotification as default };
