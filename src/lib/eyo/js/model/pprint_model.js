/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */

/**
 * @fileoverview pprint model. Automatically generated by `python3 bin/helpers/modulebot.py pprint`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.require('eYo.Model')
goog.require('eYo.Model.Module')

goog.require('eYo.Model.Item')
goog.provide('eYo.Model.pprint__module.Item')
goog.provide('eYo.Model.pprint__module')

eYo.Model.pprint__module = new eYo.Model.Module('pprint__module', 'https://docs.python.org/3.6/library/pprint.html')

/**
 * @constructor
 * @param {*} model
 */
eYo.Model.pprint__module.Item = function (model) {
  eYo.Model.pprint__module.Item.superClass_.constructor.call(this, model)
}

;(function () {

var Item = eYo.Model.pprint__module.Item

goog.inherits(Item, eYo.Model.Item)

/**
 * module
 */
Item.prototype.module = eYo.Model.pprint__module

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

eYo.Model.pprint__module.setData({
  categories: [
    'module-pprint',
    'prettyprinter-objects'
  ],
  types: [
    'class',
    'function',
    'method'
  ],
  items: [
    new Item({
      name: 'PrettyPrinter',
      class: 'pprint',
      category: 0,
      type_: 0,
      href: '#pprint.PrettyPrinter',
      stmt: true,
      ary: Infinity,
      mandatory: 0,
      arguments: [
        {
          name: 'indent',
          default: 1
        },
        {
          name: 'width',
          default: 80
        },
        {
          name: 'depth',
          default: 'None'
        },
        {
          name: 'stream',
          default: 'None'
        },
        {
          name: '*',
          optional: true
        },
        {
          name: 'compact',
          default: 'False'
        }
      ]
    }),
    new Item({
      name: 'format',
      class: 'PrettyPrinter',
      holder: 'pprint.PrettyPrinter',
      category: 1,
      type_: 2,
      href: '#pprint.PrettyPrinter.format',
      ary: 4,
      arguments: [
        {
          name: 'object'
        },
        {
          name: 'context'
        },
        {
          name: 'maxlevels'
        },
        {
          name: 'level'
        }
      ]
    }),
    new Item({
      name: 'isreadable',
      class: 'pprint',
      category: 0,
      type_: 1,
      href: '#pprint.isreadable',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'object'
        }
      ]
    }),
    new Item({
      name: 'isreadable',
      class: 'PrettyPrinter',
      holder: 'pprint.PrettyPrinter',
      category: 1,
      type_: 2,
      href: '#pprint.PrettyPrinter.isreadable',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'object'
        }
      ]
    }),
    new Item({
      name: 'isrecursive',
      class: 'pprint',
      category: 0,
      type_: 1,
      href: '#pprint.isrecursive',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'object'
        }
      ]
    }),
    new Item({
      name: 'isrecursive',
      class: 'PrettyPrinter',
      holder: 'pprint.PrettyPrinter',
      category: 1,
      type_: 2,
      href: '#pprint.PrettyPrinter.isrecursive',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'object'
        }
      ]
    }),
    new Item({
      name: 'pformat',
      class: 'pprint',
      category: 0,
      type_: 1,
      href: '#pprint.pformat',
      ary: Infinity,
      mandatory: 1,
      arguments: [
        {
          name: 'object'
        },
        {
          name: 'indent',
          default: 1
        },
        {
          name: 'width',
          default: 80
        },
        {
          name: 'depth',
          default: 'None'
        },
        {
          name: '*',
          optional: true
        },
        {
          name: 'compact',
          default: 'False'
        }
      ]
    }),
    new Item({
      name: 'pformat',
      class: 'PrettyPrinter',
      holder: 'pprint.PrettyPrinter',
      category: 1,
      type_: 2,
      href: '#pprint.PrettyPrinter.pformat',
      ary: 1,
      arguments: [
        {
          name: 'object'
        }
      ]
    }),
    new Item({
      name: 'pprint',
      class: 'pprint',
      category: 0,
      type_: 1,
      href: '#pprint.pprint',
      stmt: true,
      ary: Infinity,
      mandatory: 1,
      arguments: [
        {
          name: 'object'
        },
        {
          name: 'stream',
          default: 'None'
        },
        {
          name: 'indent',
          default: 1
        },
        {
          name: 'width',
          default: 80
        },
        {
          name: 'depth',
          default: 'None'
        },
        {
          name: '*',
          optional: true
        },
        {
          name: 'compact',
          default: 'False'
        }
      ]
    }),
    new Item({
      name: 'pprint',
      class: 'PrettyPrinter',
      holder: 'pprint.PrettyPrinter',
      category: 1,
      type_: 2,
      href: '#pprint.PrettyPrinter.pprint',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'object'
        }
      ]
    }),
    new Item({
      name: 'saferepr',
      class: 'pprint',
      category: 0,
      type_: 1,
      href: '#pprint.saferepr',
      ary: 1,
      arguments: [
        {
          name: 'object'
        }
      ]
    })
  ],
  by_name: {
    'PrettyPrinter': 0,
    'format': 1,
    'isreadable': 3,
    'isrecursive': 5,
    'pformat': 7,
    'pprint': 9,
    'saferepr': 10
  },
  by_category: {
    0: [0, 2, 4, 6, 8, 10],
    1: [1, 3, 5, 7, 9]
  },
  by_type: {
    0: [0],
    1: [2, 4, 6, 8, 10],
    2: [1, 3, 5, 7, 9]
  }
})


})()


// This file was generated by `python3 ./bin/helpers/modulebot.py pprint` on 2019-05-07 08:48:06.167422


