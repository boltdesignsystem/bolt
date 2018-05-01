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

    constructor(self) {
      self = super(self);
      this.useShadow = hasNativeShadowDomSupport;
      return self;
    }

    connecting(){
      if (this.querySelector('[is*=shadow-root]')) {
        const parentElement = this.querySelector('[is*=shadow-root]');
        console.log(parentElement);
        this.innerHTML = parentElement.innerHTML;
      }
    }

    render() {
      const { lang, display, syntax } = this.props;
      const nodes = refractor.highlight(this.innerHTML, lang);

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


      var html = rehype().stringify({
        type: 'root',
        children: nodes,
      }).toString();

      let vnode = virtualize(html);

      if (display === 'inline'){
        return this.html`
          <code class=${codeClasses}>${ this.addStyles([styles, syntaxStyles]) }${ vnode }</code>
        `;
      } else {
      console.log(vnode);
        return this.html`
          <pre class=${preClasses}><code class=${codeClasses}>${ this.addStyles([styles, syntaxStyles]) }${ vnode }</code></pre>
        `;
      }
    }
  }
}


