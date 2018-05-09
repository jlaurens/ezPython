/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License CeCILL-B
 */
/**
 * @fileoverview BlockSvg for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.BlockSvg')

goog.require('eYo.Block')
goog.require('eYo.DelegateSvg')
goog.require('Blockly.BlockSvg')
goog.forwardDeclare('eYo.MenuManager')

eYo.inherits(Blockly.BlockSvg, eYo.Block)

/**
 * Class for a block's SVG representation.
 * Not normally called directly, workspace.newBlock() is preferred.
 * For edython.
 * @param {!Blockly.Workspace} workspace The block's workspace.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @param {string=} optId Optional ID.  Use this ID if provided, otherwise
 *     create a new id.
 * @extends {Blockly.Block}
 * @constructor
 */
eYo.BlockSvg = function (workspace, prototypeName, optId) {
  eYo.BlockSvg.superClass_.constructor.call(this,
    workspace, prototypeName, optId)
}
goog.inherits(eYo.BlockSvg, Blockly.BlockSvg)

/**
 * Initialize the block.
 * Let the delegate do the job.
 * No rendering of that block is done during that process,
 * linked blocks may render though.
 */
eYo.BlockSvg.prototype.init = function() {
  this.eyo.skipRendering = true
  this.eyo.initBlock(this)
  this.eyo.skipRendering = false
}
console.warn('++skipRendering, --skipRendering')
/**
 * Create and initialize the SVG representation of the block.
 * May be called more than once.
 */
eYo.BlockSvg.prototype.initSvg = function() {
  this.eyo.preInitSvg(this)
  eYo.BlockSvg.superClass_.initSvg.call(this)
  this.eyo.postInitSvg(this)
};

/**
 * Returns the named field from a block.
 * When not found using the inherited method,
 * ask the delegate.
 * NB: not all fields belong to an input.
 * @param {string} name The name of the field.
 * @return {Blockly.Field} Named field, or null if field does not exist.
 */
eYo.BlockSvg.prototype.getField = function(name) {
  return eYo.BlockSvg.superClass_.getField.call(this, name) || this.eyo.getField(this, name)
}

eYo.BlockSvg.CORNER_RADIUS = 3

/**
 * Render the block.
 * Lays out and reflows a block based on its contents and settings.
 * @param {boolean=} optBubble If false, just render this block.
 *   If true, also render block's parent, grandparent, etc.  Defaults to true.
 */
eYo.BlockSvg.prototype.render = function (optBubble) {
  if (this.workspace) {
    this.eyo.render(this, optBubble)
  }
}

/**
 * Fetches the named input object.
 * @param {string} name The name of the input.
 * @return {Blockly.Input} The input object, or null if input does not exist.
 */
eYo.BlockSvg.prototype.getInput = function (name) {
  var input = this.eyo.getInput(this, name)
  if (!input) {
    input = eYo.BlockSvg.superClass_.getInput.call(this, name)
  }
  if (input) {
    eYo.Input.setupEyO(input)
  }
  return input
}

/**
 * Select this block.  Highlight it visually.
 * Wrapped blocks are not selectable.
 */
eYo.BlockSvg.prototype.select = function() {
  if (!this.workspace) {
    return
  }
  if (!this.eyo.selectedConnection && this.eyo.wrapped_ && this.getSurroundParent()) {
    // Wrapped blocks should not be selected.
    this.getSurroundParent().select();
    return;
  }
  var more = this.eyo.selectedConnection || this.eyo.selectedConnectionSource_ && this.eyo.selectedConnectionSource_.eyo.selectedConnection
  eYo.BlockSvg.superClass_.select.call(this)
  if (more) {
    if (this.eyo.svgPathHighlight_ && this.eyo.svgPathHighlight_.parentNode) {
      goog.dom.removeNode(this.eyo.svgPathHighlight_)
    }
  } else if (this.eyo.svgPathHighlight_ && !this.eyo.svgPathHighlight_.parentNode) {
    this.svgGroup_.appendChild(this.eyo.svgPathHighlight_)
  }
  if (!this.eyo.canEdit_) {
    var block = this
    setTimeout(function() {
      block.eyo.canEdit_ = true
    }, 10)
  }
}

/**
 * Unselect this block.  
 * If there is a selected connection, it is removed.
 * Unselect is used from click handling methods.
 */
eYo.BlockSvg.prototype.unselect = function() {
  eYo.BlockSvg.superClass_.unselect.call(this)
  this.eyo.canEdit_ = false
  var B = this.eyo.selectedConnectionSource_
  if (B) {
    B.removeSelect()
    B.eyo.selectedConnection = null
    this.eyo.selectedConnectionSource_ = null
  }
  this.removeSelect()
}

