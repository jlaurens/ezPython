/**
 * ezPython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License CeCILL-B
 */
/**
 * @fileoverview BlockSvg delegates for ezPython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('ezP.DelegateSvg.Assignment')

goog.require('ezP.DelegateSvg.Term')
goog.require('ezP.DelegateSvg.List')
goog.require('ezP.DelegateSvg.Stmt')


/**
 * Class for a DelegateSvg, '*...' block.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('target_star', {
  inputs: {
    i_1: {
      key: ezP.Key.EXPRESSION,
      label: '*',
      css_class: 'ezp-code-reserved',
      check: ezP.T3.Expr.Check.target,
      hole_value: 'target',
    },
  },
})

/**
 * List consolidator for target list.
 * Rules are a bit stronger than python requires originally
 * 1) starred expression only at the end of the list
 * 2) only one such expression
 * Main entry: consolidate
 * @param {!String} single, the required type for a single element....
 */
ezP.Consolidator.List.Target.Void = function(D) {
  var d = {}
  goog.mixin(d, ezP.Consolidator.List.Target.Void.data)
  goog.mixin(d, D)
  ezP.Consolidator.List.Target.Void.superClass_.constructor.call(this, d)
}
goog.inherits(ezP.Consolidator.List.Target.Void, ezP.Consolidator.List.Target)

ezP.Consolidator.List.Target.Void.data = {
  hole_value: 'name',
  check: null,
  empty: true,
  presep: ',',
}

/**
 * Prepare io, just before walking through the input list.
 * Subclassers may add their own stuff to io.
 * @param {!Blockly.Block} block, owner or the receiver.
 */
ezP.Consolidator.List.Target.prototype.getIO = function(block) {
  var io = ezP.Consolidator.List.Target.superClass_.getIO.call(this, block)
  io.first_starred = io.last = -1
  return io
}

/**
 * Once the whole list has been managed,
 * there might be unwanted things.
 * @param {object} io
 */
ezP.Consolidator.List.Target.prototype.doCleanup = function () {
  // preparation: walk through the list of inputs and
  // find the first_starred input
  var Type = {
    UNCONNECTED: 0,
    STARRED: 1,
    OTHER: 2,
  }
    /**
   * Whether the input corresponds to an identifier...
   * Called when io.input is connected.
   * @param {Object} io, parameters....
   */
  var getCheckType = function(io) {
    var target = io.c8n.targetConnection
    if (!target) {
      return Type.UNCONNECTED
    }
    var check = target.check_
    if (goog.array.contains(check, ezP.T3.Expr.target_star)) {
      return Type.STARRED
    } else {
      return Type.OTHER
    }
  }
  var setupFirst = function (io) {
    io.first_starred = io.last = -1
    this.setupIO(io, 0)
    while (!!io.ezp) {
      if ((io.ezp.parameter_type_ = getCheckType(io)) === Type.STARRED) {
        if (io.first_starred < 0) {
          io.first_starred = io.i
        }
      } else if (io.ezp.parameter_type_ === Type.OTHER) {
        io.last = io.i
      }
      this.nextInput(io)
    }
  }
  return function(io) {
    ezP.Consolidator.List.Target.superClass_.doCleanup.call(this, io)
    setupFirst.call(this, io)
    // move parameters that are not placed correctly (in ezP sense)
    if (io.first_starred>=0) {
      this.setupIO(io, io.first_starred + 2)
      while (!!io.ezp) {
        if (io.ezp.parameter_type_ === Type.STARRED) {
          // disconnect this
          var c8n = io.c8n
          var target = c8n.targetConnection
          c8n.disconnect()
          // remove that input and the next one
          this.disposeAtI(io, io.i)
          this.setupIO(io, io.i)
          this.disposeAtI(io, io.i)
          this.setupIO(io, io.i)
        } else {
          this.setupIO(io, io.i + 2)
        }
      }
    }
  }
} ()

/**
 * Returns the required types for the current input.
 * This does not suppose that the list of input has been completely consolidated
 * @param {!Object} io parameter.
 */
