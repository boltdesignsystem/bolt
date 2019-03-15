import {
  withContext,
  define,
  props,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './VideoMeta.scss';
import { VideoContext } from '../video';

let cx = classNames.bind(styles);

@define
class VideoMeta extends withContext(withLitHtml()) {
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

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [[VideoContext, 'state']];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.context = this.contexts.get(VideoContext);
  }

  render() {
    // All of its logic is contained here in render(), but it could be updated to be a property that is set
    // externally (such as when the video has finished fully loading).

    const { state } = this.context;

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
                          {
                            [`c-${bolt.namespace}-video-meta__item--hidden`]:
                              state.isPlaying === true ||
                              state.isFinished === true,
                          },
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
                          {
                            [`c-${bolt.namespace}-video-meta__item--hidden`]:
                              state.isPlaying === true ||
                              state.isPlaying === false ||
                              state.isFinished === true,
                          },
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

export { VideoMeta };
