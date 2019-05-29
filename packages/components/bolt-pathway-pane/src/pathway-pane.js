import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './pathway-pane.scss';
import schema from '../pathway-pane.schema.yml';

let cx = classNames.bind(styles);

@define
class BoltPathwayPane extends withLitHtml() {
  static is = 'bolt-pathway-pane';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    disabled: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = this.getModifiedSchema(schema);
    return self;
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);

    const classes = cx('c-bolt-pathway-pane', {
      [`c-bolt-pathway-pane--disabled`]: disabled,
    });
    console.log("Wubba Lubba Dub Dub: this.slot('image')", this.slot('image'));
    console.log('Wubba Lubba Dub Dub: classes', classes);

    (function() {})();

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        ${this.slot('image')} ${this.slot('body')} ${this.slot('default')}
      </div>
      <script>
        document
          .querySelector('.c-bolt-tooltip .c-bolt-tooltip__trigger')
          .click();
      </script>
    `;
  }
}

export { BoltPathwayPane };
