// // import {
// //   utils
// // } from '@bolt/core-v3.x';

// // const css = utils.css.default;
// // import styles from './card.scss';

// import { define, props, withComponent, withUpdate } from 'skatejs';
// import { h, Component } from 'preact';
// import withPreact from '@skatejs/renderer-preact';

// // // Preact component we want to wrap in the web component.
// // class PreactCard extends Component {
// //   render() {
// //     const { children } = this.props;
// //     return (
// //       <div>{children}</div>
// //     );
// //   }
// // }

// export default class BoltCard extends withComponent(withPreact()) {
//   static get is() {
//     return 'bolt-card';
//   }

//   static props = {
//     name: props.string,
//     url: props.string,
//     theme: props.string
//   }

//   handleClick(elem, e) {
//     e.preventDefault();

//     if (elem.url){
//       window.location.href = elem.url;
//     }
//   }

//   renderCallback({ props }) {
//     // const classes = css(
//     //   'c-bolt-card',
//     //   'c-bolt-card--wrapper'
//     //   // props.url ? 'is-actionable' : ''
//     // );
//     const classes = [
//       'c-bolt-card',
//       // 'c-bolt-card--wrapper'
//     ];

//     // return (
//     //   <slot/>
//     // )
//     // return (
//     //   <div
//     //     className={classes}
//     //     onClick={this.handleClick.bind(this, props)}
//     //   >
//     //     <style>{styles[0][1]}</style>
//     //     <slot/>
//     //   </div>
//     // )
//     return (
//       <div
//         className={classes}

//       >
//         <slot />
//       </div>
//     )
//   }
// }

// customElements.define('bolt-card', BoltCard);