ezP.Consolidator.List.Target.prototype.getCheck = function (io) {
  if (io.first_starred < 0 || io.i === io.first_starred) {
    return ezP.T3.Expr.Check.target
  } else {
    return ezP.T3.Expr.Check.target_unstar
  }
}

/**
 * Class for a DelegateSvg, target_list block.
 * This block may be sealed.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('target_list', {
  inputs: {
    list: {
      consolidator: ezP.Consolidator.List.Target,
      hole_value: 'name',
    },
  },
})

/**
 * Class for a DelegateSvg, void_target_list block.
 * This block may be sealed.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('void_target_list', {
  inputs: {
    list: {
      consolidator: ezP.Consolidator.List.Target.Void,
      hole_value: 'name',
    },
  },
})

/**
 * Class for a DelegateSvg, parenth_target_list block.
 * This block may be sealed.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('parenth_target_list', {
  inputs: {
    prefix: {
      label: '(',
    },
    suffix: {
      label: ')',
    }
  },
}, ezP.DelegateSvg.Expr.target_list)

/**
 * Class for a DelegateSvg, bracket_target_list block.
 * This block may be sealed.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('bracket_target_list', {
  inputs: {
    prefix: {
      label: '[',
    },
    suffix: {
      label: ']',
    }
  },
}, ezP.DelegateSvg.Expr.target_list)

goog.provide('ezP.DelegateSvg.Stmt.assignment_stmt')

/**
 * Class for a DelegateSvg, target_list_list block.
 * This block may be sealed.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('target_list_list', {
  inputs: {
    list: {
      check: ezP.T3.Expr.target_list,
      empty: false,
      postsep: '=',
    },
  },
})

/**
 * Class for a DelegateSvg, assignment_stmt.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('assignment_stmt', {
  inputs: {
    subtypes: [ezP.T3.Expr.identifier, ezP.T3.Expr.dotted_name, ],
    i_1: {
      term: {
        key:ezP.Key.VALUE,
        value: '',
        placeholder: ezP.Msg.Placeholder.IDENTIFIER,
        validator: function(txt) {
          var block = this.sourceBlock_
          if (block) {
            var ezp = block.ezp
            var v = ezp.validateValue(block, goog.isDef(txt)? txt: this.getValue())
            return v && v.validated
          }
        },
        onEndEditing: function () {
          var block = this.sourceBlock_
          var ezp = block.ezp
          ezp.setValue(block, this.getValue())
        },
      },
    },
    i_2: {
      key: ezP.Key.ANNOTATION,
      label: ':',
      css_class: 'ezp-code-reserved',
      check: ezP.T3.Expr.Check.expression,
      hole_value: 'expression',
    },
    i_3: {
      key: ezP.Key.TARGET,
      wrap: ezP.T3.Expr.target_list_list,
    },
    i_4: {
      key: ezP.Key.ASSIGNED,
      operator: '=',
      wrap: ezP.T3.Expr.assigned_list,
    },
  }
})


/**
 * Init the variant.
 * For that blocks, the variant is a set of flags to control which input should be visible.
 * @param {!Blockly.Block} block to be initialized.
 */
ezP.DelegateSvg.Stmt.assignment_stmt.prototype.initVariant = function (block) {
  ezP.DelegateSvg.Expr.term.superClass_.initVariant.call(this, block)
  this.setVariant(block, 0)
}

/**
 * Validates the new variant.
 * For ezPython.
 * @param {!Blockly.Block} block The owner of the receiver.
 * @param {string} newVariant
 * @return true if newVariant is acceptable, false otherwise
 */
ezP.DelegateSvg.Stmt.assignment_stmt.prototype.validateVariant = function (block, newVariant) {
  return (newVariant == 0 || newVariant == 1 || newVariant == 2)? {validated: newVariant}: null
}

/**
 * Synchronize the variant with the ui.
 * @param {!Blockly.Block} block to be initialized.
 * @param {string} newVariant
 */
ezP.DelegateSvg.Stmt.assignment_stmt.prototype.synchronizeVariant = function(block, newVariant) {
  this.setInputDisabled(block, this.ui.i_1.input, newVariant == 2)
  this.setInputDisabled(block, this.ui.i_2.input, newVariant != 1)
  this.setInputDisabled(block, this.ui.i_3.input, newVariant != 2)
}

