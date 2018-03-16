import { withReact, wrap } from '@bolt/core/renderers/renderer-react';
import React from 'react';
import { define, props, withComponent } from 'skatejs';
import { Collapse } from './collapse';
import { CollapseToggler } from './collapse-toggler';
import classNames from 'classnames';

import styles from './collapse.scss';
import displayUtils from '@bolt/global/styles/07-utilities/_utilities-display.scss';
import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';
import opacityUtils from '@bolt/global/styles/07-utilities/_utilities-opacity.scss';


class BoltCollapse extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  static props = {
    autoFocus: props.boolean
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {

    const classes = classNames(
      'c-bolt-collapse__header',
      // this.state.collapse ? 'is-closed'
    );

    const autoFocus = this.props.autoFocus !== undefined ? 'autoFocus' : '';

    return (
      <div>
        <style>
          {styles[0][1]}
          {displayUtils[0][1]}
          {heightUtils[0][1]}
          {opacityUtils[0][1]}
        </style>

        <button onClick={this.toggle}
          className="c-bolt-collapse__header-button"
          aria-controls="collapse-content"
          aria-expanded="false"
          aria-disabled="false"
          { ...autoFocus }
        >
          <slot name="title" />
        </button>

        <Collapse
          id="collapse-content"
          isOpen={this.state.collapse}
          className="u-bolt-block@small u-bolt-height-auto@small"
        >
          <div className="c-bolt-collapse__content-inner u-bolt-opacity-100@small">
            <slot />
          </div>
        </Collapse>
      </div>
    );
  }
}

@define
class BoltCollapseElement extends withComponent(wrap(BoltCollapse)) {
  static is = 'bolt-collapse';
}
