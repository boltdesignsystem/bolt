import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
// import {
//   defineContext,
//   withContext,
//   props,
//   define,
//   hasNativeShadowDomSupport,
// } from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import styles from './results-graph.scss';
import schema from '../results-graph.schema';

let cx = classNames.bind(styles);

@customElement('bolt-results-graph')
class BoltResultsGraph extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  // static get properties() {
  //   return {
  //     status: String,
  //     align: String,
  //     full: {
  //       type: Boolean,
  //       reflect: true,
  //     },
  //   };
  // }

  graphBlocks() {
    const color = this.color || schema.properties.color;
    console.log(this);
    // console.log(schema);
    // console.log(schema.properties.graph_items);
    // console.log(this.props);
    // const graphItems = this.graphItems || schema.properties.graphItems;
    // console.log(graphItems);
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    // const description = this.description || schema.properties.description;
    // const number = this.number || schema.properties.number;

    const classes = cx('c-bolt-results-graph', {
      [`c-bolt-results-graph--disabled`]: this.disabled,
    });

    return html`
      <div class="${classes}">
        ${this.graphBlocks()}
      </div>
    `;
  }
}

export { BoltResultsGraph };