/**
 * Initialize the value.
 * @param {!Blockly.Block} block to be initialized.
 */
ezP.DelegateSvg.Stmt.assignment_stmt.prototype.initValue = function (block) {
  this.setValue(block, this.ui.i_1.fields.value.getValue() || '')
  return
}

/**
 * Synchronize the value with the ui.
 * @param {!Blockly.Block} block to be initialized.
 * @param {string} newValue
 */
ezP.DelegateSvg.Stmt.assignment_stmt.prototype.synchronizeValue = function (block, newValue) {
  this.ui.i_1.fields.value.setValue(newValue || '')
}

/**
 * Validates the new value.
 * The type must be one of `dotted_name` or `identifier`.
 * For ezPython.
 * @param {!Blockly.Block} block The owner of the receiver.
 * @param {string} newValue
 * @return true if newValue is acceptable, false otherwise
 */
ezP.DelegateSvg.Stmt.assignment_stmt.prototype.validateValue = function (block, newValue) {
  var subtypes = this.getSubtypes(block)
  var subtype = ezP.Do.typeOfString(newValue)
  return subtypes.indexOf(subtype) >= 0? {validated: newValue}: null
}

/**
 * Populate the context menu for the given block.
 * @param {!Blockly.Block} block The block.
 * @param {!ezP.MenuManager} mgr mgr.menu is the menu to populate.
 * @private
 */
ezP.DelegateSvg.Stmt.assignment_stmt.prototype.populateContextMenuFirst_ = function (block, mgr) {
  var value = this.getValue(block)
  var current = this.getVariant(block)

  var F = function(content, variant) {
    var menuItem = new ezP.MenuItem(content, function() {
      block.ezp.setVariant(block, variant)
    })
    menuItem.setEnabled(variant != current)
    mgr.addChild(menuItem, true)
  }
  var content = goog.dom.createDom(goog.dom.TagName.SPAN, 'ezp-code',
    ezP.Do.createSPAN('yield', 'ezp-code-reserved'),
    ezP.Do.createSPAN(' …', 'ezp-code-placeholder'),
  )
  var content =
  goog.dom.createDom(goog.dom.TagName.SPAN, null,
    ezP.Do.createSPAN(value || ezP.Msg.Placeholder.IDENTIFIER, value? 'ezp-code': 'ezp-code-placeholder'),
    ezP.Do.createSPAN(' = …', 'ezp-code'),
  )
  F(content, 0)
  var content =
  goog.dom.createDom(goog.dom.TagName.SPAN, null,
    ezP.Do.createSPAN(value || ezP.Msg.Placeholder.IDENTIFIER, value? 'ezp-code': 'ezp-code-placeholder'),
    ezP.Do.createSPAN(': … = …', 'ezp-code'),
  )
  F(content, 1)
  var content = ezP.Do.createSPAN('…,… = …,…', 'ezp-code')
  F(content, 2)
  mgr.shouldSeparate()
  if (current != 2) {
    var menuItem = new ezP.MenuItem(ezP.Msg.RENAME, function() {
        block.ezp.ui.i_1.fields.value.showEditor()
      })
    mgr.addChild(menuItem, true)
    mgr.shouldSeparate()
  }
  ezP.DelegateSvg.Stmt.assignment_stmt.superClass_.populateContextMenuFirst_.call(this,block, mgr)
  return true
}

/**
 * List consolidator for assignment list.
 */
ezP.Consolidator.Assigned = function() {
  ezP.Consolidator.Assigned.superClass_.constructor.call(this, ezP.Consolidator.Assigned.data)
}
goog.inherits(ezP.Consolidator.Assigned, ezP.Consolidator.List)

ezP.Consolidator.Assigned.data = {
  check: null,
  empty: false,
  presep: ',',
}

/**
 * Prepare io, just before walking through the input list for example.
 * Subclassers may add their own stuff to io.
 * @param {!Blockly.block} block owner of the receiver
 */
ezP.Consolidator.Assigned.prototype.getIO = function(block) {
  var io = ezP.Consolidator.Assigned.superClass_.getIO.call(this, block)
  io.first_single = -1
  return io
}

