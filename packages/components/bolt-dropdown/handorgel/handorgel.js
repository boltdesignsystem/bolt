import EventEmitter from 'ev-emitter'
import { rAF, extend } from './helpers'
import Fold from './fold'

let ID_COUNTER = 0

export default class Handorgel extends EventEmitter {
  constructor(element, options = {}) {
    super()

    if (element.handorgel) {
      return
    }

    this.element = element
    this.element.handorgel = this
    this.id = `handorgel${++ID_COUNTER}`
    this.element.setAttribute('id', this.id)
    this.folds = []
    this.options = extend({}, Handorgel.defaultOptions, options)

    this._listeners = {}
    this._resizing = false

    this._bindEvents()
    this._initAria()
    this.update()
  }

  update() {
    this.folds = []
    const children = this.element.children

    for (let i = 0, childrenLength = children.length; i < childrenLength; i = i + 2) {
      const header = children[i]
      const content = children[i + 1]
      let fold = header.handorgelFold

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

  destroy() {
    this.emitEvent('destroy')
    this.element.removeAttribute('id')

    this.folds.forEach(fold => {
      fold.destroy()
    })

    this._unbindEvents()
    this._cleanAria()

    // clean reference to handorgel instance
    this.element.handorgel = null
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

    this.element.setAttribute('role', 'presentation')

    if (this.options.multiSelectable) {
      this.element.setAttribute('aria-multiselectable', 'true')
    }
  }

  _cleanAria() {
    this.element.removeAttribute('role')
    this.element.removeAttribute('aria-multiselectable')
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

  headerOpenClass: 'handorgel__header--open',
  contentOpenClass: 'handorgel__content--open',

  headerOpenedClass: 'handorgel__header--opened',
  contentOpenedClass: 'handorgel__content--opened',

  headerDisabledClass: 'handorgel__header--disabled',
  contentDisabledClass: 'handorgel__content--disabled',

  headerFocusClass: 'handorgel__header--focus',
  contentFocusClass: 'handorgel__content--focus',

  headerNoTransitionClass: 'handorgel__header--notransition',
  contentNoTransitionClass: 'handorgel__content--notransition'
}