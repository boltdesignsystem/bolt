import { css, define } from '@bolt/core/utils';
import { html } from '@bolt/core';
import { BoltDropdown } from '@bolt/components-dropdown/dropdown';
import microJourneyStyles from '@bolt/micro-journeys/src/micro-journeys-dropdown.scss';
import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';
import styles from '@bolt/components-dropdown/dropdown.scss';
import Handorgel from 'handorgel';

@define
class MicroJourneysDropdown extends BoltDropdown {
  static is = 'bolt-micro-journeys-dropdown';

  render() {
    const classes = css(
      'c-bolt-dropdown',
      this.props.collapse ? 'c-bolt-dropdown--collapse@small' : '',
    );

    const dropdownChildren = this.slots.default
      ? this.slot('default')
      : this.props.children
      ? this.props.children
      : '';

    return html`
      ${this.addStyles([styles, heightUtils, microJourneyStyles])}
      <div class="${classes}" id="${this.uuid}">
        ${this.dropdownHeader()}
        <div class="c-bolt-dropdown__content">
          <div class="c-bolt-dropdown__content-inner">${dropdownChildren}</div>
        </div>
      </div>
    `;
  }

  rendered() {
    super.rendered && super.rendered();

    this.contentElem = this.renderRoot.querySelector(
      '.c-bolt-dropdown__content',
    );

    this.autoHeight();

    this.dropdown = new Handorgel(
      this.renderRoot.querySelector('.c-bolt-dropdown'),
      {
        // whether multiple folds can be opened at once
        multiSelectable: true,
        // whether the folds are collapsible
        collapsible: true,

        // whether ARIA attributes are enabled
        ariaEnabled: true,
        // whether W3C keyboard shortcuts are enabled
        keyboardInteraction: true,
        // whether to loop header focus (sets focus back to first/last header when end/start reached)
        carouselFocus: true,

        // attribute for the header or content to open folds at initialization
        initialOpenAttribute: 'data-open',
        // whether to use transition at initial open
        initialOpenTransition: true,
        // delay used to show initial transition
        initialOpenTransitionDelay: 200,

        // header/content class if fold is open
        headerOpenClass: 'c-bolt-dropdown__header--open',
        contentOpenClass: 'c-bolt-dropdown__content--open',

        // header/content class if fold has been opened (transition finished)
        headerOpenedClass: 'c-bolt-dropdown__header--opened',
        contentOpenedClass: 'c-bolt-dropdown__content--opened',

        // header/content class if fold has been focused
        headerFocusClass: 'c-bolt-dropdown__header--focus',
        contentFocusClass: 'c-bolt-dropdown__content--focus',

        // header/content class if fold is disabled
        headerDisabledClass: 'c-bolt-dropdown__header--disabled',
        contentDisabledClass: 'c-bolt-dropdown__content--disabled',

        // header/content class if no transition should be active (applied on resize)
        headerNoTransitionClass: 'c-bolt-dropdown__header--notransition',
        contentNoTransitionClass: 'c-bolt-dropdown__content--notransition',
      },
    );
  }
}

export { MicroJourneysDropdown };
