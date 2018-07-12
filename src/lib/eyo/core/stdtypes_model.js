/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview stdtypes model. Automatically generated by `bin/helpers/stdtypesbot.py`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.Model.stdtypes')

goog.require('eYo.Model')

eYo.Model.stdtypes.data = {
  categories: [
    'additional-methods-on-integer-types',
    'additional-methods-on-float',
    'iterator-types',
    'lists',
    'tuples',
    'ranges',
    'text-sequence-type-str',
    'string-methods',
    'bytes-objects',
    'bytearray-objects',
    'bytes-and-bytearray-operations',
    'memory-views',
    'set-types-set-frozenset',
    'mapping-types-dict',
    'context-manager-types',
    'special-attributes'
  ],
  types: [
    'method',
    'classmethod',
    'class',
    'staticmethod',
    'attribute'
  ],
  items: [
    {
      name: 'bit_length',
      class: 'int',
      category: 0,
      type: 0
    },
    {
      name: 'to_bytes',
      class: 'int',
      category: 0,
      type: 0
    },
    {
      name: 'from_bytes',
      class: 'int',
      category: 0,
      type: 1
    },
    {
      name: 'as_integer_ratio',
      class: 'float',
      category: 1,
      type: 0
    },
    {
      name: 'is_integer',
      class: 'float',
      category: 1,
      type: 0
    },
    {
      name: 'hex',
      class: 'float',
      category: 1,
      type: 0
    },
    {
      name: 'fromhex',
      class: 'float',
      category: 1,
      type: 1
    },
    {
      name: '__iter__',
      class: 'container',
      category: 2,
      type: 0
    },
    {
      name: '__iter__',
      class: 'iterator',
      category: 2,
      type: 0
    },
    {
      name: '__next__',
      class: 'iterator',
      category: 2,
      type: 0
    },
    {
      name: 'list',
      category: 3,
      type: 2,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'iterable',
          optional: true
        }
      ]
    },
    {
      name: 'tuple',
      category: 4,
      type: 2,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'iterable',
          optional: true
        }
      ]
    },
    {
      name: 'range',
      category: 5,
      type: 2,
      ary: 3,
      mandatory: 2,
      arguments: [
        {
          name: 'start'
        },
        {
          name: 'stop'
        },
        {
          name: 'step',
          optional: true
        }
      ]
    },
    {
      name: 'str',
      category: 6,
      type: 2
    },
    {
      name: 'capitalize',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'casefold',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'center',
      class: 'str',
      category: 7,
      type: 0,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'width'
        },
        {
          name: 'fillchar',
          optional: true
        }
      ]
    },
    {
      name: 'count',
      class: 'str',
      category: 7,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'sub'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'encode',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'endswith',
      class: 'str',
      category: 7,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'suffix'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'expandtabs',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'find',
      class: 'str',
      category: 7,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'sub'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'format',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'format_map',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'index',
      class: 'str',
      category: 7,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'sub'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'isalnum',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'isalpha',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'isdecimal',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'isdigit',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'isidentifier',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'islower',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'isnumeric',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'isprintable',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'isspace',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'istitle',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'isupper',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'join',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'ljust',
      class: 'str',
      category: 7,
      type: 0,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'width'
        },
        {
          name: 'fillchar',
          optional: true
        }
      ]
    },
    {
      name: 'lower',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'lstrip',
      class: 'str',
      category: 7,
      type: 0,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'chars',
          optional: true
        }
      ]
    },
    {
      name: 'maketrans',
      class: 'str',
      category: 7,
      type: 3,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y',
          optional: true
        },
        {
          name: 'z',
          optional: true
        }
      ]
    },
    {
      name: 'partition',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'replace',
      class: 'str',
      category: 7,
      type: 0,
      ary: 3,
      mandatory: 2,
      arguments: [
        {
          name: 'old'
        },
        {
          name: 'new'
        },
        {
          name: 'count',
          optional: true
        }
      ]
    },
    {
      name: 'rfind',
      class: 'str',
      category: 7,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'sub'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'rindex',
      class: 'str',
      category: 7,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'sub'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'rjust',
      class: 'str',
      category: 7,
      type: 0,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'width'
        },
        {
          name: 'fillchar',
          optional: true
        }
      ]
    },
    {
      name: 'rpartition',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'rsplit',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'rstrip',
      class: 'str',
      category: 7,
      type: 0,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'chars',
          optional: true
        }
      ]
    },
    {
      name: 'split',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'splitlines',
      class: 'str',
      category: 7,
      type: 0,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'keepends',
          optional: true
        }
      ]
    },
    {
      name: 'startswith',
      class: 'str',
      category: 7,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'prefix'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'strip',
      class: 'str',
      category: 7,
      type: 0,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'chars',
          optional: true
        }
      ]
    },
    {
      name: 'swapcase',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'title',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'translate',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'upper',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'zfill',
      class: 'str',
      category: 7,
      type: 0
    },
    {
      name: 'bytes',
      category: 8,
      type: 2,
      ary: 3,
      mandatory: 0,
      arguments: [
        {
          name: 'source',
          optional: true
        },
        {
          name: 'encoding',
          optional: true
        },
        {
          name: 'errors',
          optional: true
        }
      ]
    },
    {
      name: 'bytearray',
      category: 9,
      type: 2,
      ary: 3,
      mandatory: 0,
      arguments: [
        {
          name: 'source',
          optional: true
        },
        {
          name: 'encoding',
          optional: true
        },
        {
          name: 'errors',
          optional: true
        }
      ]
    },
    {
      name: 'count',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'sub'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'decode',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'endswith',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'suffix'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'find',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'sub'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'index',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'sub'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'join',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'maketrans',
      class: 'bytes',
      category: 10,
      type: 3
    },
    {
      name: 'partition',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'replace',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 3,
      mandatory: 2,
      arguments: [
        {
          name: 'old'
        },
        {
          name: 'new'
        },
        {
          name: 'count',
          optional: true
        }
      ]
    },
    {
      name: 'rfind',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'sub'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'rindex',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'sub'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'rpartition',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'startswith',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'prefix'
        },
        {
          name: 'start',
          optional: true
        },
        {
          name: 'end',
          optional: true
        }
      ]
    },
    {
      name: 'translate',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'center',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'width'
        },
        {
          name: 'fillbyte',
          optional: true
        }
      ]
    },
    {
      name: 'ljust',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'width'
        },
        {
          name: 'fillbyte',
          optional: true
        }
      ]
    },
    {
      name: 'lstrip',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'chars',
          optional: true
        }
      ]
    },
    {
      name: 'rjust',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'width'
        },
        {
          name: 'fillbyte',
          optional: true
        }
      ]
    },
    {
      name: 'rsplit',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'rstrip',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'chars',
          optional: true
        }
      ]
    },
    {
      name: 'split',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'strip',
      class: 'bytes',
      category: 10,
      type: 0,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'chars',
          optional: true
        }
      ]
    },
    {
      name: 'capitalize',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'expandtabs',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'isalnum',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'isalpha',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'isdigit',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'islower',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'isspace',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'istitle',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'isupper',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'lower',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'splitlines',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'swapcase',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'title',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'upper',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'zfill',
      class: 'bytes',
      category: 10,
      type: 0
    },
    {
      name: 'memoryview',
      category: 11,
      type: 2
    },
    {
      name: 'set',
      category: 12,
      type: 2,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'iterable',
          optional: true
        }
      ]
    },
    {
      name: 'dict',
      category: 13,
      type: 2
    },
    {
      name: '__enter__',
      class: 'contextmanager',
      category: 14,
      type: 0
    },
    {
      name: '__exit__',
      class: 'contextmanager',
      category: 14,
      type: 0
    },
    {
      name: '__dict__',
      category: 15,
      type: 4
    },
    {
      name: '__class__',
      category: 15,
      type: 4
    },
    {
      name: '__bases__',
      category: 15,
      type: 4
    },
    {
      name: '__name__',
      category: 15,
      type: 4
    },
    {
      name: '__qualname__',
      category: 15,
      type: 4
    },
    {
      name: '__mro__',
      category: 15,
      type: 4
    },
    {
      name: 'mro',
      class: 'class',
      category: 15,
      type: 0
    },
    {
      name: '__subclasses__',
      class: 'class',
      category: 15,
      type: 0
    }
  ],
  items_by_name: {
    'count': 60,
    'translate': 73,
    '__next__': 9,
    'bytes': 58,
    '__dict__': 102,
    '__mro__': 107,
    'istitle': 89,
    'rsplit': 78,
    'endswith': 62,
    '__bases__': 104,
    'rpartition': 71,
    '__name__': 105,
    'join': 65,
    'find': 63,
    'set': 98,
    '__iter__': 8,
    'as_integer_ratio': 3,
    'startswith': 72,
    'replace': 68,
    'strip': 81,
    'format': 22,
    'title': 94,
    'to_bytes': 1,
    'tuple': 11,
    'capitalize': 82,
    'hex': 5,
    '__enter__': 100,
    '__qualname__': 106,
    'zfill': 96,
    'bytearray': 59,
    'isspace': 88,
    'list': 10,
    'rindex': 70,
    'islower': 87,
    'isdigit': 86,
    'maketrans': 66,
    'rstrip': 79,
    'lstrip': 76,
    'isalpha': 85,
    '__class__': 103,
    '__subclasses__': 109,
    'index': 64,
    'bit_length': 0,
    'format_map': 23,
    'isprintable': 32,
    'memoryview': 97,
    'lower': 91,
    'casefold': 15,
    'center': 74,
    'is_integer': 4,
    'swapcase': 93,
    'range': 12,
    'expandtabs': 83,
    'dict': 99,
    'upper': 95,
    '__exit__': 101,
    'split': 80,
    'isnumeric': 31,
    'str': 13,
    'ljust': 75,
    'partition': 67,
    'decode': 61,
    'rfind': 69,
    'mro': 108,
    'fromhex': 6,
    'encode': 18,
    'from_bytes': 2,
    'splitlines': 92,
    'rjust': 77,
    'isupper': 90,
    'isdecimal': 27,
    'isalnum': 84,
    'isidentifier': 29
  },
  by_category: {
    3: [10],
    5: [12],
    1: [3, 4, 5, 6],
    6: [13],
    0: [0, 1, 2],
    8: [58],
    14: [100, 101],
    15: [102, 103, 104, 105, 106, 107, 108, 109],
    4: [11],
    10: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
    11: [97],
    7: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
    9: [59],
    2: [7, 8, 9],
    13: [99],
    12: [98]
  },
  by_type: {
    3: [40, 66],
    0: [0, 1, 3, 4, 5, 7, 8, 9, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 60, 61, 62, 63, 64, 65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 100, 101, 108, 109],
    2: [10, 11, 12, 13, 58, 59, 97, 98, 99],
    1: [2, 6],
    4: [102, 103, 104, 105, 106, 107]
  }
}

/**
 * Get the item with the given key
 * @param {!String|Number} key  The key or index of the item
 * @return {?Object} return the model object for that item, if any.
 */
eYo.Model.stdtypes.getItem = function (key) {
  if (!goog.isNumber(key)) {
    key = eYo.Model.stdtypes.data.by_name[key]
  }
  if (goog.isNumber(key)) {
    return eYo.Model.stdtypes.data.items[key]
  }
}

/**
 * Get the indices of the items for the given category
 * @param {!String} key  The name of the category
 * @return {!Array} the list of item indices with the given category (possibly void).
 */
eYo.Model.stdtypes.getItemsInCategory = function (category, type) {
  var ra = eYo.Model.stdtypes.data.by_category[category] || []
  if (goog.isString(type)) {
    type = eYo.Model.stdtypes.data.type.indexOf(type)
  }
  if (goog.isNumber(type) && type >= 0) {
    var ra2 = []
    for (var i = 0; i < ra.length ; i++ ) {
      var item = eYo.Model.stdtypes.getItem(i)
      if (item && item.type === type) {
        ra2.append(i)
      }
    }
    return ra2
  } else {
    return ra
  }
}

// This file was generated by `./bin/helpers/stdtypesbot.py` on 2018-07-12 07:46:19.408513


