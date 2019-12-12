/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */

/**
 * @fileoverview datamodel model. Automatically generated by `python3 bin/helpers/modulebot.py --no-suffix datamodel`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.require('eYo.Model')
eYo.require('eYo.Model.Module')

eYo.require('eYo.Model.Item')
eYo.provide('eYo.Model.datamodel.Item')
eYo.provide('eYo.Model.datamodel')

eYo.Model.datamodel = new eYo.Model.Module('datamodel', 'https://docs.python.org/3.6/library/datamodel.html')

/**
 * @constructor
 * @param {*} model
 */
eYo.Model.datamodel.Item = function (model) {
  eYo.Model.datamodel.Item.superClass_.constructor.call(this, model)
}

;(function () {

var Item = eYo.Model.datamodel.Item

goog.inherits(Item, eYo.Model.Item)

/**
 * module
 */
Item.prototype.module = eYo.Model.datamodel

Object.defineProperties(
  Item.prototype,
  {
    url: {
      get() {
        return this.href
          ? this.module.url + this.href
          : this.module.url
      }
    }
  }
)

eYo.Model.datamodel.setData({
  categories: [
    'frame-objects',
    'basic-customization',
    'customizing-attribute-access',
    'implementing-descriptors',
    'slots',
    'customizing-class-creation',
    'customizing-instance-and-subclass-checks',
    'emulating-callable-objects',
    'emulating-container-types',
    'emulating-numeric-types',
    'with-statement-context-managers',
    'awaitable-objects',
    'coroutine-objects',
    'asynchronous-iterators',
    'asynchronous-context-managers'
  ],
  types: [
    'last method',
    'method',
    'data',
    'classmethod'
  ],
  items: [
    new Item({
      name: '__add__',
      synonyms: [
        '__sub__',
        '__mul__',
        '__matmul__',
        '__truediv__',
        '__floordiv__',
        '__mod__',
        '__divmod__',
        '__pow__',
        '__lshift__',
        '__rshift__',
        '__and__',
        '__xor__',
        '__or__'
      ],
      class: 'object',
      category: 9,
      type_: 1,
      href: '#object.__or__',
      stmt: true,
      signatures: [
        {
          ary: 3,
          mandatory: 2,
          arguments: [
            {
              name: 'self'
            },
            {
              name: 'other'
            },
            {
              name: 'modulo',
              optional: true
            }
          ]
        }
      ],
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'other'
        }
      ]
    }),
    new Item({
      name: '__aenter__',
      class: 'object',
      category: 14,
      type_: 1,
      href: '#object.__aenter__',
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__aexit__',
      class: 'object',
      category: 14,
      type_: 1,
      href: '#object.__aexit__',
      ary: 4,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'exc_type'
        },
        {
          name: 'exc_value'
        },
        {
          name: 'traceback'
        }
      ]
    }),
    new Item({
      name: '__aiter__',
      class: 'object',
      category: 13,
      type_: 1,
      href: '#object.__aiter__',
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__anext__',
      class: 'object',
      category: 13,
      type_: 1,
      href: '#object.__anext__',
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__await__',
      class: 'object',
      category: 11,
      type_: 1,
      href: '#object.__await__',
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__bool__',
      class: 'object',
      category: 1,
      type_: 1,
      href: '#object.__bool__',
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__bytes__',
      class: 'object',
      category: 1,
      type_: 1,
      href: '#object.__bytes__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__call__',
      class: 'object',
      category: 7,
      type_: 1,
      href: '#object.__call__',
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'args...',
          optional: true
        }
      ]
    }),
    new Item({
      name: '__complex__',
      synonyms: [
        '__int__',
        '__float__'
      ],
      class: 'object',
      category: 9,
      type_: 1,
      href: '#object.__float__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__contains__',
      class: 'object',
      category: 8,
      type_: 1,
      href: '#object.__contains__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'item'
        }
      ]
    }),
    new Item({
      name: '__del__',
      class: 'object',
      category: 1,
      type_: 1,
      href: '#object.__del__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__delattr__',
      class: 'object',
      category: 2,
      type_: 1,
      href: '#object.__delattr__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'name'
        }
      ]
    }),
    new Item({
      name: '__delete__',
      class: 'object',
      category: 3,
      type_: 1,
      href: '#object.__delete__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'instance'
        }
      ]
    }),
    new Item({
      name: '__delitem__',
      class: 'object',
      category: 8,
      type_: 1,
      href: '#object.__delitem__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'key'
        }
      ]
    }),
    new Item({
      name: '__dir__',
      class: 'object',
      category: 2,
      type_: 1,
      href: '#object.__dir__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__enter__',
      class: 'object',
      category: 10,
      type_: 1,
      href: '#object.__enter__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__exit__',
      class: 'object',
      category: 10,
      type_: 1,
      href: '#object.__exit__',
      stmt: true,
      ary: 4,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'exc_type'
        },
        {
          name: 'exc_value'
        },
        {
          name: 'traceback'
        }
      ]
    }),
    new Item({
      name: '__format__',
      class: 'object',
      category: 1,
      type_: 1,
      href: '#object.__format__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'format_spec'
        }
      ]
    }),
    new Item({
      name: '__get__',
      class: 'object',
      category: 3,
      type_: 1,
      href: '#object.__get__',
      stmt: true,
      ary: 3,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'instance'
        },
        {
          name: 'owner'
        }
      ]
    }),
    new Item({
      name: '__getattr__',
      class: 'object',
      category: 2,
      type_: 1,
      href: '#object.__getattr__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'name'
        }
      ]
    }),
    new Item({
      name: '__getattribute__',
      class: 'object',
      category: 2,
      type_: 1,
      href: '#object.__getattribute__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'name'
        }
      ]
    }),
    new Item({
      name: '__getitem__',
      class: 'object',
      category: 8,
      type_: 1,
      href: '#object.__getitem__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'key'
        }
      ]
    }),
    new Item({
      name: '__hash__',
      class: 'object',
      category: 1,
      type_: 1,
      href: '#object.__hash__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__iadd__',
      synonyms: [
        '__isub__',
        '__imul__',
        '__imatmul__',
        '__itruediv__',
        '__ifloordiv__',
        '__imod__',
        '__ipow__',
        '__ilshift__',
        '__irshift__',
        '__iand__',
        '__ixor__',
        '__ior__'
      ],
      class: 'object',
      category: 9,
      type_: 1,
      href: '#object.__ior__',
      stmt: true,
      signatures: [
        {
          ary: 3,
          mandatory: 2,
          arguments: [
            {
              name: 'self'
            },
            {
              name: 'other'
            },
            {
              name: 'modulo',
              optional: true
            }
          ]
        }
      ],
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'other'
        }
      ]
    }),
    new Item({
      name: '__index__',
      class: 'object',
      category: 9,
      type_: 1,
      href: '#object.__index__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__init__',
      class: 'object',
      category: 1,
      type_: 1,
      href: '#object.__init__',
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'self'
        },
        {
          name: '...',
          optional: true
        }
      ]
    }),
    new Item({
      name: '__init_subclass__',
      class: 'object',
      category: 5,
      type_: 3,
      href: '#object.__init_subclass__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'cls'
        }
      ]
    }),
    new Item({
      name: '__instancecheck__',
      class: 'class',
      category: 6,
      type_: 1,
      href: '#class.__instancecheck__',
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'instance'
        }
      ]
    }),
    new Item({
      name: '__iter__',
      class: 'object',
      category: 8,
      type_: 1,
      href: '#object.__iter__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__len__',
      class: 'object',
      category: 8,
      type_: 1,
      href: '#object.__len__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__length_hint__',
      class: 'object',
      category: 8,
      type_: 1,
      href: '#object.__length_hint__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__lt__',
      synonyms: [
        '__le__',
        '__eq__',
        '__ne__',
        '__gt__',
        '__ge__'
      ],
      class: 'object',
      category: 1,
      type_: 1,
      href: '#object.__ge__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'other'
        }
      ]
    }),
    new Item({
      name: '__missing__',
      class: 'object',
      category: 8,
      type_: 1,
      href: '#object.__missing__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'key'
        }
      ]
    }),
    new Item({
      name: '__neg__',
      synonyms: [
        '__pos__',
        '__abs__',
        '__invert__'
      ],
      class: 'object',
      category: 9,
      type_: 1,
      href: '#object.__invert__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__new__',
      class: 'object',
      category: 1,
      type_: 1,
      href: '#object.__new__',
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'cls'
        },
        {
          name: '...',
          optional: true
        }
      ]
    }),
    new Item({
      name: '__radd__',
      synonyms: [
        '__rsub__',
        '__rmul__',
        '__rmatmul__',
        '__rtruediv__',
        '__rfloordiv__',
        '__rmod__',
        '__rdivmod__',
        '__rpow__',
        '__rlshift__',
        '__rrshift__',
        '__rand__',
        '__rxor__',
        '__ror__'
      ],
      class: 'object',
      category: 9,
      type_: 1,
      href: '#object.__ror__',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'other'
        }
      ]
    }),
    new Item({
      name: '__repr__',
      class: 'object',
      category: 1,
      type_: 1,
      href: '#object.__repr__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__reversed__',
      class: 'object',
      category: 8,
      type_: 1,
      href: '#object.__reversed__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__round__',
      synonyms: [
        '__trunc__',
        '__floor__',
        '__ceil__'
      ],
      class: 'object',
      category: 9,
      type_: 1,
      href: '#object.__ceil__',
      stmt: true,
      signatures: [
        {
          ary: 1,
          arguments: [
            {
              name: 'self'
            }
          ]
        }
      ],
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'ndigits',
          optional: true
        }
      ]
    }),
    new Item({
      name: '__set__',
      class: 'object',
      category: 3,
      type_: 1,
      href: '#object.__set__',
      stmt: true,
      ary: 3,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'instance'
        },
        {
          name: 'value'
        }
      ]
    }),
    new Item({
      name: '__set_name__',
      class: 'object',
      category: 3,
      type_: 1,
      href: '#object.__set_name__',
      stmt: true,
      ary: 3,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'owner'
        },
        {
          name: 'name'
        }
      ]
    }),
    new Item({
      name: '__setattr__',
      class: 'object',
      category: 2,
      type_: 1,
      href: '#object.__setattr__',
      stmt: true,
      ary: 3,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'name'
        },
        {
          name: 'value'
        }
      ]
    }),
    new Item({
      name: '__setitem__',
      class: 'object',
      category: 8,
      type_: 1,
      href: '#object.__setitem__',
      stmt: true,
      ary: 3,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'key'
        },
        {
          name: 'value'
        }
      ]
    }),
    new Item({
      name: '__slots__',
      class: 'object',
      category: 4,
      type_: 2,
      href: '#object.__slots__',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: '__str__',
      class: 'object',
      category: 1,
      type_: 1,
      href: '#object.__str__',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'self'
        }
      ]
    }),
    new Item({
      name: '__subclasscheck__',
      class: 'class',
      category: 6,
      type_: 1,
      href: '#class.__subclasscheck__',
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'subclass'
        }
      ]
    }),
    new Item({
      name: 'clear',
      class: 'frame',
      category: 0,
      type_: 0,
      href: '#frame.clear',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'close',
      class: 'coroutine',
      category: 12,
      type_: 1,
      href: '#coroutine.close',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'indices',
      class: 'slice',
      category: 0,
      type_: 0,
      href: '#slice.indices',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'self'
        },
        {
          name: 'length'
        }
      ]
    }),
    new Item({
      name: 'send',
      class: 'coroutine',
      category: 12,
      type_: 1,
      href: '#coroutine.send',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'value'
        }
      ]
    }),
    new Item({
      name: 'throw',
      class: 'coroutine',
      category: 12,
      type_: 1,
      href: '#coroutine.throw',
      stmt: true,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'type'
        },
        {
          name: 'value',
          optional: true
        },
        {
          name: 'traceback',
          optional: true
        }
      ]
    })
  ],
  by_name: {
    '__add__': 0,
    '__sub__': 0,
    '__mul__': 0,
    '__matmul__': 0,
    '__truediv__': 0,
    '__floordiv__': 0,
    '__mod__': 0,
    '__divmod__': 0,
    '__pow__': 0,
    '__lshift__': 0,
    '__rshift__': 0,
    '__and__': 0,
    '__xor__': 0,
    '__or__': 0,
    '__aenter__': 1,
    '__aexit__': 2,
    '__aiter__': 3,
    '__anext__': 4,
    '__await__': 5,
    '__bool__': 6,
    '__bytes__': 7,
    '__call__': 8,
    '__complex__': 9,
    '__int__': 9,
    '__float__': 9,
    '__contains__': 10,
    '__del__': 11,
    '__delattr__': 12,
    '__delete__': 13,
    '__delitem__': 14,
    '__dir__': 15,
    '__enter__': 16,
    '__exit__': 17,
    '__format__': 18,
    '__get__': 19,
    '__getattr__': 20,
    '__getattribute__': 21,
    '__getitem__': 22,
    '__hash__': 23,
    '__iadd__': 24,
    '__isub__': 24,
    '__imul__': 24,
    '__imatmul__': 24,
    '__itruediv__': 24,
    '__ifloordiv__': 24,
    '__imod__': 24,
    '__ipow__': 24,
    '__ilshift__': 24,
    '__irshift__': 24,
    '__iand__': 24,
    '__ixor__': 24,
    '__ior__': 24,
    '__index__': 25,
    '__init__': 26,
    '__init_subclass__': 27,
    '__instancecheck__': 28,
    '__iter__': 29,
    '__len__': 30,
    '__length_hint__': 31,
    '__lt__': 32,
    '__le__': 32,
    '__eq__': 32,
    '__ne__': 32,
    '__gt__': 32,
    '__ge__': 32,
    '__missing__': 33,
    '__neg__': 34,
    '__pos__': 34,
    '__abs__': 34,
    '__invert__': 34,
    '__new__': 35,
    '__radd__': 36,
    '__rsub__': 36,
    '__rmul__': 36,
    '__rmatmul__': 36,
    '__rtruediv__': 36,
    '__rfloordiv__': 36,
    '__rmod__': 36,
    '__rdivmod__': 36,
    '__rpow__': 36,
    '__rlshift__': 36,
    '__rrshift__': 36,
    '__rand__': 36,
    '__rxor__': 36,
    '__ror__': 36,
    '__repr__': 37,
    '__reversed__': 38,
    '__round__': 39,
    '__trunc__': 39,
    '__floor__': 39,
    '__ceil__': 39,
    '__set__': 40,
    '__set_name__': 41,
    '__setattr__': 42,
    '__setitem__': 43,
    '__slots__': 44,
    '__str__': 45,
    '__subclasscheck__': 46,
    'clear': 47,
    'close': 48,
    'indices': 49,
    'send': 50,
    'throw': 51
  },
  by_category: {
    0: [47, 49],
    1: [6, 7, 11, 18, 23, 26, 32, 35, 37, 45],
    2: [12, 15, 20, 21, 42],
    3: [13, 19, 40, 41],
    4: [44],
    5: [27],
    6: [28, 46],
    7: [8],
    8: [10, 14, 22, 29, 30, 31, 33, 38, 43],
    9: [0, 9, 24, 25, 34, 36, 39],
    10: [16, 17],
    11: [5],
    12: [48, 50, 51],
    13: [3, 4],
    14: [1, 2]
  },
  by_type: {
    0: [47, 49],
    1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 48, 50, 51],
    2: [44],
    3: [27]
  }
})


})()


// This file was generated by `python3 ./bin/helpers/modulebot.py --no-suffix datamodel` on 2019-05-07 08:48:05.081575


