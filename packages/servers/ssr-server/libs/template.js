function template(html, port, webpackAssets) {
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

  return `
      <html>
        <head>
         
        </head>
        
        <body>
          ${html}
          ${assetPaths
            .filter(
              path => path.includes('.js') && path.includes('bundle') === false,
            )
            .map(
              path => `<script src="http://localhost:${port}${path}"></script>`,
            )
            .join('\n')}
        </body>
      </html>
    `;
}

module.exports = {
  template,
};
