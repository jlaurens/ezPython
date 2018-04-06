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

goog.provide('ezP.DelegateSvg.Import')

goog.require('ezP.DelegateSvg.List')
goog.require('ezP.DelegateSvg.Stmt')

/////////////////     module_as      ///////////////////
/*
import_module ::= "import" non_void_module_as_list
non_void_module_as_list ::= module_as ( "," module_as )*
# module_as is not just an identifier, to simplify the UI management
# module might represent here an object from a python module
module_as ::= module ["as" module_alias]
module ::= module_name ['.' module]
module_alias ::= identifier
#name  ::=  identifier
name ::= IGNORE
module_name ::= identifier
*/

/**
 * Class for a DelegateSvg, module_as.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr._as_concrete = function (prototypeName) {
  ezP.DelegateSvg.Expr._as_concrete.superClass_.constructor.call(this, prototypeName)
  this.model__.input = {
    m_1: {
      key: ezP.Key.SOURCE,
    },
    m_3: {
      label: 'as',
      css_class: 'ezp-code-reserved',
      key: ezP.Key.AS,
      check: ezP.T3.Expr.identifier,
      hole_value: 'alias',
    }
  }
}
goog.inherits(ezP.DelegateSvg.Expr._as_concrete, ezP.DelegateSvg.Expr)

/**
 * Class for a DelegateSvg, module_as_concrete.
 * module_as ::= module ["as" module_alias]
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.module_as_concrete = function (prototypeName) {
  ezP.DelegateSvg.Expr.module_as_concrete.superClass_.constructor.call(this, prototypeName)
  this.outputModel__ = {
    check: ezP.T3.Expr.module_as_concrete,
  }
  goog.mixin(this.model__.input.m_1, {
    check: ezP.T3.Expr.Check.module,
    hole_value: 'module',
    plugged: ezP.T3.Expr.module,
  })
  this.model__.input.m_3.plugged = ezP.T3.Expr.module_alias
}
goog.inherits(ezP.DelegateSvg.Expr.module_as_concrete, ezP.DelegateSvg.Expr._as_concrete)
ezP.DelegateSvg.Manager.register('module_as_concrete')

/**
 * Class for a DelegateSvg, module block.
 * module ::= module_name ['.' module]
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.module_concrete = function (prototypeName) {
  ezP.DelegateSvg.Expr.module_concrete.superClass_.constructor.call(this, prototypeName)
  this.outputModel__ = {
    check: ezP.T3.Expr.module_concrete,
  }
  this.model__.input.m_1 = {
    key: ezP.Key.LHS,
    check: ezP.T3.Expr.module_name,
    plugged: ezP.T3.Expr.module_identifier,
    hole_value: 'module',
  }
  this.model__.input.m_3 = {
    label: '.',
    key: ezP.Key.RHS,
    check: ezP.T3.Expr.Check.module,
    plugged: ezP.T3.Expr.module,
    hole_value: 'submodule',
  }
}
goog.inherits(ezP.DelegateSvg.Expr.module_concrete, ezP.DelegateSvg.Expr)
ezP.DelegateSvg.Manager.register('module_concrete')

/**
 * Class for a DelegateSvg, non_void_module_as_list block.
 * This block may be wrapped.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.non_void_module_as_list = function (prototypeName) {
  ezP.DelegateSvg.Expr.non_void_module_as_list.superClass_.constructor.call(this, prototypeName)
  this.model__.input.list = {
    check: ezP.T3.Expr.Check.non_void_module_as_list,
    empty: false,
    sep: ',',
    hole_value: 'module',
  }
  this.outputModel__ = {
    check: ezP.T3.Expr.non_void_module_as_list,
  }
}
goog.inherits(ezP.DelegateSvg.Expr.non_void_module_as_list, ezP.DelegateSvg.List)
ezP.DelegateSvg.Manager.register('non_void_module_as_list')

/////////////////     import_module      ///////////////////

/**
 * Class for a DelegateSvg, import module.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.import_module = function (prototypeName) {
  ezP.DelegateSvg.Expr.import_module.superClass_.constructor.call(this, prototypeName)
  this.outputModel__ = {
    check: ezP.T3.Expr.import_module,
  }
  this.model__.input.m_1 = {
    label: 'import',
    css_class: 'ezp-code-reserved',
    key: ezP.Key.IMPORT,
    wrap: ezP.T3.Expr.non_void_module_as_list,
  }
}
goog.inherits(ezP.DelegateSvg.Expr.import_module, ezP.DelegateSvg.Expr)
ezP.DelegateSvg.Manager.register('import_module')

/////////////////////  from_relative_module_import  ///////////////////////////
/*
from_relative_module_import ::= "from" relative_module "import" non_void_identifier_as_list
# relative_module ::=  "."* module | "."+
relative_module ::=  module | parent_module
parent_module ::= '.' [relative_module]
non_void_identifier_as_list ::= import_identifier_as ( "," import_identifier_as )*
import_identifier_as ::= identifier "as" import_name
identifier ::= an identifier but not as a variable name here
import_name ::= identifier
*/

