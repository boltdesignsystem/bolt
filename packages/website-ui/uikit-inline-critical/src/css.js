'use strict';

const prettier = require('prettier');
const CleanCSS = require('clean-css');
const postcss = require('postcss');
const discard = require('postcss-discard');
const normalizeNewline = require('normalize-newline');

/**
 * Minify CSS
 * @param {string} styles CSS
 * @returns {string} Minified css string
 */
function minifyCss(styles) {
  return new CleanCSS().minify(styles).styles;
}

/**
 * Prettify CSS
 * @param {string} styles CSS
 * @param {object} indent Result object returned by detect-indent
 * @returns {string} Prettified css string
 */
function prettifyCss(styles, indent = {}) {
  return prettier.format(styles, {
    parser: 'css',
    useTabs: indent.type === 'tab',
    tabWidth: indent.amount || 2,
  });
}

/**
 * Remove styles
 * @param {string} styles CSS
 * @param {array<string>} css CSS
 * @returns {string} css string not containing any of the styles defined in css array
 */
function extractCss(styles, ...css) {
  const _styles = normalizeNewline(minifyCss(styles || ''));
  const _css = normalizeNewline(minifyCss(css.join('\n')));
  if (_css.trim() !== '') {
    return postcss(discard({css: _css})).process(_styles).css;
  }

  return _styles;
}

module.exports = {
  minifyCss,
  prettifyCss,
  extractCss,
};
