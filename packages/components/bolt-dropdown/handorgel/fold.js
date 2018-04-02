import { rAF } from './helpers'

let ID_COUNTER = {}

const ARIA_ATTRIBUTES = {
  button: {
    'aria-controls': function () {
      return this.id + '-content'
    },
    'aria-expanded': function () {
      return this.expanded ? 'true' : 'false'
    },
    'aria-disabled': function () {
      return this.disabled ? 'true' : 'false'
    }
  },
  content: {
    role: function () {
      return 'region'
    },
    'aria-labelledby': function () {
      return this.id + '-header'
    }
  }
}

const KEYS = {
  arrowDown: 40,
  arrowUp: 38,
  pageUp: 33,
  pageDown: 34,
  end: 35,
  home: 36
}

export default class HandorgelFold {
  constructor(handorgel, header, content) {
    if (header.handorgelFold) {
      return
    }

    this.handorgel = handorgel
    this.header = header
    this.button = header.firstElementChild
    this.content = content
    this.header.handorgelFold = this
    this.content.handorgelFold = this

    if (!ID_COUNTER[this.handorgel.id]) {
      ID_COUNTER[this.handorgel.id] = 0
    }

    this.id = `${this.handorgel.id}-fold${++ID_COUNTER[this.handorgel.id]}`

    this.header.setAttribute('id', this.id + '-header')
    this.content.setAttribute('id', this.id + '-content')

    this.focused = false
    this.expanded = false
    this.disabled = false

    this._listeners = {}

    this._bindEvents()
    this._initAria()
    this._initialOpen()
    this._initialFocus()
  }

  open(transition = true) {
    if (this.expanded) {
      return
    }

    this.handorgel.emitEvent('fold:open', [this])
    this.expanded = true

    if (!this.handorgel.options.collapsible) {
      this.disable()
    }

    this._updateAria('button', 'aria-expanded')

    this.header.classList.add(this.handorgel.options.headerOpenClass)
    this.content.classList.add(this.handorgel.options.contentOpenClass)

    this.resize(transition)

    if (!transition) {
      this._opened()
    }
  }

  close(transition = true) {
    if (!this.expanded) {
      return
    }

    this.handorgel.emitEvent('fold:close', [this])
    this.expanded = false

    if (!this.handorgel.options.collapsible) {
      this.enable()
    }

    this._updateAria('button', 'aria-expanded')

    this.header.classList.remove(this.handorgel.options.headerOpenedClass)
    this.content.classList.remove(this.handorgel.options.contentOpenedClass)

    this.resize(transition)

    if (!transition) {
      this._closed()
    }
  }

  disable() {
    this.disabled = true
    this._updateAria('button', 'aria-disabled')
    this.header.classList.add(this.handorgel.options.headerDisabledClass)
    this.content.classList.add(this.handorgel.options.contentDisabledClass)
  }

  enable() {
    this.disabled = false
    this._updateAria('button', 'aria-disabled')
    this.header.classList.remove(this.handorgel.options.headerDisabledClass)
    this.content.classList.remove(this.handorgel.options.contentDisabledClass)
  }

  focus() {
    this.button.focus()
  }

  blur() {
    this.button.blur()
  }

  toggle(transition = true) {
    if (this.expanded) {
      this.close(transition)
    } else {
      this.open(transition)
    }
  }

  resize(transition = false) {
    let height = 0

    if (!transition) {
      this.header.classList.add(this.handorgel.options.headerNoTransitionClass)
      this.content.classList.add(this.handorgel.options.contentNoTransitionClass)
    }

    if (this.expanded) {
      height = this.content.firstElementChild.offsetHeight
    }

    this.content.style.height = height + 'px'

    if (!transition) {
      rAF(() => {
        this.header.classList.remove(this.handorgel.options.headerNoTransitionClass)
        this.content.classList.remove(this.handorgel.options.contentNoTransitionClass)
      })
    }
  }

  destroy() {
    this._unbindEvents()
    this._cleanAria()

    // clean classes
    this.header.classList.remove(this.handorgel.options.headerOpenClass)
    this.header.classList.remove(this.handorgel.options.headerOpenedClass)
    this.header.classList.remove(this.handorgel.options.headerFocusClass)
    this.header.classList.remove(this.handorgel.options.headerNoTransitionClass)

    this.content.classList.remove(this.handorgel.options.contentOpenClass)
    this.content.classList.remove(this.handorgel.options.contentOpenedClass)
    this.content.classList.remove(this.handorgel.options.contentFocusClass)
    this.content.classList.remove(this.handorgel.options.contentNoTransitionClass)

    // hide content
    this.content.style.height = '0px'

    // clean reference to this instance
    this.header.handorgelFold = null
    this.content.handorgelFold = null

    // remove ids
    this.header.removeAttribute('id')
    this.content.removeAttribute('id')

    // clean reference to handorgel instance
    this.handorgel = null
  }

