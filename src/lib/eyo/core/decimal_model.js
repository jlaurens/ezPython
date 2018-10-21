/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview decimal model. Automatically generated by `python3 bin/helpers/modulebot.py decimal`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.Model.decimal__module')
goog.provide('eYo.Model.decimal__module.Item')

goog.require('eYo.Model')
goog.require('eYo.Model.Item')

/**
 * @constructor
 * @param {*} model 
 */
eYo.Model.decimal__module.Item = function (model) {
  eYo.Model.decimal__module.Item.superClass_.constructor.call(this, model)
}

var Item = eYo.Model.decimal__module.Item

goog.inherits(Item, eYo.Model.Item)

/**
 * model
 */
Item.prototype.model = eYo.Model.decimal__module


eYo.Model.decimal__module.data = {
  categories: [
    'decimal-objects',
    'context-objects',
    'constants',
    'rounding-modes',
    'signals'
  ],
  types: [
    'class',
    'method',
    'function',
    'first last data',
    'data'
  ],
  items: [
    new Item({
      name: 'Decimal',
      class: 'decimal',
      category: 0,
      type_: 0,
      ary: 2,
      mandatory: 0,
      arguments: [
        {
          name: 'value',
          default: '"0"'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'adjusted',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'as_integer_ratio',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'as_tuple',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'canonical',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'compare',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'compare_signal',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'compare_total',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'compare_total_mag',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'conjugate',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'copy_abs',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'copy_negate',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'copy_sign',
      category: 0,
      type_: 1,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'exp',
      category: 0,
      type_: 1,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'from_float',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'f'
        }
      ]
    }),
    new Item({
      name: 'fma',
      category: 0,
      type_: 1,
      ary: 3,
      mandatory: 2,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'third'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'is_canonical',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'is_finite',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'is_infinite',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'is_nan',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'is_normal',
      category: 0,
      type_: 1,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'is_qnan',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'is_signed',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'is_snan',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'is_subnormal',
      category: 0,
      type_: 1,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'is_zero',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'ln',
      category: 0,
      type_: 1,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'log10',
      category: 0,
      type_: 1,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'logb',
      category: 0,
      type_: 1,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'logical_and',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'logical_invert',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'logical_or',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'logical_xor',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'max',
      category: 0,
      type_: 1,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'max_mag',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'min',
      category: 0,
      type_: 1,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'min_mag',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'next_minus',
      category: 0,
      type_: 1,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'next_plus',
      category: 0,
      type_: 1,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'next_toward',
      category: 0,
      type_: 1,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'normalize',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'number_class',
      category: 0,
      type_: 1,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'quantize',
      category: 0,
      type_: 1,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'exp'
        },
        {
          name: 'rounding',
          default: 'None'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'radix',
      category: 0,
      type_: 1
    }),
    new Item({
      name: 'remainder_near',
      category: 0,
      type_: 1,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'rotate',
      category: 0,
      type_: 1,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'same_quantum',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'scaleb',
      category: 0,
      type_: 1,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'shift',
      category: 0,
      type_: 1,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'other'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'sqrt',
      category: 0,
      type_: 1,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'to_eng_string',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'to_integral',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 0,
      arguments: [
        {
          name: 'rounding',
          default: 'None'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'to_integral_exact',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 0,
      arguments: [
        {
          name: 'rounding',
          default: 'None'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'to_integral_value',
      category: 0,
      type_: 1,
      stmt: true,
      ary: 2,
      mandatory: 0,
      arguments: [
        {
          name: 'rounding',
          default: 'None'
        },
        {
          name: 'context',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'getcontext',
      class: 'decimal',
      category: 1,
      type_: 2
    }),
    new Item({
      name: 'setcontext',
      class: 'decimal',
      category: 1,
      type_: 2,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'c'
        }
      ]
    }),
    new Item({
      name: 'localcontext',
      class: 'decimal',
      category: 1,
      type_: 2,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'ctx',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'BasicContext',
      category: 1,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'ExtendedContext',
      category: 1,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'DefaultContext',
      category: 1,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'Context',
      class: 'decimal',
      category: 1,
      type_: 0,
      stmt: true,
      ary: 8,
      mandatory: 0,
      arguments: [
        {
          name: 'prec',
          default: 'None'
        },
        {
          name: 'rounding',
          default: 'None'
        },
        {
          name: 'Emin',
          default: 'None'
        },
        {
          name: 'Emax',
          default: 'None'
        },
        {
          name: 'capitals',
          default: 'None'
        },
        {
          name: 'clamp',
          default: 'None'
        },
        {
          name: 'flags',
          default: 'None'
        },
        {
          name: 'traps',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'clear_flags',
      category: 1,
      type_: 1,
      stmt: true
    }),
    new Item({
      name: 'clear_traps',
      category: 1,
      type_: 1,
      stmt: true
    }),
    new Item({
      name: 'copy',
      category: 1,
      type_: 1
    }),
    new Item({
      name: 'copy_decimal',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'num'
        }
      ]
    }),
    new Item({
      name: 'create_decimal',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'num'
        }
      ]
    }),
    new Item({
      name: 'create_decimal_from_float',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'f'
        }
      ]
    }),
    new Item({
      name: 'Etiny',
      category: 1,
      type_: 1
    }),
    new Item({
      name: 'Etop',
      category: 1,
      type_: 1
    }),
    new Item({
      name: 'abs',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'add',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'canonical',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'compare',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'compare_signal',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'compare_total',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'compare_total_mag',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'copy_abs',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'copy_negate',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'copy_sign',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'divide',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'divide_int',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'divmod',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'exp',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'fma',
      category: 1,
      type_: 1,
      ary: 3,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        },
        {
          name: 'z'
        }
      ]
    }),
    new Item({
      name: 'is_canonical',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'is_finite',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'is_infinite',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'is_nan',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'is_normal',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'is_qnan',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'is_signed',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'is_snan',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'is_subnormal',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'is_zero',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'ln',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'log10',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'logb',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'logical_and',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'logical_invert',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'logical_or',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'logical_xor',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'max',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'max_mag',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'min',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'min_mag',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'minus',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'multiply',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'next_minus',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'next_plus',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'next_toward',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'normalize',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'number_class',
      category: 1,
      type_: 1,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'plus',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'power',
      category: 1,
      type_: 1,
      ary: 3,
      mandatory: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        },
        {
          name: 'modulo',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'quantize',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'radix',
      category: 1,
      type_: 1
    }),
    new Item({
      name: 'remainder',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'remainder_near',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'rotate',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'same_quantum',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'scaleb',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'shift',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'sqrt',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'subtract',
      category: 1,
      type_: 1,
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'to_eng_string',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'to_integral_exact',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'to_sci_string',
      category: 1,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'MAX_PREC',
      category: 2,
      type_: 3,
      stmt: true
    }),
    new Item({
      name: 'MAX_EMAX',
      category: 2,
      type_: 3,
      stmt: true
    }),
    new Item({
      name: 'MIN_EMIN',
      category: 2,
      type_: 3,
      stmt: true
    }),
    new Item({
      name: 'MIN_ETINY',
      category: 2,
      type_: 3,
      stmt: true
    }),
    new Item({
      name: 'HAVE_THREADS',
      category: 2,
      type_: 4,
      stmt: true
    }),
    new Item({
      name: 'ROUND_CEILING',
      category: 3,
      type_: 4,
      stmt: true
    }),
    new Item({
      name: 'ROUND_DOWN',
      category: 3,
      type_: 4,
      stmt: true
    }),
    new Item({
      name: 'ROUND_FLOOR',
      category: 3,
      type_: 4,
      stmt: true
    }),
    new Item({
      name: 'ROUND_HALF_DOWN',
      category: 3,
      type_: 4,
      stmt: true
    }),
    new Item({
      name: 'ROUND_HALF_EVEN',
      category: 3,
      type_: 4,
      stmt: true
    }),
    new Item({
      name: 'ROUND_HALF_UP',
      category: 3,
      type_: 4,
      stmt: true
    }),
    new Item({
      name: 'ROUND_UP',
      category: 3,
      type_: 4,
      stmt: true
    }),
    new Item({
      name: 'ROUND_05UP',
      category: 3,
      type_: 4,
      stmt: true
    }),
    new Item({
      name: 'Clamped',
      category: 4,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'DecimalException',
      category: 4,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'DivisionByZero',
      category: 4,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'Inexact',
      category: 4,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'InvalidOperation',
      category: 4,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'Overflow',
      category: 4,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'Rounded',
      category: 4,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'Subnormal',
      category: 4,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'Underflow',
      category: 4,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'FloatOperation',
      category: 4,
      type_: 0,
      stmt: true
    })
  ],
  by_name: {
    'InvalidOperation': 144,
    'Inexact': 143,
    'as_integer_ratio': 2,
    'copy_decimal': 64,
    'scaleb': 120,
    'is_signed': 90,
    'divide_int': 80,
    'to_eng_string': 124,
    'divide': 79,
    'radix': 115,
    'from_float': 14,
    'compare_total': 74,
    'DecimalException': 141,
    'copy_abs': 76,
    'ROUND_05UP': 139,
    'is_infinite': 86,
    'Etiny': 67,
    'is_normal': 88,
    'is_qnan': 89,
    'ln': 94,
    'HAVE_THREADS': 131,
    'ROUND_HALF_UP': 137,
    'compare': 72,
    'number_class': 111,
    'conjugate': 9,
    'is_finite': 85,
    'rotate': 118,
    'compare_total_mag': 75,
    'next_minus': 107,
    'logical_xor': 100,
    'max_mag': 102,
    'logb': 96,
    'same_quantum': 119,
    'ExtendedContext': 58,
    'ROUND_UP': 138,
    'ROUND_DOWN': 133,
    'max': 101,
    'compare_signal': 73,
    'add': 70,
    'min_mag': 104,
    'to_integral_exact': 125,
    'abs': 69,
    'Subnormal': 147,
    'subtract': 123,
    'BasicContext': 57,
    'sqrt': 122,
    'adjusted': 1,
    'Clamped': 140,
    'divmod': 81,
    'setcontext': 55,
    'Rounded': 146,
    'copy_sign': 78,
    'Overflow': 145,
    'create_decimal': 65,
    'to_sci_string': 126,
    'MIN_EMIN': 129,
    'ROUND_CEILING': 132,
    'log10': 95,
    'ROUND_HALF_DOWN': 135,
    'is_canonical': 84,
    'is_nan': 87,
    'fma': 83,
    'logical_or': 99,
    'ROUND_FLOOR': 134,
    'as_tuple': 3,
    'to_integral': 51,
    'exp': 82,
    'FloatOperation': 149,
    'Etop': 68,
    'next_plus': 108,
    'clear_flags': 61,
    'MAX_PREC': 127,
    'copy_negate': 77,
    'minus': 105,
    'create_decimal_from_float': 66,
    'localcontext': 56,
    'MAX_EMAX': 128,
    'power': 113,
    'Context': 60,
    'plus': 112,
    'ROUND_HALF_EVEN': 136,
    'canonical': 71,
    'shift': 121,
    'logical_and': 97,
    'next_toward': 109,
    'clear_traps': 62,
    'normalize': 110,
    'is_snan': 91,
    'getcontext': 54,
    'remainder': 116,
    'Decimal': 0,
    'Underflow': 148,
    'MIN_ETINY': 130,
    'DivisionByZero': 142,
    'multiply': 106,
    'remainder_near': 117,
    'is_subnormal': 92,
    'min': 103,
    'to_integral_value': 53,
    'logical_invert': 98,
    'quantize': 114,
    'copy': 63,
    'is_zero': 93,
    'DefaultContext': 59
  },
  by_category: {
    1: [54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126],
    4: [140, 141, 142, 143, 144, 145, 146, 147, 148, 149],
    3: [132, 133, 134, 135, 136, 137, 138, 139],
    2: [127, 128, 129, 130, 131],
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53]
  },
  by_type: {
    2: [54, 55, 56],
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126],
    0: [0, 57, 58, 59, 60, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149],
    3: [127, 128, 129, 130],
    4: [131, 132, 133, 134, 135, 136, 137, 138, 139]
  }
}
/**
 * Get the item with the given key
 * @param {!String|Number} key  The key or index of the item
 * @return {?Object} return the model object for that item, if any.
 */
