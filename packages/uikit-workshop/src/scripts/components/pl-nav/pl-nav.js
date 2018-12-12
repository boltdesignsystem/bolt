import { define, props } from 'skatejs';
import { h } from 'preact';

const classNames = require('classnames');

import { store } from '../../store.js'; // redux store
 import ArrowIcon from '../../../icons/arrow-down.svg';
import { BaseComponent } from '../base-component.js';
import $ from 'jquery';

const Button = props => {
  return (
    <button
      className={`pl-c-nav__link pl-c-nav__link--dropdown pl-js-acc-handle ${props.isOpen ? props.isOpenClass : ''}`}
      role="tab"
      {...props}
    >
      <span class="pl-c-nav__link-icon">
        <ArrowIcon
          height={16}
          width={16}
          viewBox="0 0 24 24"
          fill="currentColor"
        />
      </span>
      {props.children}
    </button>
  );
};

@define
class Nav extends BaseComponent {
  static is = 'pl-nav';

  _stateChanged(state) {
    this.layoutMode = state.app.layoutMode || 'vertical';
  }

  constructor() {
    super();
    this.toggleNavPanel = this.toggleNavPanel.bind(this);
    this.isOpenClass = 'pl-is-active';
  }

  connected() {
    const state = store.getState();
    this.layoutMode = state.app.layoutMode || 'vertical';   
  }

  static props = {
    autoClose: props.boolean,
    layoutMode: props.string,
    collapsedByDefault: {
      ...props.boolean,
      ...{ default: true },
    },
  };

  toggleNavPanel(e) {
    const $this = $(e.target);
    const $panel = $this.next('.pl-js-acc-panel');
    const subnav = $this
      .parent()
      .parent()
      .hasClass('pl-js-acc-panel');

    if (this.props.autoClose === true || this.layoutMode !== 'vertical') {
      // Automatically close other nav panels if link isn't a sub-navigation item AND the auto-close prop is set to true on the <pl-search> component
      if (!subnav) {
        $('.pl-js-acc-handle')
          .not($this)
          .removeClass(this.isOpenClass);
        $('.pl-js-acc-panel')
          .not($panel)
          .removeClass(this.isOpenClass);
      }
    }

    // Activate the selected panel
    $this.toggleClass(this.isOpenClass);
    $panel.toggleClass(this.isOpenClass);
  }

  render({ layoutMode }) {
    const patternTypes = window.navItems.patternTypes;
    // const patternItems = window.navItems.patternItems;

    return (
      <ol class="pl-c-nav__list pl-js-pattern-nav-target">
        {patternTypes.map((item, i) => {
          const classes = classNames({
            [`pl-c-nav__item pl-c-nav__item--${item.patternTypeLC}`]: true,
          });

          const patternItems = item.patternItems;

          return (
            <li className={classes}>

              { layoutMode === 'vertical' ?
                <h3 class='pl-c-nav__title'>
                  {item.patternTypeUC}
                </h3>
              : <Button
                  aria-controls={item.patternTypeLC}
                  onClick={this.toggleNavPanel}
                  isOpen={layoutMode === 'vertical' ? !this.props.collapsedByDefault : true }
                  isOpenClass={this.isOpenClass}
                >
                  {item.patternTypeUC}
                </Button>
              }
              
              <ol
                id={item.patternSubtypeUC}
                className={`pl-c-nav__sublist pl-c-nav__sublist--dropdown pl-js-acc-panel ${
                  layoutMode === 'vertical' ? this.isOpenClass : ''
                }`}
              >
                {item.patternTypeItems.map((patternSubtype, i) => {
                  return (
                    <li
                      className={`pl-c-nav__item pl-c-nav__item--${
                        patternSubtype.patternSubtypeLC
                      }`}
                    >
                      <Button
                        aria-controls={patternSubtype.patternSubtypeUC}
                        onClick={this.toggleNavPanel}
                        isOpen={layoutMode === 'vertical' ? !this.props.collapsedByDefault : false}
                        isOpenClass={this.isOpenClass}
                      >
                        {patternSubtype.patternSubtypeUC}
                      </Button>

                      <ol
                        id={patternSubtype.patternSubtypeUC}
                        className={`pl-c-nav__subsublist pl-c-nav__subsublist--dropdown pl-js-acc-panel ${
                          layoutMode === 'vertical' ? (!this.props.collapsedByDefault ? this.isOpenClass : '') : '' 
                        }`}
                      >
                        {patternSubtype.patternSubtypeItems.map(
                          (patternSubtypeItem, i) => {
                            return (
                              <li class="pl-c-nav__item">
                                <a
                                  href={`patterns/${
                                    patternSubtypeItem.patternPath
                                  }`}
                                  class="pl-c-nav__link pl-c-nav__link--sublink"
                                  data-patternpartial={
                                    patternSubtypeItem.patternPartial
                                  }
                                >
                                  {patternSubtypeItem.patternName === 'View All'
                                    ? patternSubtype.patternSubtypeUC +
                                      ' Overview'
                                    : patternSubtypeItem.patternName}

                                  {patternSubtypeItem.patternState && (
                                    <span
                                      class={`pl-c-pattern-state pl-c-pattern-state--${
                                        patternSubtypeItem.patternState
                                      }`}
                                      title={patternSubtypeItem.patternState}
                                    />
                                  )}
                                </a>
                              </li>
                            );
                          }
                        )}
                      </ol>
                    </li>
                  );
                })}

                {patternItems &&
                  patternItems.map((patternItem, i) => {
                    return (
                      <li class="pl-c-nav__item">
                        <a
                          href={`patterns/${patternItem.patternPath}`}
                          class="pl-c-nav__link pl-c-nav__link--pattern"
                          data-patternpartial={patternItem.patternPartial}
                          tabindex="0"
                        >
                          {patternItem.patternName === 'View All'
                            ? patternItem.patternName + ' ' + item.patternTypeUC
                            : patternItem.patternName}
                          {patternItem.patternState && (
                            <span
                              class={`pl-c-pattern-state pl-c-pattern-state--${
                                patternItem.patternState
                              }`}
                              title={patternItem.patternState}
                            />
                          )}
                        </a>
                      </li>
                    );
                  })}
              </ol>
            </li>
          );
        })}

        {/* <li class="pl-c-nav__item">
          <a
            href="styleguide/html/styleguide.html"
            class="pl-c-nav__link pl-c-nav__link--pattern"
            data-patternpartial="all"
            tabindex="0"
          >
            All
          </a>
        </li> */}
      </ol>
    );
  }
}

export { Nav };
