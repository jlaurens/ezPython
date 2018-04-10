/**
 * ezPython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License CeCILL-B
 */

/**
 * @fileoverview helper for ezPython.
 * This file is for development only.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('ezP.Development')

goog.require('ezP.DelegateSvg')
goog.require('ezP.DelegateSvg.Import')

ezP.Do.arraysMerged = function(/* list of arrays */) {
  var RA = []
  for (var i = 0, Xs; Xs = arguments[i++];) {
    goog.array.extend(RA,Xs)
  }
  goog.array.removeDuplicates(RA)
  return RA
}

/**
 * Useful for development purposes only.
 * This is a series of arrays of block prototypes
 * related to the given delegate.
 * in order to load the corresponding blocks in the workspace,
 * issue the following command in your main html file
 * ezP.DelegateSvg.(Expr|Stmt).(prototype).workspaceBlocks, 5, offset, step)
 */
ezP.DelegateSvg.workspaceBlocks = []

ezP.DelegateSvg.Expr.workspaceBlocks = [
  ezP.T3.Expr.floatnumber,
/*  ezP.T3.Expr.integer,
  ezP.T3.Expr.imagnumber,
  ezP.T3.Expr.shortstringliteral,
  ezP.T3.Expr.shortbytesliteral,
  ezP.T3.Expr.longstringliteral,
  ezP.T3.Expr.longbytesliteral,
  ezP.T3.Expr.u_expr_concrete,
  ezP.T3.Expr.not_test_concrete,
  ezP.T3.Expr.power_concrete,
  ezP.T3.Expr.m_expr_concrete,
  ezP.T3.Expr.a_expr_concrete,
  ezP.T3.Expr.shift_expr_concrete,
  ezP.T3.Expr.and_expr_concrete,
  ezP.T3.Expr.xor_expr_concrete,
  ezP.T3.Expr.or_expr_concrete,
  ezP.T3.Expr.or_test_concrete,
  ezP.T3.Expr.and_test_concrete,
  ezP.T3.Expr.comprehension,
  ezP.T3.Expr.comp_for,
  ezP.T3.Expr.comp_if,
  */
  ezP.T3.Expr.non_void_expression_list,
  ezP.T3.Expr.parenth_form,
  ezP.T3.Expr.list_display,
  ezP.T3.Expr.set_display,
  ezP.T3.Expr.dict_display,
  ezP.T3.Expr.dict_comprehension,
  ezP.T3.Expr.generator_expression,
  ezP.T3.Expr.yield_atom,
  ezP.T3.Expr.yield_expression,
  ezP.T3.Expr.yield_from_expression,
]

/**
 * Useful for development purposes only.
 * This is an array of block prototypes
 * related to the given delegate.
 */

ezP.DelegateSvg.Expr.delimitedWorkspaceBlocks = [
  ezP.T3.Expr.parenth_form,
  ezP.T3.Expr.list_display,
  ezP.T3.Expr.set_display,
  ezP.T3.Expr.dict_display,
  ezP.T3.Expr.generator_expression,
  ezP.T3.Expr.display_slice_list,
  ezP.T3.Expr.starred_item_list,
  ezP.T3.Expr.parenth_target_list,
  ezP.T3.Expr.bracket_target_list,
  ezP.T3.Expr.yield_atom,
]

ezP.DelegateSvg.Expr.argument_list_comprehensive.workspaceBlocks = ezP.DelegateSvg.Expr.argument_list.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Expr.argument_list,
  ezP.T3.Expr.expression_star,
  ezP.T3.Expr.expression_star_star,
  ezP.T3.Expr.keyword_item,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.argument_list_comprehensive,
  ezP.T3.Expr.comprehension,
] , null/*ezP.T3.Expr.Check.expression*/)


ezP.DelegateSvg.Expr.import_module.workspaceBlocks = [
  ezP.T3.Expr.non_void_module_as_list,
  ezP.T3.Expr.import_module,
  ezP.T3.Expr.module_as_concrete,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.module_concrete,
]

ezP.DelegateSvg.Expr.from_relative_module_import.workspaceBlocks = [
  ezP.T3.Expr.non_void_import_identifier_as_list,
  ezP.T3.Expr.from_relative_module_import,
  ezP.T3.Expr.import_identifier_as_concrete,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.parent_module,
  ezP.T3.Expr.module_concrete,
]

ezP.DelegateSvg.Expr.from_module_import.workspaceBlocks = [ezP.T3.Expr.from_module_import].concat(ezP.T3.Expr.Check.module)

