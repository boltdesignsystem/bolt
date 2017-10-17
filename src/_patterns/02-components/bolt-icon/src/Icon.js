import { props, withComponent } from 'skatejs';
import withPreact from '@skatejs/renderer-preact';
import { h, Component } from 'preact';

// import styles from './Icon.scss';

// import StyledMixin from '../util/styled-mixin.js';
// import sizes from '../util/sizes.js';
// import css from '../util/css.js';


// Preact component we want to wrap in the web component.
class Icon extends Component {
  render() {
    const { children, yell } = this.props;
    return (
      <div>Hello, {yell ? <strong>{children}</strong> : children}!</div>
    );
  }
}


// Web component that renders using Preact. This is all you need
// to do to wrap the Preact component. All props can be passed
// down and {children} becomes <slot />.
export default class BoltIcon extends withComponent(withPreact()) {
  static props = {
    // Unfortunately we need to declare props on the custom element
    // because it needs to be able to link between observed attributes
    // and properties.
    //
    // You could write a Babel plugin to transform Flow types to
    // property definitions, but we haven't done that yet.
    yell: props.boolean,

    size: props.string,
    name: props.string
  }
  renderCallback({ props }) {
    return (
      <Icon {...props} />
    );
  }
}

customElements.define('bolt-icon', BoltIcon);