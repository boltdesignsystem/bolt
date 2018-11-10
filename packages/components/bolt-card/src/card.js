import {
  defineContext,
  withContext,
  props,
  define,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import Ajv from 'ajv';

import themes from '@bolt/global/styles/06-themes/_themes.all.scss';
import styles from './card.scss';
import schema from '../card.schema.yml';

const ajv = new Ajv({ useDefaults: 'shared' });

let cx = classNames.bind(styles);

// define which specific props to provide to children that subscribe
export const CardContext = defineContext({
  tag: 'div',
});

@define
class BoltCard extends withContext(withLitHtml()) {
  static is = 'bolt-card';

  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get provides() {
    return [CardContext];
  }

  static props = {
    theme: props.string, // xdark | dark | light | xlight
    tag: props.string, // div | figure | article
    height: props.string, // full | auto
    url: props.string,
  };

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

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { theme, tag, url } = this.validateProps(this.props);
    this.contexts.get(CardContext).tag = tag;

    const classes = cx('c-bolt-card', {
      [`c-bolt-card--actionable`]: url,
      [`t-bolt-${theme}`]: theme && theme !== 'none',
    });

    let renderedCard;

    switch (tag) {
      case 'article':
        renderedCard = html`
          <article class="${classes}">${this.slot('default')}</article>
        `;
        break;
      case 'figure':
        renderedCard = html`
          <figure class="${classes}">${this.slot('default')}</figure>
        `;
        break;
      default:
        renderedCard = html`
          <div class="${classes}">${this.slot('default')}</div>
        `;
    }

    return html`
      ${this.addStyles([styles, themes])} ${renderedCard}
    `;
  }
}

export { BoltCard };
