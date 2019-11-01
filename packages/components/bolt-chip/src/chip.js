import { props, define } from '@bolt/core/utils';
import { html, render } from '@bolt/core/renderers/renderer-lit-html';
import { BoltAction } from '@bolt/core/elements/bolt-action';
import { convertInitialTags } from '@bolt/core/decorators';

import classNames from 'classnames/bind';

import styles from './chip.scss';
import schema from '../chip.schema.yml';

let cx = classNames.bind(styles);

@define
@convertInitialTags('a', 'span') // The first matching tag will have its attributes converted to component props
class BoltChip extends BoltAction {
  static is = 'bolt-chip';

  static props = {
    url: props.string,
    target: props.string,
    size: props.string,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.schema = this.getModifiedSchema(schema, ['text']); // remove `text` prop from schema, Twig only
    self.delegateFocus = true;
    return self;
  }

  render() {
    // 1. Remove line breaks before and after lit-html template tags, causes unwanted space inside and around inline chips
    // 2. Zero Width No-break Space (&#xfeff;) is needed to make the last word always stick with the icon, so the icon will never become an orphan.

    // Validate the original prop data passed along -- returns back the validated data w/ added default values
    const { url, target, size } = this.validateProps(this.props);

    const classes = cx('c-bolt-chip', {
      [`c-bolt-chip--link`]: url,
      [`c-bolt-chip--size-${size}`]: size,
    });

    // Decide on if the rendered tag should be a <span> or <a> tag, based on if a URL exists
    const hasUrl = url && url.length > 0;

    // Assign default target attribute value if one isn't specified
    const anchorTarget = target && hasUrl ? target : '_self';

    // The chipElement to render, based on the initial HTML passed alone.
    let renderedChip;

    const slotMarkup = name => {
      switch (name) {
        case 'before':
        case 'after':
          const iconClasses = cx('c-bolt-chip__icon');
          // [1]
          // [2]
          // prettier-ignore
          return name in this.slots
            ? html`<span class="${iconClasses}">&#xfeff;${this.slot(name)}</span>`
            : html`<slot name="${name}" />`;
        default:
          const itemClasses = cx('c-bolt-chip__text', {
            'is-empty': name in this.slots === false,
          });

          // [1]
          // prettier-ignore
          return html`<span class="${itemClasses}"
              >${
                name in this.slots
                  ? this.slot('default')
                  : html`<slot />`
              }</span
            >`;
      }
    };

    const innerSlots = [
      slotMarkup('before'),
      slotMarkup('default'),
      slotMarkup('after'),
    ];

    if (this.rootElement) {
      renderedChip = this.rootElement.firstChild.cloneNode(true);
      if (renderedChip.getAttribute('href') === null && hasUrl) {
        renderedChip.setAttribute('href', this.props.url);
      }
      renderedChip.className += ' ' + classes;
      render(innerSlots, renderedChip);
    } else if (hasUrl) {
      // [1]
      // prettier-ignore
      renderedChip = html`<a href="${this.props.url}" class="${classes}" target="${anchorTarget}"
          >${innerSlots}</a
        >`;
    } else {
      // [1]
      // prettier-ignore
      renderedChip = html`<span class="${classes}"
          >${innerSlots}</span
        >`;
    }

    // [1]
    // prettier-ignore
    return html`${this.addStyles([styles])}${renderedChip}`;
  }
}

export { BoltChip };
