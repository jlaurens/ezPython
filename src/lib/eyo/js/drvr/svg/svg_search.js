/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Flyout rendering delegate.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.require('dom.Search')

eYo.forward('section.Search')
// eYo.forward('searchToolbar')

/**
 * Svg driver for the search view.
 */
eYo.svg.newDrvrC3s('Search', {
  /**
   * Initializes the search SVG ressources.
   * @param {eYo.dom.Search} search
   */
  initUI (search) {
    if (search.dom) {
      return
    }
    var dom = eYo.svg.eyo$.C3s_s.SearchInit.call(this, search)
    var svg = dom.svg = Object.create(null)
    /*
    <svg class="eyo-search">
      <g class="eyo-search-canvas">
        <path class="eyo-search-background"/>
      </g>
      <g class="eyo-board">...</g>
    </svg>
    */
    var root = svg.root_ = eYo.svg.newElementSvg(dom.boardDiv_, 'eyo-svg eyo-board')
    root.dataset && (root.dataset.type = 'search board')

    var background = svg.background_ = eYo.svg.newElement('path', {
      class: 'eyo-search-background'
    }, root)
    // Bad design: code reuse: options
    this.addTooltip(background, eYo.tooltip.getTitle('Search'), {
      position: 'right',
      theme: 'light bordered',
      flipDuration: 0,
      inertia: true,
      arrow: true,
      animation: 'perspective',
      duration: [600, 300],
      delay: [750, 0],
      popperOptions: {
        modifiers: {
          preventOverflow: {
            enabled: true
          }
        }
      },
      onShow: x => { // eslint-disable-line
        eYo.tooltip.hideAll(background)
      }
    })
  },
  /**
   * Dispose of the given slot's rendering resources.
   * @param {eYo.dom.Search} search
   */
  disposeUI (search) {
    var dom = search.dom
    eYo.dom.removeNode(dom.svg.root_)
    dom.svg.root_ = null
    dom.svg = null
    eYo.svg.eyo$.C3s_s.SearchDispose.call(this, search)
  }
})

/**
 * Set the display attribute.
 * @param {eYo.dom.Search} search
 * @param {Boolean} show
 */
eYo.svg.Search_p.displaySet = function (search, show) {
  !show && eYo.tooltip.hideAll(search.dom.svg.root_)
  search.dom.svg.root_.style.display = show ? 'block' : 'none'
}

/**
 * Get the display attribute.
 * @param {eYo.dom.Search} search
 */
eYo.svg.Search_p.displayGet = function (search) {
  return search.dom.svg.root_.style.display !== 'none'
}

/**
 * Update the view based on coordinates calculated in position().
 * @param {eYo.dom.Search} search
 */
eYo.svg.Search_p.place = function (search) {
  var rect = search.viewRect
  var div = search.dom.div_
  div.style.width = `${rect.width}px`
  div.style.height = `${rect.height}px`
  div.style.left = `${rect.x}px`
  div.style.top = `${rect.y}px`
  if (search.toolbar_) {
    search.toolbar_.place()
  }
  search.board_.resizePort()
  var board = search.desk.board
  if (board) {
    var scrollbar = board.scrollbar
    if (scrollbar) {
      if (scrollbar.hScroll) {
        scrollbar.hScroll.oldHostMetrics_ = null
      }
      if (scrollbar.vScroll) {
        scrollbar.vScroll.oldHostMetrics_ = null
      }
    }
    board.resizePort()
    board.trashCan.place()
  }
}

/**
 * Update the visible boundaries of the search.
 * @param {eYo.dom.Search} search
 * @private
 */
eYo.svg.Search_p.update = function(search) {
  var width = search.width
  var height = search.height
  var top_margin = eYo.dom.Search.TOP_MARGIN
  var atRight = search.atRight
  // Decide whether to start on the left or right.
  var path = [`M ${atRight ? width : 0},${top_margin}`]
  // Top.
  path.push('h', atRight ? -width : width)
  // Side closest to board.
  path.push('v', Math.max(0, height - top_margin))
  // Bottom.
  path.push('h', atRight ? width : -width)
  path.push('z')
  search.dom.svg.background_.setAttribute('d', path.join(' '))
}

/**
 * Add listeners to a block that has been added to the search.
 * Listeners work only when the search authorizes it.
 * The 'rect' listeners have been removed.
 * @param {eYo.dom.Search} search
 */
eYo.svg.Search_p.removeAllBrickListeners = function(search) {
  // Delete all the event listeners.
  search.listeners_.forEach(l => eYo.dom.unbindEvent(l))
  search.listeners_.length = 0
}

/**
 * Add listeners to a block that has been added to the search.
 * Listeners work only when the search authorizes it.
 * The 'rect' listeners have been removed.
 * @param {eYo.dom.Search} search
 * @param {eYo.brick.BaseC3s} brick The block to add listeners for.
 */