ezP.DelegateSvg.Stmt.import_stmt.workspaceBlocks = [ezP.T3.Stmt.import_stmt].concat(ezP.DelegateSvg.Expr.import_module.workspaceBlocks).concat(ezP.DelegateSvg.Expr.from_relative_module_import.workspaceBlocks).concat(ezP.DelegateSvg.Expr.from_module_import.workspaceBlocks)

ezP.DelegateSvg.Expr.dict_comprehension.workspaceBlocks =
ezP.DelegateSvg.Expr.comprehension.workspaceBlocks = [
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.comp_for,
  ezP.T3.Expr.comp_if,
  ezP.T3.Expr.target_list,
  ezP.T3.Expr.comp_iter_list,
  ezP.T3.Expr.comprehension,
  ezP.T3.Expr.key_datum_concrete,
  ezP.T3.Expr.dict_comprehension,
]

ezP.DelegateSvg.Expr.dict_comprehension.workspaceBlocks = [
  ezP.T3.Expr.comprehension,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.comp_for,
  ezP.T3.Expr.comp_if,
  ezP.T3.Expr.target_list,
  ezP.T3.Expr.comp_iter_list,
]

ezP.DelegateSvg.Expr.a_expr_concrete.workspaceBlocks = 
ezP.DelegateSvg.Expr.m_expr_concrete.workspaceBlocks = 
ezP.DelegateSvg.Expr.u_expr_concrete.workspaceBlocks = [
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.a_expr_concrete,
  ezP.T3.Expr.m_expr_concrete,
  ezP.T3.Expr.u_expr_concrete,
]

ezP.DelegateSvg.Expr.shift_expr_concrete.workspaceBlocks = 
ezP.DelegateSvg.Expr.and_expr_concrete.workspaceBlocks = 
ezP.DelegateSvg.Expr.xor_expr_concrete.workspaceBlocks = 
ezP.DelegateSvg.Expr.or_expr_concrete.workspaceBlocks = [
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.shift_expr_concrete,
  ezP.T3.Expr.and_expr_concrete,
  ezP.T3.Expr.xor_expr_concrete,
  ezP.T3.Expr.or_expr_concrete,
]

ezP.DelegateSvg.Expr.number_comparison.workspaceBlocks = 
ezP.DelegateSvg.Expr.object_comparison.workspaceBlocks = [
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.number_comparison,
  ezP.T3.Expr.object_comparison,
]

ezP.DelegateSvg.Expr.and_test_concrete.workspaceBlocks = 
ezP.DelegateSvg.Expr.or_test_concrete.workspaceBlocks = [
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.and_test_concrete,
  ezP.T3.Expr.or_test_concrete,
]

ezP.DelegateSvg.Expr.augassign_numeric.workspaceBlocks = 
ezP.DelegateSvg.Expr.augassign_bitwise.workspaceBlocks = [
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.augassign_numeric,
  ezP.T3.Expr.augassign_bitwise,
  ezP.T3.Expr.augassign_list_concrete,
]

ezP.DelegateSvg.Expr.optional_expression_list.workspaceBlocks = [
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.optional_expression_list,
]

ezP.DelegateSvg.Expr.key_datum_list_comprehensive.workspaceBlocks = [
  ezP.T3.Expr.key_datum_concrete,
  ezP.T3.Expr.dict_comprehension,
  ezP.T3.Expr.key_datum_list_comprehensive,
]

ezP.DelegateSvg.Stmt.yield_stmt.workspaceBlocks =
ezP.DelegateSvg.Expr.yield_expression.workspaceBlocks = [
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.yield_expression,
  ezP.T3.Stmt.yield_stmt,
  ezP.T3.Expr.yield_atom,
  ezP.T3.Expr.yield_expression_list,
  ezP.T3.Expr.yield_from_expression,
]

ezP.DelegateSvg.Stmt.import_stmt.workspaceBlocks = [
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.module_as_concrete,
  ezP.T3.Expr.module_concrete,
  ezP.T3.Expr.non_void_module_as_list,
  ezP.T3.Expr.import_module,
  ezP.T3.Expr.import_identifier_as_concrete,
  ezP.T3.Expr.non_void_import_identifier_as_list,
  ezP.T3.Expr.parent_module,
  ezP.T3.Expr.from_relative_module_import,
  ezP.T3.Stmt.import_stmt,
  ezP.T3.Expr.from_module_import,
  ezP.T3.Expr.import_module,
  ezP.T3.Stmt.future_statement,
]

