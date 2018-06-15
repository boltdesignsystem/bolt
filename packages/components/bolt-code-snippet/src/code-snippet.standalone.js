import {
  h,
  render,
  define,
  props,
  withComponent,
  css,
  spacingSizes,
  withPreact,
  hasNativeShadowDomSupport,
} from '@bolt/core';

import styles from './code-snippet.scss';
import syntaxStyles from './code-snippet-syntax.scss';

import Prism from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-twig';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-css-extras';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';


@define
export class BoltCodeSnippetClass extends withPreact() {
  static is = 'bolt-code-snippet';

  static props = {
    lang: props.string,
    display: props.string,
    syntax: props.string,
  };

  highlightHTML(code, lang) {
    let highlightedHTML = Prism.highlight(code, Prism.languages[lang]);

    return highlightedHTML;
  }

  constructor(self) {
    self = super(self);
    return self;
  }

  connecting(){
    if (this.querySelector('[is*=shadow-root]')) {
      const parentElement = this.querySelector('[is*=shadow-root]');
      this.innerHTML = parentElement.innerHTML;
    }
    this.code = this.innerHTML;
  }

  render() {
    const { lang, display, syntax } = this.props;
    const highlightedCode = this.highlightHTML(this.code, lang);

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
      return (
        <code className={codeClasses}>{this.addStyles([styles, syntaxStyles])}{this.html(highlightedCode)}</code>
      )
    } else {
      return (
        <pre className={preClasses}><code className={codeClasses}>{this.addStyles([styles, syntaxStyles])}{this.html(highlightedCode)}</code></pre>
      )
    }
  }
}
