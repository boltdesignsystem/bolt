const log = require('../utils/log');
const fetch = require('node-fetch');

const phpServerPort = 8087; // @todo dynamically grab open port

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
    request.on('error', (e) => {
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
  console.log('Received /api request');
  const { method, url } = req;
  // let body;
  // if (method === 'POST') {
  const body = await getBody(req);
  // }
  // @todo test with `GET` requests
  // @todo test with empty body
  console.log({ method, url, body });
  switch(url) {
    case '/render-twig':
      try {
        const renderResponse = await fetch(`http://localhost:${phpServerPort}`, {
          method: 'POST',
          body: JSON.stringify(body),
        }).then(res => res.json());
        console.log('/render-twig response:');
        console.log(renderResponse);
        // @todo take headers from `renderResponse`, put in `res`
        res.end(JSON.stringify(renderResponse));
      } catch (error) {
        log.errorAndExit('Error connecting to phpServer api endpoint', error);
      }
      break;
    default:
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        ok: false,
        message: `Not api route found at: ${url}`,
      }), 'utf8', () => console.log(`Responded to an unknown API endpoint request for ${method} to ${url}.`));
  }
}
module.exports = {
  handleRequest,
  phpServerPort,
};
