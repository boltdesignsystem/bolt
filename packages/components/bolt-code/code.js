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

import styles from './atom-one-dark.scss';

// List of languages to support syntax highlighting
refractor.register(require('refractor/lang/twig.js'));
refractor.register(require('refractor/lang/scss.js'));
refractor.register(require('refractor/lang/css.js'));
refractor.register(require('refractor/lang/css-extras.js'));
refractor.register(require('refractor/lang/bash.js'));
refractor.register(require('refractor/lang/markdown.js'));
refractor.register(require('refractor/lang/yaml.js'));


export function BoltCode() {
  return class BoltCodeClass extends BoltSnabbdom() {

    static props = {
      lang: props.string,
    };

    constructor(self) {
      self = super(self);
      this.useShadow = false;
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
      const { lang } = this.props;
      const nodes = refractor.highlight(this.innerHTML, lang);

      var html = rehype().stringify({
        type: 'root',
        children: nodes,
      }).toString();

      let vnode = virtualize(html);

      return this.html`
        <pre class=${`language-${lang}`}>
          ${ this.addStyles([styles]) }
          <code class=${`language-${lang}`}>
            ${ vnode }
          </code>
        </pre>
      `;
    }
  }
}