/**
 * Class for a DelegateSvg, import_identifier_as_concrete.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.import_identifier_as_concrete = function (prototypeName) {
  ezP.DelegateSvg.Expr.import_identifier_as_concrete.superClass_.constructor.call(this, prototypeName)
  this.outputModel__ = {
    check: ezP.T3.Expr.import_identifier_as_concrete,
  }
  goog.mixin(this.model__.input.m_1, {
    check: ezP.T3.Expr.identifier,
    hole_value: 'name',
    plugged: ezP.T3.Expr.import_identifier,
  })
  this.model__.input.m_3.plugged = ezP.T3.Expr.import_alias
}
goog.inherits(ezP.DelegateSvg.Expr.import_identifier_as_concrete, ezP.DelegateSvg.Expr._as_concrete)
ezP.DelegateSvg.Manager.register('import_identifier_as_concrete')

/**
 * Class for a DelegateSvg, non_void_import_identifier_as_list block.
 * This block may be wrapped.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.non_void_import_identifier_as_list = function (prototypeName) {
  ezP.DelegateSvg.Expr.non_void_import_identifier_as_list.superClass_.constructor.call(this, prototypeName)
  this.model__.input.list = {
    check: ezP.T3.Expr.Check.non_void_import_identifier_as_list,
    empty: false,
    sep: ',',
    hole_value: 'name',
  }
  this.outputModel__ = {
    check: ezP.T3.Expr.non_void_import_identifier_as_list,
  }
}
goog.inherits(ezP.DelegateSvg.Expr.non_void_import_identifier_as_list, ezP.DelegateSvg.List)
ezP.DelegateSvg.Manager.register('non_void_import_identifier_as_list')

/**
 * Class for a DelegateSvg, parent_module block.
 * This block may be wrapped.
 * parent_module ::= '.' [relative_module]
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.parent_module = function (prototypeName) {
  ezP.DelegateSvg.Expr.parent_module.superClass_.constructor.call(this, prototypeName)
  this.outputModel__ = {
    check: ezP.T3.Expr.parent_module,
  }
  this.model__.input.m_1 = {
    label: '.',
    key: ezP.Key.MODULE,
    check: ezP.T3.Expr.Check.relative_module,
    plugged: ezP.T3.Expr.relative_module,
    optional: true,
    hole_value: 'module',
  }
}
goog.inherits(ezP.DelegateSvg.Expr.parent_module, ezP.DelegateSvg.Expr)
ezP.DelegateSvg.Manager.register('parent_module')

/**
 * Class for a DelegateSvg, from_relative_module_import module.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.from_relative_module_import = function (prototypeName) {
  ezP.DelegateSvg.Expr.from_relative_module_import.superClass_.constructor.call(this, prototypeName)
  this.outputModel__ = {
    check: ezP.T3.Expr.from_relative_module_import,
  }
  this.model__.input.m_1 = {
    label: 'from',
    css_class: 'ezp-code-reserved',
    key: ezP.Key.FROM,
    check: ezP.T3.Expr.Check.relative_module,
    plugged: ezP.T3.Expr.relative_module,
    hole_value: 'module',
  }
  this.model__.input.m_3 = {
    label: 'import',
    css_class: 'ezp-code-reserved',
    key: ezP.Key.IMPORT,
    wrap: ezP.T3.Expr.non_void_import_identifier_as_list,
  }
}
goog.inherits(ezP.DelegateSvg.Expr.from_relative_module_import, ezP.DelegateSvg.Expr)
ezP.DelegateSvg.Manager.register('from_relative_module_import')

/////////////////     from_module_import      ///////////////////

/**
 * Class for a DelegateSvg, from_module_import.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.from_module_import = function (prototypeName) {
  ezP.DelegateSvg.Expr.from_module_import.superClass_.constructor.call(this, prototypeName)
  this.outputModel__ = {
    check: ezP.T3.Expr.from_module_import,
  }
  this.model__.input.m_1 = {
    key: ezP.Key.MODULE,
    label: 'from',
    css_class: 'ezp-code-reserved',
    check: ezP.T3.Expr.Check.module,
    hole_value: 'module',
  }
  this.model__.input.m_3 = {
    label: 'import *',
    css_class: 'ezp-code-reserved',
  }
}
goog.inherits(ezP.DelegateSvg.Expr.from_module_import, ezP.DelegateSvg.Expr)
ezP.DelegateSvg.Manager.register('from_module_import')

/////////////////     import_part      ///////////////////

/**
 * Class for a DelegateSvg, import_part.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Stmt.import_part = function (prototypeName) {
  ezP.DelegateSvg.Stmt.import_part.superClass_.constructor.call(this, prototypeName)
  this.model__.input.m_3 = {
    key: ezP.Key.MODULE,
    check: ezP.T3.Expr.Check.import_expr,
    wrap: ezP.T3.Expr.import_module,
  }
  this.menuData = [
    {
      content: goog.dom.createDom(goog.dom.TagName.SPAN, 'ezp-code',
        ezP.Do.createSPAN('import ', 'ezp-code-reserved'),
        ezP.Do.createSPAN('module', 'ezp-code-placeholder'),
        goog.dom.createTextNode(' ['),
        ezP.Do.createSPAN('as', 'ezp-code-reserved'),
        goog.dom.createTextNode(' ...]'),
      ),
      type: ezP.T3.Expr.import_module
    },
    {
      content:   goog.dom.createDom(goog.dom.TagName.SPAN, 'ezp-code',
        ezP.Do.createSPAN('from ', 'ezp-code-reserved'),
        ezP.Do.createSPAN('module ', 'ezp-code-placeholder'),
        ezP.Do.createSPAN('import ', 'ezp-code-reserved'),
        goog.dom.createTextNode('… ['),
        ezP.Do.createSPAN('as', 'ezp-code-reserved'),
        goog.dom.createTextNode(' …]'),
      ),
      type: ezP.T3.Expr.from_relative_module_import
    },
    {
      content:   goog.dom.createDom(goog.dom.TagName.SPAN, 'ezp-code',
        ezP.Do.createSPAN('from ', 'ezp-code-reserved'),
        ezP.Do.createSPAN('module ', 'ezp-code-placeholder'),
        ezP.Do.createSPAN('import *', 'ezp-code-reserved'),
      ),
      type: ezP.T3.Expr.from_module_import
    },
  ]
  this.statementModel__.previous.check = ezP.T3.Stmt.Previous.import_part
  this.statementModel__.next.check = ezP.T3.Stmt.Next.import_part
}
goog.inherits(ezP.DelegateSvg.Stmt.import_part, ezP.DelegateSvg.Stmt)

ezP.DelegateSvg.Manager.register('import_part')

/**
 * When the block is just a wrapper, returns the wrapped target.
 * @param {!Blockly.Block} block owning the delegate.
 */
