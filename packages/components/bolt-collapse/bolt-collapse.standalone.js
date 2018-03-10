import { withReact, wrap } from '@bolt/core/renderers/renderer-react';
import React from 'react';
import { define, props, withComponent } from 'skatejs';
import { Collapse } from './collapse';
import classNames from 'classnames';

import styles from './collapse.scss';
import utils from '@bolt/global/styles/07-utilities/_utilities-display.scss';


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
          {utils[0][1]}
        </style>

        <h3 class="c-bolt-collapse__header u-bolt-hidden@small">
          <button onClick={this.toggle}
            className="c-bolt-collapse__header-button"
            aria-controls="collapse-content"
            aria-expanded="false"
            aria-disabled="false"
            { ...autoFocus }
        >
            <slot name="title" />
          </button>
        </h3>

        <Collapse
          id="collapse-content"
          isOpen={this.state.collapse}
          className="c-bolt-collapse__content u-bolt-block@small"
        >
          <slot />
        </Collapse>
      </div>
    );
  }
}

@define
class BoltCollapseElement extends withComponent(wrap(BoltCollapse)) {
  static is = 'bolt-collapse';
}
