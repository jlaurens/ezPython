/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */
/**
 * @fileoverview WorkspaceSvg override.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.WorkspaceSvg')

goog.require('Blockly.WorkspaceSvg')

goog.require('eYo.Do')
goog.require('eYo.Msg')
goog.require('eYo.BlockSvg')
goog.require('eYo.Driver.Svg')
goog.require('eYo.Workspace')
goog.require('goog.dom');
goog.require('eYo.WorkspaceDragger');

eYo.Do.inherits(Blockly.WorkspaceSvg, eYo.Workspace)

/**
 * Obtain a newly created block.
 * Returns a block subclass for EZP blocks.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @param {string=} optId Optional ID.  Use this ID if provided, otherwise
 *     create a new id.
 * @return {!Blockly.BlockSvg|eYo.BlockSvg} The created block.
 * @suppress{accessControls}
 */
Blockly.WorkspaceSvg.prototype.newBlock = function (prototypeName, optId) {
  if (prototypeName && prototypeName.startsWith('eyo:')) {
    return new eYo.BlockSvg(/** Blockly.Workspace */ this, prototypeName, optId)
  } else {
    return new Blockly.BlockSvg(/** Blockly.Workspace */ this, prototypeName, optId)
  }
}

/**
 * Create a driver for rendering.
 * @return {eYo.Driver}
*/
eYo.WorkspaceDelegate.prototype.driverCreate = function () {
  return new eYo.Driver.Svg()
}


goog.provide('eYo.Gesture')

/**
 * Handle a mousedown/touchstart event on a workspace.
 * This is overriden because
 * `Blockly.WorkspaceSvg.prototype.onMouseDown_`
 * cannot.
 * @param {!Event} e A mouse down or touch start event.
 * @param {!Blockly.Workspace} ws The workspace the event hit.
 * @package
 * @suppress{accessControls}
 */
Blockly.Gesture.prototype.handleWsStart = (() => {
  var handleWsStart = Blockly.Gesture.prototype.handleWsStart
  return function (e, ws) {
    if (Blockly.WidgetDiv.DIV.childNodes.length) {
      Blockly.WidgetDiv.hide()
    } else {
      if ((eYo.Selected.eyo)) {
        eYo.Selected.eyo.selectMouseDownEvent = e
      }
      handleWsStart.call(this, e, ws)
    }
  }
}) ()

/**
 * Show the context menu for the workspace.
 * @param {!Event} e Mouse event.
 * @private
 * @suppress{accessControls}
 */