ezP.DelegateSvg.Stmt.if_part.workspaceBlocks =
ezP.DelegateSvg.Stmt.while_part.workspaceBlocks =
ezP.DelegateSvg.Stmt.for_part.workspaceBlocks =
ezP.DelegateSvg.Stmt.with_part.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Stmt.if_part,
  ezP.T3.Stmt.elif_part,
  ezP.T3.Stmt.else_part,
  ezP.T3.Stmt.while_part,
  ezP.T3.Stmt.for_part,
  ezP.T3.Stmt.with_part,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.target_list,
  ezP.T3.Expr.expression_list,
  ezP.T3.Expr.with_item_list,
],
ezP.T3.Expr.Check.expression)

ezP.DelegateSvg.Expr.lambda_expression.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Expr.parameter_list,
  ezP.T3.Expr.lambda_expression,
  ezP.T3.Expr.identifier,
],
ezP.T3.Expr.Check.parameter_any,
ezP.T3.Expr.Check.expression,
ezP.T3.Expr.Check.expression_nocond,
)

ezP.DelegateSvg.Expr.parameter_list.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Expr.parameter_list,
  ezP.T3.Expr.identifier,
],
ezP.T3.Expr.Check.parameter_any,
)

ezP.DelegateSvg.Stmt.expression_stmt.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Stmt.expression_stmt,
],
ezP.T3.Expr.Check.expression,
)

ezP.DelegateSvg.Expr.argument_list_comprehensive.workspaceBlocks = ezP.DelegateSvg.Expr.argument_list.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Expr.argument_list,
  ezP.T3.Expr.expression_star,
  ezP.T3.Expr.expression_star_star,
  ezP.T3.Expr.keyword_item,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.argument_list_comprehensive,
  ezP.T3.Expr.comprehension,
] , null/*ezP.T3.Expr.Check.expression*/)

ezP.DelegateSvg.Expr.input_builtin.workspaceBlocks = 
ezP.DelegateSvg.Stmt.print_stmt.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Expr.list_builtin,
  ezP.T3.Expr.sum_builtin,
  ezP.T3.Expr.range_builtin,
  ezP.T3.Expr.input_builtin,
  ezP.T3.Expr.print_builtin,
  ezP.T3.Stmt.print_stmt,
],
ezP.DelegateSvg.Expr.argument_list_comprehensive.workspaceBlocks,
)

ezP.DelegateSvg.Stmt.global_nonlocal_stmt.workspaceBlocks =
[
  ezP.T3.Stmt.global_nonlocal_stmt,
  ezP.T3.Expr.non_void_identifier_list,
  ezP.T3.Expr.identifier,
]

ezP.DelegateSvg.Stmt.comment_stmt.workspaceBlocks = [
  ezP.T3.Stmt.comment_stmt,
]

ezP.DelegateSvg.Expr.shortliteral.workspaceBlocks = 
ezP.DelegateSvg.Expr.numberliteral.workspaceBlocks = [
  ezP.T3.Expr.shortstringliteral,
  ezP.T3.Expr.integer,
  ezP.T3.Expr.floatnumber,
  ezP.T3.Expr.imagnumber,
]

ezP.DelegateSvg.Expr.starred_item_list_comprehensive.workspaceBlocks = [
  ezP.T3.Expr.starred_item_list_comprehensive,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.comprehension,
]

ezP.DelegateSvg.Expr.list_display.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Expr.starred_item_list_comprehensive,
  ezP.T3.Expr.list_display,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.star_expr,
  ezP.T3.Expr.comprehension,
], ezP.T3.Expr.Check.starred_item)

ezP.DelegateSvg.Expr.decorator_expr.workspaceBlocks =
ezP.DelegateSvg.Expr.funcdef_simple.workspaceBlocks =
ezP.DelegateSvg.Stmt.funcdef_part.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Stmt.decorator_stmt,
  ezP.T3.Expr.decorator_expr,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.dotted_funcname_concrete,
  ezP.T3.Expr.decorator_call_expr,
  ezP.T3.Expr.funcdef_simple,
  ezP.T3.Expr.funcdef_typed,
  ezP.T3.Stmt.funcdef_part,
],
ezP.DelegateSvg.Expr.parameter_list.workspaceBlocks)

ezP.DelegateSvg.Stmt.classdef_part.workspaceBlocks =
ezP.DelegateSvg.Expr.classdef_simple.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Stmt.decorator_stmt,
  ezP.T3.Expr.classdef_simple,
  ezP.T3.Expr.classdef_derived,
  ezP.T3.Stmt.classdef_part,
  ezP.T3.Stmt.assignment_stmt,
],
ezP.DelegateSvg.Expr.argument_list.workspaceBlocks)

