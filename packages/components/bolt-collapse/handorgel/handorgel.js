import {
  h,
  render,
  // React,
  // Component,
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  withPreact,
  sanitizeBoltClasses
} from '@bolt/core';


import EventEmitter from 'ev-emitter'
import { rAF, extend } from './helpers'
import Fold from './fold'

let ID_COUNTER = 0


// class Handorgel extends withComponent(wrap(HandorgelComponent)) {

// }

@define
export class Handorgel extends withPreact(withComponent(EventEmitter)) {
  static is = "bolt-collapse";

  constructor(element, options = {}) {
    super()

    // if (element.handorgel) {
    //   return
    // }

    // this = element;
    // this.handorgel = this

    this.folds = []
    this.options = extend({}, Handorgel.defaultOptions, options)

    this._listeners = {}
    this._resizing = false

  }

  connectedCallback(){
    this.id = `handorgel${++ID_COUNTER}`
    this.id = this.id;

    this._bindEvents();
    this._initAria();
    this._update();

    console.log(this.childNodes);
  }

  _update() {
    this.folds = [];
    const children = this.children;

    console.log(children);

    for (let i = 0, childrenLength = children.length; i < childrenLength; i = i + 2) {
      const header = children[i];
      const content = children[i + 1];
      let fold = header.handorgelFold;

      if (!fold) {
        fold = new Fold(this, header, content)
      }

      this.folds.push(fold)
    }
  }

  resize(transition = false) {
    // resize each fold
    this.folds.forEach(fold => {
      fold.resize(transition)
    })

    this._resizing = false
  }

  focus(target) {
    const foldsLength = this.folds.length
    let currentFocusedIndex = null

    for (let i = 0; i < foldsLength && currentFocusedIndex === null; i++) {
      if (this.folds[i].focused) currentFocusedIndex = i
    }

    if ((target === 'prev' || target === 'next') && currentFocusedIndex === null) {
      target = target === 'prev' ? 'last' : 'first'
    }

    if (target === 'prev' && currentFocusedIndex === 0) {
      if (!this.options.carouselFocus) return
      target = 'last'
    }

    if (target === 'next' && currentFocusedIndex === foldsLength - 1) {
      if (!this.options.carouselFocus) return
      target = 'first'
    }

    switch (target) {
      case 'prev':
        this.folds[--currentFocusedIndex].focus()
        break
      case 'next':
        this.folds[++currentFocusedIndex].focus()
        break
      case 'last':
        this.folds[foldsLength - 1].focus()
        break
      case 'first':
      default:
        this.folds[0].focus()
    }
  }


  disconnectedCallback(){
    this.destroy();
  }

  destroy() {
    this.emitEvent('destroy')
    this.removeAttribute('id')

    this.folds.forEach(fold => {
      fold.destroy()
    })

    this._unbindEvents()
    this._cleanAria()

    // clean reference to handorgel instance
    this.handorgel = null
    this.emitEvent('destroyed')
  }

  _handleFoldOpen(openFold) {
    if (this.options.multiSelectable) {
      return
    }

    this.folds.forEach(fold => {
      if (openFold !== fold) {
        fold.close()
      }
    })
  }

  _handleResize() {
    if (!this._resizing) {
      this._resizing = true

      rAF(() => {
        this.resize()
      })
    }
  }

  _initAria() {
    if (!this.options.ariaEnabled) {
      return
    }

    this.setAttribute('role', 'presentation')

    if (this.options.multiSelectable) {
      this.setAttribute('aria-multiselectable', 'true')
    }
  }

  _cleanAria() {
    this.removeAttribute('role')
    this.removeAttribute('aria-multiselectable')
  }

  _bindEvents() {
    this._listeners.resize = this._handleResize.bind(this)
    window.addEventListener('resize', this._listeners.resize)

    this._listeners.foldOpen = this._handleFoldOpen.bind(this)
    this.on('fold:open', this._listeners.foldOpen)
  }

  _unbindEvents() {
    window.removeEventListener('resize', this._listeners.resize)
    this.off('fold:open', this._listeners.foldOpen)
  }
}

Handorgel.defaultOptions = {
  keyboardInteraction: true,
  multiSelectable: true,
  ariaEnabled: true,
  collapsible: true,
  carouselFocus: true,

  initialOpenAttribute: 'data-open',
  initialOpenTransition: true,
  initialOpenTransitionDelay: 200,

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
}