Blockly.WorkspaceSvg.prototype.showContextMenu_ = function (e) {
  if (this.options.readOnly || this.isFlyout) {
    return
  }
  var menuOptions = []
  var topBlocks = this.getTopBlocks(true)
  var eventGroup = Blockly.utils.genUid()
  var ws = this

  // Options to undo/redo previous action.
  var undoOption = {}
  undoOption.text = eYo.Msg.UNDO
  undoOption.enabled = this.undoStack_.length > 0
  undoOption.callback = this.undo.bind(this, false)
  menuOptions.push(undoOption)
  var redoOption = {}
  redoOption.text = eYo.Msg.REDO
  redoOption.enabled = this.redoStack_.length > 0
  redoOption.callback = this.undo.bind(this, true)
  menuOptions.push(redoOption)

  // Option to clean up blocks.
  if (this.scrollbar) {
    var cleanOption = {}
    cleanOption.text = eYo.Msg.CLEAN_UP
    cleanOption.enabled = topBlocks.length > 1
    cleanOption.callback = this.cleanUp.bind(this)
    menuOptions.push(cleanOption)
  }

  // Add a little animation to collapsing and expanding.
  var DELAY = 10
  if (this.options.collapse) {
    var hasCollapsedBlocks = false
    var hasExpandedBlocks = false
    for (var i = 0; i < topBlocks.length; i++) {
      var block = topBlocks[i]
      while (block) {
        if (block.isCollapsed()) {
          hasCollapsedBlocks = true
        } else {
          hasExpandedBlocks = true
        }
        block = block.getNextBlock()
      }
    }

    /**
     * Option to collapse or expand top blocks.
     * @param {boolean} shouldCollapse Whether a block should collapse.
     * @private
     */
    var toggleOption = (shouldCollapse) => {
      var ms = 0
      for (var i = 0; i < topBlocks.length; i++) {
        var block = topBlocks[i]
        while (block) {
          setTimeout(block.setCollapsed.bind(block, shouldCollapse), ms)
          block = block.getNextBlock()
          ms += DELAY
        }
      }
    }

    // Option to collapse top blocks.
    var collapseOption = {enabled: hasExpandedBlocks}
    collapseOption.text = eYo.Msg.COLLAPSE_ALL
    collapseOption.callback = () => {
      toggleOption(true)
    }
    menuOptions.push(collapseOption)

    // Option to expand top blocks.
    var expandOption = {enabled: hasCollapsedBlocks}
    expandOption.text = eYo.Msg.EXPAND_ALL
    expandOption.callback = () => {
      toggleOption(false)
    }
    menuOptions.push(expandOption)
  }

  // Option to delete all blocks.
  // Count the number of blocks that are deletable.
  var deleteList = []
  function addDeletableBlocks (block) {
    if (block.isDeletable()) {
      deleteList = deleteList.concat(block.eyo.getWrappedDescendants())
    } else {
      var children = block.getChildren()
      for (var i = 0; i < children.length; i++) {
        addDeletableBlocks(children[i])
      }
    }
  }
  for (i = 0; i < topBlocks.length; i++) {
    addDeletableBlocks(topBlocks[i])
  }

  function deleteNext () {
    Blockly.Events.setGroup(eventGroup)
    var block = deleteList.shift()
    if (block) {
      if (block.workspace) {
        block.dispose(false, true)
        setTimeout(deleteNext, DELAY)
      } else {
        deleteNext()
      }
    }
  }

  var deleteOption = {
    text: deleteList.length === 1 ? eYo.Msg.DELETE_BLOCK
      : eYo.Msg.DELETE_X_BLOCKS.replace('{0}', String(deleteList.length)),
    enabled: deleteList.length > 0,
    callback: function () {
      if (ws.currentGesture_) {
        ws.currentGesture_.cancel()
      }
      if (deleteList.length < 2) {
        deleteNext()
      } else {
        Blockly.confirm(eYo.Msg.DELETE_ALL_BLOCKS
          .replace('%1', deleteList.length),
        function (ok) {
          if (ok) {
            deleteNext()
          }
        })
      }
    }
  }
  menuOptions.push(deleteOption)

  Blockly.ContextMenu.show(e, menuOptions, this.RTL)
}

/**
 * Paste the provided block onto the workspace.
 * Take into account the selected connection if any.
 * @param {!Element} xmlBlock XML block element.
 * @override
 * @suppress {accessControls}
 */
