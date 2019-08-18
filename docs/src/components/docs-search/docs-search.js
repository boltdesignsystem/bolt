import { props, define } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import docsearch from 'docsearch.js/dist/npm/src/lib/main.js';
import qs from 'querystring';

@define
class BoltDocsSearch extends withLitHtml() {
  static is = 'bds-docs-search';

  static props = {
    apiKey: props.string,
    indexName: props.string,
    inputSelector: props.any,
    debug: props.boolean,
    renderedHTML: props.any,
  };

  constructor(self) {
    self = super(self);
    self.useShadow = false;
    return self;
  }

  connecting() {
    this.inputSelector = '.js-docs-search';
    this.handleKeypress = this.handleKeypress.bind(this);

    document.addEventListener('keydown', this.handleKeypress);
    document.addEventListener('keyup', this.handleKeypress);
  }

  handleKeypress(e) {
    if (e.metaKey === true) {
      this.shouldOpenInNewWindow = true;
    } else {
      this.shouldOpenInNewWindow = false;
    }
  }

  // once the component has rendered with the UI we need, boot up the default docs search JS plugin
  rendered() {
    const self = this;
    if (this.renderRoot.querySelector(this.inputSelector)) {
      docsearch({
        apiKey: this.props.apiKey || '3ea0b745949a3c6ed2e0cf8650f62fc6',
        indexName: this.props.indexName || 'boltdesignsystem',
        inputSelector: this.inputSelector,
        debug: this.props.debug || false, // Set debug to true if you want to inspect the dropdown
        handleSelected(input, event, suggestion, datasetNumber, context) {
          suggestion.url = suggestion.url.replace('#menu', '');

          if (self.shouldOpenInNewWindow) {
            window.open(suggestion.url, '_blank');
          } else {
            window.location = suggestion.url;
          }
        },
      });
    } else {
      const searchFormTemplate = `
        {% set label %}
          {% include("@bolt-components-form/form-label.twig") with {
            "title": 'Search the Bolt Docs',
            "displayType": 'floating'
          } only %}
        {% endset %}

        {% set children %}
          {% include("@bolt-components-form/form-input.twig") with {
            "attributes": {
              'placeholder': 'Search the docs',
              'type': 'search',
              'class': 'js-docs-search'
            },
            icon_size: "small"
          } only %}
        {% endset %}

        {% include "@bolt-components-form/form-element.twig" with {
          label: label,
          children: children,
          icon_size: "small"
        } only %}
      `;

      const processResult = content => {
        this.renderedHTML = content;
        return html`
          ${unsafeHTML(content)}
        `;
      };

      this.renderedHTML = fetch(
        `/api/renderString?${qs.stringify({
          template: searchFormTemplate,
        })}`,
        {
          method: 'POST',
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then(res => res.text().then(result => processResult(result)));
    }
  }

  render() {
    if (this.renderedHTML) {
      return html`
        ${unsafeHTML(this.renderedHTML)}
      `;
    } else {
      return html`
        ${unsafeHTML(this.innerHTML)}
      `;
    }
  }
}

export { BoltDocsSearch };
