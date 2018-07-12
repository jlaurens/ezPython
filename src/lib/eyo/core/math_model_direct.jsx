/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview math model. Automatically generated by `bin/helpers/mathbot.py math`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.Model.math__module')

goog.require('eYo.Model')

eYo.Model.math__module.data = {
  prefix: 'math.',
  categories: [
    'number-theoretic-and-representation-functions',
    'power-and-logarithmic-functions',
    'trigonometric-functions',
    'angular-conversion',
    'hyperbolic-functions',
    'special-functions',
    'constants'
  ],
  types: [
    'function',
    'data'
  ],
  items: [
    {
      names: ['ceil'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['copysign'],
      category: 0,
      type: 0,
      ary: 2,
      mandatory: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    },
    {
      names: ['fabs'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['factorial'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['floor'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['fmod'],
      category: 0,
      type: 0,
      ary: 2,
      mandatory: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    },
    {
      names: ['frexp'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['fsum'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'iterable'
        }
      ]
    },
    {
      names: ['gcd'],
      category: 0,
      type: 0,
      ary: 2,
      mandatory: 2,
      arguments: [
        {
          name: 'a'
        },
        {
          name: 'b'
        }
      ]
    },
    {
      names: ['isclose'],
      category: 0,
      type: 0,
      ary: 5,
      mandatory: 3,
      arguments: [
        {
          name: 'a'
        },
        {
          name: 'b'
        },
        {
          name: '*'
        },
        {
          name: 'rel_tol',
          default: '1e-09'
        },
        {
          name: 'abs_tol',
          default: '0.0'
        }
      ]
    },
    {
      names: ['isfinite'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['isinf'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['isnan'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['ldexp'],
      category: 0,
      type: 0,
      ary: 2,
      mandatory: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'i'
        }
      ]
    },
    {
      names: ['modf'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['trunc'],
      category: 0,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['exp'],
      category: 1,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['expm1'],
      category: 1,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['log'],
      category: 1,
      type: 0,
      stmt: true,
      ary: 2,
      mandatory: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'base'
        }
      ]
    },
    {
      names: ['log1p'],
      category: 1,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['log2'],
      category: 1,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['log10'],
      category: 1,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['pow'],
      category: 1,
      type: 0,
      ary: 2,
      mandatory: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    },
    {
      names: ['sqrt'],
      category: 1,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['acos'],
      category: 2,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['asin'],
      category: 2,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['atan'],
      category: 2,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['atan2'],
      category: 2,
      type: 0,
      ary: 2,
      mandatory: 2,
      arguments: [
        {
          name: 'y'
        },
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['cos'],
      category: 2,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['hypot'],
      category: 2,
      type: 0,
      ary: 2,
      mandatory: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    },
    {
      names: ['sin'],
      category: 2,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['tan'],
      category: 2,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['degrees'],
      category: 3,
      type: 0,
      stmt: true,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['radians'],
      category: 3,
      type: 0,
      stmt: true,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['acosh'],
      category: 4,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['asinh'],
      category: 4,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['atanh'],
      category: 4,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['cosh'],
      category: 4,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['sinh'],
      category: 4,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['tanh'],
      category: 4,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['erf'],
      category: 5,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['erfc'],
      category: 5,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['gamma'],
      category: 5,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['lgamma'],
      category: 5,
      type: 0,
      ary: 1,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    },
    {
      names: ['pi'],
      category: 6,
      type: 1,
      stmt: true
    },
    {
      names: ['e'],
      category: 6,
      type: 1,
      stmt: true
    },
    {
      names: ['tau'],
      category: 6,
      type: 1,
      stmt: true
    },
    {
      names: ['inf'],
      category: 6,
      type: 1,
      stmt: true
    },
    {
      names: ['nan'],
      category: 6,
      type: 1,
      stmt: true
    }
  ],
  by_name: {
    'isinf': 11,
    'ceil': 0,
    'ldexp': 13,
    'fsum': 7,
    'atan': 26,
    'fabs': 2,
    'gcd': 8,
    'exp': 16,
    'tanh': 39,
    'sin': 30,
    'isnan': 12,
    'trunc': 15,
    'log': 18,
    'pow': 22,
    'isfinite': 10,
    'factorial': 3,
    'log1p': 19,
    'lgamma': 43,
    'acos': 24,
    'frexp': 6,
    'erfc': 41,
    'inf': 47,
    'fmod': 5,
    'atanh': 36,
    'sqrt': 23,
    'acosh': 34,
    'modf': 14,
    'pi': 44,
    'e': 45,
    'degrees': 32,
    'radians': 33,
    'cosh': 37,
    'log10': 21,
    'asinh': 35,
    'tau': 46,
    'asin': 25,
    'cos': 28,
    'sinh': 38,
    'atan2': 27,
    'expm1': 17,
    'tan': 31,
    'copysign': 1,
    'erf': 40,
    'hypot': 29,
    'nan': 48,
    'gamma': 42,
    'log2': 20,
    'floor': 4,
    'isclose': 9
  },
  by_category: {
    4: [34, 35, 36, 37, 38, 39],
    2: [24, 25, 26, 27, 28, 29, 30, 31],
    6: [44, 45, 46, 47, 48],
    5: [40, 41, 42, 43],
    1: [16, 17, 18, 19, 20, 21, 22, 23],
    3: [32, 33],
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  },
  by_type: {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
    1: [44, 45, 46, 47, 48]
  }
}

/**
 * Get the item with the given key
 * @param {!String|Number} key  The key or index of the item
 * @return {?Object} return the model object for that item, if any.
 */
eYo.Model.math__module.getItem = function (key) {
  if (!goog.isNumber(key)) {
    key = eYo.Model.math__module.data.by_name[key]
  }
  if (goog.isNumber(key)) {
    return eYo.Model.math__module.data.items[key]
  }
}

/**
 * Get the indices of the items for the given category
 * @param {!String} key  The name of the category
 * @return {!Array} the list of item indices with the given category (possibly void).
 */
eYo.Model.math__module.getItemsInCategory = function (category, type) {
  var ra = eYo.Model.math__module.data.by_category[category] || []
  if (goog.isString(type)) {
    type = eYo.Model.math__module.data.type.indexOf(type)
  }
  if (goog.isNumber(type) && type >= 0) {
    var ra2 = []
    for (var i = 0; i < ra.length ; i++ ) {
      var item = eYo.Model.math__module.getItem(i)
      if (item && item.type === type) {
        ra2.append(i)
      }
    }
    return ra2
  } else {
    return ra
  }
}

// This file was generated by `./bin/helpers/{module}bot.py` on 2018-07-12 07:46:20.029978


