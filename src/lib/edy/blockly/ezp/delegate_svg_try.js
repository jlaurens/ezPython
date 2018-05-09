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

goog.provide('edY.DelegateSvg.Try')

goog.require('edY.DelegateSvg.Group')

/**
 * Class for a DelegateSvg, try_part block.
 * Not normally called directly, edY.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Group.makeSubclass('try_part', {
  fields: {
    prefix: 'try',
  },
})

/**
 * Class for a DelegateSvg, except_part block.
 * Not normally called directly, edY.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Group.makeSubclass('except_part', {
  data: {
    variant: {
      EXCEPT: 0,
      EXCEPT_EXPRESSION: 1,
      EXCEPT_AS: 2,
      all: [0, 1, 2],
      didChange: function(oldValue, newValue) {
        var edy = this.owner_
        var block = edy.block_
        edy.consolidateType(block)
      },
      synchronize: function(newValue) {
        var M = this.model
        this.ui.tiles.expression.setIncog(newValue === M.EXCEPT)
        this.ui.tiles.expression.required = (newValue === M.EXCEPT_EXPRESSION)
        this.ui.tiles.as.setIncog(newValue !== M.EXCEPT_AS)
        this.ui.tiles.as.required = (newValue === M.EXCEPT_AS)
      },
    },
  },
  fields: {
    prefix: 'except',
  },
  tiles: {
    expression: {
      order: 1,
      check: edY.T3.Expr.Check.expression,
      hole_value: 'expression',
      xml: {
        didLoad: function () {
          var variant = this.owner.data.variant
          if (variant.get() === variant.model.EXCEPT) {
            variant.set(variant.model.EXCEPT_EXPRESSION)
          }
        },
      },
    },
    as: {
      order: 2,
      fields: {
        label: 'as',
      },
      check: edY.T3.Expr.identifier,
      hole_value: 'name',
      xml: {
        didLoad: function () {
          var variant = this.owner.data.variant
          variant.set(variant.model.EXCEPT_AS)
        },
      },
    },
  },
})

/**
 * The type and connection depend on the properties modifier, value and variant.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Stmt.except_part.prototype.consolidateType = function (block) {
  var variant = this.data.variant.get()
  var F = function(k) {
    this.setupType(block, edY.T3.Stmt[k])
    block.nextConnection.setCheck(edY.T3.Stmt.Next[k])
    block.previousConnection.setCheck(edY.T3.Stmt.Previous[k])
  }
  F.call(this, variant > 0? 'except_part': 'void_except_part')
  edY.DelegateSvg.Stmt.except_part.superClass_.consolidateType.call(this, block)
}

/**
 * Populate the context menu for the given block.
 * @param {!Blockly.Block} block The block.
 * @param {!edY.MenuManager} mgr mgr.menu is the menu to populate.
 * @private
 */
edY.DelegateSvg.Stmt.except_part.prototype.populateContextMenuFirst_ = function (block, mgr) {
  var M = this.data.variant.model
  var current = block.edy.data.variant.get()
  var F = function(content, k) {
    var menuItem = new edY.MenuItem(content, function() {
      block.edy.data.variant.set(k)
    })
    mgr.addChild(menuItem, true)
    menuItem.setEnabled(k !== current)
  }
  F(goog.dom.createDom(goog.dom.TagName.SPAN, 'edy-code-reserved',
      goog.dom.createTextNode('except:'),
    ), M.EXCEPT
  )
  F(goog.dom.createDom(goog.dom.TagName.SPAN, 'edy-code',
      edY.Do.createSPAN('except ', 'edy-code-reserved'),
      goog.dom.createTextNode('…:'),
    ), M.EXCEPT_EXPRESSION
  )
  F(goog.dom.createDom(goog.dom.TagName.SPAN, 'edy-code',
      edY.Do.createSPAN('except', 'edy-code-reserved'),
      goog.dom.createTextNode(' … '),
      edY.Do.createSPAN(' as', 'edy-code-reserved'),
      goog.dom.createTextNode(' …:'),
    ), M.EXCEPT_AS
  )
  mgr.shouldSeparate()
  return edY.DelegateSvg.Stmt.except_part.superClass_.populateContextMenuFirst_.call(this,block, mgr)
}