eYo.Model.decimal__module.getItem = function (key) {
  if (!goog.isNumber(key)) {
    key = eYo.Model.decimal__module.data.by_name[key]
  }
  if (goog.isNumber(key)) {
    return eYo.Model.decimal__module.data.items[key]
  }
}

/**
 * Get the type of the given item.
 * @param {!Object} item.
 * @return {?String} return the type.
 */
eYo.Model.decimal__module.getType = function (item) {
  return item && item.type && eYo.Model.decimal__module.data.types[item.type]
}

/**
 * Get the indices of the items for the given category
 * @param {!String} key  The name of the category
 * @return {!Array} the list of item indices with the given category (possibly void).
 */
eYo.Model.decimal__module.getItemsInCategory = function (category, type) {
  var ra = eYo.Model.decimal__module.data.by_category[category] || []
  if (goog.isString(type)) {
    type = eYo.Model.decimal__module.data.type.indexOf(type)
  }
  if (goog.isNumber(type) && type >= 0) {
    var ra2 = []
    for (var i = 0; i < ra.length ; i++ ) {
      var item = eYo.Model.decimal__module.getItem(i)
      if (item && item.type === type) {
        ra2.append(i)
      }
    }
    return ra2
  } else {
    return ra
  }
}

// This file was generated by `python3 ./bin/helpers/modulebot.py decimal` on 2018-10-21 13:44:35.940640


