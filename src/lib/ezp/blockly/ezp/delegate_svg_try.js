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

goog.provide('ezP.DelegateSvg.Try')

goog.require('ezP.DelegateSvg.Group')

/**
 * Class for a DelegateSvg, try_part block.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Stmt.try_part = function (prototypeName) {
  ezP.DelegateSvg.Stmt.try_part.superClass_.constructor.call(this, prototypeName)
  this.inputModel_.first = {
    dummy: 'try',
    css_class: 'ezp-code-reserved',
  }
  this.statementModel_.previous.check = ezP.T3.Stmt.Previous.try_part
  this.statementModel_.next.check = ezP.T3.Stmt.Next.try_part
}
goog.inherits(ezP.DelegateSvg.Stmt.try_part, ezP.DelegateSvg.Group)
ezP.DelegateSvg.Manager.register('try_part')

/**
 * Class for a DelegateSvg, expression_as_name block.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.expression_as_name = function (prototypeName) {
  ezP.DelegateSvg.Expr.expression_as_name.superClass_.constructor.call(this, prototypeName)
  this.inputModel_ = {
    first: {
      key: ezP.Key.EXPRESSION,
      check: ezP.T3.Expr.Check.expression,
      hole_value: 'expression',
    },
    last: {
      key: ezP.Key.AS,
      label: 'as',
      css_class: 'ezp-code-reserved',
      check: ezP.T3.Expr.identifier,
      hole_value: 'name',
    }
  }
  this.outputModel_.check = ezP.T3.Expr.expression_as_name
}
goog.inherits(ezP.DelegateSvg.Expr.expression_as_name, ezP.DelegateSvg.Expr)
ezP.DelegateSvg.Manager.register('expression_as_name')


/**
 * Class for a DelegateSvg, except_part block.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Stmt.except_part = function (prototypeName) {
  ezP.DelegateSvg.Stmt.except_part.superClass_.constructor.call(this, prototypeName)
  this.inputModel_.first = {
    key: ezP.Key.EXPRESSION,
    label: 'except',
    css_class: 'ezp-code-reserved',
    check: ezP.T3.Expr.Check.expression_except,
    hole_value: 'expression',
  }
  this.statementModel_.previous.check = ezP.T3.Stmt.Previous.except_part
  this.statementModel_.next.check = ezP.T3.Stmt.Next.except_part
}
goog.inherits(ezP.DelegateSvg.Stmt.except_part, ezP.DelegateSvg.Group)
ezP.DelegateSvg.Manager.register('except_part')

/**
 * Class for a DelegateSvg, void_except_part block.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Stmt.void_except_part = function (prototypeName) {
  ezP.DelegateSvg.Stmt.void_except_part.superClass_.constructor.call(this, prototypeName)
  this.inputModel_.first = {
    dummy: 'except',
    css_class: 'ezp-code-reserved',
  }
  this.statementModel_.previous.check = ezP.T3.Stmt.Previous.void_except_part
  this.statementModel_.next.check = ezP.T3.Stmt.Next.void_except_part
}
goog.inherits(ezP.DelegateSvg.Stmt.void_except_part, ezP.DelegateSvg.Group)
ezP.DelegateSvg.Manager.register('void_except_part')

/**
 * Class for a DelegateSvg, finally_part block.
 * Not normally called directly, ezP.DelegateSvg.create(...) is preferred.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Stmt.finally_part = function (prototypeName) {
  ezP.DelegateSvg.Stmt.finally_part.superClass_.constructor.call(this, prototypeName)
  this.inputModel_.first = {
    dummy: 'finally',
    css_class: 'ezp-code-reserved',
  }
  this.statementModel_.previous.check = ezP.T3.Stmt.Previous.finally_part
  this.statementModel_.next.check = ezP.T3.Stmt.Next.finally_part
}
goog.inherits(ezP.DelegateSvg.Stmt.finally_part, ezP.DelegateSvg.Group)
ezP.DelegateSvg.Manager.register('finally_part')

/**
 * Class for a DelegateSvg, expression_from block.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Expr.expression_from = function (prototypeName) {
  ezP.DelegateSvg.Expr.expression_from.superClass_.constructor.call(this, prototypeName)
  this.inputModel_ = {
    first: {
      key: ezP.Key.EXPRESSION,
      check: ezP.T3.Expr.Check.expression,
      hole_value: 'expression',
    },
    last: {
      label: 'from',
      css_class: 'ezp-code-reserved',
      key: ezP.Key.FROM,
      check: ezP.T3.Expr.Check.expression,
      hole_value: 'expression',
    }
  }
  this.outputModel_.check = ezP.T3.Expr.expression_from
}
goog.inherits(ezP.DelegateSvg.Expr.expression_from, ezP.DelegateSvg.Expr)
ezP.DelegateSvg.Manager.register('expression_from')

/**
 * Class for a DelegateSvg, raise_stmt.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Stmt.raise_stmt = function (prototypeName) {
  ezP.DelegateSvg.Stmt.raise_stmt.superClass_.constructor.call(this, prototypeName)
  this.inputModel_ = {
    first: {
      label: 'raise',
      css_class: 'ezp-code-reserved',
      key: ezP.Key.RAISE,
      check: ezP.T3.Expr.Check.raise_expression,
      optional: true
    }
  }
}
goog.inherits(ezP.DelegateSvg.Stmt.raise_stmt, ezP.DelegateSvg.Stmt)
ezP.DelegateSvg.Manager.register('raise_stmt')

/**
 * Class for a DelegateSvg, assert_stmt.
 * For ezPython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
ezP.DelegateSvg.Stmt.assert_stmt = function (prototypeName) {
  ezP.DelegateSvg.Stmt.assert_stmt.superClass_.constructor.call(this, prototypeName)
  this.inputModel_ = {
    first: {
      label: 'assert',
      css_class: 'ezp-code-reserved',
      key: ezP.Key.ASSERT,
      check: ezP.T3.Expr.Check.expression
    },
    last: {
      label: ',',
      key: ezP.Key.EXPRESSION,
      check: ezP.T3.Expr.Check.expression,
      optional: true
    }
  }
}
goog.inherits(ezP.DelegateSvg.Stmt.assert_stmt, ezP.DelegateSvg.Stmt.Two)
ezP.DelegateSvg.Manager.register('assert_stmt')