/**
 * Class for a DelegateSvg, finally_part block.
 * Not normally called directly, edY.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Group.makeSubclass('finally_part', {
  fields: {
    prefix: 'finally',
  }
})

/**
 * Class for a DelegateSvg, raise_stmt.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Stmt.makeSubclass('raise_stmt', {
  data: {
    variant: {
      RAISE: 0,
      RAISE_EXPRESSION: 1,
      RAISE_FROM: 2,
      all: [0, 1, 2],
      synchronize: function(newValue) {
        var M = this.model
        this.ui.tiles.expression.setIncog(newValue === M.RAISE)
        this.ui.tiles.expression.required = (newValue === M.RAISE_EXPRESSION)
        this.ui.tiles.from.setIncog(newValue !== M.RAISE_FROM)
        this.ui.tiles.from.required = (newValue === M.RAISE_FROM)
      },
    },
  },
  fields: {
    prefix: 'raise',
  },
  tiles: {
    expression: {
      order: 1,
      check: edY.T3.Expr.Check.expression,
      hole_value: 'expression',
      xml: {
        didLoad: function () {
          var variant = this.owner.data.variant
          if (variant.get() === variant.model.RAISE) {
            variant.set(variant.model.RAISE_EXPRESSION)
          }
        },
      },
    },
    from: {
      order: 2,
      fields: {
        label: 'from',
      },
      check: edY.T3.Expr.Check.expression,
      hole_value: 'expression',
      xml: {
        didLoad: function () {
          var variant = this.owner.data.variant
          variant.set(variant.model.RAISE_FROM)
        },
      },
    },
  },
})

/**
 * Populate the context menu for the given block.
 * @param {!Blockly.Block} block The block.
 * @param {!edY.MenuManager} mgr mgr.menu is the menu to populate.
 * @private
 */
edY.DelegateSvg.Stmt.raise_stmt.prototype.populateContextMenuFirst_ = function (block, mgr) {
  var M = this.data.variant.model
  var current = this.data.variant.get()
  var F = function(content, k) {
    var menuItem = new edY.MenuItem(content, function() {
      block.edy.data.variant.set(k)
    })
    mgr.addChild(menuItem, true)
    menuItem.setEnabled(k !== current)
  }
  F(goog.dom.createDom(goog.dom.TagName.SPAN, 'edy-code-reserved',
      goog.dom.createTextNode('raise'),
    ), M.RAISE
  )
  F(goog.dom.createDom(goog.dom.TagName.SPAN, 'edy-code',
      edY.Do.createSPAN('raise ', 'edy-code-reserved'),
      goog.dom.createTextNode('…'),
    ), M.RAISE_EXPRESSION
  )
  F(goog.dom.createDom(goog.dom.TagName.SPAN, 'edy-code',
      edY.Do.createSPAN('raise', 'edy-code-reserved'),
      goog.dom.createTextNode(' … '),
      edY.Do.createSPAN(' from', 'edy-code-reserved'),
      goog.dom.createTextNode(' …'),
    ), M.RAISE_FROM
  )
  mgr.shouldSeparate()
  return edY.DelegateSvg.Stmt.raise_stmt.superClass_.populateContextMenuFirst_.call(this,block, mgr)
}

/**
 * Class for a DelegateSvg, assert_stmt.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Stmt.makeSubclass('assert_stmt', {
  data: {
    variant: {
      all: [0, 1],
      synchronize: function(newValue) {
        this.ui.tiles.expression.setIncog(!newValue)
        this.ui.tiles.expression.required = !!newValue
      },
    },
  },
  fields: {
    prefix: 'assert',
  },
  tiles: {
    assert: {
      order: 1,
      check: edY.T3.Expr.Check.expression,
      hole_value: 'expression',
    },
    expression: {
      order: 2,
      fields: {
        label: ',',
      },
      check: edY.T3.Expr.Check.expression,
      hole_value: 'expression',
      xml: {
        didLoad: function () {
          var variant = this.owner.data.variant
          variant.set(1)
        },
      },
    },
  },
})

/**
 * Populate the context menu for the given block.
 * @param {!Blockly.Block} block The block.
 * @param {!edY.MenuManager} mgr mgr.menu is the menu to populate.
 * @private
 */
edY.DelegateSvg.Stmt.assert_stmt.prototype.populateContextMenuFirst_ = function (block, mgr) {
  var current = block.edy.data.variant.get()
  var F = function(content, key) {
    var menuItem = new edY.MenuItem(content, function() {
      block.edy.data.variant.set(key)
    })
    mgr.addChild(menuItem, true)
    menuItem.setEnabled(key !== current)
  }
  F(goog.dom.createDom(goog.dom.TagName.SPAN, 'edy-code',
      edY.Do.createSPAN('assert ', 'edy-code-reserved'),
      goog.dom.createTextNode('…'),
    ), 0
  )
  F(goog.dom.createDom(goog.dom.TagName.SPAN, 'edy-code',
      edY.Do.createSPAN('assert ', 'edy-code-reserved'),
      goog.dom.createTextNode('…, …'),
    ), 1
  )
  mgr.shouldSeparate()
  return edY.DelegateSvg.Stmt.assert_stmt.superClass_.populateContextMenuFirst_.call(this,block, mgr)
}

edY.DelegateSvg.Try.T3s = [
  edY.T3.Stmt.try_part,
  edY.T3.Stmt.except_part,
  edY.T3.Stmt.finally_part,
  edY.T3.Stmt.raise_stmt,
  edY.T3.Stmt.assert_stmt,
]