/**
 * Once the whole list has been managed,
 * there might be unwanted things.
 */
ezP.Consolidator.Assigned.prototype.doCleanup = function () {
  // preparation: walk through the list of inputs and
  // find the key inputs
  var Type = {
    unconnected: 0,
    single: 1,
    other: 2,
  }
  /**
   * Whether the input corresponds to an identifier...
   * Called when io.input is connected.
   * @param {Object} io, parameters....
   */
  var getCheckType = function(io) {
    var target = io.c8n.targetConnection
    if (!target) {
      return Type.unconnected
    }
    var check = target.check_
    if (goog.array.contains(check, ezP.T3.Expr.yield_expression)
    || goog.array.contains(check, ezP.T3.Expr.yield_expression_list)
      || goog.array.contains(check, ezP.T3.Expr.yield_from_expression)) {
      return Type.first_single
    } else {
      return Type.other
    }
  }
  var setupFirst = function (io) {
    io.first_single = -1
    this.setupIO(io, 0)
    while (!!io.ezp) {
      if(Type.first_single === (io.ezp.parameter_type_ = getCheckType(io))) {
        if (io.first_single < 0) {
          io.first_single = io.i
          return
        }
      }                    
      this.nextInput(io)
    }
  }
  return function(io) {
    ezP.Consolidator.Assigned.superClass_.doCleanup.call(this, io)
    setupFirst.call(this, io)
    // there must be an only one
    // first remove all the extra parameters
    if (io.first_single >= 0) {
      this.setupIO(io, 0)
      while(io.first_single>0) {
        this.disposeAtI(io)
        --io.first_single
      }
      this.setupIO(io, 1)
      while (io.list.length>1) {
        this.disposeAtI(io)
      }
    }
  }
} ()

/**
 * Returns the required types for the current input.
 * This does not suppose that the list of input has been completely consolidated
 * @param {!Object} io parameter.
 */
ezP.Consolidator.Assigned.prototype.getCheck = function (io) {
  if (io.first_single >= 0 || (io.list.length === 1) || (io.i === 1 && io.list.length === 3)) {
    return ezP.T3.Expr.Check.assigned_list
  } else {
    return ezP.T3.Expr.Check.starred_item_list
  }
}

/**
 * Class for a DelegateSvg, assigned_list block.
 * This block may be sealed.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('assigned_list', {
  inputs: {
    list: {
      consolidator: ezP.Consolidator.Assigned,
      hole_value: 'value',
    },
  },
})

goog.provide('ezP.DelegateSvg.AugAssign')

/**
 * Class for a DelegateSvg, augassign_... block.
 * Multiple ops.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.AugAssign = function (prototypeName) {
  ezP.DelegateSvg.AugAssign.superClass_.constructor.call(this, prototypeName)
}
goog.inherits(ezP.DelegateSvg.AugAssign, ezP.DelegateSvg.Binary)

ezP.DelegateSvg.AugAssign.model__ = {
  inputs: {
    i_1: {
      check: ezP.T3.Expr.Check.augtarget,
    },
    i_3: {
      key: ezP.Key.EXPRESSION,
      wrap: ezP.T3.Expr.augassign_list_solid,
    }
  }
}

/**
 * Class for a DelegateSvg, augassign_numeric block.
 * Multiple ops.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('augassign_numeric', {
  inputs: {
    values: ['+=','-=','*=','/=','//=','%=','**=','@='],
  }
}, ezP.DelegateSvg.AugAssign)

/**
 * Class for a DelegateSvg, augassign_bitwise block.
 * Multiple ops.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('augassign_bitwise', {
  inputs: {
    values: ["<<=", ">>=", "&=", "^=", "|="],
  }
}, ezP.DelegateSvg.AugAssign)

/**
 * Class for a DelegateSvg, augassign_numeric_stmt.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('augassign_numeric_stmt', {
  inputs: {
    insert: ezP.T3.Expr.augassign_numeric,
  },
})

/**
 * Class for a DelegateSvg, augassign_bitwise_stmt.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('augassign_bitwise_stmt', {
  inputs: {
    insert: ezP.T3.Expr.augassign_bitwise,
  },
})

/**
 * Get the content for the menu item.
 * @param {!Blockly.Block} block The block.
 * @param {string} op op is the operator
 * @private
 */
