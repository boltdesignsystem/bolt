import path from 'path';

export const template = {
  render(body, webpackAssets, buildConfig) {
    // const basePath = path.relative(buildConfig.wwwDir, buildConfig.buildDir);
    // const jsAssets = [];

    // for (let assetName in webpackAssets) {
    //   const assetPath = webpackAssets[assetName];
    //   console.log(assetPath);
    //   if (assetPath.endsWith('.js') && assetPath.includes('bundle') === false) {
    //     if (assetPath.includes(basePath)) {
    //       jsAssets.push(assetPath);
    //     } else {
    //       jsAssets.push('/' + path.join(basePath, assetPath));
    //     }
    //   }
    // }

    const html = `
      <!DOCTYPE html>
      <html>
        <head></head>
        <link rel="stylesheet" href="/build/bolt-global.server.css"/>
        <body>
          ${body}
        </body>

        <script src="/build/bolt-global.server.js"></script>
      </html>
    `;
    return html;
  },
};
