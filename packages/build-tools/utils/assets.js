const fs = require('fs-extra');
const path = require('path');
const { getConfig } = require('./config-store');

let config;
let revisionedAssetManifest;

const getManifest = async langSuffix => {
  config = config || (await getConfig());
  if (!revisionedAssetManifest) {
    revisionedAssetManifest =
      fs.readJsonSync(
        path.join(config.wwwDir, `bolt-webpack-manifest${langSuffix}.json`),
        { throws: false },
      ) || {};
  }

  return revisionedAssetManifest;
};

const saveManifest = async langSuffix => {
  config = config || (await getConfig());
  fs.outputJson(
    path.join(config.wwwDir, `bolt-webpack-manifest${langSuffix}.json`),
    revisionedAssetManifest,
    { spaces: 2 },
  );
};

const addAsset = async (filename, revisionedFilename, langSuffix) => {
  getManifest(langSuffix);

  revisionedAssetManifest[filename] = revisionedFilename;

  saveManifest(langSuffix);
};

module.exports = {
  getManifest,
  saveManifest,
  addAsset,
};
