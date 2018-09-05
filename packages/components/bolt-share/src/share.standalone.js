import { define, props } from '@bolt/core/utils';
import { withHyperHtml } from '@bolt/core/renderers';

@define
class BoltShare extends withHyperHtml {
  static is = 'bolt-share';

  constructor(self) {
    self = super(self);
    return self;
  }

  clickHandler(event) {
    event.preventDefault(); // Prevent the default link behavior
  }

  connecting() {
    Promise.all([
      customElements.whenDefined('bolt-block-list'),
      customElements.whenDefined('bolt-tooltip'),
    ]).then(_ => {
      this.twitterShare = this.querySelector('.js-bolt-share__twitter');
      console.log(this.twitterShare);
    });
  }
}

export { BoltShare };
