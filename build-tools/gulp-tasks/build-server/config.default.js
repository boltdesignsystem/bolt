module.exports = {
  // server: {
  //   baseDir: './sandbox/pattern-library/public'
  // },
  // httpModule: 'http2',
  // https: {
  //   key: `${__dirname}/certs/key.pem`,
  //   cert: `${__dirname}/certs/cert.pem`
  // },
  ghostMode: false,
  open: true,
  installCert: false,
  serverName: 'bolt-server',
  certNames: 'bolt',
  // files: [
  //   '**/*.html'
  // ],
  notify: {
    styles: [
      'display: none',
      'padding: 15px',
      'font-family: sans-serif',
      'position: fixed',
      'font-size: 0.9em',
      'z-index: 9999',
      'bottom: 0px',
      'right: 0px',
      'border-bottom-left-radius: 5px',
      'background-color: #1B2032',
      'margin: 0',
      'color: white',
      'text-align: center',
    ],
  },
  snippetOptions: {

    // Ignore all HTML files within the templates folder
    // ignorePaths: "templates/*.html",

    // Provide a custom Regex for inserting the snippet.
    rule: {
      match: /<\/body>/i,
      fn: function (snippet, match) {
        return snippet + match;
      }
    }
  }
};
