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
goog.require('eYo.Model.Item')
goog.require('eYo.Protocol.Item')

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
 * model
 */
Item.prototype.model = eYo.Model.random__module

Item.prototype.model.url = 'https://docs.python.org/3.6/library/random.html'

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

eYo.Model.random__module.data = {
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
      name: 'seed',
      class: 'random',
      category: 0,
      type_: 0,
      href: '#random.seed',
      stmt: true,
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
      name: 'getstate',
      class: 'random',
      category: 0,
      type_: 0,
      href: '#random.getstate'
    }),
    new Item({
      name: 'setstate',
      class: 'random',
      category: 0,
      type_: 0,
      href: '#random.setstate',
      stmt: true,
      arguments: [
        {
          name: 'state'
        }
      ]
    }),
    new Item({
      name: 'getrandbits',
      class: 'random',
      category: 0,
      type_: 0,
      href: '#random.getrandbits',
      arguments: [
        {
          name: 'k'
        }
      ]
    }),
    new Item({
      name: 'randrange',
      class: 'random',
      category: 1,
      type_: 0,
      href: '#random.randrange',
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
    }),
    new Item({
      name: 'randint',
      class: 'random',
      category: 1,
      type_: 0,
      href: '#random.randint',
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
      name: 'choice',
      class: 'random',
      category: 2,
      type_: 0,
      href: '#random.choice',
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
      mandatory: 2,
      arguments: [
        {
          name: 'population'
        },
        {
          name: 'weights',
          default: 'None'
        },
        {
          name: '*'
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
      name: 'shuffle',
      class: 'random',
      category: 2,
      type_: 0,
      href: '#random.shuffle',
      stmt: true,
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
      name: 'sample',
      class: 'random',
      category: 2,
      type_: 0,
      href: '#random.sample',
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
      name: 'random',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.random'
    }),
    new Item({
      name: 'uniform',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.uniform',
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
      name: 'triangular',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.triangular',
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
      name: 'betavariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.betavariate',
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
      name: 'expovariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.expovariate',
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
      name: 'lognormvariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.lognormvariate',
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
      name: 'vonmisesvariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.vonmisesvariate',
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
      name: 'paretovariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.paretovariate',
      arguments: [
        {
          name: 'alpha'
        }
      ]
    }),
    new Item({
      name: 'weibullvariate',
      class: 'random',
      category: 3,
      type_: 0,
      href: '#random.weibullvariate',
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
      name: 'SystemRandom',
      class: 'random',
      category: 4,
      type_: 1,
      href: '#random.SystemRandom',
      stmt: true,
      mandatory: 0,
      arguments: [
        {
          name: 'seed',
          optional: true
        }
      ]
    })
  ],
  by_name: {
    'seed': 0,
    'getstate': 1,
    'setstate': 2,
    'getrandbits': 3,
    'randrange': 4,
    'randint': 5,
    'choice': 6,
    'choices': 7,
    'shuffle': 8,
    'sample': 9,
    'random': 10,
    'uniform': 11,
    'triangular': 12,
    'betavariate': 13,
    'expovariate': 14,
    'gammavariate': 15,
    'gauss': 16,
    'lognormvariate': 17,
    'normalvariate': 18,
    'vonmisesvariate': 19,
    'paretovariate': 20,
    'weibullvariate': 21,
    'SystemRandom': 22
  },
  by_category: {
    0: [0, 1, 2, 3],
    1: [4, 5],
    2: [6, 7, 8, 9],
    3: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    4: [22]
  },
  by_type: {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    1: [22]
  }
}

// Add the `Item` methods.
eYo.Do.addProtocol(eYo.Model.random__module, 'Item', eYo.Model.random__module)

// register the types
eYo.Model.Item.registerTypes(eYo.Model.random__module.data.types)


// This file was generated by `python3 ./bin/helpers/modulebot.py random` on 2018-11-10 11:13:46.910708


