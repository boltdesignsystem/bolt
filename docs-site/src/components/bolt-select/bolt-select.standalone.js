// Initially inspired by https://github.com/adidas/choicesjs-stencil/blob/master/src/components/choicesjs-stencil/choicesjs-stencil.tsx

import { props, define } from '@bolt/core/utils';
import Choices from 'choices.js';
import {
  withLitHtml,
  html,
  // render,
} from '@bolt/core/renderers/renderer-lit-html';
import { filterObject, isDefined, createSelectOptionData } from './utils';

import styles from './bolt-select.scss';

@define
class BoltSelect extends withLitHtml() {
  static is = 'bolt-select';

  static props = {
    type: props.string, // single | multiple | text
    value: props.string,
    name: props.string,
    choices: props.array,
    shouldSort: props.boolean,
    shouldSortItems: props.boolean,
    itemSelectText: props.string,
    searchPlaceholderValue: props.string,
    position: props.string, // 'auto' | 'top' | 'bottom'
    resetScrollPosition: props.boolean,
    silent: props.boolean,
    maxItemCount: props.number,
    items: props.array,
    renderChoiceLimit: props.number,
    addItems: props.boolean,
    removeItems: props.boolean,
    removeItemButton: props.boolean,
    editItems: props.boolean,
    duplicateItems: props.boolean,
    delimiter: props.string,
    paste: props.boolean,
    searchEnabled: props.boolean,
    searchChoices: props.boolean,
    searchFields: props.any, // array | string
    searchFloor: props.number,
    searchResultLimit: props.number,
    regexFilter: props.any, // regex
    sortFilter: props.any, // SortFn
    prependValue: props.string,
    appendValue: props.string,
    placeholderValue: props.string,
    placeholder: props.any, // boolean | string
    renderSelectedChoices: props.string, // 'always' | 'auto'
    loadingText: props.string,
    noResultsText: props.any, // string | NoResultsTextFn
    noChoicesText: props.any, // string | NoChoicesTextFn;
    addItemText: props.any, // string | AddItemTextFn;
    maxItemText: props.any, // string | MaxItemTextFn;
    // uniqueItemText: UniqueItemText
    // classNames: ClassNames
    // fuseOptions: FuseOptions
    // callbackOnInit: OnInit
    // callbackOnCreateTemplates: OnCreateTemplates
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.groups = self.querySelectorAll('optgroup');
    self.options = self.querySelectorAll('option');

    const optgroupsFound = Array.from(self.groups);
    if (optgroupsFound.length > 0) {
      self.options = [];
      self.optgroups = [];
      self.groups.forEach(optgroup => {
        self.optgroups.push({
          label: optgroup.label || '',
          choices: createSelectOptionData(optgroup.querySelectorAll('option')),
        });
      });
    } else {
      if (self.options) {
        self.options = createSelectOptionData(self.options);
      }
    }
    // self.useShadow = hasNativeShadowDomSupport;
    self.useShadow = false;
    return self;
  }

  // @Event({ eventName: 'addItem' }) public addItemEvent: EventEmitter;
  // @Event({ eventName: 'removeItem' }) public removeItemEvent: EventEmitter;
  // @Event({ eventName: 'highlightItem' }) public highlightItemEvent: EventEmitter;
  // @Event({ eventName: 'unhighlightItem' }) public unhighlightItemEvent: EventEmitter;
  // @Event({ eventName: 'choice' }) public choiceEvent: EventEmitter;
  // @Event({ eventName: 'change' }) public changeEvent: EventEmitter;
  // @Event({ eventName: 'search' }) public searchEvent: EventEmitter;
  // @Event({ eventName: 'showDropdown' }) public showDropdownEvent: EventEmitter;
  // @Event({ eventName: 'hideDropdown' }) public hideDropdownEvent: EventEmitter;

  // @Element() public readonly passedElement: HTMLElement;
  // @Element() private readonly root: HTMLElement;

  // private choice;
  // private element;

  async highlightItem(item, runEvent) {
    this.choice.highlightItem(item, runEvent);
    return this;
  }

  async unhighlightItem(item) {
    this.choice.unhighlightItem(item);
    return this;
  }

  async highlightAll() {
    this.choice.highlightAll();
    return this;
  }

  async unhighlightAll() {
    this.choice.unhighlightAll();
    return this;
  }

  async removeItemsByValue(value) {
    this.choice.removeItemsByValue(value);
    return this;
  }

  async removeActiveItems(excludedId) {
    this.choice.removeActiveItems(excludedId);
    return this;
  }

  async removeHighlightedItems(runEvent) {
    this.choice.removeHighlightedItems(runEvent);
    return this;
  }

  async showDropdown(focusInput) {
    this.choice.showDropdown(focusInput);
    return this;
  }