Blockly.WorkspaceSvg.prototype.paste = function (xmlBlock) {
  if (!this.rendered || xmlBlock.getElementsByTagName('block').length >=
      this.remainingCapacity()) {
    return
  }
  if (this.currentGesture_) {
    this.currentGesture_.cancel() // Dragging while pasting?  No.
  }
  var magnet, t_magnet, block
  if ((magnet = eYo.Selected.magnet)) {
    eYo.Events.groupWrap(
      () => {
        block = Blockly.Xml.domToBlock(xmlBlock, this)
        var eyo = block.eyo
        if (eyo) {
          if (magnet.isInput) {
            t_magnet = eyo.magnets.out
          } else if (magnet.isBottom || magnet.isSuite) {
            t_magnet = eyo.magnets.high
          } else if (magnet.isTop) {
            t_magnet = eyo.magnets.low
          } else if (magnet.isLeft) {
            t_magnet = eyo.magnets.right
          } else if (magnet.isRight) {
            t_magnet = eyo.magnets.left
          }
          if (t_magnet && magnet.checkType_(t_magnet)) {
            if (magnet.isTop) {
              // the pasted block must move before it is connected
              // otherwise the newly created block will attract the old one
              // resulting in a move of the existing connection
              // 1) get the location of c8n in the workspace
              var xy = magnet.offsetInBlock_.clone()
              var xy_block = magnet.b_eyo.ui.xyInSurface
              xy.translate(xy_block.x, xy_block.y)
              // This is where the targetC8n should be once the
              // connection has been made
              var xyxy = t_magnet.offsetInBlock_.clone()
              xy_block = t_magnet.b_eyo.ui.xyInSurface
              xyxy.translate(xy_block.x, xy_block.y)
              // This is where the targetC8n is
              xyxy.scale(-1)
              xy.translate(xyxy.x, xyxy.y)
              t_magnet.b_eyo.moveBy(xy.x, xy.y)
            }
            magnet.connect(t_magnet)
            if (magnet.isTop) {
              t_magnet = eyo.magnets.low
            }
            eYo.Selected.eyo = eyo
          }
        }
      }
    )
    return
  }
  eYo.Events.groupWrap(
    () => {
      block = Blockly.Xml.domToBlock(xmlBlock, this)
      if ((eyo = block.eyo)) {
        // Move the duplicate to original position.
        var blockX = parseInt(xmlBlock.getAttribute('x'), 10)
        var blockY = parseInt(xmlBlock.getAttribute('y'), 10)
        if (!isNaN(blockX) && !isNaN(blockY)) {
          if (this.RTL) {
            blockX = -blockX
          }
          // Offset block until not clobbering another block and not in connection
          // distance with neighbouring blocks.
          var allBlocks = this.getAllBlocks()
          var avoidCollision = () => {
            do {
              var collide = allBlocks.some(b => {
                var xy = b.eyo.ui.xyInSurface
                if (Math.abs(blockX - xy.x) <= 10 &&
                    Math.abs(blockY - xy.y) <= 10) {
                  return true
                }
              }) || block.getConnections_(false).some(c8n => {
                  var neighbour = c8n.closest(Blockly.SNAP_RADIUS,
                    new goog.math.Coordinate(blockX, blockY))
                  if (neighbour.connection) {
                    return true
                  }
              })
              if (collide) {
                blockX += Blockly.SNAP_RADIUS
                blockY += Blockly.SNAP_RADIUS * 2
              }
            } while (collide)
          }
          avoidCollision()
          // is the block in the visible area ?
          var metrics = this.getMetrics()
          var scale = this.scale || 1
          var heightWidth = eyo.ui.getHeightWidth()
          // the block is in the visible area if we see its center
          var leftBound = metrics.viewLeft / scale - heightWidth.width / 2
          var topBound = metrics.viewTop / scale - heightWidth.height / 2
          var rightBound = (metrics.viewLeft + metrics.viewWidth) / scale - heightWidth.width / 2
          var downBound = (metrics.viewTop + metrics.viewHeight) / scale - heightWidth.height / 2
          var inVisibleArea = () => {
            return blockX >= leftBound && blockX <= rightBound &&
            blockY >= topBound && blockY <= downBound
          }
          if (!inVisibleArea()) {
            blockX = (metrics.viewLeft + metrics.viewWidth / 2) / scale - heightWidth.width / 2
            blockY = (metrics.viewTop + metrics.viewHeight / 2) / scale - heightWidth.height / 2
            avoidCollision()
          }
          eyo.ui.moveBy(blockX, blockY)
        }
        eYo.Selected.eyo = eyo
        eYo.Selected.scrollToVisible()
      }
    }
  )
}
/**
 * If enabled, resize the parts of the workspace that change when the workspace
 * contents (e.g. block positions) change.  This will also scroll the
 * workspace contents if needed.
 * @package
 */
Blockly.WorkspaceSvg.prototype.resizeContents = (() => {
  var resizeContents = Blockly.WorkspaceSvg.prototype.resizeContents
  return function () {
    this.eyo.selected = eYo.Selected.eyo && eYo.Selected.eyo.inVisibleArea() && eYo.Selected.eyo
    try {
      resizeContents.call(this)
    } finally {
      this.eyo.selected = null
    }
  }
})()

/**
 * Tidy up the nodes.
 * @param {?Object} kvargs  key value arguments
 */
eYo.WorkspaceDelegate.prototype.tidyUp = function (kvargs) {
  // x + y < O / x + y > 0
  var x_plus_y = (l, r) => {
    var dx = r.xy.x - l.xy.x
    var dy = r.xy.y - l.xy.y
    return dx + dy
  }
  // x - y < O \ x - y > 0
  var x_minus_y = (l, r) => {
    var dx = r.xy.x - l.xy.x
    var dy = r.xy.y - l.xy.y
    return dx - dy
  }
  var lowest = (tops, helper, x) => {
    var leaf
    var distance = Infinity
    tops.forEach(top => {
      var candidate = helper(top, x)
      if (candidate < distance) {
        distance = candidate
        leaf = top
      }
    })
    return {leaf, distance}
  }
  var topleft = (tops) => {
    return lowest(tops, (top) => top.xy.x + top.xy.y)
  }
  var topright = (tops) => {
    return lowest(tops, (top) => top.xy.y - top.xy.x)
  }
  var tops = this.workspace_.highBlocks_.filter(block => {
    return {
      block,
      xy: block.eyo.ui.xyInSurface
    }
  })
  var ordered = {}
  var distances = []
  while (tops.length) {
    var tl = topleft(tops)
    if (tl.leaf) {
      distances.push(tl.distance)
      var l = ordered[tl.distance]
      if (l) {
        l.push(tl.leaf)
      } else {
        ordered[tl.distance] = [tl.leaf]
      }
    }
    tops.splice(tops.indexOf(tl), 1)
  }
  distances.forEach(d => {
    var l = ordered[d]
    var ll = []
    while (l.length) {
      var tr = topright(l)
      ll.push(tr.leaf)
      l.splice(l.indexOf(tl), 1)
    }
    ordered[d] = ll
  })
  tops = [].concat(...distances.map(d => ordered[d]))
  
  var order = (l, r) => {
    var dx = r.xy.x - l.xy.x
    var dy = r.xy.y - l.xy.y
    if (dy > dx) { // bottom left
      if (dy > -dx) { // bottom
        return 'b'
      } else { // left
        return 'l'
      }
    } else { // top right
      if (dy > -dx) { // right
        return 'r'
      } else { // top
        return 't'
      }
    }
  }
  var insert = (start, leaf) => {
    var o = order(start, leaf)
    if (o === 'l') {
      if (start.l) {

      }
    }
  }
}

