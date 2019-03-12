const highlight = require('cli-highlight').highlight;
const { renderToString, shutDownSSRServer } = require('./index');

const htmlString = process.argv[2] || '';
const shouldHighlight = process.argv[3] || true;

renderToString(htmlString).then(htmlRendered => {
  if (shouldHighlight === true) {
    console.log(
      highlight(htmlRendered, { language: 'html', ignoreIllegals: true }),
    );
  } else {
    console.log(htmlRendered);
  }

  process.exit(0);
});
