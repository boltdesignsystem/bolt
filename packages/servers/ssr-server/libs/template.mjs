import path from 'path';

export const template = {
  render(body, webpackAssets, buildConfig) {
    const assetPaths = [];

    for (let assetName in webpackAssets) {
      assetPaths.push(webpackAssets[assetName]);
    }

    // @todo: keep an eye out if we do end up needing CSS assets for this
    // ${assetPaths
    //   .filter(
    //     path =>
    //       path.includes('.scss') && path.includes('bundle') === false,
    //   )
    //   .map(path => `<link rel="stylesheet" href="${path}" />`)
    //   .join('\n')}

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
         
        </head>
        
        <body>
          ${body}
          ${assetPaths
            .filter(
              path => path.includes('.js') && path.includes('bundle') === false,
            )
            .map(path => `<script src="${path}"></script>`)
            .join('\n')}
        </body>
      </html>
    `;
    return html;
  },
};
