import {
  props,
  define,
  declarativeClickHandler,
  sanitizeBoltClasses,
  hasNativeShadowDomSupport,
  afterNextRender,
  watchForComponentMutations,
} from '@bolt/core/utils';
import classNames from 'classnames/bind';
import {
  withLitHtml,
  html,
  render,
} from '@bolt/core/renderers/renderer-lit-html';
import Ajv from 'ajv';

import styles from './link.scss';
import schema from '../link.schema.yml';

const ajv = new Ajv({ useDefaults: 'shared' });

let cx = classNames.bind(styles);

@define
class BoltLink extends withLitHtml() {
  static is = 'bolt-link';

  static props = {
    url: props.string,
    target: props.string,
    isHeadline: props.boolean,
    onClick: props.string, // Managed by base class
    onClickTarget: props.string, // Managed by base class
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.validate = ajv.compile(schema);
    return self;
  }

  // @todo: move to the global Bolt Base component after we're done testing this out with the new refactored Card component
  validateProps(propData) {
    var validatedData = propData;

    // remove default strings in prop data so schema validation can fill in the default
    for (let property in validatedData) {
      if (validatedData[property] === '') {
        delete validatedData[property];
      }
    }

    let isValid = this.validate(validatedData);

    // bark at any schema validation errors
    if (!isValid) {
      console.log(this.validate.errors);
    }

    return validatedData;
  }

  connecting() {
    const root = this;

    // If the initial <bolt-link> element contains a link, break apart the original HTML so we can retain the a tag but swap out the inner content with slots.

    // Make sure the button component ONLY ever reuses any existing HTML ONCE. This, in part, helps to prevent rendering diff errors in HyperHTML after booting up!
    if (this._wasInitiallyRendered === false) {
      this.childNodes.forEach((childElement, i) => {
        if (childElement.tagName === 'A') {
          root.rootElement = document.createDocumentFragment();

          // Take any existing elements and move them to the root of the custom element
          while (childElement.firstChild) {
            root.appendChild(childElement.firstChild);
          }

          if (childElement.className) {
            childElement.className = sanitizeBoltClasses(childElement);
          }

          if (
            childElement.getAttribute('is') &&
            childElement.getAttribute('is') === 'shadow-root'
          ) {
            childElement.removeAttribute('is');
          }

          root.rootElement.appendChild(childElement);
        }
      });
    }

    // When possible, use afterNextRender to defer non-critical work until after first paint.
    afterNextRender(this, function() {
      this.addEventListener('click', this.clickHandler);
    });
  }

  rendered() {
    super.rendered(); // ensure any events emitted by the Bolt Base class fire as expected

    // re-render if Shadow DOM is supported and enabled; temp workaround to dealing w/ components already rendered, but without slot support
    if (hasNativeShadowDomSupport && this.useShadow) {
      this.observer = watchForComponentMutations(this);

      this.observer.observe(this, {
        attributes: false,
        childList: true,
        characterData: false,
      });
    }
  }

  disconnecting() {
    this.removeEventListener('click', this.clickHandler);

    if (hasNativeShadowDomSupport && this.useShadow) {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  // Attach external events declaratively
  clickHandler(event) {
    declarativeClickHandler(this);
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { url, target, isHeadline } = this.validateProps(this.props);

    const classes = cx('c-bolt-link', {
      'c-bolt-link--headline': isHeadline,
    });

    // Decide on if the rendered button tag should be a <button> or <a> tag, based on if a URL exists OR if a link was passed in from the getgo
    const hasUrl = this.props.url.length > 0 && this.props.url !== 'null';

    // Assign default target attribute value if one isn't specified
    const urlTarget = this.props.target && hasUrl ? this.props.target : '_self';

    // The linkElement to render, based on the initial HTML passed alone.
    let renderedLink;

    const slotMarkup = name => {
      switch (name) {
        case 'before':
        case 'after':
          const iconClasses = cx('c-bolt-link__icon', {
            'is-empty': name in this.slots === false,
          });

          return html`
            <span class="${iconClasses}"
              >${
                name in this.slots
                  ? this.slot(name)
                  : html`<slot name="${name}" />`
              }</span
            >
          `;
        default:
          const itemClasses = cx('c-bolt-link__text', {
            'is-empty': name in this.slots === false,
          });

          return html`
            <span class="${itemClasses}"
              >${
                name in this.slots ? this.slot('default') : html`<slot/>`
              }</span
            >
          `;
      }
    };

    const innerSlots = [
      slotMarkup('before'),
      slotMarkup('default'),
      slotMarkup('after'),
    ];

    if (this.rootElement) {
      renderedLink = this.rootElement.firstChild.cloneNode(true);
      renderedLink.className += ' ' + classes;
      render(innerSlots, renderedLink);
    } else if (hasUrl) {
      renderedLink = html`
        <a href="${this.props.url}" class="${classes}" target="${urlTarget}"
          >${innerSlots}</a
        >
      `;
    }

    return html`
      ${this.addStyles([styles])} ${renderedLink}
    `;
  }
}

export { BoltLink };
