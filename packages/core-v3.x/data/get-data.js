import 'whatwg-fetch';

/**
 * Get Data
 * Retrieve any of the "NAME.bolt.json" files found in the builds data directory
 * @param {string} name - name of data file; examples: "shadows", "opacity", "colors/all", "colors/brand"
 * @return {Promise<Object>}
 */
export async function getData(name) {
  return await new Promise(async (resolve) => {
    await fetch(`${bolt.publicPath}data/${name}.bolt.json`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return resolve(data);
      });
  });
}
