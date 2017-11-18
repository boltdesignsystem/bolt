
import Drift from 'drift-zoom';
import { props, withComponent } from 'skatejs';
import withPreact from '@skatejs/renderer-preact';
import { h } from 'preact';
// import upperCamelCase from 'uppercamelcase';

import { css } from '@bolt/core';



// var driftOptions = ;


// import styles from './icon.scss';
// import * as Icon from '@bolt/components-icons';

// const backgroundStyles = [
//   'circle',
//   'square'
// ];


// const colors = [
//   'teal'
// ]


class BoltDeviceViewer extends withComponent(withPreact()) {
  static props = {
    // name: props.string,
    // size: props.string,
    // background: props.string,
    // color: props.string
  }

  renderCallback({ props }) {
    const classes = css(
      'c-bolt-image-magnifier',
      // props.name ? `c-bolt-icon--${props.name}` : '',
      // props.color && colors.includes(props.color) ? `c-bolt-icon--${props.color}` : ``,
      // props.size && spacingSizes[props.size] && spacingSizes[props.size] !== '' ? `c-bolt-icon--${props.size}` : ``
    );
    // <style>{styles[0][1]}</style>
    // var drift = new Drift(document.querySelector('img'), {
    //   paneContainer: document.querySelector('p')
    // });

    var drift = new Drift(this.querySelector('img'), {
      // inlineOffsetX: -150,
      // inlineOffsetY: -150,
      containInline: false,
      inlinePane: true,
      // Prefix for generated element class names (e.g. `my-ns` will
      // result in classes such as `my-ns-pane`. Default `drift-`
      // prefixed classes will always be added as well.
      namespace: 'c-bolt',
      // Whether the ZoomPane should show whitespace when near the edges.
      showWhitespaceAtEdges: true,
      // injectBaseStyles: false,
      // Whether the inline ZoomPane should stay inside
      // the bounds of its image.
      // containInline: false,
      // How much to offset the ZoomPane from the
      // interaction point when inline.
      // inlineOffsetX: 0,
      // A DOM element to append the inline ZoomPane to.
      inlineContainer: this,
      boundingBoxContainer: this,
      // Which trigger attribute to pull the ZoomPane image source from.
      sourceAttribute: 'data-zoom',
      // How much to magnify the trigger by in the ZoomPane.
      // (e.g., `zoomFactor: 3` will result in a 900 px wide ZoomPane image
      // if the trigger is displayed at 300 px wide)
      // zoomFactor: 2,
      // // A DOM element to append the non-inline ZoomPane to.
      // // Required if `inlinePane !== true`.
      // paneContainer: document.body,
      // // When to switch to an inline ZoomPane. This can be a boolean or
      // // an integer. If `true`, the ZoomPane will always be inline,
      // // if `false`, it will switch to inline when `windowWidth <= inlinePane`
      // // inlinePane: 375,
      // inlinePane: true,
      // // If `true`, touch events will trigger the zoom, like mouse events.
      // handleTouch: true,
      // // If present (and a function), this will be called
      // // whenever the ZoomPane is shown.
      // onShow: null,
      // // If present (and a function), this will be called
      // // whenever the ZoomPane is hidden.
      // onHide: null,
      // // Add base styles to the page. See the "Theming"
      // // section of README.md for more information.
      // injectBaseStyles: true,
      // // An optional number that determines how long to wait before
      // // showing the ZoomPane because of a `mouseenter` event.
      // hoverDelay: 0,
      // // An optional number that determines how long to wait before
      // // showing the ZoomPane because of a `touchstart` event.
      // // It's unlikely that you would want to use this option, since
      // // "tap and hold" is much more intentional than a hover event.
      // touchDelay: 0,
      // // If true, a bounding box will show the area currently being previewed
      // // during mouse hover
      // hoverBoundingBox: false,
      // // If true, a bounding box will show the area currently being previewed
      // // during touch events
      // touchBoundingBox: false,
    });

    drift.enable();

    return (
      <div className={classes}>
        <slot />
      </div>
    )
  }
}

customElements.define('bolt-device-viewer', BoltDeviceViewer);