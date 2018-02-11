// This file was generated by "python types.py" on 2018-02-11 13:53:54.776878

/**
 * ezPython
 *
 * Copyright 2017 Jérôme LAURENS.
 *
 * License CeCILL-B
 */
/**
 * @fileoverview Type constants for ezPython, used as blocks prototypes.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

/**
 * @name ezP.T3.All
 * @namespace
 **/

goog.provide('ezP.T3.All')

goog.require('ezP.T3')


ezP.T3.All = {}
ezP.T3.All.core_expressions = [
    ezP.T3.Expr.a_expr_concrete,
    ezP.T3.Expr.and_expr_concrete,
    ezP.T3.Expr.and_test_concrete,
    ezP.T3.Expr.argument_list_concrete_0,
    ezP.T3.Expr.argument_list_concrete_1,
    ezP.T3.Expr.assignment_expression,
    ezP.T3.Expr.attributeref,
    ezP.T3.Expr.augmented_assignment_expression,
    ezP.T3.Expr.augop,
    ezP.T3.Expr.await_expr,
    ezP.T3.Expr.bracket_target_list,
    ezP.T3.Expr.bytesliteral,
    ezP.T3.Expr.call_expr,
    ezP.T3.Expr.call_expr,
    ezP.T3.Expr.comp_for,
    ezP.T3.Expr.comp_if,
    ezP.T3.Expr.comp_operator,
    ezP.T3.Expr.comparison_concrete,
    ezP.T3.Expr.comprehension,
    ezP.T3.Expr.conditional_expression_concrete,
    ezP.T3.Expr.defparameter_concrete,
    ezP.T3.Expr.dict_comprehension,
    ezP.T3.Expr.dict_display,
    ezP.T3.Expr.display_slice_list,
    ezP.T3.Expr.dotted_funcname_concrete,
    ezP.T3.Expr.dotted_identifier,
    ezP.T3.Expr.expression_star,
    ezP.T3.Expr.expression_star_star,
    ezP.T3.Expr.floatnumber,
    ezP.T3.Expr.from_module_import,
    ezP.T3.Expr.from_relative_module_import,
    ezP.T3.Expr.generator_expression,
    ezP.T3.Expr.identifier,
    ezP.T3.Expr.identifier_as,
    ezP.T3.Expr.imagnumber,
    ezP.T3.Expr.import_module,
    ezP.T3.Expr.inheritance,
    ezP.T3.Expr.integer,
    ezP.T3.Expr.key_datum_concrete,
    ezP.T3.Expr.keyword_item,
    ezP.T3.Expr.keywords_arguments,
    ezP.T3.Expr.lambda_expr,
    ezP.T3.Expr.lambda_expr_nocond,
    ezP.T3.Expr.list_display,
    ezP.T3.Expr.m_expr_concrete,
    ezP.T3.Expr.module_as_concrete,
    ezP.T3.Expr.module_concrete,
    ezP.T3.Expr.non_void_expression_list,
    ezP.T3.Expr.not_test_concrete,
    ezP.T3.Expr.numberliteral_concrete,
    ezP.T3.Expr.optional_expression_list,
    ezP.T3.Expr.or_expr_concrete,
    ezP.T3.Expr.or_expr_star_star,
    ezP.T3.Expr.or_test_concrete,
    ezP.T3.Expr.parameter_concrete,
    ezP.T3.Expr.parameter_list_concrete,
    ezP.T3.Expr.parameter_list_starargs,
    ezP.T3.Expr.parameter_star,
    ezP.T3.Expr.parameter_star_star,
    ezP.T3.Expr.parent_module,
    ezP.T3.Expr.parenth_argument_list,
    ezP.T3.Expr.parenth_form,
    ezP.T3.Expr.parenth_target_list,
    ezP.T3.Expr.power_concrete,
    ezP.T3.Expr.proper_slice,
    ezP.T3.Expr.set_display,
    ezP.T3.Expr.shift_expr_concrete,
    ezP.T3.Expr.slicing,
    ezP.T3.Expr.something_star,
    ezP.T3.Expr.star_expr,
    ezP.T3.Expr.starred_and_keywords,
    ezP.T3.Expr.starred_item_list,
    ezP.T3.Expr.starred_target,
    ezP.T3.Expr.stringliteral,
    ezP.T3.Expr.subscription,
    ezP.T3.Expr.target_star,
    ezP.T3.Expr.u_expr_concrete,
    ezP.T3.Expr.with_item_concrete,
    ezP.T3.Expr.xor_expr_concrete,
    ezP.T3.Expr.yield_atom,
    ezP.T3.Expr.yield_expression_list,
    ezP.T3.Expr.yield_from_expression,
]
ezP.T3.All.lists = [
    ezP.T3.Expr.comp_iter_list,
    ezP.T3.Expr.dotted_name,
    ezP.T3.Expr.identifier_list,
    ezP.T3.Expr.key_datum_list,
    ezP.T3.Expr.non_void_identifier_as_list,
    ezP.T3.Expr.non_void_module_as_list,
    ezP.T3.Expr.non_void_starred_item_list,
    ezP.T3.Expr.slice_list,
    ezP.T3.Expr.stmt_list,
    ezP.T3.Expr.target_list,
    ezP.T3.Expr.with_item_list,
]
ezP.T3.All.wrappers = [
    ezP.T3.Expr.a_expr,
    ezP.T3.Expr.algebra_concrete,
    ezP.T3.Expr.and_expr,
    ezP.T3.Expr.and_test,
    ezP.T3.Expr.any_argument,
    ezP.T3.Expr.any_argument_but_expression,
    ezP.T3.Expr.any_argument_but_star_star,
    ezP.T3.Expr.any_argument_comprehensive,
    ezP.T3.Expr.argument_list,
    ezP.T3.Expr.assigned_expression,
    ezP.T3.Expr.atom,
    ezP.T3.Expr.aug_assigned,
    ezP.T3.Expr.augtarget,
    ezP.T3.Expr.await_or_primary,
    ezP.T3.Expr.bitwise_concrete,
    ezP.T3.Expr.boolean_concrete,
    ezP.T3.Expr.comp_iter,
    ezP.T3.Expr.comparison,
    ezP.T3.Expr.conditional_expression,
    ezP.T3.Expr.defparameter,
    ezP.T3.Expr.dotted_funcname,
    ezP.T3.Expr.enclosure,
    ezP.T3.Expr.expression,
    ezP.T3.Expr.expression_nocond,
    ezP.T3.Expr.import_expr,
    ezP.T3.Expr.key_datum,
    ezP.T3.Expr.key_datum_list_comprehensive,
    ezP.T3.Expr.literal,
    ezP.T3.Expr.m_expr,
    ezP.T3.Expr.module,
    ezP.T3.Expr.module_as,
    ezP.T3.Expr.non_void_starred_item_list_comprehensive,
    ezP.T3.Expr.not_test,
    ezP.T3.Expr.numberliteral,
    ezP.T3.Expr.or_expr,
    ezP.T3.Expr.or_test,
    ezP.T3.Expr.parameter,
    ezP.T3.Expr.parameter_any,
    ezP.T3.Expr.parameter_list,
    ezP.T3.Expr.parameter_no_single_star,
    ezP.T3.Expr.parameter_no_star,
    ezP.T3.Expr.parameter_no_star_star,
    ezP.T3.Expr.power,
    ezP.T3.Expr.primary,
    ezP.T3.Expr.relative_module,
    ezP.T3.Expr.shift_expr,
    ezP.T3.Expr.slice_item,
    ezP.T3.Expr.starred_item,
    ezP.T3.Expr.target,
    ezP.T3.Expr.u_expr,
    ezP.T3.Expr.unary_concrete,
    ezP.T3.Expr.with_item,
    ezP.T3.Expr.xor_expr,
    ezP.T3.Expr.yield_expression,
]
ezP.T3.All.part_statements = [
    ezP.T3.Stmt.classdef_part,
    ezP.T3.Stmt.decorator_part,
    ezP.T3.Stmt.elif_part,
    ezP.T3.Stmt.else_part,
    ezP.T3.Stmt.except_part,
    ezP.T3.Stmt.finally_part,
    ezP.T3.Stmt.for_part,
    ezP.T3.Stmt.funcdef_part,
    ezP.T3.Stmt.if_part,
    ezP.T3.Stmt.import_part,
    ezP.T3.Stmt.try_part,
    ezP.T3.Stmt.void_except_part,
    ezP.T3.Stmt.while_part,
    ezP.T3.Stmt.with_part,
]
ezP.T3.All.simple_statements = [
    ezP.T3.Stmt.annotated_assignment_stmt,
    ezP.T3.Stmt.assert_stmt,
    ezP.T3.Stmt.assignment_stmt,
    ezP.T3.Stmt.augmented_assignment_stmt,
    ezP.T3.Stmt.break_stmt,
    ezP.T3.Stmt.continue_stmt,
    ezP.T3.Stmt.decorators,
    ezP.T3.Stmt.del_stmt,
    ezP.T3.Stmt.docstring_def_stmt,
    ezP.T3.Stmt.docstring_top_stmt,
    ezP.T3.Stmt.expression_stmt,
    ezP.T3.Stmt.future_statement,
    ezP.T3.Stmt.global_or_nonlocal_stmt,
    ezP.T3.Stmt.global_stmt,
    ezP.T3.Stmt.import_stmt,
    ezP.T3.Stmt.main_stmt,
    ezP.T3.Stmt.nonlocal_stmt,
    ezP.T3.Stmt.pass_stmt,
    ezP.T3.Stmt.raise_stmt,
    ezP.T3.Stmt.return_stmt,
    ezP.T3.Stmt.simple_stmt,
    ezP.T3.Stmt.yield_stmt,
]
ezP.T3.All.compound_statements = [
    ezP.T3.Stmt.async_for_stmt,
    ezP.T3.Stmt.async_funcdef,
    ezP.T3.Stmt.async_with_stmt,
    ezP.T3.Stmt.classdef,
    ezP.T3.Stmt.compound_stmt,
    ezP.T3.Stmt.for_stmt,
    ezP.T3.Stmt.if_stmt,
    ezP.T3.Stmt.try1_stmt,
    ezP.T3.Stmt.try2_stmt,
    ezP.T3.Stmt.try_stmt,
    ezP.T3.Stmt.while_stmt,
    ezP.T3.Stmt.with_stmt,
]