/**
 * Scroll the workspace to center on the given block.
 * @param {?string} id ID of block center on.
 * @public
 */
eYo.WorkspaceDelegate.prototype.scrollBlockTopLeft = function(id) {
  if (!this.workspace_.scrollbar) {
    console.warn('Tried to scroll a non-scrollable workspace.');
    return;
  }
  var block = this.workspace_.getBlockById(id);
  if (!block) {
    return;
  }
  var eyo = block.eyo
  if (!eyo.isStmt) {
    (eyo = (eyo.stmtParent || eyo.root)) && (block = eyo.block_)
  }
  // XY is in workspace coordinates.
  var xy = block.eyo.ui.xyInSurface;
  
  // Find the top left of the block in workspace units.
  var y = xy.y - eYo.Unit.y / 2

  // In RTL the block's position is the top right of the block, not top left.
  var x = xy.x - eYo.Unit.x / 2 - block.eyo.depth * eYo.Font.tabWidth

  // Workspace scale, used to convert from workspace coordinates to pixels.
  var scale = this.workspace_.scale;

  // Center in pixels.  0, 0 is at the workspace origin.  These numbers may
  // be negative.
  var pixelX = x * scale;
  var pixelY = y * scale;

  var metrics = this.workspace_.getMetrics();

  // Scrolling to here will put the block in the top-left corner of the
  // visible workspace.
  var scrollX = pixelX - metrics.contentLeft;
  var scrollY = pixelY - metrics.contentTop;

  Blockly.hideChaff();
  this.workspace_.scrollbar.set(scrollX, scrollY);
};

/**
 * Recalculate a horizontal scrollbar's location on the screen and path length.
 * This should be called when the layout or size of the window has changed.
 * Edython: position and resize according to the position of the flyout.
 * @param {!Object} hostMetrics A data structure describing all the
 *     required dimensions, possibly fetched from the host object.
 */
Blockly.Scrollbar.prototype.resizeViewHorizontal = function(hostMetrics) {
  var workspace = this.workspace_
  var flyout = workspace.eyo.flyout_
  if (flyout) {
    var atRight = flyout.toolboxPosition_ === Blockly.TOOLBOX_AT_RIGHT
    var xy = flyout.eyo.flyoutPosition
  }
  if (atRight && xy) {
    var viewSize = xy.x - hostMetrics.absoluteLeft - 1
  } else {
    viewSize = hostMetrics.viewWidth - 1
  }
  if (this.pair_) {
    // Shorten the scrollbar to make room for the corner square.
    viewSize -= Blockly.Scrollbar.scrollbarThickness;
  }
  this.setScrollViewSize_(Math.max(0, viewSize));

  var xCoordinate = hostMetrics.absoluteLeft + 0.5;
  if (this.pair_ && this.workspace_.RTL) {
    xCoordinate += Blockly.Scrollbar.scrollbarThickness;
  }

  // Horizontal toolbar should always be just above the bottom of the workspace.
  var yCoordinate = hostMetrics.absoluteTop + hostMetrics.viewHeight -
      Blockly.Scrollbar.scrollbarThickness - 0.5;
  this.setPosition_(xCoordinate, yCoordinate);

  // If the view has been resized, a content resize will also be necessary.  The
  // reverse is not true.
  this.resizeContentHorizontal(hostMetrics);
};

/**
 * Recalculate a vertical scrollbar's location on the screen and path length.
 * This should be called when the layout or size of the window has changed.
 * Edython: position and resize according to the position of the flyout.
 * @param {!Object} hostMetrics A data structure describing all the
 *     required dimensions, possibly fetched from the host object.
 */
