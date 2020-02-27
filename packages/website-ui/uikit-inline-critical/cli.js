#!/usr/bin/env node

'use strict';

const os = require('os');
const fs = require('fs');
const meow = require('meow');
const chalk = require('chalk');
const indentString = require('indent-string');
const stdin = require('get-stdin');
const css = require('css');
const escapeRegExp = require('lodash.escaperegexp');
const defaults = require('lodash.defaults');
const inlineCritical = require('.');

let ok;
const help = `
Usage: inline-critical <input> [<option>]

Options:
    -c, --css       Path to CSS file
    -h, --html      Path to HTML file
    -i, --ignore    Skip matching stylesheets
    -m, --minify    Minify the styles before inlining (default)
    -e, --extract   Remove the inlined styles from any stylesheets referenced in the HTML
    -b, --base      Is used when extracting styles to find the files references by href attributes
    -s, --selector  Optionally defines the element used by loadCSS as a reference for inlining

    --noscript      Position of noscript fallback ('body' - end of body, 'head' - end of head, false - no noscript)
`;

const cli = meow(help, {
  autoHelp: true,
  autoVersion: true,
  flags: {
    css: {
      type: 'string',
      alias: 'c',
    },
    html: {
      type: 'string',
      alias: 'h',
    },
    ignore: {
      type: 'string',
      alias: 'i',
    },
    minify: {
      type: 'boolean',
      alias: 'm',
      default: true,
    },
    extract: {
      type: 'boolean',
      alias: 'e',
    },
    base: {
      type: 'string',
      alias: 'b',
    },
    selector: {
      type: 'string',
      alias: 's',
    },
    noscript: {
      type: 'string',
    },
  },
});

// Cleanup cli flags
cli.flags = Object.entries(cli.flags).reduce((res, [key, val]) => {
  if (key.length <= 1) {
    return res;
  }

  switch (key) {
    case 'css':
    case 'html':
      try {
        res[key] = read(val);
      } catch (_) {}

      break;
    case 'base':
      res.basePath = val;
      break;
    case 'ignore':
      if (!Array.isArray(val)) {
        val = [val];
      }

      res.ignore = (val || []).map(ignore => {
        // Check regex
        const match = ignore.match(/^\/(.*)\/([igmy]+)?$/);

        if (match) {
          return new RegExp(escapeRegExp(match[1]), match[2]);
        }

        return ignore;
      });
      break;
    default:
      res[key] = val;
      break;
  }

  return res;
}, {});

function processError(err) {
  process.stderr.write(chalk.red(indentString(`Error: ${err.message || err}`, 2)));
  process.stderr.write(os.EOL);
  process.stderr.write(indentString(help, 2));
  process.exit(1);
}

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    processError(error);
  }
}

function run(data) {
  const opts = defaults(cli.flags, {basePath: process.cwd()});
  ok = true;

  if (data) {
    // Detect html
    try {
      css.parse(data);
      opts.css = data;
    } catch (_) {
      opts.html = data;
    }
  }

  (cli.input || []).forEach(file => {
    const tmp = read(file);
    try {
      css.parse(tmp);
      opts.css = tmp;
    } catch (_) {
      opts.html = tmp;
    }
  });

  if (!opts.html || !opts.css) {
    cli.showHelp();
  }

  const {html, css: styles, ...options} = opts;

  try {
    const out = inlineCritical(html, styles, options);
    process.stdout.write(out.toString(), process.exit);
  } catch (error) {
    processError(error);
  }
}

// Get stdin
stdin().then(run);
setTimeout(() => {
  if (ok) {
    return;
  }

  run();
}, 100);
