import {
  h,
  render,
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  sanitizeBoltClasses
} from '@bolt/core';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';
import { mapToCssModules, omit, pick, TransitionTimeouts, TransitionPropTypeKeys, TransitionStatuses } from './utils';

const propTypes = {
  ...Transition.propTypes,
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.node,
  navbar: PropTypes.bool,
  cssModule: PropTypes.object,
};

const defaultProps = {
  ...Transition.defaultProps,
  isOpen: false,
  appear: false,
  enter: true,
  exit: true,
  tag: 'div',
  timeout: TransitionTimeouts.Collapse,


  keyboardInteraction: true,
  multiSelectable: true,
  ariaEnabled: true,
  collapsible: true,
  carouselFocus: true,

  initialOpenAttribute: 'data-open',
  initialOpenTransition: true,
  initialOpenTransitionDelay: 200
};

const transitionStatusToClassHash = {
  [TransitionStatuses.ENTERING]: 'is-opening',
  [TransitionStatuses.ENTERED]: 'is-opened',
  [TransitionStatuses.EXITING]: 'is-collapsing',
  [TransitionStatuses.EXITED]: 'is-collapsed',
};


const classNameDefaults = {
  headerOpenClass: 'c-bolt-collapse__header--open',
  contentOpenClass: 'c-bolt-collapse__content--open',

  headerOpenedClass: 'c-bolt-collapse__header--opened',
  contentOpenedClass: 'c-bolt-collapse__content--opened',

  headerDisabledClass: 'c-bolt-collapse__header--disabled',
  contentDisabledClass: 'c-bolt-collapse__content--disabled',

  headerFocusClass: 'c-bolt-collapse__header--focus',
  contentFocusClass: 'c-bolt-collapse__content--focus',

  headerNoTransitionClass: 'c-bolt-collapse__header--notransition',
  contentNoTransitionClass: 'c-bolt-collapse__content--notransition'
};




function getTransitionClass(status) {
  return transitionStatusToClassHash[status] || 'collapse';
}

function getHeight(node) {
  return node.scrollHeight;
}




export class Collapse extends React.Component {
  constructor() {
    super();

    this._listeners = {};
    this._resizing = false;
    this.folds = [];


    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExit = this.onExit.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
      // this.toggle = this.toggle.bind(this);

    this.state = {
      height: null
    };

    // ['onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach((name) => {
    //   this[name] = this[name].bind(this);
    // });
  }

  connectedCallback() {
    console.log('connectedCallback');
    // this.id = `handorgel${++ID_COUNTER}`
    // this.id = this.id;

    // this._bindEvents();
    // this._initAria();
    // this._update();

    // console.log(this.childNodes);
  }

  onEntering(node, isAppearing) {
    console.log('onEntering');
    this.setState({ height: getHeight(node) });
    this.props.onEntering(node, isAppearing);
  }

  onEntered(node, isAppearing) {
    this.setState({ height: null });
    this.props.onEntered(node, isAppearing);
  }

  onExit(node) {
    this.setState({ height: getHeight(node) });
    this.props.onExit(node);
  }

  onExiting(node) {
    // getting this variable triggers a reflow
    const _unused = node.offsetHeight; // eslint-disable-line no-unused-vars
    this.setState({ height: 0 });
    this.props.onExiting(node);
  }

  onExited(node) {
    this.setState({ height: null });
    this.props.onExited(node);
  }

  render() {
    const {
      tag: Tag,
      isOpen,
      className,
      navbar,
      cssModule,
      children,
      ...otherProps
    } = this.props;

    const { height } = this.state;

    console.log(this.state);

    // In NODE_ENV=production the Transition.propTypes are wrapped which results in an
    // empty object "{}". This is the result of the `react-transition-group` babel
    // configuration settings. Therefore, to ensure that production builds work without
    // error, we can either explicitly define keys or use the Transition.defaultProps.
    // Using the Transition.defaultProps excludes any required props. Thus, the best
    // solution is to explicitly define required props in our utilities and reference these.
    // This also gives us more flexibility in the future to remove the prop-types
    // dependency in distribution builds (Similar to how `react-transition-group` does).
    // Note: Without omitting the `react-transition-group` props, the resulting child
    // Tag component would inherit the Transition properties as attributes for the HTML
    // element which results in errors/warnings for non-valid attributes.
    const transitionProps = pick(otherProps, TransitionPropTypeKeys);
    const childProps = omit(otherProps, TransitionPropTypeKeys);

    return (
      <Transition
        enter={{ animation: "slideDown" }}
        leave={{ animation: "slideUp" }}
        {...transitionProps}

        in={isOpen}
        onEntering={this.onEntering}
        onEntered={this.onEntered}
        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        {(status) => {
          let collapseClass = getTransitionClass(status);
          const classes = mapToCssModules(classNames(
            className,
            collapseClass,
            navbar && 'navbar-collapse',
          ), cssModule);

          const style = height === null ? null : { height };
          return (
            <Tag
              {...childProps}
              style={{ ...childProps.style, ...style }}
              className={classes}
            >
              <div className="c-bolt-collapse__content-inner">
                {children}
              </div>
            </Tag>
          );
        }}
      </Transition>
    );

    // return (
    //   <div>
    //     Render Collapse!
    //     <slot />
    //   </div>
    // );
  }
}

Collapse.propTypes = propTypes;
Collapse.defaultProps = defaultProps;
// export default Collapse;
