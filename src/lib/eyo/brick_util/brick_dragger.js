/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Brick dragger for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'


goog.provide('eYo.BrickDragger')

goog.require('eYo')
goog.require('eYo.Change')

goog.forwardDeclare('eYo.Dom')
goog.forwardDeclare('eYo.Brick')
goog.forwardDeclare('eYo.Board')
goog.forwardDeclare('eYo.Events.BrickMove')

/**
 * Class for a brick dragger.  It moves bricks around the board when they
 * are being dragged by a mouse or touch.
 * @param {!eYo.Board} destination The board to drag on.
 * @constructor
 */
eYo.BrickDragger = function(destination) {
  this.destination_ = destination
}

Object.defineProperties(eYo.BrickDragger.prototype, {
  brick_: {
    get () {
      return this.brick__
    },
    set (newValue) {
      if (newValue && newValue.ans) {
        throw 'UNEXPECTED'
      }
      this.brick__ = newValue
    }
  },
  brick: {
    get () {
      return this.brick__
    }
  },
  xyStart: {
    get () {
      return this.xyStart_
    }
  },
  change: {
    get () {
      return this.gesture_.change
    }
  },
  xyDelta: {
    get: eYo.Change.decorate('xyDeltaBrickDragger', function () {
      return {ans: this.destination.fromPixelUnit(this.gesture_.deltaWhere_)}
    }),
  },
  xyNew_: {
    get () {
      return new eYo.Where(this.xyStart_).forward(this.xyDelta)
    }
  }
})

Object.defineProperties(eYo.BrickDragger.prototype, {
  desk: {
    get () {
      return this.destination_.desk
    }
  },
  destination: {
    get () {
      return this.destination_
    }
  },
  ui_driver: {
    get () {
      return this.desk.ui_driver
    }
  },
})

/**
 * Sever all links from this object.
 * @package
 */
eYo.BrickDragger.prototype.dispose = function() {
  this.availableMagnets_.length = 0
  this.availableMagnets_ = this.brick_ = this.target_ = this.magnet_ = null
  this.destination = null
}

/**
 * Eventually start dragging a brick.
 * One of the problem is to constrain dragging.
 * There are different options, but the one chosen implies
 * the dragging of the board.
 * There is a possibility that has not been explored:
 * move the bricks on the board to indicate where to put the dradded brick.
 * This seems a very interesting and appealing strategy but highly expensive.
 * Here is how it is implemented.
 * As long as the brick is in the visible area, do not scroll the board.
 * When the brick will be out of the visible area, scroll the board instead
 * as far as possible, then scroll the brick accordingly.
 * We track both the mouse location and the brick location.
 * When the center of the brick will gout out the visible area,
 * we scroll the brick board to keep it back.
 * @param {!eYo.Gesture} gesture  The gesture initiating the eventual drag.
 * @return {eYo.Brick}  The target brick of the drag event, if any.
 * @package
 */
