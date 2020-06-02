/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview fractions module. Automatically generated by `python3 bin/helpers/modulebot.py fractions through npm run eyo:module`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.module.newNS('fractions__module', {
  URL: 'https://docs.python.org/3.6/library/fractions.html'
})

;(() => {
  /* Singleton constructor */
  let newItem = eYo.module.fractions__module.makeNewItem()

  eYo.module.fractions__module.data_ = {
    categories: [
      'module-fractions'
    ],
    types: [
      'class',
      'function',
      'method'
    ],
    items: [
      newItem({
        name: 'Fraction',
        class: 'fractions',
        category: 0,
        type_: 0,
        href: '#fractions.Fraction',
        signatures: [
          {
            ary: 1,
            arguments: [
              {
                name: 'other_fraction'
              }
            ]
          },
          {
            ary: 1,
            arguments: [
              {
                name: 'float'
              }
            ]
          },
          {
            ary: 1,
            arguments: [
              {
                name: 'decimal'
              }
            ]
          },
          {
            ary: 1,
            arguments: [
              {
                name: 'string'
              }
            ]
          }
        ],
        ary: 2,
        mandatory: 0,
        arguments: [
          {
            name: 'numerator',
            default: 0
          },
          {
            name: 'denominator',
            default: 1
          }
        ]
      }),
      newItem({
        name: '__ceil__',
        class: 'fractions.Fraction',
        category: 0,
        type_: 2,
        href: '#fractions.Fraction.__ceil__',
        ary: 0
      }),
      newItem({
        name: '__floor__',
        class: 'fractions.Fraction',
        category: 0,
        type_: 2,
        href: '#fractions.Fraction.__floor__',
        ary: 0
      }),
      newItem({
        name: '__round__',
        class: 'fractions.Fraction',
        category: 0,
        type_: 2,
        href: '#fractions.Fraction.__round__',
        signatures: [
          {
            ary: 1,
            arguments: [
              {
                name: 'ndigits'
              }
            ]
          }
        ],
        ary: 0
      }),
      newItem({
        name: 'from_decimal',
        class: 'fractions.Fraction',
        category: 0,
        type_: 2,
        href: '#fractions.Fraction.from_decimal',
        ary: 1,
        arguments: [
          {
            name: 'dec'
          }
        ]
      }),
      newItem({
        name: 'from_float',
        class: 'fractions.Fraction',
        category: 0,
        type_: 2,
        href: '#fractions.Fraction.from_float',
        ary: 1,
        arguments: [
          {
            name: 'flt'
          }
        ]
      }),
      newItem({
        name: 'gcd',
        class: 'fractions',
        category: 0,
        type_: 1,
        href: '#fractions.gcd',
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
      newItem({
        name: 'limit_denominator',
        class: 'fractions.Fraction',
        category: 0,
        type_: 2,
        href: '#fractions.Fraction.limit_denominator',
        ary: 1,
        mandatory: 0,
        arguments: [
          {
            name: 'max_denominator',
            default: 1000000
          }
        ]
      })
    ],
    by_name: {
      'Fraction': 0,
      '__ceil__': 1,
      '__floor__': 2,
      '__round__': 3,
      'from_decimal': 4,
      'from_float': 5,
      'gcd': 6,
      'limit_denominator': 7
    },
    by_category: {
      0: [0, 1, 2, 3, 4, 5, 6, 7]
    },
    by_type: {
      0: [0],
      1: [6],
      2: [1, 2, 3, 4, 5, 7]
    }
  }
  

}) ()


  // This file was generated by `python3 ./bin/helpers/modulebot.py fractions` on 2020-03-04 13:02:48.919315