Blockly.Scrollbar.prototype.resizeViewVertical = function(hostMetrics) {
  var viewSize = hostMetrics.viewHeight - 1;
  if (this.pair_) {
    // Shorten the scrollbar to make room for the corner square.
    viewSize -= Blockly.Scrollbar.scrollbarThickness;
  }

  var workspace = this.workspace_
  var flyout = workspace.eyo.flyout_
  if (flyout) {
    var atRight = flyout.toolboxPosition_ === Blockly.TOOLBOX_AT_RIGHT
  }
  if (atRight) {
    var xy = flyout.eyo.flyoutPosition
    var yOffset = flyout.eyo.TOP_OFFSET
  } else {
    yOffset = 1 * eYo.Unit.rem
  }
  viewSize -= yOffset
  this.setScrollViewSize_(Math.max(0, viewSize));

  if (xy) {
    var xCoordinate = xy.x - hostMetrics.absoluteLeft -     Blockly.Scrollbar.scrollbarThickness - 0.5
  } else {
    xCoordinate = hostMetrics.absoluteLeft + 0.5;
    if (!this.workspace_.RTL) {
      xCoordinate += hostMetrics.viewWidth -
          Blockly.Scrollbar.scrollbarThickness - 1;
    }
  }
  var yCoordinate = hostMetrics.absoluteTop + 0.5;
  yCoordinate += yOffset
  this.setPosition_(xCoordinate, yCoordinate);

  // If the view has been resized, a content resize will also be necessary.  The
  // reverse is not true.
  this.resizeContentVertical(hostMetrics);
};

/**
 * Move the trash can to the bottom-right corner.
 */
Blockly.Trashcan.prototype.position = function() {
  var metrics = this.workspace_.getMetrics();
  if (!metrics) {
    // There are no metrics available (workspace is probably not visible).
    return;
  }
  this.left_ = metrics.viewWidth + metrics.absoluteLeft -
      this.WIDTH_ - this.MARGIN_SIDE_ - Blockly.Scrollbar.scrollbarThickness;

  if (metrics.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT) {
    var flyoutPosition = this.workspace_.eyo.flyout_.eyo.flyoutPosition
    if (flyoutPosition) {
      this.left_ = flyoutPosition.x -
      this.WIDTH_ - this.MARGIN_SIDE_ - Blockly.Scrollbar.scrollbarThickness  
    } else {
      this.left_ -= metrics.flyoutWidth
    }
  }
  this.high_ = metrics.viewHeight + metrics.absoluteTop -
      (this.BODY_HEIGHT_ + this.LID_HEIGHT_) - this.low_;

  if (metrics.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM) {
    this.high_ -= metrics.flyoutHeight;
  }
  this.svgGroup_.setAttribute('transform',
      'translate(' + this.left_ + ',' + this.high_ + ')');
};

/**
 * CHANGE: Does not assume that all the top blocks have a UI.
 * Calculate the bounding box for the blocks on the workspace.
 * Coordinate system: workspace coordinates.
 *
 * @return {Object} Contains the position and size of the bounding box
 *   containing the blocks on the workspace.
 */
Blockly.WorkspaceSvg.prototype.getBlocksBoundingBox = function() {
  var topBlocks = this.getTopBlocks(false);
  // Initialize boundary using the first rendered block, if any.
  var i = 0
  while (i < topBlocks.length) {
    var b = topBlocks[i]
    if (b.rendered) {
      var bound = b.getBoundingRectangle()
      while (++i < topBlocks.length) {
        var b = topBlocks[i]
        if (b.rendered) {
          var blockBoundary = b.getBoundingRectangle()
          if (blockBoundary.highLeft.x < bound.highLeft.x) {
            bound.highLeft.x = blockBoundary.highLeft.x
          }
          if (blockBoundary.lowRight.x > bound.lowRight.x) {
            bound.lowRight.x = blockBoundary.lowRight.x
          }
          if (blockBoundary.highLeft.y < bound.highLeft.y) {
            bound.highLeft.y = blockBoundary.highLeft.y
          }
          if (blockBoundary.lowRight.y > bound.lowRight.y) {
            bound.lowRight.y = blockBoundary.lowRight.y
          }
        }
      }
      return {
        x: bound.highLeft.x,
        y: bound.highLeft.y,
        width: bound.lowRight.x - bound.highLeft.x,
        height: bound.lowRight.y - bound.highLeft.y
      }
    }
    ++i
  }
  // There are no rendered blocks, return empty rectangle.
  return {x: 0, y: 0, width: 0, height: 0}
}
