const portfinder = require('portfinder');

async function getPort(basePort = 8000) {
  return new Promise((resolve, reject) => {
    return portfinder
      .getPortPromise({
        port: basePort,
      })
      .then((port) => {
        return resolve(port);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

module.exports = {
  getPort,
};