ezP.DelegateSvg.Stmt.import_part.prototype.getMenuTarget = function(block) {
  return block
}

/**
 * Populate the context menu for the given block.
 * @param {!Blockly.Block} block The block.
 * @param {!ezP.MenuManager} mgr mgr.menu is the menu to populate.
 * @private
 */
ezP.DelegateSvg.Stmt.import_part.prototype.populateContextMenuFirst_ = function (block, mgr) {
  var yorn
  var D = ezP.DelegateSvg.Manager.getInputModel(block.type)
  if (yorn = mgr.populate_wrap_alternate(block, D.m_3.key)) {
    mgr.shouldSeparate()
  }
  return ezP.DelegateSvg.Stmt.import_part.superClass_.populateContextMenuFirst_.call(this,block, mgr) || yorn
}

/**
 * Populate the context menu for the given block.
 * @param {!Blockly.Block} block The block.
 * @param {!ezP.MenuManager} mgr mgr.menu is the menu to populate.
 * @override
 */
ezP.DelegateSvg.Expr.print_builtin.prototype.populateContextMenuFirst_ = function (block, mgr) {
  var menu = mgr.Menu
  var list = block.getInput(ezP.Key.LIST).connection.targetBlock()
  var c10r = list.ezp.consolidator
  var yorn = false
  if (!c10r.hasInputForType(list, ezP.T3.Expr.comprehension)) {
    var has = {}
    var io = c10r.getIO(list)
    var input
    while ((input = c10r.nextInputForType(io, ezP.T3.Expr.keyword_item))) {
      var target = input.connection.targetBlock()
      if (target && (target = target.getInput(ezP.Key.KEY).connection.targetBlock())) {
        has[target.ezp.getValue(target)] = target
      }
    }
    var insert = function(key) {
      Blockly.Events.setGroup(true)
      var BB = ezP.DelegateSvg.newBlockComplete(block.workspace, ezP.T3.Expr.identifier)
      BB.ezp.setValue(BB, key)
      var B = ezP.DelegateSvg.newBlockComplete(block.workspace, ezP.T3.Expr.keyword_item)
      B.getInput(ezP.Key.KEY).connection.connect(BB.outputConnection)
      // we assume that inputList is not void
      var c8n = list.inputList[list.inputList.length-1].connection
      c8n.connect(B.outputConnection)  
      block.ezp.consolidate(block)
      Blockly.Events.setGroup(false)
    }
    var remove = function(key) {
      Blockly.Events.setGroup(true)
      var B = has[key].getParent()
      B.unplug()
      B.dispose()
      Blockly.Events.setGroup(false)
    }
    var F = function(candidate) {
      var menuItem = new ezP.MenuItem(
        ezP.Do.createSPAN(candidate+' = …', 'ezp-code'),
        has[candidate]? function() {
          remove(candidate)
        }: function() {
          insert(candidate)
        }
      )
      if (has[candidate]) {
        mgr.addRemoveChild(menuItem)
      } else {
        mgr.addInsertChild(menuItem)
      }
    }
    F('sep')
    F('end')
    F('file')
    yorn = true
  }
  return ezP.DelegateSvg.Expr.print_builtin.superClass_.populateContextMenuFirst_.call(this, block, mgr) || yorn
}

/////////// future

/**
 * Class for a DelegateSvg, future_statement.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Stmt.future_statement = function (prototypeName) {
  ezP.DelegateSvg.Stmt.future_statement.superClass_.constructor.call(this, prototypeName)
  this.model__.input.m_1 = {
    label: 'from __future__ import',
    css_class: 'ezp-code-reserved',
    key: ezP.Key.LIST,
    wrap: ezP.T3.Expr.non_void_import_identifier_as_list,
  }
  this.statementModel__.previous.check = ezP.T3.Stmt.Previous.future_statement
  this.statementModel__.next.check = ezP.T3.Stmt.Next.future_statement
}
goog.inherits(ezP.DelegateSvg.Stmt.future_statement, ezP.DelegateSvg.Stmt)
ezP.DelegateSvg.Manager.register('future_statement')
