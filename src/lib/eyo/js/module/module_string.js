/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview string module. Automatically generated by `python3 bin/helpers/modulebot.py string through npm run eyo:module`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.module.newNS('string__module', {
  URL: 'https://docs.python.org/3.6/library/string.html'
})

;(() => {
  /* Singleton constructor */
  let newItem = eYo.module.string__module.makeNewItem()

  eYo.module.string__module.data_ = {
    categories: [
      'string-constants',
      'custom-string-formatting',
      'template-strings',
      'helper-functions'
    ],
    types: [
      'data',
      'class',
      'function',
      'method'
    ],
    items: [
      newItem({
        name: 'Formatter',
        class: 'string',
        category: 1,
        type_: 1,
        href: '#string.Formatter',
        ary: 0
      }),
      newItem({
        name: 'Template',
        class: 'string',
        category: 2,
        type_: 1,
        href: '#string.Template',
        ary: 1,
        arguments: [
          {
            name: 'template'
          }
        ]
      }),
      newItem({
        name: 'ascii_letters',
        class: 'string',
        category: 0,
        type_: 0,
        href: '#string.ascii_letters',
        ary: 0
      }),
      newItem({
        name: 'ascii_lowercase',
        class: 'string',
        category: 0,
        type_: 0,
        href: '#string.ascii_lowercase',
        ary: 0
      }),
      newItem({
        name: 'ascii_uppercase',
        class: 'string',
        category: 0,
        type_: 0,
        href: '#string.ascii_uppercase',
        ary: 0
      }),
      newItem({
        name: 'capwords',
        class: 'string',
        category: 3,
        type_: 2,
        href: '#string.capwords',
        stmt: true,
        ary: 2,
        mandatory: 1,
        arguments: [
          {
            name: 's'
          },
          {
            name: 'sep',
            default: 'None'
          }
        ]
      }),
      newItem({
        name: 'check_unused_args',
        class: 'string.Formatter',
        category: 1,
        type_: 3,
        href: '#string.Formatter.check_unused_args',
        stmt: true,
        ary: 3,
        arguments: [
          {
            name: 'used_args'
          },
          {
            name: 'args'
          },
          {
            name: 'kwargs'
          }
        ]
      }),
      newItem({
        name: 'convert_field',
        class: 'string.Formatter',
        category: 1,
        type_: 3,
        href: '#string.Formatter.convert_field',
        ary: 2,
        arguments: [
          {
            name: 'value'
          },
          {
            name: 'conversion'
          }
        ]
      }),
      newItem({
        name: 'digits',
        class: 'string',
        category: 0,
        type_: 0,
        href: '#string.digits',
        ary: 0
      }),
      newItem({
        name: 'format',
        class: 'string.Formatter',
        category: 1,
        type_: 3,
        href: '#string.Formatter.format',
        stmt: true,
        ary: Infinity,
        mandatory: 1,
        arguments: [
          {
            name: 'format_string'
          },
          {
            name: '*args',
            optional: true
          },
          {
            name: '**kwargs',
            optional: true
          }
        ]
      }),
      newItem({
        name: 'format_field',
        class: 'string.Formatter',
        category: 1,
        type_: 3,
        href: '#string.Formatter.format_field',
        stmt: true,
        ary: 2,
        arguments: [
          {
            name: 'value'
          },
          {
            name: 'format_spec'
          }
        ]
      }),
      newItem({
        name: 'get_field',
        class: 'string.Formatter',
        category: 1,
        type_: 3,
        href: '#string.Formatter.get_field',
        ary: 3,
        arguments: [
          {
            name: 'field_name'
          },
          {
            name: 'args'
          },
          {
            name: 'kwargs'
          }
        ]
      }),
      newItem({
        name: 'get_value',
        class: 'string.Formatter',
        category: 1,
        type_: 3,
        href: '#string.Formatter.get_value',
        ary: 3,
        arguments: [
          {
            name: 'key'
          },
          {
            name: 'args'
          },
          {
            name: 'kwargs'
          }
        ]
      }),
      newItem({
        name: 'hexdigits',
        class: 'string',
        category: 0,
        type_: 0,
        href: '#string.hexdigits',
        ary: 0
      }),
      newItem({
        name: 'octdigits',
        class: 'string',
        category: 0,
        type_: 0,
        href: '#string.octdigits',
        ary: 0
      }),
      newItem({
        name: 'parse',
        class: 'string.Formatter',
        category: 1,
        type_: 3,
        href: '#string.Formatter.parse',
        ary: 1,
        arguments: [
          {
            name: 'format_string'
          }
        ]
      }),
      newItem({
        name: 'printable',
        class: 'string',
        category: 0,
        type_: 0,
        href: '#string.printable',
        ary: 0
      }),
      newItem({
        name: 'punctuation',
        class: 'string',
        category: 0,
        type_: 0,
        href: '#string.punctuation',
        ary: 0
      }),
      newItem({
        name: 'safe_substitute',
        class: 'string.Template',
        category: 2,
        type_: 3,
        href: '#string.Template.safe_substitute',
        stmt: true,
        ary: Infinity,
        mandatory: 1,
        arguments: [
          {
            name: 'mapping'
          },
          {
            name: '**kwds',
            optional: true
          }
        ]
      }),
      newItem({
        name: 'substitute',
        class: 'string.Template',
        category: 2,
        type_: 3,
        href: '#string.Template.substitute',
        ary: Infinity,
        mandatory: 1,
        arguments: [
          {
            name: 'mapping'
          },
          {
            name: '**kwds',
            optional: true
          }
        ]
      }),
      newItem({
        name: 'vformat',
        class: 'string.Formatter',
        category: 1,
        type_: 3,
        href: '#string.Formatter.vformat',
        stmt: true,
        ary: 3,
        arguments: [
          {
            name: 'format_string'
          },
          {
            name: 'args'
          },
          {
            name: 'kwargs'
          }
        ]
      }),
      newItem({
        name: 'whitespace',
        class: 'string',
        category: 0,
        type_: 0,
        href: '#string.whitespace',
        ary: 0
      })
    ],
    by_name: {
      'Formatter': 0,
      'Template': 1,
      'ascii_letters': 2,
      'ascii_lowercase': 3,
      'ascii_uppercase': 4,
      'capwords': 5,
      'check_unused_args': 6,
      'convert_field': 7,
      'digits': 8,
      'format': 9,
      'format_field': 10,
      'get_field': 11,
      'get_value': 12,
      'hexdigits': 13,
      'octdigits': 14,
      'parse': 15,
      'printable': 16,
      'punctuation': 17,
      'safe_substitute': 18,
      'substitute': 19,
      'vformat': 20,
      'whitespace': 21
    },
    by_category: {
      0: [2, 3, 4, 8, 13, 14, 16, 17, 21],
      1: [0, 6, 7, 9, 10, 11, 12, 15, 20],
      2: [1, 18, 19],
      3: [5]
    },
    by_type: {
      0: [2, 3, 4, 8, 13, 14, 16, 17, 21],
      1: [0, 1],
      2: [5],
      3: [6, 7, 9, 10, 11, 12, 15, 18, 19, 20]
    }
  }
  

}) ()


  // This file was generated by `python3 ./bin/helpers/modulebot.py string` on 2020-03-04 13:02:48.618194


