/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview statistics model. Automatically generated by `python3 bin/helpers/modulebot.py statistics`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.Model.statistics__module')
goog.provide('eYo.Model.statistics__module.Item')

goog.require('eYo.Model')
goog.require('eYo.Model.Item')
goog.require('eYo.Protocol.Item')

/**
 * @constructor
 * @param {*} model 
 */
eYo.Model.statistics__module.Item = function (model) {
  eYo.Model.statistics__module.Item.superClass_.constructor.call(this, model)
}

var Item = eYo.Model.statistics__module.Item

goog.inherits(Item, eYo.Model.Item)

/**
 * model
 */
Item.prototype.model = eYo.Model.statistics__module

Item.prototype.model.url = 'https://docs.python.org/3.6/library/statistics.html'

Object.defineProperties(
  Item.prototype,
  {
    url: {
      get() {
        return this.href
          ? this.model.url + this.href
          : this.model.url
      }
    }
  }
)

eYo.Model.statistics__module.data = {
  categories: [
    'function-details',
    'exceptions'
  ],
  types: [
    'function',
    'exception'
  ],
  items: [
    new Item({
      name: 'mean',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.mean',
      arguments: [
        {
          name: 'data'
        }
      ]
    }),
    new Item({
      name: 'harmonic_mean',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.harmonic_mean',
      arguments: [
        {
          name: 'data'
        }
      ]
    }),
    new Item({
      name: 'median',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.median',
      arguments: [
        {
          name: 'data'
        }
      ]
    }),
    new Item({
      name: 'median_low',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.median_low',
      arguments: [
        {
          name: 'data'
        }
      ]
    }),
    new Item({
      name: 'median_high',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.median_high',
      arguments: [
        {
          name: 'data'
        }
      ]
    }),
    new Item({
      name: 'median_grouped',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.median_grouped',
      mandatory: 1,
      arguments: [
        {
          name: 'data'
        },
        {
          name: 'interval',
          default: 1
        }
      ]
    }),
    new Item({
      name: 'mode',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.mode',
      arguments: [
        {
          name: 'data'
        }
      ]
    }),
    new Item({
      name: 'pstdev',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.pstdev',
      mandatory: 1,
      arguments: [
        {
          name: 'data'
        },
        {
          name: 'mu',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'pvariance',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.pvariance',
      mandatory: 1,
      arguments: [
        {
          name: 'data'
        },
        {
          name: 'mu',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'stdev',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.stdev',
      mandatory: 1,
      arguments: [
        {
          name: 'data'
        },
        {
          name: 'xbar',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'variance',
      class: 'statistics',
      category: 0,
      type_: 0,
      href: '#statistics.variance',
      mandatory: 1,
      arguments: [
        {
          name: 'data'
        },
        {
          name: 'xbar',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'StatisticsError',
      class: 'statistics',
      category: 1,
      type_: 1
    })
  ],
  by_name: {
    'mean': 0,
    'harmonic_mean': 1,
    'median': 2,
    'median_low': 3,
    'median_high': 4,
    'median_grouped': 5,
    'mode': 6,
    'pstdev': 7,
    'pvariance': 8,
    'stdev': 9,
    'variance': 10,
    'StatisticsError': 11
  },
  by_category: {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    1: [11]
  },
  by_type: {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    1: [11]
  }
}

// Add the `Item` methods.
eYo.Do.addProtocol(eYo.Model.statistics__module, 'Item', eYo.Model.statistics__module)

// register the types
eYo.Model.Item.registerTypes(eYo.Model.statistics__module.data.types)


// This file was generated by `python3 ./bin/helpers/modulebot.py statistics` on 2018-11-10 11:13:46.919830


