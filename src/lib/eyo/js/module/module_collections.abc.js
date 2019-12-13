/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview collections.abc module. Automatically generated by `python3 bin/helpers/modulebot.py collections.abc`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.require('Module')

eYo.provide('Module.collections.abc__module', new eYo.Module.Dflt('collections.abc__module', 'https://docs.python.org/3.6/library/collections.abc.html'))

;(function () {

  /* Singleton constructor */
  var Item = function (model) {
    eYo.Module.Item.call(this, model)
  }
  goog.inherits(Item, eYo.Module.Item)

  /**
  * module
  */
  Item.prototype.module = eYo.Module.collections.abc__module

  Object.defineProperties(Item.prototype, {
    url: {
      get() {
        return this.href
          ? this.module.url + this.href
          : this.module.url
      }
    }
  })

eYo.Module.collections.abc__module.data_ = {
  categories: [
    'collections-abstract-base-classes'
  ],
  types: [
    'class'
  ],
  items: [
    new Item({
      name: 'AsyncGenerator',
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.AsyncGenerator',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'AsyncIterable',
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.AsyncIterable',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'AsyncIterator',
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.AsyncIterator',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Awaitable',
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.Awaitable',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Collection',
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.Collection',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Container',
      synonyms: [
        'Hashable',
        'Sized',
        'Callable'
      ],
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.Callable',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Coroutine',
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.Coroutine',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Generator',
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.Generator',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Iterable',
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.Iterable',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Iterator',
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.Iterator',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Mapping',
      synonyms: [
        'MutableMapping'
      ],
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.MutableMapping',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'MappingView',
      synonyms: [
        'ItemsView',
        'KeysView',
        'ValuesView'
      ],
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.ValuesView',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Reversible',
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.Reversible',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Sequence',
      synonyms: [
        'MutableSequence',
        'ByteString'
      ],
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.ByteString',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'Set',
      synonyms: [
        'MutableSet'
      ],
      class: 'collections.abc',
      category: 0,
      type_: 0,
      href: '#collections.abc.MutableSet',
      stmt: true,
      ary: 0
    })
  ],
  by_name: {
    'AsyncGenerator': 0,
    'AsyncIterable': 1,
    'AsyncIterator': 2,
    'Awaitable': 3,
    'Collection': 4,
    'Container': 5,
    'Hashable': 5,
    'Sized': 5,
    'Callable': 5,
    'Coroutine': 6,
    'Generator': 7,
    'Iterable': 8,
    'Iterator': 9,
    'Mapping': 10,
    'MutableMapping': 10,
    'MappingView': 11,
    'ItemsView': 11,
    'KeysView': 11,
    'ValuesView': 11,
    'Reversible': 12,
    'Sequence': 13,
    'MutableSequence': 13,
    'ByteString': 13,
    'Set': 14,
    'MutableSet': 14
  },
  by_category: {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  },
  by_type: {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  }
}


})()


// This file was generated by `python3 ./bin/helpers/modulebot.py collections.abc` on 2019-12-12 18:44:20.179328


