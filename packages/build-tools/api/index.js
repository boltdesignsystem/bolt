const url = require('url');
const { render } = require('@bolt/twig-renderer');
const { getConfig } = require('../utils/config-store');
const log = require('../utils/log');

async function getBody(request) {
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
  const config = await getConfig();
  const { method } = req;
  const { pathname, query, search } = url.parse(req.url, true);
  // @todo test with `GET` requests
  // @todo test with empty body
  // console.log(`api request received at ${pathname}`); // remove once we're sure this works on server
  switch (pathname) {
    case '/':
      res.json({
        ok: true,
        message: `Welcome to the Bolt Design System API! Have a nice day!`,
      });
      break;
    case '/render':
      try {
        if (!query.template) {
          log.error('The template paramater is missing!');
        }
        const body = await getBody(req);
        const { ok, html, message } = await render(query.template, body);

        if (!ok) {
          log.error(message);
        }
        res.end(html);
      } catch (error) {
        log.errorAndExit(
          'Error rendering Twig using the Twig rendering service...',
          error,
        );
      }
      break;
    default:
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          ok: false,
          message: `No api route found at: ${pathname}`,
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
