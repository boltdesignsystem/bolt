import { define } from '@bolt/core/utils';
import {
  withLitHtml,
  html,
  render,
} from '@bolt/core/renderers/renderer-lit-html';
import { convertInitialTags } from '@bolt/core/decorators';

import classNames from 'classnames/bind';

import styles from './figure.scss';

let cx = classNames.bind(styles);

@define
class BoltFigure extends withLitHtml() {
  static is = 'bolt-figure';

  render() {
    const classes = cx('c-bolt-figure');

    const slotMarkup = name => {
      switch (name) {
        case 'media':
          const mediaClasses = cx('c-bolt-figure__media');

          return name in this.slots
            ? html`
                <div class="${mediaClasses}">${this.slot(name)}</div>
              `
            : html`
                <slot name="${name}" />
              `;
        default:
          const captionClasses = cx('c-bolt-figure__caption');

          return html`
            <figcaption class="${captionClasses}">
              ${name in this.slots
                ? this.slot('default')
                : html`
                    <slot />
                  `}
            </figcaption>
          `;
      }
    };

    const innerSlots = [slotMarkup('media'), slotMarkup('default')];

    let renderedFigure = html`
      <figure class="${classes}">${innerSlots}</figure>
    `;

    return html`
      ${this.addStyles([styles])} ${renderedFigure}
    `;
  }
}

export { BoltFigure };
