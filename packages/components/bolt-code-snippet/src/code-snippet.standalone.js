/** @jsx html */
import {
  render,
  define,
  props,
  withComponent,
  withPreact,
  css,
  spacingSizes,
  BoltComponent,
  BoltSnabbdom,
  hasNativeShadowDomSupport,
} from '@bolt/core';

import rehype from 'rehype';
import virtualize from 'snabbdom-virtualize';
import refractor from 'refractor/core.js';

import styles from './code-snippet.scss';
import syntaxStyles from './code-snippet-syntax.scss';

// List of languages to support syntax highlighting
refractor.register(require('refractor/lang/twig.js'));
refractor.register(require('refractor/lang/scss.js'));
refractor.register(require('refractor/lang/css.js'));
refractor.register(require('refractor/lang/css-extras.js'));
refractor.register(require('refractor/lang/bash.js'));
refractor.register(require('refractor/lang/markdown.js'));
refractor.register(require('refractor/lang/yaml.js'));


export function BoltCodeSnippet() {
  return class BoltCodeSnippetClass extends BoltSnabbdom() {

    static props = {
      lang: props.string,
      display: props.string,
      syntax: props.string,
    };

    highlightHTML(innerHTML, lang) {
      let highlightedHTML = '';

      rehype().stringify({
        type: 'root',
        children: refractor.highlight(innerHTML, lang),
      }).toString()
      .split('\n')
      .forEach((line, i, lines) => {
        if (line.length && lines.length > 1) {
          // If a block snippet
          highlightedHTML = highlightedHTML.concat(`<span class="c-bolt-code-snippet__code--block">${ line }</ span>`);
        } else {
          // Else an inline snippet
          highlightedHTML = highlightedHTML.concat(line);
        }
      });

      return virtualize(highlightedHTML);
    }

    constructor(self) {
      self = super(self);
      this.useShadow = hasNativeShadowDomSupport;
      return self;
    }

    connecting(){
      if (this.querySelector('[is*=shadow-root]')) {
        const parentElement = this.querySelector('[is*=shadow-root]');
        this.innerHTML = parentElement.innerHTML;
      }
    }

    render() {
      const { lang, display, syntax } = this.props;
      const highlightedCode = this.highlightHTML(this.innerHTML, lang);

      const codeClasses = css(
        'c-bolt-code-snippet__code',
        display ? `c-bolt-code-snippet__code--${display}` : 'c-bolt-code-snippet__code--block',
        syntax ? `c-bolt-code-snippet-syntax--${syntax}` : 'c-bolt-code-snippet-syntax--light',
        lang ? `language-${lang}` : 'language-html',
      );

      const preClasses = css(
        'c-bolt-code-snippet',
        syntax ? `c-bolt-code-snippet-syntax--${syntax}` : 'c-bolt-code-snippet-syntax--light',
        lang ? `language-${lang}` : 'language-html',
      );

      if (display === 'inline'){
        return this.html`
          <code class=${codeClasses}>${ this.addStyles([styles, syntaxStyles]) }${ highlightedCode }</code>
        `;
      } else {
        return this.html`
          <pre class=${preClasses}><code class=${codeClasses}>${ this.addStyles([styles, syntaxStyles]) }${ highlightedCode }</code></pre>
        `;
      }
    }
  }
}


