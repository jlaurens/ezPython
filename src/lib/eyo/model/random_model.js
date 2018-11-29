/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview random model. Automatically generated by `python3 bin/helpers/modulebot.py random`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.Model.random__module')
goog.provide('eYo.Model.random__module.Item')

goog.require('eYo.Model')
goog.require('eYo.Model.Module')
goog.require('eYo.Model.Item')

eYo.Model.random__module = new eYo.Model.Module('random__module', 'https://docs.python.org/3.6/library/random.html')

/**
 * @constructor
 * @param {*} model 
 */
eYo.Model.random__module.Item = function (model) {
  eYo.Model.random__module.Item.superClass_.constructor.call(this, model)
}

var Item = eYo.Model.random__module.Item

goog.inherits(Item, eYo.Model.Item)

/**
 * module
 */
Item.prototype.module = eYo.Model.random__module

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

eYo.Model.random__module.setData({
  categories: [
    'bookkeeping-functions',
    'functions-for-integers',
    'functions-for-sequences',
    'real-valued-distributions',
    'alternative-generator'
  ],
  types: [
    'function',
    'class'
  ],
  items: [
    new Item({
      name: 'SystemRandom',
      class: 'random',
      category: 4,
      type_: 1,
      href: '#random.SystemRandom',
      stmt: true,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'seed',
          optional: true
        }
      ]
    }),
    new Item({
      name: 'betavariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.betavariate',
      ary: 2,
      arguments: [
        {
          name: 'alpha'
        },
        {
          name: 'beta'
        }
      ]
    }),
    new Item({
      name: 'choice',
      class: 'random',
      category: 2,
      type_: 0,
      href: '#random.choice',
      ary: 1,
      arguments: [
        {
          name: 'seq'
        }
      ]
    }),
    new Item({
      name: 'choices',
      class: 'random',
      category: 2,
      type_: 0,
      href: '#random.choices',
      ary: Infinity,
      mandatory: 1,
      arguments: [
        {
          name: 'population'
        },
        {
          name: 'weights',
          default: 'None'
        },
        {
          name: '*',
          optional: true
        },
        {
          name: 'cum_weights',
          default: 'None'
        },
        {
          name: 'k',
          default: 1
        }
      ]
    }),
    new Item({
      name: 'expovariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.expovariate',
      ary: 1,
      arguments: [
        {
          name: 'lambd'
        }
      ]
    }),
    new Item({
      name: 'gammavariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.gammavariate',
      ary: 2,
      arguments: [
        {
          name: 'alpha'
        },
        {
          name: 'beta'
        }
      ]
    }),
    new Item({
      name: 'gauss',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.gauss',
      ary: 2,
      arguments: [
        {
          name: 'mu'
        },
        {
          name: 'sigma'
        }
      ]
    }),
    new Item({
      name: 'getrandbits',
      class: 'random',
      category: 0,
      type_: 0,
      href: '#random.getrandbits',
      ary: 1,
      arguments: [
        {
          name: 'k'
        }
      ]
    }),
    new Item({
      name: 'getstate',
      class: 'random',
      category: 0,
      type_: 0,
      href: '#random.getstate',
      ary: 0
    }),
    new Item({
      name: 'lognormvariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.lognormvariate',
      ary: 2,
      arguments: [
        {
          name: 'mu'
        },
        {
          name: 'sigma'
        }
      ]
    }),
    new Item({
      name: 'normalvariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.normalvariate',
      ary: 2,
      arguments: [
        {
          name: 'mu'
        },
        {
          name: 'sigma'
        }
      ]
    }),
    new Item({
      name: 'paretovariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.paretovariate',
      ary: 1,
      arguments: [
        {
          name: 'alpha'
        }
      ]
    }),
    new Item({
      name: 'randint',
      class: 'random',
      category: 1,
      type_: 0,
      href: '#random.randint',
      ary: 2,
      arguments: [
        {
          name: 'a'
        },
        {
          name: 'b'
        }
      ]
    }),
    new Item({
      name: 'random',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.random',
      ary: 0
    }),
    new Item({
      name: 'randrange',
      class: 'random',
      category: 1,
      type_: 0,
      href: '#random.randrange',
      signatures: [
        {
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
        }
      ],
      ary: 1,
      arguments: [
        {
          name: 'stop'
        }
      ]
    }),
    new Item({
      name: 'sample',
      class: 'random',
      category: 2,
      type_: 0,
      href: '#random.sample',
      ary: 2,
      arguments: [
        {
          name: 'population'
        },
        {
          name: 'k'
        }
      ]
    }),
    new Item({
      name: 'seed',
      class: 'random',
      category: 0,
      type_: 0,
      href: '#random.seed',
      stmt: true,
      ary: 2,
      mandatory: 0,
      arguments: [
        {
          name: 'a',
          default: 'None'
        },
        {
          name: 'version',
          default: 2
        }
      ]
    }),
    new Item({
      name: 'setstate',
      class: 'random',
      category: 0,
      type_: 0,
      href: '#random.setstate',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'state'
        }
      ]
    }),
    new Item({
      name: 'shuffle',
      class: 'random',
      category: 2,
      type_: 0,
      href: '#random.shuffle',
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'random',
          optional: true
        }
      ]
    }),
    new Item({
      name: 'triangular',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.triangular',
      ary: 3,
      arguments: [
        {
          name: 'low'
        },
        {
          name: 'high'
        },
        {
          name: 'mode'
        }
      ]
    }),
    new Item({
      name: 'uniform',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.uniform',
      ary: 2,
      arguments: [
        {
          name: 'a'
        },
        {
          name: 'b'
        }
      ]
    }),
    new Item({
      name: 'vonmisesvariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.vonmisesvariate',
      ary: 2,
      arguments: [
        {
          name: 'mu'
        },
        {
          name: 'kappa'
        }
      ]
    }),
    new Item({
      name: 'weibullvariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.weibullvariate',
      ary: 2,
      arguments: [
        {
          name: 'alpha'
        },
        {
          name: 'beta'
        }
      ]
    })
  ],
  by_name: {
    'SystemRandom': 0,
    'betavariate': 1,
    'choice': 2,
    'choices': 3,
    'expovariate': 4,
    'gammavariate': 5,
    'gauss': 6,
    'getrandbits': 7,
    'getstate': 8,
    'lognormvariate': 9,
    'normalvariate': 10,
    'paretovariate': 11,
    'randint': 12,
    'random': 13,
    'randrange': 14,
    'sample': 15,
    'seed': 16,
    'setstate': 17,
    'shuffle': 18,
    'triangular': 19,
    'uniform': 20,
    'vonmisesvariate': 21,
    'weibullvariate': 22
  },
  by_category: {
    0: [7, 8, 16, 17],
    1: [12, 14],
    2: [2, 3, 15, 18],
    3: [1, 4, 5, 6, 9, 10, 11, 13, 19, 20, 21, 22],
    4: [0]
  },
  by_type: {
    0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    1: [0]
  }
})



// This file was generated by `python3 ./bin/helpers/modulebot.py random` on 2018-11-29 12:46:37.835721


