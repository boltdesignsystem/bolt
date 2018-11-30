import { BoltLink } from '@bolt/components-link/src/link.js';
import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import schema from '../card.schema.yml';
import styles from './_card-link.scss';

let cx = classNames.bind(styles);

@define
class BoltCardLink extends BoltLink {
  static is = 'bolt-card-link';

  constructor() {
    super();
    this.styles = styles;
    this.baseClass = 'c-bolt-card__link';
  }

  render() {
    const classes = cx('c-bolt-card__link');

    return html`
      ${this.addStyles([styles])}
      ${
        this.rootElement
          ? this.customLinkTemplate(this.props.url, classes, this.props.target)
          : this.linkTemplate(this.props.url, classes, this.props.target)
      }
      ${this.slot('default')}
    `;
  }
}

export { BoltCardLink };
