module.exports = {
  hookUrl: 'https://hooks.slack.com/services/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',
  slackChannel: '#design-system-ci',
  slackEmoji: ':bolt:',
  slackText: `Success! Bolt deployed to ${process.env.SURGE_DEPLOY_URL}`
};
