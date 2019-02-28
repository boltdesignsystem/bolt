import path from 'path';

export const template = {
  render(body, webpackAssets, buildConfig) {
    const basePath = path.relative(buildConfig.wwwDir, buildConfig.buildDir);
    const jsAssets = [];

    for (let assetName in webpackAssets) {
      const assetPath = webpackAssets[assetName];
      if (assetPath.endsWith('.js'))
        jsAssets.push(path.join(basePath, assetPath));
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head></head>

        <body>
          ${body}
        </body>

        ${jsAssets.map(path => `<script src="/${path}"></script>`).join('\n')}
      </html>
    `;
    return html;
  },
};