ezP.DelegateSvg.Stmt.assignment_stmt.workspaceBlocks =
ezP.DelegateSvg.Expr.target_list.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Stmt.assignment_stmt,
  ezP.T3.Expr.assignment_expression,
  ezP.T3.Expr.target_list,
  ezP.T3.Expr.void_target_list,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.yield_expression,
],
ezP.T3.Expr.Check.assigned_list,
ezP.T3.Expr.Check.target_unstar,
ezP.T3.Expr.Check.target,
ezP.T3.Expr.Check.slice_item,
ezP.T3.Expr.Check.assigned_expression)

ezP.DelegateSvg.Stmt.augassign_numeric_stmt.workspaceBlocks =
ezP.DelegateSvg.Expr.augassign_numeric.workspaceBlocks =
ezP.DelegateSvg.Stmt.augassign_bitwise_stmt.workspaceBlocks =
ezP.DelegateSvg.Expr.augassign_bitwise.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Stmt.augassign_numeric_stmt,
  ezP.T3.Expr.augassign_numeric,
  ezP.T3.Stmt.augassign_bitwise_stmt,
  ezP.T3.Expr.augassign_bitwise,
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.yield_expression_list,
  ezP.T3.Expr.yield_from_expression,
  ezP.T3.Expr.augassign_list,
],
ezP.T3.Expr.Check.augassign_list)

ezP.DelegateSvg.Expr.longliteral.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Expr.longstringliteral,
  ezP.T3.Stmt.docstring_top_stmt,
  ezP.T3.Stmt.docstring_def_stmt,
  ezP.T3.Stmt.funcdef_part,
  ezP.T3.Stmt.classdef_part,
  ezP.T3.Stmt.import_stmt,
  ezP.T3.Stmt.pass_stmt,
  ezP.T3.Stmt.break_stmt,
  ezP.T3.Stmt.continue_stmt,
  ezP.T3.Stmt.comment_stmt,
])

ezP.DelegateSvg.Stmt.try_part.workspaceBlocks =
ezP.DelegateSvg.Stmt.raise_stmt.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.expression_from,
  ezP.T3.Stmt.raise_stmt,
  ezP.T3.Expr.longstringliteral,
  ezP.T3.Expr.identifier,
  ezP.T3.Stmt.try_part,
  ezP.T3.Stmt.except_part,
  ezP.T3.Expr.expression_as_name,
  ezP.T3.Stmt.void_except_part,
  ezP.T3.Stmt.else_part,
  ezP.T3.Stmt.finally_part,
  ezP.T3.Stmt.pass_stmt,
  ezP.T3.Stmt.comment_stmt,
])


// in progress

ezP.DelegateSvg.Expr.power_concrete.workspaceBlocks = ezP.Do.arraysMerged([
  ezP.T3.Expr.power_concrete,
], ezP.T3.Expr.Check.await_or_primary, ezP.T3.Expr.Check.u_expr)

ezP.DelegateSvg.Expr.conditional_expression_concrete.workspaceBlocks = [
  ezP.T3.Expr.conditional_expression_concrete,
].concat(ezP.T3.Expr.Check.or_test).concat(ezP.T3.Expr.Check.expression)

ezP.DelegateSvg.Expr.starred_item_list.workspaceBlocks = [
  ezP.T3.Expr.starred_item_list,
] .concat(ezP.T3.Expr.Check.starred_item)

ezP.DelegateSvg.Expr.display_slice_list.workspaceBlocks =
ezP.DelegateSvg.Expr.generator_expression.workspaceBlocks =
ezP.DelegateSvg.Expr.dict_display.workspaceBlocks =
ezP.DelegateSvg.Expr.set_display.workspaceBlocks =
ezP.DelegateSvg.Expr.parenth_form.workspaceBlocks =
ezP.Do.arraysMerged(
[
  ezP.T3.Expr.identifier,
  ezP.T3.Expr.starred_item_list,
  ezP.T3.Expr.parenth_form,
  ezP.T3.Expr.non_void_starred_item_list_comprehensive,
  ezP.T3.Expr.set_display,
  ezP.T3.Expr.key_datum_concrete,
  ezP.T3.Expr.key_datum_list_comprehensive,
  ezP.T3.Expr.dict_display,
],
ezP.DelegateSvg.Expr.comprehension.workspaceBlocks,
[
  ezP.T3.Expr.generator_expression,
  ezP.T3.Expr.slice_list,
  ezP.T3.Expr.display_slice_list,
],
)

