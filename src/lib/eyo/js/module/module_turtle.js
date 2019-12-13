/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview turtle module. Automatically generated by `python3 bin/helpers/modulebot.py turtle`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.require('Module')

eYo.provide('Module.turtle__module', new eYo.Module.Dflt('turtle__module', 'https://docs.python.org/3.6/library/turtle.html'))

;(function () {

  /* Singleton constructor */
  var Item = function (model) {
    eYo.Module.Item.call(this, model)
  }
  goog.inherits(Item, eYo.Module.Item)

  /**
  * module
  */
  Item.prototype.module = eYo.Module.turtle__module

  Object.defineProperties(Item.prototype, {
    url: {
      get() {
        return this.href
          ? this.module.url + this.href
          : this.module.url
      }
    }
  })

eYo.Module.turtle__module.data_ = {
  categories: [
    'turtle-motion',
    'tell-turtle-s-state',
    'settings-for-measurement',
    'drawing-state',
    'color-control',
    'filling',
    'more-drawing-control',
    'visibility',
    'appearance',
    'using-events',
    'special-turtle-methods',
    'window-control',
    'animation-control',
    'using-screen-events',
    'input-methods',
    'settings-and-special-methods',
    'methods-specific-to-screen-not-inherited-from-turtlescreen',
    'public-classes',
    'translation-of-docstrings-into-different-languages'
  ],
  types: [
    'function',
    'class',
    'method'
  ],
  items: [
    new Item({
      name: 'RawTurtle',
      synonyms: [
        'RawPen'
      ],
      class: 'turtle',
      category: 17,
      type_: 1,
      href: '#turtle.RawPen',
      ary: 1,
      arguments: [
        {
          name: 'canvas'
        }
      ]
    }),
    new Item({
      name: 'Screen',
      class: 'turtle',
      category: 17,
      type_: 1,
      href: '#turtle.Screen',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'ScrolledCanvas',
      class: 'turtle',
      category: 17,
      type_: 1,
      href: '#turtle.ScrolledCanvas',
      ary: 1,
      arguments: [
        {
          name: 'master'
        }
      ]
    }),
    new Item({
      name: 'Shape',
      class: 'turtle',
      category: 17,
      type_: 1,
      href: '#turtle.Shape',
      ary: 2,
      arguments: [
        {
          name: 'type_'
        },
        {
          name: 'data'
        }
      ]
    }),
    new Item({
      name: 'Turtle',
      class: 'turtle',
      category: 17,
      type_: 1,
      href: '#turtle.Turtle',
      ary: 0
    }),
    new Item({
      name: 'TurtleScreen',
      class: 'turtle',
      category: 17,
      type_: 1,
      href: '#turtle.TurtleScreen',
      ary: 1,
      arguments: [
        {
          name: 'cv'
        }
      ]
    }),
    new Item({
      name: 'Vec2D',
      class: 'turtle',
      category: 17,
      type_: 1,
      href: '#turtle.Vec2D',
      ary: 2,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'addcomponent',
      class: 'turtle.Shape',
      category: 17,
      type_: 2,
      href: '#turtle.Shape.addcomponent',
      stmt: true,
      ary: 3,
      mandatory: 2,
      arguments: [
        {
          name: 'poly'
        },
        {
          name: 'fill'
        },
        {
          name: 'outline',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'back',
      synonyms: [
        'bk',
        'backward'
      ],
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.backward',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'distance'
        }
      ]
    }),
    new Item({
      name: 'begin_fill',
      class: 'turtle',
      category: 5,
      type_: 0,
      href: '#turtle.begin_fill',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'begin_poly',
      class: 'turtle',
      category: 10,
      type_: 0,
      href: '#turtle.begin_poly',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'bgcolor',
      class: 'turtle',
      category: 11,
      type_: 0,
      href: '#turtle.bgcolor',
      ary: Infinity,
      mandatory: 0,
      arguments: [
        {
          name: '*args',
          optional: true
        }
      ]
    }),
    new Item({
      name: 'bgpic',
      class: 'turtle',
      category: 11,
      type_: 0,
      href: '#turtle.bgpic',
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'picname',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'bye',
      class: 'turtle',
      category: 16,
      type_: 0,
      href: '#turtle.bye',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'circle',
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.circle',
      stmt: true,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'radius'
        },
        {
          name: 'extent',
          default: 'None'
        },
        {
          name: 'steps',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'clear',
      class: 'turtle',
      category: 6,
      type_: 0,
      href: '#turtle.clear',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'clearscreen',
      synonyms: [
        'clear'
      ],
      class: 'turtle',
      category: 11,
      type_: 0,
      href: '#turtle.clearscreen',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'clearstamp',
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.clearstamp',
      ary: 1,
      arguments: [
        {
          name: 'stampid'
        }
      ]
    }),
    new Item({
      name: 'clearstamps',
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.clearstamps',
      stmt: true,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'n',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'clone',
      class: 'turtle',
      category: 10,
      type_: 0,
      href: '#turtle.clone',
      ary: 0
    }),
    new Item({
      name: 'color',
      class: 'turtle',
      category: 4,
      type_: 0,
      href: '#turtle.color',
      signatures: [
        {
          ary: 0
        },
        {
          ary: 1,
          arguments: [
            {
              name: 'colorstring'
            }
          ]
        },
        {
          ary: 1,
          arguments: [
            {
              name: '(r,g,b)'
            }
          ]
        },
        {
          ary: 3,
          arguments: [
            {
              name: 'r'
            },
            {
              name: 'g'
            },
            {
              name: 'b'
            }
          ]
        },
        {
          ary: 2,
          arguments: [
            {
              name: 'colorstring1'
            },
            {
              name: 'colorstring2'
            }
          ]
        },
        {
          ary: 2,
          arguments: [
            {
              name: '(r1,g1,b1)'
            },
            {
              name: '(r2,g2,b2)'
            }
          ]
        }
      ],
      ary: 3,
      mandatory: 0,
      arguments: [
        {
          name: '*args',
          optional: true
        }
      ]
    }),
    new Item({
      name: 'colormode',
      class: 'turtle',
      category: 15,
      type_: 0,
      href: '#turtle.colormode',
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'cmode',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'degrees',
      class: 'turtle',
      category: 2,
      type_: 0,
      href: '#turtle.degrees',
      stmt: true,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'fullcircle',
          default: 360.0
        }
      ]
    }),
    new Item({
      name: 'delay',
      class: 'turtle',
      category: 12,
      type_: 0,
      href: '#turtle.delay',
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'delay',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'distance',
      class: 'turtle',
      category: 1,
      type_: 0,
      href: '#turtle.distance',
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'dot',
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.dot',
      stmt: true,
      ary: Infinity,
      mandatory: 0,
      arguments: [
        {
          name: 'size',
          default: 'None'
        },
        {
          name: '*color',
          optional: true
        }
      ]
    }),
    new Item({
      name: 'end_fill',
      class: 'turtle',
      category: 5,
      type_: 0,
      href: '#turtle.end_fill',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'end_poly',
      class: 'turtle',
      category: 10,
      type_: 0,
      href: '#turtle.end_poly',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'exitonclick',
      class: 'turtle',
      category: 16,
      type_: 0,
      href: '#turtle.exitonclick',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'fillcolor',
      class: 'turtle',
      category: 4,
      type_: 0,
      href: '#turtle.fillcolor',
      signatures: [
        {
          ary: 0
        },
        {
          ary: 1,
          arguments: [
            {
              name: 'colorstring'
            }
          ]
        },
        {
          ary: 1,
          arguments: [
            {
              name: '(r, g, b)'
            }
          ]
        },
        {
          ary: 3,
          arguments: [
            {
              name: 'r'
            },
            {
              name: 'g'
            },
            {
              name: 'b'
            }
          ]
        }
      ],
      ary: 3,
      mandatory: 0,
      arguments: [
        {
          name: '*args',
          optional: true
        }
      ]
    }),
    new Item({
      name: 'filling',
      class: 'turtle',
      category: 5,
      type_: 0,
      href: '#turtle.filling',
      ary: 0
    }),
    new Item({
      name: 'forward',
      synonyms: [
        'fd'
      ],
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.fd',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'distance'
        }
      ]
    }),
    new Item({
      name: 'get_poly',
      class: 'turtle',
      category: 10,
      type_: 0,
      href: '#turtle.get_poly',
      ary: 0
    }),
    new Item({
      name: 'get_shapepoly',
      class: 'turtle',
      category: 8,
      type_: 0,
      href: '#turtle.get_shapepoly',
      ary: 0
    }),
    new Item({
      name: 'getcanvas',
      class: 'turtle',
      category: 15,
      type_: 0,
      href: '#turtle.getcanvas',
      ary: 0
    }),
    new Item({
      name: 'getscreen',
      class: 'turtle',
      category: 10,
      type_: 0,
      href: '#turtle.getscreen',
      ary: 0
    }),
    new Item({
      name: 'getshapes',
      class: 'turtle',
      category: 15,
      type_: 0,
      href: '#turtle.getshapes',
      ary: 0
    }),
    new Item({
      name: 'getturtle',
      synonyms: [
        'getpen'
      ],
      class: 'turtle',
      category: 10,
      type_: 0,
      href: '#turtle.getpen',
      ary: 0
    }),
    new Item({
      name: 'goto',
      synonyms: [
        'setpos',
        'setposition'
      ],
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.setposition',
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'heading',
      class: 'turtle',
      category: 1,
      type_: 0,
      href: '#turtle.heading',
      ary: 0
    }),
    new Item({
      name: 'hideturtle',
      synonyms: [
        'ht'
      ],
      class: 'turtle',
      category: 7,
      type_: 0,
      href: '#turtle.ht',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'home',
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.home',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'isdown',
      class: 'turtle',
      category: 3,
      type_: 0,
      href: '#turtle.isdown',
      ary: 0
    }),
    new Item({
      name: 'isvisible',
      class: 'turtle',
      category: 7,
      type_: 0,
      href: '#turtle.isvisible',
      ary: 0
    }),
    new Item({
      name: 'left',
      synonyms: [
        'lt'
      ],
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.lt',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'angle'
        }
      ]
    }),
    new Item({
      name: 'listen',
      class: 'turtle',
      category: 13,
      type_: 0,
      href: '#turtle.listen',
      stmt: true,
      ary: 2,
      mandatory: 0,
      arguments: [
        {
          name: 'xdummy',
          default: 'None'
        },
        {
          name: 'ydummy',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'mainloop',
      synonyms: [
        'done'
      ],
      class: 'turtle',
      category: 13,
      type_: 0,
      href: '#turtle.done',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'mode',
      class: 'turtle',
      category: 15,
      type_: 0,
      href: '#turtle.mode',
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'mode',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'numinput',
      class: 'turtle',
      category: 14,
      type_: 0,
      href: '#turtle.numinput',
      ary: 5,
      mandatory: 2,
      arguments: [
        {
          name: 'title'
        },
        {
          name: 'prompt'
        },
        {
          name: 'default',
          default: 'None'
        },
        {
          name: 'minval',
          default: 'None'
        },
        {
          name: 'maxval',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'onclick',
      class: 'turtle',
      category: 9,
      type_: 0,
      href: '#turtle.onclick',
      stmt: true,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'fun'
        },
        {
          name: 'btn',
          default: 1
        },
        {
          name: 'add',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'ondrag',
      class: 'turtle',
      category: 9,
      type_: 0,
      href: '#turtle.ondrag',
      stmt: true,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'fun'
        },
        {
          name: 'btn',
          default: 1
        },
        {
          name: 'add',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'onkey',
      synonyms: [
        'onkeyrelease'
      ],
      class: 'turtle',
      category: 13,
      type_: 0,
      href: '#turtle.onkeyrelease',
      stmt: true,
      ary: 2,
      arguments: [
        {
          name: 'fun'
        },
        {
          name: 'key'
        }
      ]
    }),
    new Item({
      name: 'onkeypress',
      class: 'turtle',
      category: 13,
      type_: 0,
      href: '#turtle.onkeypress',
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'fun'
        },
        {
          name: 'key',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'onrelease',
      class: 'turtle',
      category: 9,
      type_: 0,
      href: '#turtle.onrelease',
      stmt: true,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'fun'
        },
        {
          name: 'btn',
          default: 1
        },
        {
          name: 'add',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'onscreenclick',
      synonyms: [
        'onclick'
      ],
      class: 'turtle',
      category: 13,
      type_: 0,
      href: '#turtle.onscreenclick',
      stmt: true,
      ary: 3,
      mandatory: 1,
      arguments: [
        {
          name: 'fun'
        },
        {
          name: 'btn',
          default: 1
        },
        {
          name: 'add',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'ontimer',
      class: 'turtle',
      category: 13,
      type_: 0,
      href: '#turtle.ontimer',
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'fun'
        },
        {
          name: 't',
          default: 0
        }
      ]
    }),
    new Item({
      name: 'pen',
      class: 'turtle',
      category: 3,
      type_: 0,
      href: '#turtle.pen',
      ary: Infinity,
      mandatory: 0,
      arguments: [
        {
          name: 'pen',
          default: 'None'
        },
        {
          name: '**pendict',
          optional: true
        }
      ]
    }),
    new Item({
      name: 'pencolor',
      class: 'turtle',
      category: 4,
      type_: 0,
      href: '#turtle.pencolor',
      signatures: [
        {
          ary: 0
        },
        {
          ary: 1,
          arguments: [
            {
              name: 'colorstring'
            }
          ]
        },
        {
          ary: 1,
          arguments: [
            {
              name: '(r, g, b)'
            }
          ]
        },
        {
          ary: 3,
          arguments: [
            {
              name: 'r'
            },
            {
              name: 'g'
            },
            {
              name: 'b'
            }
          ]
        }
      ],
      ary: 3,
      mandatory: 0,
      arguments: [
        {
          name: '*args',
          optional: true
        }
      ]
    }),
    new Item({
      name: 'pendown',
      synonyms: [
        'pd',
        'down'
      ],
      class: 'turtle',
      category: 3,
      type_: 0,
      href: '#turtle.down',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'pensize',
      synonyms: [
        'width'
      ],
      class: 'turtle',
      category: 3,
      type_: 0,
      href: '#turtle.width',
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'width',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'penup',
      synonyms: [
        'pu',
        'up'
      ],
      class: 'turtle',
      category: 3,
      type_: 0,
      href: '#turtle.up',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'position',
      synonyms: [
        'pos'
      ],
      class: 'turtle',
      category: 1,
      type_: 0,
      href: '#turtle.pos',
      ary: 0
    }),
    new Item({
      name: 'radians',
      class: 'turtle',
      category: 2,
      type_: 0,
      href: '#turtle.radians',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'register_shape',
      synonyms: [
        'addshape'
      ],
      class: 'turtle',
      category: 15,
      type_: 0,
      href: '#turtle.addshape',
      stmt: true,
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'name'
        },
        {
          name: 'shape',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'reset',
      class: 'turtle',
      category: 6,
      type_: 0,
      href: '#turtle.reset',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'resetscreen',
      synonyms: [
        'reset'
      ],
      class: 'turtle',
      category: 11,
      type_: 0,
      href: '#turtle.resetscreen',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'resizemode',
      class: 'turtle',
      category: 8,
      type_: 0,
      href: '#turtle.resizemode',
      stmt: true,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'rmode',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'right',
      synonyms: [
        'rt'
      ],
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.rt',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'angle'
        }
      ]
    }),
    new Item({
      name: 'screensize',
      class: 'turtle',
      category: 11,
      type_: 0,
      href: '#turtle.screensize',
      ary: 3,
      mandatory: 0,
      arguments: [
        {
          name: 'canvwidth',
          default: 'None'
        },
        {
          name: 'canvheight',
          default: 'None'
        },
        {
          name: 'bg',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'setheading',
      synonyms: [
        'seth'
      ],
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.seth',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'to_angle'
        }
      ]
    }),
    new Item({
      name: 'settiltangle',
      class: 'turtle',
      category: 8,
      type_: 0,
      href: '#turtle.settiltangle',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'angle'
        }
      ]
    }),
    new Item({
      name: 'setundobuffer',
      class: 'turtle',
      category: 10,
      type_: 0,
      href: '#turtle.setundobuffer',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'size'
        }
      ]
    }),
    new Item({
      name: 'setup',
      class: 'turtle',
      category: 16,
      type_: 0,
      href: '#turtle.setup',
      stmt: true,
      ary: 5,
      mandatory: 0,
      arguments: [
        {
          name: 'width',
          default: '_CFG'
        },
        {
          name: '"width"',
          optional: true
        },
        {
          name: 'height',
          default: '_CFG"height"'
        },
        {
          name: 'startx',
          default: '_CFG"leftright"'
        },
        {
          name: 'starty',
          default: '_CFG"topbottom"'
        }
      ]
    }),
    new Item({
      name: 'setworldcoordinates',
      class: 'turtle',
      category: 11,
      type_: 0,
      href: '#turtle.setworldcoordinates',
      stmt: true,
      ary: 4,
      arguments: [
        {
          name: 'llx'
        },
        {
          name: 'lly'
        },
        {
          name: 'urx'
        },
        {
          name: 'ury'
        }
      ]
    }),
    new Item({
      name: 'setx',
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.setx',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'x'
        }
      ]
    }),
    new Item({
      name: 'sety',
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.sety',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'shape',
      class: 'turtle',
      category: 8,
      type_: 0,
      href: '#turtle.shape',
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'name',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'shapesize',
      synonyms: [
        'turtlesize'
      ],
      class: 'turtle',
      category: 8,
      type_: 0,
      href: '#turtle.turtlesize',
      ary: 3,
      mandatory: 0,
      arguments: [
        {
          name: 'stretch_wid',
          default: 'None'
        },
        {
          name: 'stretch_len',
          default: 'None'
        },
        {
          name: 'outline',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'shapetransform',
      class: 'turtle',
      category: 8,
      type_: 0,
      href: '#turtle.shapetransform',
      ary: 4,
      mandatory: 0,
      arguments: [
        {
          name: 't11',
          default: 'None'
        },
        {
          name: 't12',
          default: 'None'
        },
        {
          name: 't21',
          default: 'None'
        },
        {
          name: 't22',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'shearfactor',
      class: 'turtle',
      category: 8,
      type_: 0,
      href: '#turtle.shearfactor',
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'shear',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'showturtle',
      synonyms: [
        'st'
      ],
      class: 'turtle',
      category: 7,
      type_: 0,
      href: '#turtle.st',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'speed',
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.speed',
      stmt: true,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'speed',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'stamp',
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.stamp',
      ary: 0
    }),
    new Item({
      name: 'textinput',
      class: 'turtle',
      category: 14,
      type_: 0,
      href: '#turtle.textinput',
      ary: 2,
      arguments: [
        {
          name: 'title'
        },
        {
          name: 'prompt'
        }
      ]
    }),
    new Item({
      name: 'tilt',
      class: 'turtle',
      category: 8,
      type_: 0,
      href: '#turtle.tilt',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'angle'
        }
      ]
    }),
    new Item({
      name: 'tiltangle',
      class: 'turtle',
      category: 8,
      type_: 0,
      href: '#turtle.tiltangle',
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'angle',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'title',
      class: 'turtle',
      category: 16,
      type_: 0,
      href: '#turtle.title',
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'titlestring'
        }
      ]
    }),
    new Item({
      name: 'towards',
      class: 'turtle',
      category: 1,
      type_: 0,
      href: '#turtle.towards',
      ary: 2,
      mandatory: 1,
      arguments: [
        {
          name: 'x'
        },
        {
          name: 'y',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'tracer',
      class: 'turtle',
      category: 12,
      type_: 0,
      href: '#turtle.tracer',
      ary: 2,
      mandatory: 0,
      arguments: [
        {
          name: 'n',
          default: 'None'
        },
        {
          name: 'delay',
          default: 'None'
        }
      ]
    }),
    new Item({
      name: 'turtles',
      class: 'turtle',
      category: 15,
      type_: 0,
      href: '#turtle.turtles',
      ary: 0
    }),
    new Item({
      name: 'undo',
      class: 'turtle',
      category: 0,
      type_: 0,
      href: '#turtle.undo',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'undobufferentries',
      class: 'turtle',
      category: 10,
      type_: 0,
      href: '#turtle.undobufferentries',
      ary: 0
    }),
    new Item({
      name: 'update',
      class: 'turtle',
      category: 12,
      type_: 0,
      href: '#turtle.update',
      stmt: true,
      ary: 0
    }),
    new Item({
      name: 'window_height',
      class: 'turtle',
      category: 15,
      type_: 0,
      href: '#turtle.window_height',
      ary: 0
    }),
    new Item({
      name: 'window_width',
      class: 'turtle',
      category: 15,
      type_: 0,
      href: '#turtle.window_width',
      ary: 0
    }),
    new Item({
      name: 'write',
      class: 'turtle',
      category: 6,
      type_: 0,
      href: '#turtle.write',
      stmt: true,
      ary: 6,
      mandatory: 3,
      arguments: [
        {
          name: 'arg'
        },
        {
          name: 'move',
          default: 'False'
        },
        {
          name: 'align',
          default: '"left"'
        },
        {
          name: 'font',
          default: '("Arial"'
        },
        {
          name: '8'
        },
        {
          name: '"normal")'
        }
      ]
    }),
    new Item({
      name: 'write_docstringdict',
      class: 'turtle',
      category: 18,
      type_: 0,
      href: '#turtle.write_docstringdict',
      stmt: true,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'filename',
          default: '"turtle_docstringdict"'
        }
      ]
    }),
    new Item({
      name: 'xcor',
      class: 'turtle',
      category: 1,
      type_: 0,
      href: '#turtle.xcor',
      ary: 0
    }),
    new Item({
      name: 'ycor',
      class: 'turtle',
      category: 1,
      type_: 0,
      href: '#turtle.ycor',
      ary: 0
    })
  ],
  by_name: {
    'RawTurtle': 0,
    'RawPen': 0,
    'Screen': 1,
    'ScrolledCanvas': 2,
    'Shape': 3,
    'Turtle': 4,
    'TurtleScreen': 5,
    'Vec2D': 6,
    'addcomponent': 7,
    'back': 8,
    'bk': 8,
    'backward': 8,
    'begin_fill': 9,
    'begin_poly': 10,
    'bgcolor': 11,
    'bgpic': 12,
    'bye': 13,
    'circle': 14,
    'clear': 16,
    'clearscreen': 16,
    'clearstamp': 17,
    'clearstamps': 18,
    'clone': 19,
    'color': 20,
    'colormode': 21,
    'degrees': 22,
    'delay': 23,
    'distance': 24,
    'dot': 25,
    'end_fill': 26,
    'end_poly': 27,
    'exitonclick': 28,
    'fillcolor': 29,
    'filling': 30,
    'forward': 31,
    'fd': 31,
    'get_poly': 32,
    'get_shapepoly': 33,
    'getcanvas': 34,
    'getscreen': 35,
    'getshapes': 36,
    'getturtle': 37,
    'getpen': 37,
    'goto': 38,
    'setpos': 38,
    'setposition': 38,
    'heading': 39,
    'hideturtle': 40,
    'ht': 40,
    'home': 41,
    'isdown': 42,
    'isvisible': 43,
    'left': 44,
    'lt': 44,
    'listen': 45,
    'mainloop': 46,
    'done': 46,
    'mode': 47,
    'numinput': 48,
    'onclick': 54,
    'ondrag': 50,
    'onkey': 51,
    'onkeyrelease': 51,
    'onkeypress': 52,
    'onrelease': 53,
    'onscreenclick': 54,
    'ontimer': 55,
    'pen': 56,
    'pencolor': 57,
    'pendown': 58,
    'pd': 58,
    'down': 58,
    'pensize': 59,
    'width': 59,
    'penup': 60,
    'pu': 60,
    'up': 60,
    'position': 61,
    'pos': 61,
    'radians': 62,
    'register_shape': 63,
    'addshape': 63,
    'reset': 65,
    'resetscreen': 65,
    'resizemode': 66,
    'right': 67,
    'rt': 67,
    'screensize': 68,
    'setheading': 69,
    'seth': 69,
    'settiltangle': 70,
    'setundobuffer': 71,
    'setup': 72,
    'setworldcoordinates': 73,
    'setx': 74,
    'sety': 75,
    'shape': 76,
    'shapesize': 77,
    'turtlesize': 77,
    'shapetransform': 78,
    'shearfactor': 79,
    'showturtle': 80,
    'st': 80,
    'speed': 81,
    'stamp': 82,
    'textinput': 83,
    'tilt': 84,
    'tiltangle': 85,
    'title': 86,
    'towards': 87,
    'tracer': 88,
    'turtles': 89,
    'undo': 90,
    'undobufferentries': 91,
    'update': 92,
    'window_height': 93,
    'window_width': 94,
    'write': 95,
    'write_docstringdict': 96,
    'xcor': 97,
    'ycor': 98
  },
  by_category: {
    0: [8, 14, 17, 18, 25, 31, 38, 41, 44, 67, 69, 74, 75, 81, 82, 90],
    1: [24, 39, 61, 87, 97, 98],
    2: [22, 62],
    3: [42, 56, 58, 59, 60],
    4: [20, 29, 57],
    5: [9, 26, 30],
    6: [15, 64, 95],
    7: [40, 43, 80],
    8: [33, 66, 70, 76, 77, 78, 79, 84, 85],
    9: [49, 50, 53],
    10: [10, 19, 27, 32, 35, 37, 71, 91],
    11: [11, 12, 16, 65, 68, 73],
    12: [23, 88, 92],
    13: [45, 46, 51, 52, 54, 55],
    14: [48, 83],
    15: [21, 34, 36, 47, 63, 89, 93, 94],
    16: [13, 28, 72, 86],
    17: [0, 1, 2, 3, 4, 5, 6, 7],
    18: [96]
  },
  by_type: {
    0: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98],
    1: [0, 1, 2, 3, 4, 5, 6],
    2: [7]
  }
}


})()


// This file was generated by `python3 ./bin/helpers/modulebot.py turtle` on 2019-12-12 18:44:19.687378


