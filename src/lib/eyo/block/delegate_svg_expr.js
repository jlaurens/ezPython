/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */
/**
 * @fileoverview BlockSvg delegates for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.DelegateSvg.Expr')

goog.require('eYo.Msg')
goog.require('eYo.Decorate')
goog.require('eYo.DelegateSvg')
goog.require('eYo.T3.All')
goog.require('goog.dom');

/**
 * Class for a DelegateSvg, value block.
 * Not normally called directly, eYo.DelegateSvg.create(...) is preferred.
 * For edython.
 */
eYo.DelegateSvg.makeSubclass('Expr')

// Default delegate for all expression blocks
eYo.Delegate.Manager.registerAll(eYo.T3.Expr, eYo.DelegateSvg.Expr, true)

Object.defineProperties(eYo.DelegateSvg.Expr.prototype, {
  depth: {
    get () {
      var stmt = this.stmtParent
      return (stmt && stmt.depth) || 0
    }
  }
})

/**
 * Increment the change count.
 * For expressions, the change count is also forwarded to the parent.
 * For edython.
 * @param {*} deep  Whether to propagate the message to children.
 */
eYo.DelegateSvg.Expr.prototype.incrementChangeCount = function (deep) {
  eYo.DelegateSvg.Expr.superClass_.incrementChangeCount.call(this, deep)
  var parent = this.block_.parentBlock_
  parent && parent.eyo.incrementChangeCount()
}

/**
 * getType.
 * The default implementation just returns the raw type.
 * Subclassers will override getModifier and getBaseType.
 * This should be used instead of direct block querying.
 * @return {String} The type of the receiver's block.
 */
eYo.DelegateSvg.Expr.prototype.getType = eYo.Decorate.onChangeCount(
  'getType',
  function () {
    return {
      ans: this.getBaseType()
    }
  }
)

/**
 * Whether the receiver's block is of the given type.
 * Blocks may have different types (eg identifier and dotted_name).
 * This is recorded in the output connection.
 * @param {!String} type
 * @return {Boolean}
 */
eYo.DelegateSvg.Expr.prototype.checkOutputType = function (type) {
  var c8n = this.block_.outputConnection
  if (c8n.check_) {
    if (goog.isArray(type)) {
      for (var i = 0; (i < type.length); ++i) {
        if (c8n.check_.indexOf(type[i]) >= 0) {
          return true
        }
      }
    } else {
      return c8n.check_.indexOf(type) >= 0
    }  
  } else {
    return true
  }
}

/**
 * Initialize a block.
 * @param {!Blockly.Block} block to be initialized..
 * @extends {Blockly.Block}
 * @constructor
 */
eYo.DelegateSvg.Expr.prototype.postInitSvg = function () {
  eYo.DelegateSvg.Expr.superClass_.postInitSvg.call(this)
  var block = this.block_
  goog.asserts.assert(this.svgPathContour_, 'Missing svgPathContour_')
  goog.dom.classlist.add(this.svgShapeGroup_, 'eyo-expr')
  goog.dom.classlist.add(this.svgContourGroup_, 'eyo-expr')
  goog.dom.classlist.add(block.svgGroup_, 'eyo-top')
}

/**
 * The contour of the receiver is below the parent's one.
 */
eYo.DelegateSvg.prototype.contourAboveParent = false


eYo.DelegateSvg.Expr.prototype.shapePathDef_ =
  eYo.DelegateSvg.Expr.prototype.contourPathDef_ =
    eYo.DelegateSvg.Expr.prototype.hilightPathDef_ =
      eYo.DelegateSvg.Expr.prototype.valuePathDef_

/**
 * Render one input of value block.
 * @param io
 * @private
 */
eYo.DelegateSvg.Expr.prototype.renderDrawInput_ = function (io) {
  return this.renderDrawValueInput_(io)
}

/**
 * Render the leading # character for collapsed statement blocks.
 * Statement subclasses must override it.
 * @param io
 * @private
 */
eYo.DelegateSvg.Expr.prototype.renderDrawSharp_ = function (io) {
}

/**
 * Can remove and bypass the parent?
 * If the parent's output connection is connected,
 * can connect the block's output connection to it?
 * The connection cannot always establish.
 * @param {!Block} block
* @param {!Block} other the block to be replaced
  */
eYo.DelegateSvg.Expr.prototype.canReplaceBlock = function (other) {
  if (other) {
    var c8n = other.outputConnection
    if (!c8n) {
      return true
    }
    c8n = c8n.targetConnection
    if (!c8n || c8n.checkType_(this.block_.outputConnection)) {
      // the parent block has an output connection that can connect to the block's one
      return true
    }
  }
  return false
}

