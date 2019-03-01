import { define, props, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './video-meta.scss';

let cx = classNames.bind(styles);

@define
class BoltVideoMeta extends withLitHtml() {
  static is = `${bolt.namespace}-video-meta`;

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = this.getModifiedSchema(schema);
    return self;
  }

  static props = {
    duration: props.string,
    title: props.string,
  };

  render() {
    // All of its logic is contained here in render(), but it could be updated to be a property that is set
    // externally (such as when the video has finished fully loading).

    return html`
      ${this.addStyles([styles])}
      <div class="${`c-${bolt.namespace}-video-meta`}">
        ${this.title || this.duration
          ? html`
              <div class="${cx(`c-${bolt.namespace}-video-meta__wrapper`)}">
                ${this.title
                  ? html`
                      <div
                        class="${cx(
                          `c-${bolt.namespace}-video-meta__item`,
                          `c-${bolt.namespace}-video-meta__item--title`,
                        )}"
                      >
                        ${this.title}
                      </div>
                    `
                  : ''}
                ${this.duration
                  ? html`
                      <div
                        class="${cx(
                          `c-${bolt.namespace}-video-meta__item`,
                          `c-${bolt.namespace}-video-meta__item--duration`,
                        )}"
                      >
                        ${this.duration}
                      </div>
                    `
                  : ''}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

export { BoltVideoMeta };