/**
 * Select this block.  Highlight it visually.
 * If there is a selected connection, this connection will be highlighted.
 * If the block is wrapped, the first parent which is not wrapped will be
 * selected.
 */
eYo.BlockSvg.prototype.addSelect = function () {
  if (this.eyo.selectedConnection) {
    if (!this.eyo.svgPathConnection_ || this.eyo.svgPathConnection_.parentNode) {
      return
    }
    this.svgGroup_.appendChild(this.eyo.svgPathConnection_)
  } else if (!this.eyo.wrapped_) {
    var hasSelectedConnection = this.eyo.selectedConnectionSource_ && this.eyo.selectedConnectionSource_.eyo.selectedConnection
    if (this.eyo.svgPathHighlight_) {
      if (this.eyo.svgPathHighlight_.parentNode && hasSelectedConnection) {
        goog.dom.removeNode(this.eyo.svgPathHighlight_)
      } else if (!this.eyo.svgPathHighlight_.parentNode && !hasSelectedConnection) {
        this.svgGroup_.appendChild(this.eyo.svgPathHighlight_)
      }
    }
  }
  if (goog.dom.classlist.contains(this.svgGroup_, 'eyo-select')) {
    return
  }
  goog.dom.classlist.add(this.svgGroup_, 'eyo-select')
  // ensure that the svgGroup is the last in the list
  this.bringToFront()
  var e8r = this.eyo.inputEnumerator(this)
  while (e8r.next()) {
    for (var j = 0, field; (field = e8r.here.fieldRow[j++]);) {
      if (goog.isFunction(field.addSelect)) {
        field.addSelect()
      }
    }
  }
}

/**
 * Unselect this block.  Remove its highlighting.
 */
eYo.BlockSvg.prototype.removeSelect = function () {
  if (this.eyo.wrapped_) {
    if (!this.eyo.svgPathConnection_ || !this.eyo.svgPathConnection_.parentNode) {
      return
    }
  } else {
    if ((!this.eyo.svgPathHighlight_ || !this.eyo.svgPathHighlight_.parentNode)
      && (!this.eyo.svgPathConnection_ || !this.eyo.svgPathConnection_.parentNode)) {
        if (this.svgGroup_) { // how come that we must test that?
          Blockly.utils.removeClass(this.svgGroup_, 'eyo-select')
        }
        return
    }
    goog.dom.removeNode(this.eyo.svgPathHighlight_)
  }
  if (this.svgGroup_) {
    Blockly.utils.removeClass(this.svgGroup_, 'eyo-select')
  }
  if (this.eyo.svgPathConnection_ && this.eyo.svgPathConnection_.parentNode) {
    goog.dom.removeNode(this.eyo.svgPathConnection_)
  }
  var B
  if (!this.eyo.selectedConnection || ((B = Blockly.selected) && B.selectedConnectionSource_ != this)) {
    goog.dom.removeNode(this.eyo.svgPathConnection_)
  }
  var e8r = this.eyo.inputEnumerator(this)
  while (e8r.next()) {
    for (var j = 0, field; (field = e8r.here.fieldRow[j++]);) {
      if (goog.isFunction(field.removeSelect)) {
        field.removeSelect()
      }
    }
  }
}

/**
 * Set parent of this block to be a new block or null.
 * Place the highlighting path at the end.
 * @param {Blockly.BlockSvg} newParent New parent block.
 */
eYo.BlockSvg.prototype.setParent = function (newParent) {
  eYo.BlockSvg.superClass_.setParent.call(this, newParent)
  if ((this.eyo.svgPathHighlight_ &&
      this.svgGroup_ === this.eyo.svgPathHighlight_.parentElement) || (this.eyo.svgPathConnection_ &&
        this.svgGroup_ === this.eyo.svgPathConnection_.parentElement)) {
    this.removeSelect()
    this.addSelect()
  } else if (newParent && ((newParent.eyo.svgPathHighlight_ &&
      newParent.svgGroup_ === newParent.eyo.svgPathHighlight_.parentElement) || (newParent.eyo.svgPathConnection_ &&
      newParent.svgGroup_ === newParent.eyo.svgPathConnection_.parentElement))) {
    newParent.removeSelect()
    newParent.addSelect()
  }
}

/**
 * Play some UI effects (sound, ripple) after a connection has been established.
 */