/**
 * Remove and bypass the other block.
 * If the parent's output connection is connected,
 * connects the block's output connection to it.
 * The connection cannot always establish.
 * @param {!Blockly.Block} other
 */
eYo.DelegateSvg.Expr.prototype.replaceBlock = function (other) {
  if (this.workspace && other && other.workspace) {
    eYo.Events.groupWrap(() => {
      eYo.Do.tryFinally(() => {
        console.log('**** replaceBlock', this.block_, other)
        var c8n = other.outputConnection
        var its_xy = other.getRelativeToSurfaceXY()
        var my_xy = this.block_.getRelativeToSurfaceXY()
        this.outputConnection.disconnect()
        if (c8n && (c8n = c8n.targetConnection) && c8n.checkType_(this.outputConnection)) {
          // the other block has an output connection that can connect to the block's one
          var b_eyo = c8n.eyo.b_eyo
          var selected = b_eyo.hasSelect()
          // next operations may unselect the block
          var old = b_eyo.consolidating_
          c8n.connect(this.outputConnection)
          b_eyo.consolidating_ = old
          if (selected) {
            b_eyo.select()
          }
        } else {
          this.block_.moveBy(its_xy.x - my_xy.x, its_xy.y - my_xy.y)
        }
      })
    })
  }
}

/**
 * Will draw the block. Default implementation does nothing.
 * The print statement needs some preparation before drawing.
 * @private
 */
eYo.DelegateSvg.Expr.prototype.willRender_ = function (recorder) {
  eYo.DelegateSvg.Expr.superClass_.willRender_.call(this, recorder)
  var field = this.fields.await
  if (field) {
    field.setVisible(this.await_)
  }
}

/**
 * Whether the block can have an 'await' prefix.
 * Only blocks that are top block or that are directy inside function definitions
 * are awaitable
 * @param {!Blockly.Block} block The block owning the receiver.
 * @return yes or no
 */
eYo.DelegateSvg.Expr.prototype.awaitable = function () {
  if (!this.fields.await) {
    return false
  }
  var parent = this.block_.getParent()
  if (!parent) {
    return true
  }
  do {
    if (parent.type === eYo.T3.Stmt.funcdef_part) {
      return !!parent.eyo.async_
    }
  } while ((parent = parent.getParent()))
  return false
}

/**
 * Populate the context menu for the given block.
 * @param {!eYo.MenuManager} mgr mgr.menu is the menu to populate.
 * @private
 */
eYo.DelegateSvg.Expr.prototype.populateContextMenuFirst_ = function (mgr) {
  var yorn = eYo.DelegateSvg.Expr.superClass_.populateContextMenuFirst_.call(this, mgr)
  if (this.await_ || (this.awaitable && this.awaitable())) {
    var content = goog.dom.createDom(goog.dom.TagName.SPAN, null,
      eYo.Do.createSPAN('await', 'eyo-code-reserved'),
      goog.dom.createTextNode(' ' + eYo.Msg.AT_THE_LEFT)
    )
    if (this.await_) {
      mgr.shouldSeparateRemove()
      mgr.addRemoveChild(mgr.newMenuItem(content, () => {
        this.await_p = false
      }))
    } else {
      mgr.shouldSeparateInsert()
      mgr.addInsertChild(mgr.newMenuItem(content, () => {
        this.await_p = true
      }))
    }
  }
  return yorn
}

/**
 * Insert a parent.
 * If the block's output connection is connected,
 * connects the parent's output to it.
 * The connection cannot always establish.
 * The holes are filled when fill_holes is true.
 * @param {!Block} block
 * @param {Object} model
 * @param {boolean} fill_holes whether holes should be filled
 * @return the created block
 */
