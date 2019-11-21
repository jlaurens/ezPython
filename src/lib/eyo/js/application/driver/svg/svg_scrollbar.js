/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Scrollbar rendering delegate.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.require('eYo.Svg')

goog.provide('eYo.Svg.Scrollbar')

goog.forwardDeclare('eYo.Scrollbar')

/**
 * Svg driver for a scrollbar.
 */
eYo.Svg.makeDriverClass('Scrollbar')

/**
 * Initializes the scrollbar SVG ressources.
 * @param {!eYo.Scrollbar} scrollbar
 * @param {?String} opt_class
 */
eYo.Svg.Scrollbar.prototype.initUI = eYo.Dom.Decorate.initUI(eYo.Svg.Scrollbar, function(scrollbar, opt_class) {
  var dom = scrollbar.dom
  var svg = dom.svg
  /* Create the following DOM:
  <svg class="eyo-scrollbar-horizontal  optionalClass">
    <g>
      <rect class="eyo-scrollbar-background" />
      <rect class="eyo-scrollbar-handle" rx="8" ry="8" />
    </g>
  </svg>
  */
  var className = 'eyo-scrollbar-' + (scrollbar.horizontal_ ? 'horizontal' : 'vertical')
  if (opt_class) {
    className += ' ' + opt_class
  }
  var root = svg.root_ = eYo.Svg.newElement(
    'svg',
    {
      class: className,
      preserveAspectRatio: 'xMinYMin slice'
    }
  )
  var g = svg.group_ = eYo.Svg.newElement(
    'g',
    {},
    root
  )
  var background = svg.background_ = eYo.Svg.newElement(
    'rect',
    { class: 'eyo-scrollbar-background'},
    g
  )
  var radius = Math.floor((eYo.Scrollbar.thickness - 5) / 2)
  var handle = svg.handle_ = eYo.Svg.newElement(
    'rect',
    {
      class: 'eyo-scrollbar-handle',
      rx: radius,
      ry: radius
    },
    g
  )
  var thickness = eYo.Scrollbar.thickness;
  if (scrollbar.horizontal_) {
    background.setAttribute('height', thickness)
    handle.setAttribute('height', thickness - 5)
    handle.setAttribute('y', 2.5);
    scrollbar.lengthAttribute_ = 'width'
    scrollbar.positionAttribute_ = 'x'
  } else {
    background.setAttribute('width', thickness)
    handle.setAttribute('width', thickness - 5)
    handle.setAttribute('x', 2.5);
    scrollbar.lengthAttribute_ = 'height'
    scrollbar.positionAttribute_ = 'y'
  }
  eYo.Dom.insertAfter(
    root,
    scrollbar.board_.dom.svg.root_
  )
  var bound = dom.bound
  bound.bar_mousedown = eYo.Dom.bindEvent(
    background,
    'mousedown',
    this.scrollbarOnBar_mousedown.bind(scrollbar)
  )
  bound.handle_mousedown = eYo.Dom.bindEvent(
    handle,
    'mousedown',
    this.scrollbarOnHandle_mousedown.bind(scrollbar)
  )
  return g
})

/**
 * Dispose of the given slot's rendering resources.
 * @param {!eYo.Scrollbar} scrollbar
 */
eYo.Svg.Scrollbar.prototype.disposeUI = eYo.Dom.Decorate.disposeUI(function (scrollbar) {
  var dom = scrollbar.dom
  goog.dom.removeNode(dom.svg.root_)
  dom.svg = dom.svg.root_ = null
  throw 'WHAT ABOUT THE OTHER EVENTS'
})

/**
 * Update visibility of scrollbar based on whether it thinks it should
 * be visible and whether its containing board is visible.
 * We cannot rely on the containing board being hidden to hide us
 * because it is not necessarily our parent in the DOM.
 * @param {eYo.Scrollbar} scrollbar
 * @param {Boolean} show
 */
eYo.Svg.Scrollbar.prototype.updateDisplay = function(scrollbar, show) {
  scrollbar.dom.svg.root_.setAttribute('display', show ? 'block' : 'none')
}

/**
 * Update the handle of the scroll bar, position and dimensions at the same time.
 * @param {eYo.Scrollbar} scrollbar
 */
eYo.Svg.Scrollbar.prototype.updateHandle = function(scrollbar) {
  var handle = scrollbar.dom.svg.handle_
  handle.setAttribute(
    scrollbar.lengthAttribute_,
    scrollbar.handleLength_
  )
  handle.setAttribute(
    scrollbar.positionAttribute_,
    scrollbar.handlePosition__
  )
}

/**
 * Update the view of the scroll bar, position and dimensions at the same time.
 * @param {eYo.Scrollbar} scrollbar
 */