eYo.BrickDragger.prototype.start = function(gesture) {
  this.gesture_ = gesture
  var targetBrick = gesture.targetBrick_
  if (!targetBrick) {
    return
  }
  var flyout = gesture.flyout_
  if (flyout) {
    /*
     * Update this gesture to record whether a brick is being dragged from the
     * flyout.
     * This function should be called on a mouse/touch move event the first time the
     * drag radius is exceeded.  It should be called no more than once per gesture.
     * If a brick should be dragged from the flyout this function creates the new
     * brick on the main board and updates targetBrick_ and board_.
     * @return {boolean} destination_ if a brick is being dragged from the flyout.
     * @private
     */
    // Disabled bricks may not be dragged from the flyout.
    if (targetBrick.disabled) {
      return
    }
    if (!flyout.isDragTowardBoard(gesture)) {
      return
    }
    // Start the event group now,
    // so that the same event group is used for brick
    // creation and brick dragging.
    // The start brick is no longer relevant, because this is a drag.
    eYo.Events.disableWrap(() => {
      targetBrick = flyout.createBrick(targetBrick)
    })
  } else if (!targetBrick.movable) {
    return
  }
  /**
   * The top brick in the stack that is being dragged.
   * @type {!eYo.Brick}
   * @private
   */
  this.brick_ = targetBrick.select()

  /**
   * The connections on the dragging bricks that are available to connect to
   * other bricks.  This includes all open connections on the top brick, as well
   * as the last connection on the brick stack.
   * Does not change during a drag.
   * @type {!Array.<!eYo.Magnet>}
   * @private
   */
  this.availableMagnets_ = targetBrick.getMagnets_(false)
  // Also check the last connection on this stack
  var m4t = targetBrick.footMost.foot_m
  if (m4t && m4t != targetBrick.foot_m) {
    this.availableMagnets_.push(m4t)
  }

  /**
   * The connection that would connect to this.target_ if this brick
   * were released immediately.
   * Updated on every mouse move.
   * @type {eYo.Magnet}
   * @private
   */
  this.magnet_ = null

  /**
   * The target magnet that this brick would connect to if released immediately.
   * Updated on every mouse move.
   * @type {eYo.Magnet}
   * @private
   */
  this.target_ = null

  /**
   * The distance between this.target_ and this.magnet_,
   * in board units.
   * Updated on every mouse move.
   * @type {number}
   * @private
   */
  this.distance_ = 0

  /**
   * Whether the brick would be deleted if it were dropped immediately.
   * Updated on every mouse move.
   * @type {boolean}
   * @private
   */
  this.wouldDelete_ = false

  /**
   * Which delete area the mouse pointer is over, if any.
   * One of {@link eYo.Board.DELETE_AREA_TRASH},
   * {@link eYo.Board.DELETE_AREA_TOOLBOX}, or {@link eYo.Board.DELETE_AREA_NONE}.
   * @type {?number}
   * @private
   */
  this.deleteArea_ = null

  /**
   * The location of the top left corner of the dragging brick at the beginning
   * of the drag in board coordinates.
   * @type {!eYo.Where}
   * @private
   */
  this.xyStart_ = this.brick_.xy

  eYo.Selected.magnet = null
  
  if (!eYo.Events.group) {
    eYo.Events.group = true
  }
  this.destination.setResizesEnabled(false)
  this.ui_driver.disconnectStop()
  var healStack = gesture.healStack_
  var b3k = this.brick_
  b3k.ui.dragging = true
  if (b3k.parent ||
      (healStack && b3k.foot_m && b3k.foot_m.target)) {
    b3k.unplug(healStack)
    b3k.moveBy(this.xyDelta)
    b3k.ui.disconnectEffect()
  }
  this.ui_driver.brickDraggerStart(this)
  this.drag()
  return targetBrick
}

/**
 * Get the position of receiver's brick relative to
 * the visible area.
 * Return value: if `x < 0`, left of the visible area,
 * if `x > 0`, right of the visible area, 0 otherwise.
 * eYo.VOID when the brick is not in a board.
 * The same holds for `y`.
 * The values are the signed distances between the center
 * of the brick and the visible area.
 * If the answer is `{x: -15, y: 0}`, we just have to scroll the board
 * 15 units to the right and the brick is visible.
 * For edython.
 * @param {eYo.Brick} brick The new location of the receiver, the actual location when eYo.VOID.
 * @param {?Object} newLoc The new location of the receiver, the actual location when eYo.VOID.
 * @return {{x: number, y: number}|eYo.VOID}
 */
eYo.BrickDragger.prototype.getOffsetFromVisible = function (brick ,newLoc) {
  var ui = brick.ui
  var board = brick.board
  if (!board) {
    return eYo.VOID
  }
  // is the brick in the visible area ?
  var metrics = board.getMetrics()
  if (!metrics) {
    // sometimes eYo.VOID is returned
    console.error("UNDEFINED METRICS, BREAK HERE TO DEBUG")
    return {
      x: 0,
      y: 0
    }
  }
  var scale = board.scale || 1
  var HW = ui.size
  // the brick is in the visible area if we see its center
  var leftBound = metrics.view.x / scale - HW.width / 2
  var topBound = metrics.view.y / scale - HW.height / 2
  var rightBound = (metrics.view.x + metrics.view.width) / scale - HW.width / 2
  var downBound = (metrics.view.y + metrics.view.height) / scale - HW.height / 2
  var xy = newLoc || ui.whereInBoard
  return {
    x: xy.x < leftBound
      ? xy.x - leftBound
      : xy.x > rightBound
        ? xy.x - rightBound
        : 0,
    y: xy.y < topBound
      ? xy.y - topBound
      : xy.y > downBound
        ? xy.y - downBound
        : 0,
  }
}

/**
 * Execute a step of brick dragging, based on the given event.  Update the
 * display accordingly.
 * @param {!eYo.Where} delta How far the pointer has
 *     moved from the position at the start of the drag, in pixel units.
 * @package
 */