eYo.svg.Search_p.addListeners = function(search, brick) {
  var g = brick.dom.svg.group_
  search.listeners_.push(eYo.dom.bindEvent(
    g,
    'mousedown',
    null,
    e => search.app.motion.handleFlyoutStart(e, search, brick)
  ))
  search.listeners_.push(eYo.dom.bindEvent(
    g,
    'mouseover',
    brick,
    brick.selectAdd
  ))
  search.listeners_.push(eYo.dom.bindEvent(
    g,
    'mouseleave',
    brick,
    brick.focusRemove
  ))
  search.listeners_.push(eYo.dom.bindEvent(
    g,
    'mouseout',
    brick,
    brick.focusRemove
  ))
}

/**
 * Add a `mouseover` listener to deselect all bricks.
 * @param {eYo.dom.Search} search
 */
eYo.svg.Search_p.listen_mouseover = function(search) {
  search.listeners_.push(
    eYo.dom.bindEvent(
      search.dom.svg.background_,
      'mouseover',
      null,
      () => {
        search.board_.topBricks.forEach(b3k => b3k.focusRemove)
      }
    ))
}

/**
 * Add a `wheel` and `mousdown` listener to scroll.
 * @param {eYo.dom.Search} search
 */
eYo.svg.Search_p.bindScrollEvents = function(search) {
  var bound = search.dom.bound
  if (bound.drag_wheel) {
    return
  }
  var svg = search.dom.svg
  bound.drag_wheel = eYo.dom.bindEvent(
    svg.group_,
    'wheel',
    null,
    this.searchOn_wheel.bind(search)
  )
  // Dragging the search up and down.
  bound.drag_mousedown = eYo.dom.bindEvent(
    svg.background_,
    'mousedown',
    null,
    this.searchOn_mousedown.bind(search)
  )
}

/**
 * Mouse down on the search background.  Start a vertical scroll drag.
 * @param {Event} e Mouse down event.
 * @private
 */
eYo.svg.Search_p.on_mousedown = function(e) {
  eYo.app.motion.handleFlyoutStart(e, this)
  
}

/**
 * Svg driver for the search tool bar.
 */
eYo.svg.newDrvrC3s('SearchToolbar', {
  /**
   * Initializes the search toolbar SVG ressources.
   * @param {eYo.dom.SearchToolbar} searchToolbar
   */
  initUI (ftb) {
    if (ftb.dom) {
      return
    }
    var search = ftb.search
    var dom = this._initUI(ftb)
    var svg = dom.svg
    /*
    <div class="eyo-search-toolbar">
      <div class="eyo-search-toolbar-general">
        <div class="eyo-search-select-general">
          ...
        </div>
        <div class="eyo-search-control">
          ...
        </div>
      </div>
      <div class="eyo-search-toolbar-module">
        <div class="eyo-search-select-module">
          ...
        </div>
      </div>
    </div>
    */
    var cssClass = this.cssClass()
    dom.control_ = eYo.dom.createDom(
      eYo.dom.TagName.DIV,
      eYo.dom.getCssClass(cssClass, 'control')
    )
    svg.root_ = eYo.svg.newElementSvg(dom.control_, eYo.dom.getCssClass(cssClass, 'control-image'))
    svg.pathControl_ = eYo.svg.newElement('path', {
      id: 'p-search-control'
    }, dom.svg)
    if (ftb.app && ftb.app.searchDropDown) { // eslint-disable-line
    } else if (ftb.app && ftb.app.searchDropDownGeneral && ftb.app.searchDropDownModule) { // eslint-disable-line
    }
    const div = this.search.desk.dom.div_.searchToolbar_
    Object.definePorperty(dom, 'div_', {
      get () { return div }
    })
    if (search.switcher_) {
      div.appendChild(search.switcher_)
      search.switcher_.style.left = '0px'
      search.switcher_.style.top = '0px'
    }
    div.appendChild(dom.control_)
    var bound = dom.bound
    bound.mousedown = eYo.dom.bindEvent(
      dom.control_,
      'mousedown',
      search,
      search.on_mousedown
    )
    bound.mouseenter = eYo.dom.bindEvent(
      dom.control_,
      'mouseenter',
      search,
      search.on_mouseenter
    )
    bound.mouseleave = eYo.dom.bindEvent(
      dom.control_,
      'mouseleave',
      search,
      search.on_mouseleave
    )
    bound.mouseup = eYo.dom.bindEvent(
      dom.control_,
      'mouseup',
      search,
      search.on_mouseup
    )
  },
  /**
   * Initializes the search toolbar SVG ressources.
   * @param {eYo.dom.SearchToolbar} searchToolbar
   */
  disposeUI (ftb) {
    var dom = ftb.dom
    var div = dom.div_
    var fc
    while((fc = div.firstChild)) {
      div.removeChild(fc)
    }
    var svg = dom.svg
    eYo.dom.removeNode(svg.group_)
    svg.group_ = null
  },
})