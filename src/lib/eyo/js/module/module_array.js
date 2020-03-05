/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview array module. Automatically generated by `python3 bin/helpers/modulebot.py array through npm run eyo:module`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.module.makeNS('array__module', {
  URL: 'https://docs.python.org/3.6/library/array.html'
})

;(() => {
  /* Singleton constructor */
  let newItem = eYo.module.array__module.makeNewItem()

  eYo.module.array__module.data_ = {
    categories: [
      'module-array'
    ],
    types: [
      'class',
      'data',
      'attribute',
      'method'
    ],
    items: [
      newItem({
        name: 'append',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.append',
        stmt: true,
        ary: 1,
        arguments: [
          {
            name: 'x'
          }
        ]
      }),
      newItem({
        name: 'array',
        class: 'array',
        category: 0,
        type_: 0,
        href: '#array.array',
        stmt: true,
        ary: 2,
        mandatory: 1,
        arguments: [
          {
            name: 'typecode'
          },
          {
            name: 'initializer',
            optional: true
          }
        ]
      }),
      newItem({
        name: 'buffer_info',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.buffer_info',
        ary: 0
      }),
      newItem({
        name: 'byteswap',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.byteswap',
        stmt: true,
        ary: 0
      }),
      newItem({
        name: 'count',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.count',
        ary: 1,
        arguments: [
          {
            name: 'x'
          }
        ]
      }),
      newItem({
        name: 'extend',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.extend',
        stmt: true,
        ary: 1,
        arguments: [
          {
            name: 'iterable'
          }
        ]
      }),
      newItem({
        name: 'frombytes',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.frombytes',
        stmt: true,
        ary: 1,
        arguments: [
          {
            name: 's'
          }
        ]
      }),
      newItem({
        name: 'fromfile',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.fromfile',
        stmt: true,
        ary: 2,
        arguments: [
          {
            name: 'f'
          },
          {
            name: 'n'
          }
        ]
      }),
      newItem({
        name: 'fromlist',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.fromlist',
        stmt: true,
        ary: 1,
        arguments: [
          {
            name: 'list'
          }
        ]
      }),
      newItem({
        name: 'fromstring',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.fromstring',
        stmt: true,
        ary: 0
      }),
      newItem({
        name: 'fromunicode',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.fromunicode',
        stmt: true,
        ary: 1,
        arguments: [
          {
            name: 's'
          }
        ]
      }),
      newItem({
        name: 'index',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.index',
        ary: 1,
        arguments: [
          {
            name: 'x'
          }
        ]
      }),
      newItem({
        name: 'insert',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.insert',
        stmt: true,
        ary: 2,
        arguments: [
          {
            name: 'i'
          },
          {
            name: 'x'
          }
        ]
      }),
      newItem({
        name: 'itemsize',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 2,
        href: '#array.array.itemsize',
        ary: 0
      }),
      newItem({
        name: 'pop',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.pop',
        ary: 1,
        mandatory: 0,
        arguments: [
          {
            name: 'i',
            optional: true
          }
        ]
      }),
      newItem({
        name: 'remove',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.remove',
        stmt: true,
        ary: 1,
        arguments: [
          {
            name: 'x'
          }
        ]
      }),
      newItem({
        name: 'reverse',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.reverse',
        stmt: true,
        ary: 0
      }),
      newItem({
        name: 'tobytes',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.tobytes',
        ary: 0
      }),
      newItem({
        name: 'tofile',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.tofile',
        stmt: true,
        ary: 1,
        arguments: [
          {
            name: 'f'
          }
        ]
      }),
      newItem({
        name: 'tolist',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.tolist',
        ary: 0
      }),
      newItem({
        name: 'tostring',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.tostring',
        stmt: true,
        ary: 0
      }),
      newItem({
        name: 'tounicode',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 3,
        href: '#array.array.tounicode',
        ary: 0
      }),
      newItem({
        name: 'typecode',
        class: 'array',
        holder: 'array.array',
        category: 0,
        type_: 2,
        href: '#array.array.typecode',
        ary: 0
      }),
      newItem({
        name: 'typecodes',
        class: 'array',
        category: 0,
        type_: 1,
        href: '#array.typecodes',
        stmt: true,
        ary: 0
      })
    ],
    by_name: {
      'append': 0,
      'array': 1,
      'buffer_info': 2,
      'byteswap': 3,
      'count': 4,
      'extend': 5,
      'frombytes': 6,
      'fromfile': 7,
      'fromlist': 8,
      'fromstring': 9,
      'fromunicode': 10,
      'index': 11,
      'insert': 12,
      'itemsize': 13,
      'pop': 14,
      'remove': 15,
      'reverse': 16,
      'tobytes': 17,
      'tofile': 18,
      'tolist': 19,
      'tostring': 20,
      'tounicode': 21,
      'typecode': 22,
      'typecodes': 23
    },
    by_category: {
      0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    by_type: {
      0: [1],
      1: [23],
      2: [13, 22],
      3: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21]
    }
  }
  

}) ()


  // This file was generated by `python3 ./bin/helpers/modulebot.py array` on 2020-03-04 13:02:49.230916


