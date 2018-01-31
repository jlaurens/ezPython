/**
 * ezPython
 *
 * Copyright 2017 Jérôme LAURENS.
 *
 * License CeCILL-B
 */
/**
 * @fileoverview BlockSvg delegates for ezPython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('ezP.DelegateSvg.Expr.Delimited')

goog.require('ezP.DelegateSvg.Expr')

/**
 * Class for a DelegateSvg, parenth_form.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.parenth_form = function (prototypeName) {
  ezP.DelegateSvg.Expr.parenth_form.superClass_.constructor.call(this, prototypeName)
  this.outputCheck = ezP.T3.parenth_form
  this.sealedPrototypeName = ezP.Const.Expr.starred_item_list
  this.inputData = {
    first: {
      check: ezP.T3.starred_item_list,
      label: '(',
      wrap: ezP.Const.Expr.starred_item_list
    }
  }
  this.labelEnd = ')'
}
goog.inherits(ezP.DelegateSvg.Expr.parenth_form, ezP.DelegateSvg.Expr)

ezP.DelegateSvg.Manager.register(ezP.Const.Expr.parenth_form, ezP.DelegateSvg.Expr.parenth_form)

/**
 * Class for a DelegateSvg, list_display block.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.list_display = function (prototypeName) {
  ezP.DelegateSvg.Expr.list_display.superClass_.constructor.call(this, prototypeName)
  this.inputData = {
    first: {
      check: ezP.T3.starred_list_comprehensive,
      label: '[',
      wrap: ezP.Const.Expr.starred_list_comprehensive
    }
  }
  this.labelEnd = ']'
}
goog.inherits(ezP.DelegateSvg.Expr.list_display, ezP.DelegateSvg.Expr)

ezP.DelegateSvg.Manager.register(ezP.Const.Expr.list_display, ezP.DelegateSvg.Expr.list_display)

/**
 * Class for a DelegateSvg, set_display block.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.set_display = function (prototypeName) {
  ezP.DelegateSvg.Expr.set_display.superClass_.constructor.call(this, prototypeName)
  this.inputData = {
    first: {
      check: ezP.T3.non_void_starred_list_comprehensive,
      label: '{',
      wrap: ezP.Const.Expr.non_void_starred_list_comprehensive
    }
  }
  this.labelEnd = '}'
  this.outputCheck = ezP.T3.set_display
}
goog.inherits(ezP.DelegateSvg.Expr.set_display, ezP.DelegateSvg.Expr)

ezP.DelegateSvg.Manager.register(ezP.Const.Expr.set_display, ezP.DelegateSvg.Expr.set_display)

/**
 * Class for a DelegateSvg, dict_display block.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.dict_display = function (prototypeName) {
  ezP.DelegateSvg.Expr.dict_display.superClass_.constructor.call(this, prototypeName)
  this.inputData = {
    first: {
      check: ezP.T3.key_datum_list_comprehensive,
      label: '{',
      wrap: ezP.Const.Expr.key_datum_list_comprehensive
    }
  }
  this.labelEnd = '}'
  this.outputCheck = ezP.T3.dict_display
}
goog.inherits(ezP.DelegateSvg.Expr.dict_display, ezP.DelegateSvg.Expr)

ezP.DelegateSvg.Manager.register(ezP.Const.Expr.dict_display, ezP.DelegateSvg.Expr.dict_display)

/**
 * Class for a DelegateSvg, generator expression block.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.generator_expression = function (prototypeName) {
  ezP.DelegateSvg.Expr.generator_expression.superClass_.constructor.call(this, prototypeName)
  this.inputData = {
    first: {
      check: ezP.T3.comprehension,
      label: '{',
      wrap: ezP.Const.Expr.comprehension
    }
  }
  this.labelEnd = '}'
  this.outputCheck = ezP.T3.generator_expression
}
goog.inherits(ezP.DelegateSvg.Expr.generator_expression, ezP.DelegateSvg.Expr)

ezP.DelegateSvg.Manager.register(ezP.Const.Expr.generator_expression, ezP.DelegateSvg.Expr.generator_expression)

/**
 * Class for a DelegateSvg, 'slice ...' block.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.display_slice_list = function (prototypeName) {
  ezP.DelegateSvg.Expr.display_slice_list.superClass_.constructor.call(this, prototypeName)
  this.inputData = {
    first: {
      check: ezP.T3.slice_list,
      label: '[',
      wrap: ezP.Const.Expr.slice_list
    }
  }
  this.labelEnd = ']'
  this.outputCheck = ezP.T3.display_slice_list
}
goog.inherits(ezP.DelegateSvg.Expr.display_slice_list, ezP.DelegateSvg.Expr)

ezP.DelegateSvg.Manager.register(ezP.Const.Expr.display_slice_list, ezP.DelegateSvg.Expr.display_slice_list)
