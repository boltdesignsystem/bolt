const highlight = require('cli-highlight').highlight;
const { renderToString, shutDownSSRServer } = require('./index');

const htmlString = process.argv[2] || '';

renderToString(htmlString).then(htmlRendered => {
  console.log(
    highlight(htmlRendered, { language: 'html', ignoreIllegals: true }),
  );
  shutDownSSRServer();
  process.exit(0);
});
