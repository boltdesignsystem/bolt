// import { withComponent, Component, define, h } from 'skatejs';
import { props, withComponent, h } from 'skatejs';
// import withPreact from '@skatejs/renderer-preact';
// import { Preact, h } from 'preact';
// import Preact from 'preact';
// import { props, withComponent, define, h } from 'skatejs';
// import withPreact from '@skatejs/renderer-preact';

import StyledMixin from '../../../00-utils/util/styled-mixin.js';
import styles from './Icon.scss';
import css from '../../../00-utils/util/css.js';

import '../../../00-utils/util/spacing-sizes.js';

import Icon from '../../../../../bolt-website/icons/bolt-icons.svg';

console.log(Icon);


// import BoltComponent from 'Bolt';
// const Component = with

// console.log(styles);

// const withDangerouslyNaiveRenderer = (Base = HTMLElement) => {
//   return class extends Base {
//     rendererCallback(renderRoot, renderCallback) {
//       renderRoot.innerHtml = renderCallback();
//     }
//   }
// };
// const Component = withComponent(withPreact());

// class PreactHello extends Component {
//   render() {
//     const { children, yell } = this.props;
//     return (
//       <div>children}</div>
//     );
//   }
// }


// const Component = withComponent(withPreact());
// const Component = withComponent();


const Component = withComponent();
// class BoltComponent extends {};


export default class BoltIcon extends StyledMixin(Component) {
// export default class BoltIcon extends StyledMixin(withComponent(withPreact())) {
  // constructor() {
  //   super();
  // }
  //   // this.attachShadow({ mode: 'open' });
  //   // this.shadowRoot.appendChild(template.content.cloneNode(true));

  //   // get refs
  //   // collectRefs.call(this);
  // }
  
  static get is() {
    return 'bolt-icon';
  }

  static get styleSheet() {
    return styles;
  }


  static props = {
    name: props.string,
    size: props.string
  //   // Unfortunately we need to declare props on the custom element
  //   // because it needs to be able to link between observed attributes
  //   // and properties.
  //   //
  //   // You could write a Babel plugin to transform Flow types to
  //   // property definitions, but we haven't done that yet.
  //   yell: props.boolean
  }


  renderCallback({ props }) {
    // const sizeNumber = cssClassForSize();
    const classes = css(
      'c-bolt-icon',
      this.size && sizes[this.size] ? `c-bolt-icon--${this.size}` : '',
      this.name ? `c-bolt-icon--${this.name}` : ''
    );

    const iconName = props.name ? `#${props.name}` : '';
    const size = props.size ? props.size : '24';
   
    
    return (
      <div>
        <svg className={classes}
          viewBox="0 0 24 24">
          <slot></slot>
          <use xlinkHref={iconName} />
        </svg>
      </div>
    );
  }
}

window.customElements.define(BoltIcon.is, BoltIcon);
// define(BoltIcon);
// customElements.define('bolt-icon', BoltIcon);


// import withPreact from '@skatejs/renderer-preact';
// import { h } from 'preact';

// import css from '../../../00-utils/util/css.js';
// import sizes from '../../../00-utils/util/sizes.js';
// withComponent(withPreact())

// console.log(styles);

// const Component = withComponent();
// export const ButtonComponent = withComponent(HTMLButtonElement)
// export class BoltButton extends ButtonComponent {
//   // now our MaterialButton has all <button> default behaviours and props
// }
// export default define(BoltButton)

// const withDangerouslyNaiveRenderer = (Base = HTMLElement) => {
//   return class extends Base {
//     rendererCallback(renderRoot, renderCallback) {
//       renderRoot.innerHtml = renderCallback();
//     }
//   }
// };



// const Component = withComponent(withPreact());


// class BoltComponent extends StyledMixin(Component) {
//   // static get styleSheet() {
//   //   return styles;
//   // }

//   // static get is() {
//   //   return 'bolt-component';
//   // }

//   // static get props() {
//   //   return {
//   //     theme: { attribute: true },
//   //     size: { attribute: true }
//   //   };
//   // }
//   // render() {
//   //   const { children, yell } = this.props;
//   //   return (
//   //     <div>Hello, {yell ? <strong>{children}</strong> : children}!</div>
//   //   );
//   // }
// }






// Preact component we want to wrap in the web component.
// class Icon extends BoltComponent {
//   render() {
//     const { children, yell } = this.props;
//     return (
//       <div>Hello, {yell ? <strong>{children}</strong> : children}!</div>
//     );
//   }
// }


// Web component that renders using Preact. This is all you need
// to do to wrap the Preact component. All props can be passed
// // down and {children} becomes <slot />.
// export default class BoltIcon extends BoltComponent {
//   // static is = 'bolt-icon'
//   static get is() {
//     return 'bolt-icon';
//   }

//   static props = {
//     // Unfortunately we need to declare props on the custom element
//     // because it needs to be able to link between observed attributes
//     // and properties.
//     //
//     // You could write a Babel plugin to transform Flow types to
//     // property definitions, but we haven't done that yet.
//     yell: props.boolean,

//     size: props.string,
//     name: props.string
//   }
//   renderCallback({ props }) {
//     return (
//       <div>
//         Hello world
//       </div>
//       //<Icon {...props} />
//     );
//   }
// }

// define(BoltIcon);

// customElements.define('bolt-icon', BoltIcon);