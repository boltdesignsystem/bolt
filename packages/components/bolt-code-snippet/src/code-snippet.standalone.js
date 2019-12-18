import { customElement } from '@bolt/element';
import { props, css, hasNativeShadowDomSupport } from '@bolt/core-v3.x/utils';
import { h, withPreact, Markup } from '@bolt/core-v3.x/renderers';
import Prism from 'prismjs/components/prism-core';
import styles from './code-snippet.scss';

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-twig';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-css-extras';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';

@customElement('bolt-code-snippet')
class BoltCodeSnippetClass extends withPreact {
  static props = {
    lang: props.string,
    display: props.string,
    syntax: props.string,
  };

  replaceEntities(string) {
    return string
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  highlightHTML(code, lang) {
    return Prism.highlight(this.replaceEntities(code), Prism.languages[lang]);
  }

  constructor(self) {
    self = super(self);
    return self;
  }

  connecting() {
    if (this.querySelector('[is*=shadow-root]')) {
      const parentElement = this.querySelector('[is*=shadow-root]');
      this.innerHTML = parentElement.innerHTML;
    }
    this.code = this.innerHTML;

    if (!hasNativeShadowDomSupport) {
      this.innerHTML = '';
    }
  }

  render() {
    const { lang, display, syntax } = this.props;
    const highlightedCode = this.highlightHTML(this.code, lang);

    const codeClasses = css(
      'c-bolt-code-snippet__code',
      display
        ? `c-bolt-code-snippet__code--${display}`
        : 'c-bolt-code-snippet__code--block',
      syntax
        ? `c-bolt-code-snippet-syntax--${syntax}`
        : 'c-bolt-code-snippet-syntax--light',
      lang ? `language-${lang}` : 'language-html',
    );

    const preClasses = css(
      'c-bolt-code-snippet',
      syntax
        ? `c-bolt-code-snippet-syntax--${syntax}`
        : 'c-bolt-code-snippet-syntax--light',
      lang ? `language-${lang}` : 'language-html',
    );

    if (display === 'inline') {
      return (
        <code className={codeClasses}>
          {this.addStyles([styles])}
          <Markup markup={highlightedCode} trim={false} />
        </code>
      );
    } else {
      return (
        <pre className={preClasses}>
          <code className={codeClasses}>
            {this.addStyles([styles])}
            <Markup markup={highlightedCode} trim={false} />
          </code>
        </pre>
      );
    }
  }
}

export { BoltCodeSnippetClass };