  _opened() {
    this.header.classList.add(this.handorgel.options.headerOpenedClass)
    this.content.classList.add(this.handorgel.options.contentOpenedClass)
    this.handorgel.emitEvent('fold:opened', [this])
  }

  _closed() {
    this.header.classList.remove(this.handorgel.options.headerOpenClass)
    this.content.classList.remove(this.handorgel.options.contentOpenClass)
    this.handorgel.emitEvent('fold:closed', [this])
  }

  _initialOpen() {
    if (
      this.header.getAttribute(this.handorgel.options.initialOpenAttribute) !== null ||
      this.content.getAttribute(this.handorgel.options.initialOpenAttribute) !== null
    ) {
      if (this.handorgel.options.initialOpenTransition) {
        window.setTimeout(() => {
          this.open()
        }, this.handorgel.options.initialOpenTransitionDelay)
      } else {
        this.open(false)
      }
    }
  }

  _initialFocus() {
    if (this.button.getAttribute('autofocus') === null) {
      return
    }

    // to ensure focus styles if autofocus was applied
    // before focus listener was added
    this._handleFocus()
  }

  _initAria() {
    this._updateAria('button')
    this._updateAria('content')
  }

  _cleanAria() {
    this._updateAria('button', null, true)
    this._updateAria('content', null, true)
  }

  _updateAria(element, property = null, remove = false) {
    if (!this.handorgel.options.ariaEnabled) {
      return
    }

    if (property) {
      const newValue = ARIA_ATTRIBUTES[element][property].call(this)
      this[element].setAttribute(property, newValue)
    } else {
      for (let property in ARIA_ATTRIBUTES[element]) {
        if (ARIA_ATTRIBUTES[element].hasOwnProperty(property)) {
          if (remove) {
            this[element].removeAttribute(property)
          } else {
            const newValue = ARIA_ATTRIBUTES[element][property].call(this)
            this[element].setAttribute(property, newValue)
          }
        }
      }
    }
  }

  _handleContentTransitionEnd(e) {
    if (e.target === e.currentTarget && e.propertyName === 'height') {
      this.handorgel.resize(true)

      if (this.expanded) {
        this._opened()
      } else {
        this._closed()
      }
    }
  }

  _handleFocus() {
    this.focused = true
    this.header.classList.add(this.handorgel.options.headerFocusClass)
    this.content.classList.add(this.handorgel.options.contentFocusClass)
    this.handorgel.emitEvent('fold:focus', [this])
  }

  _handleBlur() {
    this.focused = false
    this.header.classList.remove(this.handorgel.options.headerFocusClass)
    this.content.classList.remove(this.handorgel.options.contentFocusClass)
    this.handorgel.emitEvent('fold:blur', [this])
  }

  _handleButtonClick(e) {
    // ensure focus is on button (click is not seting focus on firefox mac)
    this.focus()

    if (this.disabled) {
      return
    }

    this.toggle()
  }

  _handleButtonKeydown(e) {
    if (!this.handorgel.options.keyboardInteraction) {
      return
    }

    let action = null

    switch (e.which) {
      case KEYS.arrowDown:
        action = 'next'
        break
      case KEYS.arrowUp:
        action = 'prev'
        break
      case KEYS.home:
        action = 'first'
        break
      case KEYS.end:
        action = 'last'
        break
      case KEYS.pageDown:
        if (e.ctrlKey) {
          action = 'next'
        }
        break
      case KEYS.pageUp:
        if (e.ctrlKey) {
          action = 'prev'
        }
        break
    }

    if (action) {
      e.preventDefault()
      this.handorgel.focus(action)
    }
  }

  _handleContentKeydown(e) {
    if (!this.handorgel.options.keyboardInteraction || !e.ctrlKey) {
      return
    }

    let action = null

    switch (e.which) {
      case KEYS.pageDown:
        action = 'next'
        break
      case KEYS.pageUp:
        action = 'prev'
        break
    }

    if (action) {
      e.preventDefault()
      this.handorgel.focus(action)
    }
  }

  _bindEvents() {
    this._listeners = {
      // button listeners
      bFocus: ['focus', this.button, this._handleFocus.bind(this)],
      bBlur: ['blur', this.button, this._handleBlur.bind(this)],
      bClick: ['click', this.button, this._handleButtonClick.bind(this)],
      bKeydown: ['keydown', this.button, this._handleButtonKeydown.bind(this)],
      // content listeners
      cKeydown: ['keydown', this.content, this._handleContentKeydown.bind(this)],
      cTransition: ['transitionend', this.content, this._handleContentTransitionEnd.bind(this)]
    }

    for (let key in this._listeners) {
      if (this._listeners.hasOwnProperty(key)) {
        const listener = this._listeners[key]
        listener[1].addEventListener(listener[0], listener[2])
      }
    }
  }

  _unbindEvents() {
    for (let key in this._listeners) {
      if (this._listeners.hasOwnProperty(key)) {
        const listener = this._listeners[key]
        listener[1].removeEventListener(listener[0], listener[2])
      }
    }
  }
}