  async hideDropdown(blurInput) {
    this.choice.hideDropdown(blurInput);
    return this;
  }

  async toggleDropdown() {
    this.choice.toggleDropdown();
    return this;
  }

  async getValue(valueOnly) {
    return this.choice.getValue(valueOnly);
  }

  async setValue(args) {
    this.choice.setValue(args);
    return this;
  }

  async setValueByChoice(value) {
    this.choice.setValueByChoice(value);
    return this;
  }

  async setChoices(choices, value, label, replaceChoices) {
    this.choice.setChoices(choices, value, label, replaceChoices);
    return this;
  }

  async clearStore() {
    this.choice.clearStore();

    return this;
  }

  async clearInput() {
    this.choice.clearInput();
    return this;
  }

  async enable() {
    this.choice.enable();
    return this;
  }

  async disable() {
    this.choice.disable();
    return this;
  }

  async ajax(fn) {
    this.choice.ajax(fn);
    return this;
  }

  rendered() {
    super.rendered();
    this._init();
  }

  disconnecting() {
    this.destroy();
  }

  render() {
    // destroy choices element to restore previous dom structure
    // so vdom can replace the element correctly
    this.destroy();

    this.type = this.props.type || 'single';

    // @todo: iterate on different rendering options (below). focusing on rendering just <select> elements for now
    switch (this.type) {
      case 'single':
      default:
        this.element = html`
          <select name="${this.props.name || null}" class="js-bolt-select-root">
            ${this.value ? createSelectOptions(this.value) : null}
          </select>
        `;
        break;
      case 'multiple':
        this.element = html`
          <select
            multiple
            name="${this.props.name || null}"
            class="js-bolt-select-root"
          >
            ${this.value ? createSelectOptions(this.value) : null}
          </select>
        `;
        break;
      case 'text':
        this.element = html`
          <input
            type="text"
            value="${this.value}"
            name="${this.props.name || null}"
            class="js-bolt-select-root"
          />
        `;
        break;
    }

    return html`
      ${this.addStyles([styles])} ${this.element}
    `;
  }

  _init() {
    const props = {
      choices:
        this.props.choices && this.props.choices.length > 0
          ? this.props.choices
          : this.options || [],
      shouldSort: this.props.shouldSort,
      shouldSortItems: this.props.shouldSortItems,
      searchPlaceholderValue: this.props.searchPlaceholderValue,
      itemSelectText: this.props.itemSelectText,
      searchEnabled: this.props.searchEnabled,
      // @todo: continue adding additional options below as time + need permits
      // silent: this.props.silent,
      // items: this.props.items,
      // renderChoiceLimit: this.props.renderChoiceLimit,
      // maxItemCount: this.props.maxItemCount,
      // addItems: this.props.addItems,
      // removeItems: this.props.removeItems,
      // removeItemButton: this.props.removeItemButton,
      // editItems: this.props.editItems,
      // duplicateItems: this.props.duplicateItems,
      // delimiter: this.props.delimiter,
      // paste: this.props.paste,
      // searchEnabled: this.props.searchEnabled,
      // searchChoices: this.props.searchChoices,
      // searchFields: this.props.searchFields,
      // searchFloor: this.props.searchFloor,
      // searchResultLimit: this.props.searchResultLimit,
      // position: this.props.position,
      // resetScrollPosition: this.props.resetScrollPosition,
      // regexFilter: this.props.regexFilter,
      // sortFilter: this.props.sortFilter,
      // placeholder: !!this.props.placeholder || !!this.props.placeholderValue,
      // placeholderValue: this.props.placeholderValue || (typeof this.props.placeholder === 'string' ? this.props.placeholder : ''),
      // prependValue: this.props.prependValue,
      // appendValue: this.props.appendValue,
      // renderSelectedChoices: this.props.renderSelectedChoices,
      // loadingText: this.props.loadingText,
      // noResultsText: this.props.noResultsText,
      // noChoicesText: this.props.noChoicesText,
      // addItemText: this.props.addItemText,
      // maxItemText: this.props.maxItemText,
      // uniqueItemText: this.props.uniqueItemText,
      // classNames: this.props.classNames,
      // fuseOptions: this.props.fuseOptions,
      // callbackOnInit: this.props.callbackOnInit,
      // callbackOnCreateTemplates: this.props.callbackOnCreateTemplates
    };

    const settings = filterObject(props, isDefined);

    this.choice = new Choices(
      this.renderRoot.querySelector('.js-bolt-select-root'),
      settings,
    );

    if (this.optgroups) {
      this.choice.setChoices(this.optgroups, 'value', 'label', false);
    }

    this.passedElement = this.choice.passedElement;
  }

  destroy() {
    if (this.element) {
      this.element = null;
    }

    if (this.choice) {
      this.choice.destroy();
      this.choice = null;
    }
  }
}
