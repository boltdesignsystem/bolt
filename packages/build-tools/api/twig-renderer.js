const qs = require('querystring');
const fetch = require('node-fetch');
const config = require('@bolt/build-tools/utils/config-store').getConfig();
// const { getPort } = require('../utils/get-port');

async function twigRenderer(templatePath, body) {
  const options = {
    method: body ? 'POST' : 'GET',
  };
  if (body) options.body = JSON.stringify(body);
  const response = await fetch(`http://127.0.0.1:${config.renderingServicePort}?${qs.stringify({
    templatePath,
  })}`, options);
  const html = await response.text();

  const { status, statusText, ok } = response;
  return {
    status,
    statusText,
    ok,
    html,
  };
}

module.exports = {
  twigRenderer,
};
