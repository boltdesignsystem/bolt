/**
 * Get Data
 * Retrieve any of the "NAME.bolt.json" files found in the builds data directory
 * @param {string} name - name of data file; examples: "shadows", "opacity", "colors/all", "colors/brand"
 * @return {Promise<Object>}
 */
export function getData(name) {
  return new Promise((resolve, reject) => {
    let publicPath;
    try {
      // webpack global variable for publicPath ~ https://webpack.js.org/guides/public-path/#on-the-fly
      // @ts-ignore
      publicPath = __webpack_public_path__; // eslint-disable-line camelcase
    } catch (err) {
      console.error(err);
      reject();
    }
    // console.log('webpack_public_path', __webpack_public_path__);

    if (typeof publicPath !== 'string') {
      console.error('uh oh, publicPath is not a string', { publicPath });
      reject();
    }

    const path = `${publicPath}data/${name}.bolt.json`;

    // using this instead of `fetch` since it is not pollyfilled and we want IE11 support
    const request = new XMLHttpRequest();
    request.open('GET', path, true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        const data = JSON.parse(this.response);
        resolve(data);
      } else {
        // We reached our target server, but it returned an error
        reject();
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      reject();
    };

    request.send();
  });
}