eYo.DelegateSvg.Expr.prototype.insertParentWithModel = function (model, fill_holes) {
  var block = this.block_
  var parentSlotName = model.slot || model.input
  var parentBlock
  eYo.Events.disableWrap(() => {
    parentBlock = eYo.DelegateSvg.newBlockReady(block, model)
  })
  if (!parentBlock) {
    return parentBlock
  }
  if (model.slot) {
    // start by the slots
    var slot = parentBlock.eyo.slots[model.slot]
    var parentInput = slot && slot.input
    goog.asserts.assert(parentInput, 'No input named ' + model.slot)
    var parentInputC8n = parentInput.connection
    goog.asserts.assert(parentInputC8n, 'Unexpected dummy input ' + model.slot+ ' in ' + parentBlock.type)
  } else if ((parentInput = parentBlock.eyo.getInput(eYo.Key.LIST, true))) {
    var list = parentInput.eyo.target
    goog.asserts.assert(list, 'Missing list block inside ' + block.type)
    // the list has many potential inputs,
    // none of them is actually connected because this is very fresh
    // get the middle input.
    parentInput = list.getInput(eYo.Do.Name.middle_name)
    parentInputC8n = parentInput.connection
    goog.asserts.assert(parentInputC8n, 'Unexpected dummy input ' + parentSlotName)
  } else {
    // find the first parent's connection that can accept block
    var findC8n = (B) => {
      var foundC8n, target
      B.eyo.someInput(input => {
        var c8n = input.connection
        if (c8n) {
          var candidate
          if (c8n.checkType_(block.outputConnection) && (!c8n.eyo.bindField || !c8n.eyo.bindField.getText().length)) {
            candidate = c8n
          } else if ((target = c8n.targetBlock())) {
            candidate = findC8n(target)
          }
          if (candidate) {
            if (candidate.eyo.name === parentSlotName) {
              foundC8n = candidate
              return input
            }
            if (!foundC8n) {
              foundC8n = candidate
            }
          }
        }
      })
      return foundC8n
    }
    parentInputC8n = findC8n(parentBlock)
  }
  // Next connections should be connected
  var outputC8n = block.outputConnection
  if (parentInputC8n && parentInputC8n.checkType_(outputC8n)) {
    eYo.Events.groupWrap(
      () => { // `this` is catched
        eYo.Events.fireBlockCreate(parentBlock)
        var targetC8n = parentInputC8n.targetConnection
        if (targetC8n/* && targetC8n.isConnected() */) {
          console.log('input already connected, disconnect and dispose target')
          var B = targetC8n.sourceBlock_
          targetC8n.disconnect()
          B.dispose(true)
          B = undefined
          targetC8n = undefined
        }
        // the old parent connection
        targetC8n = outputC8n.targetConnection
        var bumper
        if (targetC8n) {
          if (parentBlock.outputConnection && targetC8n.checkType_(parentBlock.outputConnection)) {
            // do not disconnect here because it causes a consolidation
            // and a connection mangling
            targetC8n.connect(parentBlock.outputConnection)
          } else {
            targetC8n.disconnect()
            bumper = targetC8n.sourceBlock_
            var its_xy = bumper.getRelativeToSurfaceXY()
            var my_xy = parentBlock.getRelativeToSurfaceXY()
            parentBlock.moveBy(its_xy.x - my_xy.x, its_xy.y - my_xy.y)
          }
          targetC8n = undefined
        } else {
          its_xy = block.getRelativeToSurfaceXY()
          my_xy = parentBlock.getRelativeToSurfaceXY()
          parentBlock.moveBy(its_xy.x - my_xy.x, its_xy.y - my_xy.y)
        }
        parentInputC8n.connect(outputC8n)
        if (fill_holes) {
          var holes = eYo.HoleFiller.getDeepHoles(parentBlock)
          eYo.HoleFiller.fillDeepHoles(parentBlock.workspace, holes)
        }
        parentBlock.render()
        if (bumper) {
          bumper.bumpNeighbours_()
        }  
      }
    )
  } else {
    parentBlock.dispose(true)
    parentBlock = undefined
  }
  return parentBlock
}

/**
 * Do not call this method, except when overriding.
 * This methods is a state mutator.
 * At return type, the block is in a consistent state.
 * All the connections and components are consolidated.
 * Sends a `consolidate` message to each component of the block.
 * However, there might be some caveats related to undo management.
 * @param {!Boolean} deep
 * @param {!Boolean} force
 * @return {Boolean} true when consolidation occurred, false otherwise
 */
eYo.DelegateSvg.Expr.prototype.doConsolidate = function (deep, force) {
  if (eYo.DelegateSvg.Expr.superClass_.doConsolidate.call(this, deep, force)) {
    var parent = this.block_.getParent()
    return (parent && parent.eyo.consolidate()) || true  
  }
}

/**
 * Class for a DelegateSvg, proper_slice block.
 * Not normally called directly, eYo.DelegateSvg.create(...) is preferred.
 * For edython.
 */
