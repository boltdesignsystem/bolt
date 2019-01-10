import { h } from '@bolt/core';
// import React from 'react';
import React, { Component } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
export class ResponsiveLocalStorageLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }

  static get defaultProps() {
    return {
      className: 'c-bolt-demo-grid',
      cols: {
        lg: 12,
        md: 10,
        sm: 6,
        xs: 4,
        xxs: 2,
      },
      rowHeight: 10,
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts);
    this.setState({ layouts });
  }

  render() {
    return (
      <div style={this.props.style} className={this.props.className}>
        <button
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: 'translate3d(0, 100%, 0)',
          }}
          onClick={() => this.resetLayout()}>
          Reset Layout
        </button>
        <ResponsiveReactGridLayout
          className="layout"
          margin={[0, 0]}
          // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          cols={{
            lg: 12,
            md: 8,
            sm: 6,
            xs: 4,
            xxs: 2,
          }}
          style={{
            alignSelf: 'center',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          isDraggable={false}
          // rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }>
          {this.props.children}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value,
      }),
    );
  }
}
