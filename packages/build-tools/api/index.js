const url = require('url');
const fetch = require('node-fetch');
const log = require('../utils/log');
const config = require('../utils/config-store').getConfig();

function getBody(request) {
  return new Promise((resolve, reject) => {
    let body = [];
    request.on('data', chunk => body.push(chunk));
    request.on('end', () => {
      body = Buffer.concat(body).toString();
      if (request.headers['content-type'] === 'application/json') {
        body = JSON.parse(body);
      }
      resolve(body);
    });
    request.on('error', e => {
      console.error(`problem with request: ${e.message}`);
      reject(e.message);
    });
  });
}

/**
 *
 * @param req {http.IncomingMessage}
 * @param res {http.ServerResponse}
 * @param next
 */
async function handleRequest(req, res, next) {
  const { method } = req;
  const { pathname, query, search } = url.parse(req.url, true);
  // let body;
  // if (method === 'POST') {
  const body = await getBody(req);
  // }
  // @todo test with `GET` requests
  // @todo test with empty body
  switch (pathname) {
    case '/render-twig':
      try {
        /** @var renderResponse {Response} */
        const renderResponse = await fetch(
          `http://127.0.0.1:${config.renderingServicePort}${search}`,
          {
            method,
            body: method === 'POST' ? JSON.stringify(body) : null,
          },
        );
        const data = await renderResponse.text();
        // console.log(renderResponse);

        const { status } = renderResponse;
        const warning = renderResponse.headers.get('Warning');
        res.setHeader(
          'Content-Type',
          renderResponse.headers.get('Content-Type'),
        );
        res.statusCode = status;
        if (warning) {
          res.statusMessage = warning;
          res.setHeader('Warning', warning);
        }
        res.end(data);
      } catch (error) {
        log.errorAndExit('Error connecting to phpServer api endpoint', error);
      }
      break;
    default:
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          ok: false,
          message: `Not api route found at: ${url}`,
        }),
        'utf8',
        () =>
          console.log(
            `Responded to an unknown API endpoint request for ${method} to ${url}.`,
          ),
      );
  }
}
module.exports = {
  handleRequest,
};
