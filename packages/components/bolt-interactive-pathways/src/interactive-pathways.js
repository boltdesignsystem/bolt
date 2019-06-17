import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './interactive-pathways.scss';
import schema from '../interactive-pathways.schema.yml';

let cx = classNames.bind(styles);

@define
class BoltInteractivePathways extends withLitHtml() {
  static is = 'bolt-interactive-pathways';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    disabled: {
      ...props.boolean,
      ...{ default: false },
    },
    title: {
      ...props.string,
      ...{ default: '' },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.schema = schema;

    self._updateActivePathwayAttributes = self._updateActivePathwayAttributes.bind(
      self,
    );
    return self;
  }

  connectedCallback() {
    super.connectedCallback();
    this.pathways = this.querySelectorAll('bolt-interactive-pathway');
    // Make the first pathway the active pathway
    this.activePathway = this.pathways[0];
    this._updateActivePathwayAttributes();
  }

  _updateActivePathwayAttributes() {
    this.pathways.forEach(pathway => {
      pathway === this.activePathway
        ? pathway.setAttribute('active', '')
        : pathway.removeAttribute('active');
    });
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);

    const classes = cx('c-bolt-interactive-pathways', {
      [`c-bolt-interactive-pathways--disabled`]: disabled,
    });

    console.log('Wubba Lubba Dub Dub: this.pathways', this.pathways);

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <div class="c-bolt-interactive-pathways__header">
          <img
            src="https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/interactive-pathways-logo.png"
            alt="Two diamond logo"
          />
          <div class="c-bolt-interactive-pathways__nav">
            <span>${this.slot('interactive-pathways-lead-text')} Dropdown</span>
          </div>
        </div>

        ${this.title} ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltInteractivePathways };
