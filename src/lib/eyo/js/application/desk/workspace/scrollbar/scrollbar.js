/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Dom utils.
 * @author jerome.laurens@u-bourgogne.fr
 */
'use strict'

eYo.forward('board')
//g@@g.forwardDeclare('g@@g.dom')
//g@@g.forwardDeclare('g@@g.events')

Object.defineProperties(eYo.view, {
  /**
   * Width of vertical scrollbar or height of horizontal scrollbar in CSS pixels.
   * Scrollbars should be larger on touch devices.
   */
  SCROLLBAR_THICKNESS: eYo.descriptorR({$ () {
    return goog.events.BrowserFeature.TOUCH_ENABLED ? 26 : 16
  }}.$),
})

/**
 * @type {eYo.view.Scrollbar}
 * Class for a pure SVG scrollbar.
 * This technique offers a scrollbar that is guaranteed to work, but may not
 * look or behave like the system's scrollbars.
 * @param {eYo.board.BaseC9r|eYo.view.Scroller} bs Board to bind the scrollbar to, or scroller. Owner of the receiver.
 * @param {boolean} horizontal True if horizontal, false if vertical.
 * @param {string=} opt_css_class A class to be applied to this scrollbar.
 * @constructor
 */
eYo.view.newC9r('Scrollbar', {
  init(bs, horizontal, opt_css_class) {
    if (bs instanceof eYo.view.Scroller) {
      this.scroller_ = bs  
    } else {
      this.scroller_ = null  
    }
    this.horizontal_ = horizontal
    this.oldMetrics_ = null
    this.opt_class_ = opt_css_class  
  },
  properties: {
    /**
     * Whether the scrollbar handle is visible.
     * @type {boolean}
     * @private
     */
    visible: {
      value: true,
      /**
       * When the status changed?
       * @param {boolean} before True if was visible.
       * @param {boolean} after True if will be visible.
       */
      didChange () /** @suppress {globalThis} */ {
        this.updateDisplay_()
      }
    },
    /**
     * Whether the board containing this scrollbar is visible.
     * @type {boolean}
     * @private
     */
    containerVisible: {
      value: true,
      didChange () /** @suppress {globalThis} */ {
        this.updateDisplay_()
      }
    },
    /**
     * The position of the mouse along this scrollbar's major axis at the start of
     * the most recent drag.
     * Units are CSS pixels, with (0, 0) at the top left of the browser window.
     * For a horizontal scrollbar this is the x coordinate of the mouse down event;
     * for a vertical scrollbar it's the y coordinate of the mouse down event.
     * @type {eYo.geom.Point}
     */
    dragStart: {
      value: 0,
    },
    /**
     * The offset of the start of the handle from the scrollbar position, in CSS
     * pixels.
     * @type {number}
     * @private
     */
    handlePosition: {
      value: 0,
      /**
       * Set the offset of the scrollbar's handle from the scrollbar's position, and
       * change the SVG attribute accordingly.
       * @param {number} newPosition The new scrollbar handle offset in CSS pixels.
       */
      validate (after) {
        if (after <= 0 || isNaN(after) || this.viewLength_ < this.handleLength_) {
          return 0
        } else {
          return Math.min(after, this.viewLength_ - this.handleLength_)
        }
      },
      didChange () /** @suppress {globalThis} */ {
        this.driver.updateHandle(this)
      },
    },
    /**
     * The length of the scrollbar handle in CSS pixels.
     * @type {number}
     * @private
     */
    handleLength: {
      value: 0,
      validate (after) {
        return Math.min(Math.max(0, after), this.viewLength)
      },
      /**
       * Change the position and the SVG attribute accordingly.
       */
      didChange (after) /** @suppress {globalThis} */ {
        after = Math.min(Math.max(0, after), this.viewLength)
        if (this.handlePosition + after > this.viewLength) {
          this.handlePosition_ = this.viewLength - after
        }
        this.driver.updateView(this)
      }
    },
    /**
     * @type{eYo.board} The scrolled board...
     * @readonly
     */
    board: {
      get () {
        return this.owner.board
      },
    },
    viewLength: {
      get () {
        var size = this.viewRect_.size
        return this.horizontal ? size.width : size.height
      },
      /**
       * Set the size of the scrollbar's background and change the SVG attribute
       * accordingly.
       * @param {number} newSize The new scrollbar background length in CSS pixels.
       * @private
       */
      set (after) {
        after = Math.max(0, after)
        var old = this.viewLength_
        if (after !== old) {
          var ratio = old ? after / old : 1
          var size = this.viewRect.size_
          this.horizontal
            ? (size.width = after)
            : (size.height = after)
          this.handlePosition_ *= ratio
          this.handleLength_ *= ratio
          this.driver.updateView(this)
        }
      },
    },
  },
})

/**
 * Recalculate the scrollbar's location and its length.
 * When `prepare` is true, updates the visibility status, when `false` it does not.
 * @param {eYo.geom.Metrics} [opt_metrics] A data structure describing all the
 * required dimensions.  If not provided, it will be fetched from the board.
 * @param{?Boolean} prepare  True when prepare only.
 */
eYo.view.Scrollbar_p.layout = function(hostMetrics, prepare) {
  if (this.horizontal_) {
    this.layoutHorizontal(hostMetrics, prepare)
  } else {
    this.layoutVertical(hostMetrics, prepare)
  }
  this.place()
}

/**
 * Recalculate a horizontal scrollbar's location on the screen and path length.
 * This should be called when the layout or size of the window has changed.
 * @param {Object} hostMetrics A data structure describing all the
 *     required dimensions, possibly fetched from the host object.
 * @param {Boolean} [prepare]  True when only preparing.
 */
eYo.view.Scrollbar_p.layoutHorizontal = function(hostMetrics, prepare) {
  hostMetrics || (hostMetrics = this.board.metrics)
  var view = hostMetrics.view
  var content = hostMetrics.port
  var range = content.width - view.width
  if (prepare !== false) {
    this.visible = (view.width > this.scroller_
      ? 2 * eYo.view.SCROLLBAR_THICKNESS
      : eYo.view.SCROLLBAR_THICKNESS) && (this.scroller_ || range > 0)
    if (prepare) {
      return
    }
  }
  var oldMetrics = this.oldMetrics_
  if (!oldMetrics
    || oldMetrics.drag.x != hostMetrics.drag.x
    || oldMetrics.view.width != view.width
    || oldMetrics.port.width != content.width) {
    // The window has been resized or repositioned.
    this.oldMetrics_ = hostMetrics
    var r = this.viewRect_
    r.left = view.left
    r.right = this.scroller_ && this.scroller_.vScroll.visible ? view.right - eYo.view.SCROLLBAR_THICKNESS : view.right
    r.top = (r.bottom = view.bottom) - eYo.view.SCROLLBAR_THICKNESS
    r.pInset(0.5)
    // layout the content
    this.handleLength_ = view.width / content.width * r.width
    if (this.handleLength_ === -Infinity || this.handleLength_ === Infinity ||
        isNaN(this.handleLength_)) {
      this.handleLength_ = 0
    }
    // view.x_max - content.x_max <= scroll.x <= view.x_min - content.x_min
    if (range > 0) {
      this.handlePosition_ = (scroll.x - view.x_max + content.x_max) / range * (r.width - this.handleLength_)
    } else {
      this.handlePosition_ = r.width / 2
    }
  }
}

/**
 * Recalculate a vertical scrollbar's location on the screen and path length.
 * This should be called when the layout or size of the window has changed.
 * @param {Object} hostMetrics A data structure describing all the
 *     required dimensions, possibly fetched from the host object.
 * @param {Boolean} [prepare]  True when preparing.
 */
eYo.view.Scrollbar_p.layoutVertical = function(hostMetrics, prepare) {
  hostMetrics || (hostMetrics = this.board.metrics)
  var view = hostMetrics.view
  var content = hostMetrics.port
  var range = content.height - view.height
  if (prepare !== false) {
    this.visible = (view.height > (this.scroller_
      ? 2 * eYo.view.SCROLLBAR_THICKNESS
      : eYo.view.SCROLLBAR_THICKNESS)) && (!!this.scroller_ || range > 0)
    if (prepare) {
      return
    }
  }
  var oldMetrics = this.oldMetrics_
  if (!oldMetrics
    || oldMetrics.drag.y != hostMetrics.drag.y
    || oldMetrics.view.height != view.height
    || oldMetrics.port.height != content.height) {
    // The window has been resized or repositioned.
    this.oldMetrics_ = hostMetrics
    var r = this.viewRect_
    r.top = view.top
    r.bottom = this.scroller_ && this.scroller_.hScroll.visible
      ? view.bottom - eYo.view.SCROLLBAR_THICKNESS
      : view.bottom
    r.left = (r.right = view.right) - eYo.view.SCROLLBAR_THICKNESS
    r.pInset(0.5)
    // layout the content
    this.handleLength_ = view.height / content.height * r.height
    if (this.handleLength_ === -Infinity || this.handleLength_ === Infinity ||
        isNaN(this.handleLength_)) {
      this.handleLength_ = 0
    }
    // view.y_max - content.y_max <= scroll.y <= view.y_min - content.y_min
    if (range > 0) {
      this.handlePosition_ = (scroll.y - view.y_max + content.y_max) / range * (r.height - this.handleLength_)
    } else {
      this.handlePosition_ = r.height / 2
    }
  }
}

/**
 * Update visibility of scrollbar based on whether it thinks it should
 * be visible and whether its containing board is visible.
 * We cannot rely on the containing board being hidden to hide us
 * because it is not necessarily our parent in the DOM.
 */
eYo.view.Scrollbar_p.updateDisplay_ = function() {
  var show = true
  // Check whether our parent/container is visible.
  show = this.containerVisible_ && this.visible_
  this.driver.updateDisplay(this, show)
}

/**
 * Forwards to the driver.
 * @private
 */
eYo.view.Scrollbar_p.cleanUp_ = function() {
  this.driver.cleanUp(this)
}

/**
 * Stop binding to mouseup and mousemove events.  Call this to
 * wrap up lose ends associated with the scrollbar.
 * @private
 */
eYo.view.Scrollbar_p.place = function() {
  this.driver.place(this)
}

