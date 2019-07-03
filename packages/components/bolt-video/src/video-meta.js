import { define, props } from '@bolt/core/utils';
import { h, withPreact } from '@bolt/core/renderers';

@define
class BoltVideoMeta extends withPreact() {
  static is = `${bolt.namespace}-video-meta`;

  constructor(self) {
    self = super(self);
    return self;
  }

  static props = {
    duration: props.string,
    title: props.string,
  };

  get renderRoot() {
    return this;
  }

  render() {
    // All of its logic is contained here in render(), but it could be updated to be a property that is set
    // externally (such as when the video has finished fully loading).

    // [Mai] 'reveal' allows the meta data (title and duration) to be hidden.
    const reveal = Boolean(this.title || this.duration);
    return (
      <div className={`c-${bolt.namespace}-video-meta`}>
        {reveal ? (
          <div className={`c-${bolt.namespace}-video-meta__wrapper`}>
            {this.title ? (
              <div
                className={`c-${bolt.namespace}-video-meta__item c-${bolt.namespace}-video-meta__item--title`}>
                {this.title}
              </div>
            ) : null}
            <div
              className={`c-${bolt.namespace}-video-meta__item c-${bolt.namespace}-video-meta__item--duration`}>
              {this.duration}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export { BoltVideoMeta };