ezP.DelegateSvg.Stmt.augassign_numeric_stmt.prototype.makeTitle = ezP.DelegateSvg.Stmt.augassign_bitwise_stmt.prototype.makeTitle = ezP.DelegateSvg.Binary.prototype.makeTitle

/**
 * List consolidator for target list.
 * Rules are a bit stronger than python requires originally
 * 1) starred expression only at the end of the list
 * 2) only one such expression
 * Main entry: consolidate
 * @param {!String} single, the required type for a single element....
 */
ezP.Consolidator.List.AugAssigned = function(D) {
  var d = {}
  goog.mixin(d, ezP.Consolidator.List.AugAssigned.data)
  goog.mixin(d, D)
  ezP.Consolidator.List.AugAssigned.superClass_.constructor.call(this, d)
}
goog.inherits(ezP.Consolidator.List.AugAssigned, ezP.Consolidator.List.Target)

ezP.Consolidator.List.AugAssigned.data = {
  hole_value: 'name',
  check: null,
  empty: false,
  presep: ',',
}

/**
 * Prepare io, just before walking through the input list.
 * Subclassers may add their own stuff to io.
 * @param {!Blockly.Block} block, owner or the receiver.
 */
ezP.Consolidator.List.AugAssigned.prototype.getIO = function(block) {
  var io = ezP.Consolidator.List.AugAssigned.superClass_.getIO.call(this, block)
  io.first_yield = -1
  return io
}

/**
 * Once the whole list has been managed,
 * there might be unwanted things.
 * @param {object} io
 */
ezP.Consolidator.List.AugAssigned.prototype.doCleanup = function () {
  // preparation: walk through the list of inputs and
  // find the first_starred input
  var Type = {
    UNCONNECTED: 0,
    YIELD: 1,
    OTHER: 2,
  }
    /**
   * Whether the input corresponds to an identifier...
   * Called when io.input is connected.
   * @param {Object} io, parameters....
   */
  var getCheckType = function(io) {
    var target = io.c8n.targetConnection
    if (!target) {
      return Type.UNCONNECTED
    }
    var check = target.check_
    if (goog.array.contains(check, ezP.T3.Expr.yield_expression_list) || goog.array.contains(check, ezP.T3.Expr.yield_from_expression)) {
      return Type.YIELD
    } else {
      return Type.OTHER
    }
  }
  var setupFirst = function (io) {
    io.first_yield = -1
    this.setupIO(io, 0)
    while (!!io.ezp) {
      if ((io.ezp.parameter_type_ = getCheckType(io)) === Type.YIELD) {
        if (io.first_yield < 0) {
          io.first_yield = io.i
        }
      }
      this.nextInput(io)
    }
  }
  return function(io) {
    ezP.Consolidator.List.AugAssigned.superClass_.doCleanup.call(this, io)
    setupFirst.call(this, io)
    // remove whatever is before or after the first yield block
    if (io.first_yield>=0) {
      while (io.first_yield--) {
        this.setupIO(io, 0)
        this.disposeAtI(io)
      }
      // remove whatever follows this block
      this.setupIO(io, 1)
      while (io.i < io.list.length) {
        this.disposeAtI(io)
      }
    }
  }
} ()

/**
 * Returns the required types for the current input.
 * This does not suppose that the list of input has been completely consolidated
 * @param {!Object} io parameter.
 */
ezP.Consolidator.List.AugAssigned.prototype.getCheck = function (io) {
  if (io.list.length === 1 || io.list.length === 3 && io.i === 1) {
    return ezP.T3.Expr.Check.augassign_single
  } else {
    return ezP.T3.Expr.Check.expression
  }
}

/**
 * Class for a DelegateSvg, augassign_list_solid.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Manager.makeSubclass('augassign_list_solid', {
  inputs: {
    list: {
      consolidator: ezP.Consolidator.List.AugAssigned,
      hole_value: 'name',
    },
  }
})

/**
 * Populate the context menu for the given block.
 * @param {!Blockly.Block} block The block.
 * @param {!ezP.MenuManager} mgr mgr.menu is the menu to populate.
 * @private
 */