eYo.BrickDragger.prototype.drag = function() {
  var xyNew = this.xyNew_
  var b3k = this.brick_
  var d = this.getOffsetFromVisible(b3k, xyNew)
  if (d) {
    xyNew.x -= d.x
    xyNew.y -= d.y
  }
  var bds = this.desk.dom.svg.brickDragSurface
  if (bds) {
    bds.moveTo(xyNew)
  } else {
    this.ui_driver.brickSetOffsetDuringDrag(b3k, xyNew)
  }
  this.brick_.ui.setDeleteStyle(this.wouldDelete_)
  
  this.update()

  var trashcan = this.destination.trashcan
  if (trashcan) {
    trashcan.setOpen_(this.wouldDelete_ && this.deleteArea_ === eYo.Board.DELETE_AREA_TRASH)
  }
}

/**
 * Finish a brick drag and put the brick back on the board.
 * @param {!Event} e The most recent move event.
 * @param {!eYo.Where} delta How far the pointer has
 *     moved from the position at the start of the drag, in pixel units.
 * @package
 */
eYo.BrickDragger.prototype.end = (() => {
  /**
   * Fire a move event at the end of a brick drag.
   * @private
   */
  var fireMoveEvent = self => {
    eYo.Events.fireBrickMove(self.brick_, event => {
      event.oldCoordinate = self.xyStart_
    })
  }
  return function(e, delta) {
    this.drag(delta)
    this.ui_driver.brickDraggerEnd(this)
    var b3k = this.brick_
    if (this.wouldDelete_) {
      if (!this.gesture_.flyout_) {
        fireMoveEvent(this)
      }
      b3k.dispose(false, true)
    } else {
      // These may be expensive and don't need to be done if we're deleting.
      b3k.ui.placeMagnets_()
      b3k.ui.dragging = false
      this.connect()
      b3k.render()
      if (this.gesture_.flyout_) {
        eYo.Events.fireBrickCreate(b3k, true) 
      }
      fireMoveEvent(this)
      b3k.ui.scheduleSnapAndBump()
    }
    var trashcan = this.destination.trashcan
    if (trashcan) {
      goog.Timer.callOnce(trashcan.close, 100, trashcan)
    }
    this.destination.setResizesEnabled(true)

    eYo.Events.group = false
    this.availableMagnets_.length = 0
    this.availableMagnets_ = this.brick_ = this.target_ = this.magnet_ = this.clearGesture()
  }
})()

/**
 * Reset gesture.
 * @package
 */
eYo.BrickDragger.prototype.clearGesture = function() {
  this.gesture_ = null
}

/**
 * Connect to the closest magnet and render the results.
 * This should be called at the end of a drag.
 * @package
 */
eYo.BrickDragger.prototype.connect = function() {
  if (this.target_) {
    // Connect the two magnets
    this.magnet_.connect(this.target_)
    if (this.brick_.rendered) {
      // Trigger a connection animation.
      // Determine which connection is inferior (lower in the source stack).
      var inferiorM4t = this.magnet_.isSuperior ?
          this.target_ : this.magnet_
      inferiorM4t.brick.ui.connectEffect()
      // Bring the just-edited stack to the front.
      this.brick_.root.ui.sendToFront()
    }
    this.target_ && this.target_.ui.removeBrickHilight_()
  }
}

/**
 * Update highlighted connections based on the most recent move location.
 * @package
 */
eYo.BrickDragger.prototype.update = function() {
  var deleteArea = this.deleteArea_ = this.destination.isDeleteArea(this.gesture_)
  var oldTarget = this.target_
  this.target_ = this.magnet_ = null
  this.distance_ = eYo.Board.SNAP_RADIUS
  this.availableMagnets_.forEach(m4t => {
    var neighbour = m4t.closest(this.distance_, this.xyDelta)
    if (neighbour.magnet) {
      this.target_ = neighbour.magnet
      this.magnet_ = m4t
      this.distance_ = neighbour.radius
    }
  })
  if (oldTarget && oldTarget != this.target_) {
    oldTarget.ui.removeBrickHilight_()
  }
  // Prefer connecting over dropping into the trash can, but prefer dragging to
  // the toolbox over connecting to other bricks.
  var wouldConnect = !!this.target_ &&
      deleteArea != eYo.Board.DELETE_AREA_TOOLBOX
  var wouldDelete = !wouldConnect && !!deleteArea && !this.brick_.parent &&
      this.brick_.deletable
  this.wouldDelete_ = wouldDelete

  // Get rid of highlighting so we don't send mixed messages.
  if (wouldDelete && this.target_) {
    this.target_.ui.removeBrickHilight_()
    this.target_ = null
  }
  if (!wouldDelete && this.target_ && oldTarget != this.target_) {
    this.target_.ui.addBrickHilight_()
  }
}