eYo.Svg.Scrollbar.prototype.updateView = function(scrollbar) {
  var svg = scrollbar.dom.svg
}

/**
 * Place the scroll bar.
 * @param {eYo.Scrollbar} scrollbar
 */
eYo.Svg.Scrollbar.prototype.place = function(scrollbar) {
  var r = scrollbar.viewRect
  scrollbar.dom.svg.root_.setAttribute('viewBox', `${r.x_min} ${r.y_min} ${r.width} ${r.height}`)
}

/**
 * Start a dragging operation.
 * Called when scrollbar handle is clicked.
 * @param {!Event} e Mouse down event.
 * @this {eYo.Scrollbar}
 * @private
 */
eYo.Svg.Scrollbar.prototype.onHandle_mousedown = function(e) {
  this.board_.markFocused()
  this.cleanUp_()
  if (eYo.Dom.isRightButton(e)) {
    // Right-click.
    // Scrollbars have no context menu.
    e.stopPropagation()
    return
  }
  // Record the current mouse position.
  var rect = this.viewRect
  if (this.horizontal_) {
    this.dragStart_ = e.clientX
    // what is the mouse range ?
    this.dragMin_ = this.dragStart_ - this.handlePosition_ + rect.x_min
    this.dragLength_ = rect.width - this.handleLength_
  } else {
    this.dragStart_ = e.clientY
    // what is the mouse range ?
    this.dragMin_ = this.dragStart_ - this.handlePosition_ + rect.y_min
    this.dragLength_ = rect.height - this.handleLength_
  }
  var bound = this.dom.bound
  bound.mouseup = eYo.Dom.bindEvent(
    document,
    'mouseup',
    this,
    this.ui_driver_mgr.scrollbarOn_mouseup
  )
  bound.mousemove = eYo.Dom.bindEvent(
    document,
    'mousemove',
    this,
    this.ui_driver_mgr.scrollbarOn_mousemove
  )
  eYo.Dom.gobbleEvent(e)
}

/**
 * Drag the scrollbar's handle.
 * @param {!Event} e Mouse up event.
 * @this {eYo.Scrollbar}
 */
eYo.Svg.Scrollbar.prototype.on_mousemove = function(e) {
  var currentMouse = this.horizontal_ ? e.clientX : e.clientY
  var ratio = this.dragLength_ ? (currentMouse - this.dragMin_) / this.dragLength_ : 0
  if (ratio < 0) {
    ration = 0
  } else if (ratio > 1) {
    ratio = 1
  }
  this.board_.doRelativeScroll({[this.horizontal_ ? 'x' : 'y']: ratio})
  eYo.Dom.gobbleEvent(e)
}

/**
 * End of scrolling.
 * @param {!Event} e Mouse up event.
 * @this {eYo.Scrollbar}
 */
eYo.Svg.Scrollbar.prototype.on_mouseup = function() {
  // Tell the board to clean up now that the board is done moving.
  eYo.Dom.clearTouchIdentifier()
  this.cleanUp_()
}

/**
 * Stop binding to mouseup and mousemove events.  Call this to
 * wrap up lose ends associated with the scrollbar.
 * @param {!eYo.Scrollbar}
 * @private
 */
eYo.Svg.Scrollbar.prototype.cleanUp = function(scrollbar) {
  eYo.app.hideChaff()
  var bound = scrollbar.dom.bound
  if (bound.mouseup) {
    eYo.Dom.unbindEvent(bound.mouseup)
    bound.mouseup = null
  }
  if (bound.mousemove) {
    eYo.Dom.unbindEvent(bound.mousemove)
    bound.mousemove = null
  }
}

/**
 * Scroll by one pageful.
 * Called when scrollbar background is clicked.
 * @param {!Event} e Mouse down event.
 * @this {eYo.Scrollbar}
 * @private
 */
eYo.Svg.Scrollbar.prototype.onBar_mousedown = function(e) {
  var board = this.board_
  board.markFocused()
  eYo.Dom.clearTouchIdentifier()  // This is really a click.
  this.cleanUp_()
  if (eYo.Dom.isRightButton(e)) {
    // Right-click.
    // Scrollbars have no context menu.
    e.stopPropagation()
    return
  }
  var mouseWhere = board.eventWhere(e)
  var mouseLocation = this.horizontal_ ? mouseWhere.x : mouseWhere.y

  var rect = this.viewRect
  var handleStart = this.horizontal_ ? rect.origin.x : rect.origin.y
  
  if (mouseLocation <= handleStart) {
    // Decrease the scrollbar's value by a page minus one line.
    board.scrollPage(true)
  } else if (mouseLocation >= handleStart + this.handleLength_) {
    // Increase the scrollbar's value by a page.
    board.scrollPage(false)
  }
  eYo.Dom.gobbleEvent(e)
}