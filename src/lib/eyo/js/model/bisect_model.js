/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */

/**
 * @fileoverview bisect model. Automatically generated by `python3 bin/helpers/modulebot.py bisect`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.require('eYo.Model')
goog.require('eYo.Model.Module')

goog.require('eYo.Model.Item')
goog.provide('eYo.Model.bisect__module.Item')
goog.provide('eYo.Model.bisect__module')

eYo.Model.bisect__module = new eYo.Model.Module('bisect__module', 'https://docs.python.org/3.6/library/bisect.html')

/**
 * @constructor
 * @param {*} model
 */
eYo.Model.bisect__module.Item = function (model) {
  eYo.Model.bisect__module.Item.superClass_.constructor.call(this, model)
}

;(function () {

var Item = eYo.Model.bisect__module.Item

goog.inherits(Item, eYo.Model.Item)

/**
 * module
 */
Item.prototype.module = eYo.Model.bisect__module

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

eYo.Model.bisect__module.setData({
  categories: [
    'module-bisect'
  ],
  types: [
    'function'
  ],
  items: [
    new Item({
      name: 'bisect_left',
      class: 'bisect',
      category: 0,
      type_: 0,
      href: '#bisect.bisect_left',
      stmt: true,
      ary: 4,
      mandatory: 2,
      arguments: [
        {
          name: 'a'
        },
        {
          name: 'x'
        },
        {
          name: 'lo',
          default: 0
        },
        {
          name: 'hi',
          default: 'len(a)'
        }
      ]
    }),
    new Item({
      name: 'bisect_right',
      synonyms: [
        'bisect'
      ],
      class: 'bisect',
      category: 0,
      type_: 0,
      href: '#bisect.bisect',
      ary: 4,
      mandatory: 2,
      arguments: [
        {
          name: 'a'
        },
        {
          name: 'x'
        },
        {
          name: 'lo',
          default: 0
        },
        {
          name: 'hi',
          default: 'len(a)'
        }
      ]
    }),
    new Item({
      name: 'insort_left',
      class: 'bisect',
      category: 0,
      type_: 0,
      href: '#bisect.insort_left',
      stmt: true,
      ary: 4,
      mandatory: 2,
      arguments: [
        {
          name: 'a'
        },
        {
          name: 'x'
        },
        {
          name: 'lo',
          default: 0
        },
        {
          name: 'hi',
          default: 'len(a)'
        }
      ]
    }),
    new Item({
      name: 'insort_right',
      synonyms: [
        'insort'
      ],
      class: 'bisect',
      category: 0,
      type_: 0,
      href: '#bisect.insort',
      stmt: true,
      ary: 4,
      mandatory: 2,
      arguments: [
        {
          name: 'a'
        },
        {
          name: 'x'
        },
        {
          name: 'lo',
          default: 0
        },
        {
          name: 'hi',
          default: 'len(a)'
        }
      ]
    })
  ],
  by_name: {
    'bisect_left': 0,
    'bisect_right': 1,
    'bisect': 1,
    'insort_left': 2,
    'insort_right': 3,
    'insort': 3
  },
  by_category: {
    0: [0, 1, 2, 3]
  },
  by_type: {
    0: [0, 1, 2, 3]
  }
})


})()


// This file was generated by `python3 ./bin/helpers/modulebot.py bisect` on 2019-05-07 08:48:06.082903