eYo.BlockSvg.prototype.connectionUiEffect = function () {
  if (this.eyo) {
    this.workspace.getAudioManager().play('click')
    if (this.workspace.scale < 1) {
      return // Too small to care about visual effects.
    }
    var xy = this.workspace.getSvgXY(/** @type {!Element} */ (this.svgGroup_))
    if (this.outputConnection) {
      var h = this.height * this.workspace.scale / 2
      var ripple = Blockly.utils.createSvgElement('circle',
        {'class': 'blocklyHighlightedConnectionPathH', 'cx': xy.x, 'cy': xy.y + h, 'r': 2 * h / 3},
        this.workspace.getParentSvg())
    } else {
    // Determine the absolute coordinates of the inferior block.
      var steps = Blockly.Connection.highlightedPath_.attributes['d'].value
      ripple = Blockly.utils.createSvgElement('path',
        {'class': 'blocklyHighlightedConnectionPath',
          'd': steps,
          transform: 'translate(' + xy.x + ',' + xy.y + ') scale(1,2)'},
        this.workspace.getParentSvg())
    }
    // Start the animation.
    eYo.BlockSvg.connectionUiStep_(ripple, new Date(), this.workspace.scale)
    return
  }
  eYo.BlockSvg.superClass_.connectionUiEffect.call(this)
}

/**
 * Expand a ripple around a connection.
 * @param {!Element} ripple Element to animate.
 * @param {!Date} start Date of animation's start.
 * @param {number} workspaceScale Scale of workspace.
 * @private
 */
eYo.BlockSvg.connectionUiStep_ = function (ripple, start, workspaceScale) {
  var ms = new Date() - start
  var percent = ms / 200
  if (percent > 1) {
    goog.dom.removeNode(ripple)
  } else {
    ripple.style.opacity = 8 * Math.pow(percent, 2) * Math.pow(1-percent,2)
    Blockly.BlockSvg.disconnectUiStop_.pid_ = setTimeout(
      eYo.BlockSvg.connectionUiStep_, 10, ripple, start, workspaceScale)
  }
}

/**
 * Returns a bounding box describing the dimensions of this block
 * and any blocks stacked below it.
 * @return {!{height: number, width: number}} Object with height and width
 *    properties in workspace units.
 */
eYo.BlockSvg.prototype.getHeightWidth = function () {
  var height = this.height
  var width = this.width
  // Recursively add size of subsequent blocks.
  var nextBlock = this.getNextBlock()
  if (nextBlock) {
    var nextHeightWidth = nextBlock.getHeightWidth()
    height += nextHeightWidth.height // NO Height of tab.
    width = Math.max(width, nextHeightWidth.width)
  }
  return {height: height, width: width}
}

/**
 * Set whether the block is collapsed or not.
 * By pass Blockly.BlockSvg.prototype.setCollapsed
 * @param {boolean} collapsed True if collapsed.
 */
eYo.BlockSvg.prototype.setCollapsed = function (collapsed) {
  if (this.collapsed_ === collapsed) {
    return
  }
  var renderList = []
  // Show/hide the next statement inputs.
  for (var i = 0, input; (input = this.inputList[i]); i++) {
    renderList.push.apply(renderList, input)
    if (input.type === Blockly.NEXT_STATEMENT) {
      input.setVisible(!collapsed)
    }
  }
  Blockly.BlockSvg.superClass_.setCollapsed.call(this, collapsed)
  if (!renderList.length) {
    // No child blocks, just render this block.
    renderList[0] = this
  }
  if (this.rendered) {
    var block
    for (i = 0; (block = renderList[i]); i++) {
      block.render()
    }
    // Don't bump neighbours.
    // Although bumping neighbours would make sense, users often collapse
    // all their functions and store them next to each other.  Expanding and
    // bumping causes all their definitions to go out of alignment.
  }
}

/**
 * Enable or disable a block. Noop. Disabled blocks start with '#'.
 * @override
 */
eYo.BlockSvg.prototype.updateDisabled = function () {
  this.render()
}

/**
 * Noop. Bypass the inherited method.
 * @override
 */
eYo.BlockSvg.prototype.updateColour = function () {

}

/**
 * Show the context menu for this block.
 * @param {!Event} e Mouse event.
 * @private
 */
eYo.BlockSvg.prototype.showContextMenu_ = function (e) {
  // this part is copied as is from the parent's implementation. Is it relevant ?
  if (this.workspace.options.readOnly || !this.contextMenu) {
    return
  }
  eYo.MenuManager.shared().showMenu(this, e)
}

