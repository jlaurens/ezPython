/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License CeCILL-B
 */
/**
 * @fileoverview Generating Python for group blocs.
 * @author jerome.laurensu-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.Python.eyo:grp')

goog.require('eYo.Python.eyo:stmt')

Blockly.Python[eYo.Const.Grp.ANY] = function (block) {
  var STT = block.getField(eYo.Const.Field.STT).getText()
  var branch = Blockly.Python.statementToCode(block, 'SUITE')
  if (!branch.length) {
    branch = Blockly.Python.leftLines(/** @type {string} */('MISSING_STATEMENT\n'), Blockly.Python.INDENT)
  }
  return STT.length ? STT : 'MISSING_STATEMENT' + ':\n' + branch
}

Blockly.Python[eYo.Const.Grp.IF] = function (block) {
  var COND = eYo.Python.valueToCode(block, eYo.Key.COND,
    Blockly.Python.ORDER_NONE)
  var branch = Blockly.Python.statementToCode(block, 'SUITE')
  if (!branch.length) {
    branch = Blockly.Python.leftLines(/** @type {string} */('MISSING_STATEMENT\n'), Blockly.Python.INDENT)
  }
  return 'if ' + (COND.length ? COND : 'MISSING_CONDITION') + ':\n' + branch
}

Blockly.Python[eYo.Const.Grp.ELIF] = function (block) {
  var COND = eYo.Python.valueToCode(block, eYo.Key.COND,
    Blockly.Python.ORDER_NONE)
  var branch = Blockly.Python.statementToCode(block, 'SUITE')
  if (!branch.length) {
    branch = Blockly.Python.leftLines(/** @type {string} */('MISSING_STATEMENT\n'), Blockly.Python.INDENT)
  }
  return 'elif ' + (COND.length ? COND : 'MISSING_CONDITION') + ':\n' + branch
}

Blockly.Python[eYo.Const.Grp.ELSE] = function (block) {
  var branch = Blockly.Python.statementToCode(block, 'SUITE')
  if (!branch.length) {
    branch = Blockly.Python.leftLines(/** @type {string} */('MISSING_STATEMENT\n'), Blockly.Python.INDENT)
  }
  return 'else:\n' + branch
}

Blockly.Python[eYo.Const.Grp.WHILE] = function (block) {
  var COND = eYo.Python.valueToCode(block, eYo.Key.COND,
    Blockly.Python.ORDER_NONE)
  var branch = Blockly.Python.statementToCode(block, 'SUITE')
  if (!branch.length) {
    branch = Blockly.Python.leftLines(/** @type {string} */('MISSING_STATEMENT\n'), Blockly.Python.INDENT)
  }
  return 'while' + (COND.length ? COND : 'MISSING_CONDITION') + ':\n' + branch
}

Blockly.Python[eYo.Const.Grp.FOR] = function (block) {
  var target = eYo.Python.valueToCode(block, eYo.Key.FOR,
    Blockly.Python.ORDER_NONE)
  var list = eYo.Python.valueToCode(block, eYo.Key.LIST,
    Blockly.Python.ORDER_NONE)
  var branch = Blockly.Python.statementToCode(block, eYo.Key.SUITE)
  if (!branch.length) {
    branch = Blockly.Python.leftLines(/** @type {string} */('MISSING_STATEMENT\n'), Blockly.Python.INDENT)
  }
  return 'for ' + (target.length ? target : 'MISSING_TARGET') + ' in ' + (list.length ? list : 'MISSING_LIST') + ':\n' + branch
}