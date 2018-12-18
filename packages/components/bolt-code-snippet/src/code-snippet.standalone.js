import {
  define,
  props,
  css,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import { h, withPreact } from '@bolt/core/renderers';

import ClipboardJS from 'clipboard';
import html from 'preact-html';
import Prism from 'prismjs/components/prism-core';

import styles from './code-snippet.scss';

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-twig';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-css-extras';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';

@define
class BoltCodeSnippetClass extends withPreact() {
  static is = 'bolt-code-snippet';

  static props = {
    lang: props.string,
    display: props.string,
    syntax: props.string,
    copyToClipboard: props.boolean,
  };

  highlightHTML(code, lang) {
    const escapedLangs = ['scss', 'html'];

    code = escapedLangs.includes(lang)
      ? code
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
      : code;
    const highlightedHTML = Prism.highlight(code, Prism.languages[lang]);

    return highlightedHTML;
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

  rendered() {
    if (this.props.copyToClipboard === true) {
      const code = this.code;
      const clipboard = new ClipboardJS(
        this.renderRoot.querySelector('.js-bolt-copy-code'),
        {
          text(trigger) {
            return code
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>');
          },
        },
      );

      clipboard.on('success', e => {
        e.trigger.textContent = 'Copied';
        e.trigger.setAttribute('color', 'secondary');

        // Show the "success" status.
        setTimeout(() => {
          e.trigger.textContent = 'Copy';
          e.trigger.setAttribute('color', 'primary');
        }, 1000);
      });
    }
  }

  expandCode() {
    const preTag = this.renderRoot.querySelector('pre');
    const arrowButton = this.renderRoot.querySelector('.js-bolt-expand-code');
    preTag.style.maxHeight = '9999px';

    arrowButton.style.opacity = '0';
  }

  render() {
    const { copyToClipboard, lang, display, syntax } = this.props;
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

    const Code = () => {
      return (
        <code className={codeClasses}>
          {this.addStyles([styles])}
          {html(highlightedCode)}
        </code>
      );
    };

    const Pre = () => {
      return (
        <pre className={preClasses}>
          <Code />
        </pre>
      );
    };

    if (display === 'inline') {
      return <Code />;
    } else {
      if (copyToClipboard) {
        return (
          <div style="position: relative;">
            <Pre />

            <bolt-button
              style="bottom: 1rem; right: 1rem; position: absolute;"
              size="xsmall"
              color="primary"
              className="js-bolt-copy-code"
              rounded="rounded">
              Copy
            </bolt-button>
          </div>
        );
      } else {
        return <Pre />;
      }
    }
  }
}

export { BoltCodeSnippetClass };