eYo.DelegateSvg.Expr.makeSubclass('proper_slice', {
  data: {
    variant: {
      all: [
        eYo.Key.NONE,
        eYo.Key.STRIDE
      ],
      init: eYo.Key.NONE,
      validate: true,
      didChange: /** @suppress {globalThis} */ function (oldValue, newValue) {
        this.didChange(oldValue, newValue)
        var d = this.owner.stride_d
        d.required = newValue === eYo.Key.STRIDE
        d.setIncog()
      },
      xml: false
    },
    lower_bound: {
      init: '',
      synchronize: true,
      placeholder: 'min',
      python: /** @suppress {globalThis} */ function () {
        return this.get()
      }
    },
    upper_bound: {
      init: '',
      synchronize: true,
      placeholder: 'end',
      python: /** @suppress {globalThis} */ function () {
        return this.get()
      }
    },
    stride: {
      init: '',
      synchronize: true,
      placeholder: 'step',
      python: /** @suppress {globalThis} */ function () {
        return this.get()
      },
      xml: {
        save: /** @suppress {globalThis} */ function (element, opt) {
          if (this.owner.variant_p === eYo.Key.STRIDE) {
            this.save(element, opt)
          }
        }
      },
      didLoad: /** @suppress {globalThis} */ function () {
        if (this.isRequiredFromSaved()) {
          this.owner.variant_p = eYo.Key.STRIDE
        }
      }
    }
  },
  slots: {
    lower_bound: {
      order: 1,
      fields: {
        end: ':',
        bind: {
          endEditing: true,
          canEmpty: true
        }
      },
      check: eYo.T3.Expr.Check.expression,
      optional: true,
      hole_value: 'min'
    },
    upper_bound: {
      order: 2,
      fields: {
        bind: {
          endEditing: true,
          canEmpty: true
        }
      },
      check: eYo.T3.Expr.Check.expression,
      optional: true,
      hole_value: 'end'
    },
    stride: {
      order: 3,
      fields: {
        start: ':',
        bind: {
          endEditing: true,
          canEmpty: true
        }
      },
      check: eYo.T3.Expr.Check.expression,
      optional: true,
      hole_value: 'stride',
      didLoad: /** @suppress {globalThis} */ function () {
        if (this.isRequiredFromSaved()) {
          this.owner.variant_p = eYo.Key.STRIDE
        }
      }
    }
  }
}, true)

/**
 * Class for a DelegateSvg, conditional_expression block.
 * Not normally called directly, eYo.DelegateSvg.create(...) is preferred.
 * For edython.
 */
eYo.DelegateSvg.Expr.makeSubclass('conditional_expression', {
  slots: {
    expression: {
      order: 1,
      check: eYo.T3.Expr.Check.or_test_all,
      hole_value: 'name'
    },
    if: {
      order: 2,
      fields: {
        label: 'if'
      },
      check: eYo.T3.Expr.Check.or_test_all,
      hole_value: 'condition'
    },
    else: {
      order: 3,
      fields: {
        label: 'else'
      },
      check: eYo.T3.Expr.Check.expression,
      hole_value: 'alternate'
    }
  }
}, true)

/**
 * Class for a DelegateSvg, builtin object.
 * For edython.
 */
eYo.DelegateSvg.Expr.makeSubclass('builtin__object', {
  data: {
    value: {
      all: ['True', 'False', 'None', 'Ellipsis', '...', 'NotImplemented'],
      synchronize: true
    }
  },
  fields: {
    value: {
      css: 'reserved'
    }
  }
}, true)

/**
 * Populate the context menu for the given block.
 * @param {!Blockly.Block} block The block.
 * @param {!eYo.MenuManager} mgr mgr.menu is the menu to populate.
 * @private
 */
eYo.DelegateSvg.Expr.builtin__object.prototype.populateContextMenuFirst_ = function (mgr) {
  var block = this.block_
  mgr.populateProperties(block, 'value')
  mgr.shouldSeparateInsert()
  eYo.DelegateSvg.Expr.builtin__object.superClass_.populateContextMenuFirst_.call(this, mgr)
  return true
}

/**
 * Get the content for the menu item.
 * @param {!Blockly.Block} block The block.
 * @param {string} op op is the operator
 * @private
 */
eYo.DelegateSvg.Expr.builtin__object.prototype.makeTitle = function (op) {
  return eYo.Do.createSPAN(op, 'eyo-code-reserved')
}

/**
 * Class for a DelegateSvg, any object.
 * For edython.
 */
eYo.DelegateSvg.Expr.makeSubclass('any', {
  data: {
    expression: {
      init: '',
      placeholder: eYo.Msg.Placeholder.EXPRESSION,
      synchronize: true
    }
  },
  fields: {
    expression: {
      endEditing: true
    }
  },
  output: {
    check: null // means that every output type will fit, once we have a python parser...
  }
}, true)

eYo.DelegateSvg.Expr.T3s = [
  eYo.T3.Expr.proper_slice,
  eYo.T3.Expr.conditional_expression,
  eYo.T3.Expr.starred_expression,
  eYo.T3.Expr.not_test,
  eYo.T3.Expr.builtin__object,
  eYo.T3.Expr.any
]