/**
 * Handle a mouse-down on an SVG block.
 * If the block is sealed to its parent, forwards to the parent.
 * This is used to prevent a dragging operation on a sealed block.
 * However, this will manage the selection of an input connection.
 * onMouseDown_ message is sent multiple times for one mouse click
 * because blocks may lay on above the other (when connected for example)
 * Considering the selection of a connection, we manage the onMouseDown_ calls
 * independantly. Whatever node is answering to a mousDown event,
 * a connection will be activated if relevant.
 * @param {!Event} e Mouse down event or touch start event.
 * @private
 */
// eYo.BlockSvg.prototype.onMouseUp_ = function(e) {
//   console.log('onMouseUp_ YES')
//   eYo.BlockSvg.superClass_.onMouseUp_.call(this, e)
// }

/**
 * Handle a mouse-down on an SVG block.
 * If the block is sealed to its parent, forwards to the parent.
 * This is used to prevent a dragging operation on a sealed block.
 * However, this will manage the selection of an input connection.
 * onMouseDown_ message is sent multiple times for one mouse click
 * because blocks may lay on above the other (when connected for example)
 * Considering the selection of a connection, we manage the onMouseDown_ calls
 * independantly. Whatever node is answering to a mousDown event,
 * a connection will be activated if relevant.
 * @param {!Event} e Mouse down event or touch start event.
 * @private
 */
eYo.BlockSvg.prototype.onMouseDown_ = function(e) {
  if (this.eyo.wrapped_) {
    // mouse down on a wrapped block means dragging
    // but dragging is not allowd for that blocks
    return
  }
  if (this.eyo.locked_) {
    var parent = this.getSurroundParent()
    if (parent) {
      return
    }
  }
  // Next is not good design
  // remove any selected connection, if any
  // but remember it for a contextual menu
  this.eyo.lastSelectedConnection = eYo.SelectedConnection.get()
  eYo.SelectedConnection.set(null)
  this.eyo.selectedConnectionSource_ = null
  // Prepare the mouseUp event for an eventual connection selection
  this.eyo.lastMouseDownEvent = this === Blockly.selected? e: null
  eYo.BlockSvg.superClass_.onMouseDown_.call(this, e)
}

/**
 * The selected connection is used to insert blocks with the keyboard.
 * When a connection is selected, one of the ancestor blocks is also selected.
 * Then, the higlighted path of the source blocks is not the outline of the block
 * but the shape of the connection as it shows when blocks are moved close enough.
 */
eYo.DelegateSvg.prototype.onMouseUp_ = function(block, e) {
  var ee = this.lastMouseDownEvent
  if (ee) {
    // this block was selected when the mouse ow event was sent
    if (ee.clientX === e.clientX && ee.clientY === e.clientY) {
      if (block === Blockly.selected) {
        // if the block was already selected,
        // try to select an input connection
        var c8n = this.getConnectionForEvent(block, e)
        if (c8n) {
          eYo.SelectedConnection.set(c8n)
        } else {
          eYo.SelectedConnection.set(this.lastSelectedConnection)
        }
      }
    } else {
      eYo.SelectedConnection.set(null)
    }
  }
}

/**
 * Dispose of this block.
 * If the block was selected, then something else should be selected.
 * @param {boolean} healStack If true, then try to heal any gap by connecting
 *     the next statement with the previous statement.  Otherwise, dispose of
 *     all children of this block.
 * @param {boolean} animate If true, show a disposal animation and sound.
 * @override
 */
eYo.BlockSvg.prototype.dispose = function(healStack, animate) {
  Blockly.Events.setGroup(true)
  try {
    if (this === Blockly.selected) {
      // this block was selected, select the block below or above before deletion
      var c8n, target
      if (((c8n = this.nextConnection) && (target = c8n.targetBlock())) || ((c8n = this.previousConnection) && (target = c8n.targetBlock()))) {
        target.select()
      } else if ((c8n = this.outputConnection) && (c8n = c8n.targetConnection)) {
        target = c8n.sourceBlock_
        target.select()
        eYo.SelectedConnection.set(c8n)
      }
    }
    eYo.BlockSvg.superClass_.dispose.call(this, healStack, animate)
  } finally {
    Blockly.Events.setGroup(false)
  }
}

/**
 * Move this block to the front of the visible workspace.
 * <g> tags do not respect z-index so SVG renders them in the
 * order that they are in the DOM.  By placing this block first within the
 * block group's <g>, it will render on top of any other blocks.
 * This message is sent from the mouse down event
 * But this event may select the block above
 * (when the connection between the blocks is selected)
 * @package
 * @override
 */
eYo.BlockSvg.prototype.bringToFront = function() {
  if (this === Blockly.selected) {
    eYo.BlockSvg.superClass_.bringToFront.call(this)
  }
}
