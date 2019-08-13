import {
  props,
  define,
  validateProps,
} from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import styles from './svg-animations.scss';
import schema from '../svg-animations.schema.yml';

//let cx = classNames.bind(styles);

/*async function drawCircle(dashSize = 4, speed = 20) {
  const threshold = Math.ceil(245 / dashSize);

  for (var i = 0; i <= threshold; i++) {
    outline.setAttribute(
      'stroke-dasharray',
      `${dashSize} ${dashSize} ${outline.getAttribute('stroke-dasharray')}`,
    );

    await drawTimer(speed); //eslint-disable-line no-await-in-loop

    if (i === threshold) {
      document
        .getElementById('bolt-self-drawing-circle-container')
        .classList.add('rotate');
    }
  }
}*/

@define
class SvgAnimations extends withLitHtml() {
  static is = 'bolt-svg-animations';

  static props = {
    dashSize: props.integer,
    speed: props.integer,
  };

  constructor(self) {
    self = super(self);
    self.schema = schema;
    return self;
  }

  animateCircle(dashSize = 4, speed = 20) { //todo set default at props level, no need here?  
    const animateCircle = this._drawCircle(dashSize, speed);
    console.log(`fired function animateCircle`);
    return animateCircle;
  }

  render() {
    //const { dashSize } = validateProps(this.props, this.validate);
    //let { speed } = validateProps(this.props, this.validate);

    //const classes = cx('c-bolt-chip');
    //const textClasses = cx('c-bolt-chip__item-text');
    console.log('render self drawing')
    function _drawTimer(ms) {
      return new Promise(res => setTimeout(res, ms));
    }

    async function _drawCircle(dashSize, speed) {
    
      const outline = document.getElementById('bolt-self-drawing-circle-outline');
    
      const threshold = Math.ceil(245 / dashSize);
    
      for (var i = 0; i <= threshold; i++) {
        outline.setAttribute(
          'stroke-dasharray',
          `${dashSize} ${dashSize} ${outline.getAttribute('stroke-dasharray')}`,
        );
    
        await this._drawTimer(speed); //eslint-disable-line no-await-in-loop
    
        if (i === threshold) {
          document
            .getElementById('bolt-self-drawing-circle-container')
            .classList.add('rotate');
        }
      }
    }

    return html`
    <div id="bolt-self-drawing-circle-container" class="bolt-self-drawing-circle-container" >
      <svg viewBox="-100 -100 200 200">
        <circle id="bolt-self-drawing-circle-outline" class="bolt-self-drawing-circle-outline" r="80" stroke-dasharray="4 1000" />
      </svg>
    </div>
    `;
  }
}

export { SvgAnimations };