ezP.DelegateSvg.AugAssign.populateContextMenuFirst_ = function (block, mgr) {
  var input = block.getInput(ezP.Key.LIST)
  if (input) {
    var target = input.connection.targetBlock()
    if (target) {
      var type
      var can_insert = function() {
        var e8r = target.ezp.inputEnumerator(target)
        while ((input = e8r.next())) {
          var c8n = e8r.here.connection
          if (c8n && !c8n.targetConnection) {
            if (goog.array.contains(c8n.check_, type)) {
              return true
            }
          }
        }
        return false
      }
      var F = function(content) {
        mgr.addInsertChild(new ezP.MenuItem(content, function() {
            var grouper = new ezP.Events.Grouper()
            try {
              var BB = ezP.DelegateSvg.newBlockComplete(target.workspace, type)
              if (BB.ezp.setValue) {
                BB.ezp.setValue(BB, 'name')
              } else {
                var holes = ezP.HoleFiller.getDeepHoles(BB)
                ezP.HoleFiller.fillDeepHoles(BB.workspace, holes)
              }
              input.connection.connect(BB.outputConnection)
              target.ezp.consolidate(target)
            } finally {
              grouper.stop()
            }
          }))
      }
      type = ezP.T3.Expr.yield_expression_list
      if (can_insert()) {
        var content = goog.dom.createDom(goog.dom.TagName.SPAN, 'ezp-code',
          ezP.Do.createSPAN('yield', 'ezp-code-reserved'),
          ezP.Do.createSPAN(' …', 'ezp-code-placeholder'),
        )
        F(content)
      }
      type = ezP.T3.Expr.yield_from_expression
      if (can_insert()) {
        var content = goog.dom.createDom(goog.dom.TagName.SPAN, 'ezp-code',
          ezP.Do.createSPAN('yield from', 'ezp-code-reserved'),
          ezP.Do.createSPAN(' …', 'ezp-code-placeholder'),
        )
        F(content)
      }
      mgr.shouldSeparateInsert()
    }
  }
  return true
}

/**
 * Populate the context menu for the given block.
 * @param {!Blockly.Block} block The block.
 * @param {!ezP.MenuManager} mgr mgr.menu is the menu to populate.
 * @private
 */
ezP.DelegateSvg.Expr.augassign_numeric.prototype.populateContextMenuFirst_ =
ezP.DelegateSvg.Expr.augassign_bitwise.prototype.populateContextMenuFirst_ = function(block, mgr) {
  ezP.DelegateSvg.AugAssign.populateContextMenuFirst_(block, mgr)
  return ezP.DelegateSvg.Expr.augassign_bitwise.superClass_.populateContextMenuFirst_.call(this, block, mgr)
}

ezP.DelegateSvg.Stmt.augassign_numeric_stmt.prototype.populateContextMenuFirst_ =
ezP.DelegateSvg.Stmt.augassign_bitwise_stmt.prototype.populateContextMenuFirst_ = function(block, mgr) {
  mgr.populateProperties(block, 'subtype')
  ezP.DelegateSvg.AugAssign.populateContextMenuFirst_(block, mgr)
  return ezP.DelegateSvg.Stmt.augassign_bitwise_stmt.superClass_.populateContextMenuFirst_.call(this, block, mgr)
}


ezP.DelegateSvg.Assignment.T3s = [
  ezP.T3.Expr.term,
  ezP.T3.Expr.target_list,
  ezP.T3.Expr.target_list_list,
  ezP.T3.Expr.void_target_list,
  ezP.T3.Expr.parenth_target_list,
  ezP.T3.Expr.bracket_target_list,
  ezP.T3.Stmt.assignment_stmt,
  ezP.T3.Expr.assigned_list,
  ezP.T3.Expr.augassign_numeric,
  ezP.T3.Expr.augassign_bitwise,
  ezP.T3.Stmt.augassign_numeric_stmt,
  ezP.T3.Stmt.augassign_bitwise_stmt,
  ezP.T3.Expr.augassign_list_solid,
]