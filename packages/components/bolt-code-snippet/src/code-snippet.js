import Prism from 'prismjs';
import { html, render } from '@bolt/element';
import cx from 'classnames/bind';
import ClipboardJS from 'clipboard';

// Prism only runs automatically on elements with the "language-*" class, but switch to manual just in case.
Prism.manual = true;

// Included by default: markup, html, xml, svg, mathml, ssml, atom, rss, javascript, js, clike
// Add-on languages:
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-rest';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-csv';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-css-extras';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-twig';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';

// Note: If adding a new language, be sure to add corresponding label to `./_code-snippet-languages`
import { languages } from './_code-snippet-languages';

export class BoltCodeSnippet {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    this.preElement = this.el.querySelector('pre');
    this.codeElement = this.el.querySelector('code');
    this.lang = this.el.dataset.boltLang;
    this.langTitle = this.el.dataset.boltLangTitle;

    if (!(this.preElement && this.codeElement && this.lang)) return;

    this.originalHTML = this.codeElement.innerHTML;
    this.filteredHTML = this.replaceEntities(this.originalHTML);
    this.hideTitle = this.el.hasAttribute('data-bolt-hide-title');
    this.hideCopy = this.el.hasAttribute('data-bolt-hide-copy');

    if (!(this.hideTitle && this.hideCopy)) {
      this.setupHeader();
    }

    this.highlightHTML();
    this.el.setAttribute('data-bolt-ready', '');
  }

  replaceEntities(string) {
    // Twig encodes HTML entities. Replace them before syntax highlighting.
    return string
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  highlightHTML() {
    try {
      this.codeElement.innerHTML = Prism.highlight(
        this.filteredHTML,
        Prism.languages[this.lang],
      );
    } catch (error) {
      console.log(error);
    }
  }

  setupHeader() {
    this.header = document.createElement('div');
    this.header.classList.add('c-bolt-code-snippet__header');

    this.el.prepend(this.header);

    // Custom language title overrides default
    this.title = this.langTitle || languages[this.lang];
    this.copied = false;

    this.renderHeader();

    if (!this.hideCopy) {
      // Must come after renderHeader
      this.setupClipboard();
    }
  }

  setupClipboard() {
    const clipboardTrigger = this.header.querySelector(
      '.js-bolt-code-snippet-copy-trigger',
    );

    if (!clipboardTrigger) return;

    this.preElement?.setAttribute('tabindex', '0');

    const clip = new ClipboardJS(clipboardTrigger, {
      text: () => {
        return this.filteredHTML;
      },
    });

    clip.on('success', () => {
      this.copied = true;

      this.renderHeader();
      this.preElement?.focus();

      setTimeout(() => {
        this.copied = false;
        this.renderHeader();
      }, 2000);
    });
    clip.on('error', function() {
      console.log('There was an error copying this code');
      this.copied = false;
    });
  }

  renderHeader() {
    const copyClasses = cx(
      'c-bolt-code-snippet__copy',
      'js-bolt-code-snippet-copy',
    );

    const copyButtonClasses = cx(
      'e-bolt-text-link',
      'e-bolt-text-link--reversed-underline',
      'js-bolt-code-snippet-copy-trigger',
      { 'u-bolt-hidden': this.copied },
    );

    const copyConfirmationClasses = cx(
      'js-bolt-code-snippet-copy-confirmation',
      { 'u-bolt-hidden': this.copied === false },
    );

    render(
      html`
        ${!this.hideTitle
          ? html`
              <span class="c-bolt-code-snippet__title">${this.title}</span>
            `
          : ``}
        ${!this.hideCopy
          ? html`
              <div class="${copyClasses}">
                <button type="button" class="${copyButtonClasses}">
                  <span class="e-bolt-text-link__icon-before"
                    ><bolt-icon name="copy-to-clipboard"></bolt-icon></span
                  >Copy</button
                >${this.copied
                  ? html`
                      <span
                        class="${copyConfirmationClasses}"
                        aria-live="polite"
                      >
                        Copied
                      </span>
                    `
                  : ``}
              </div>
            `
          : ``}
      `,
      this.header,
    );
  }
}
