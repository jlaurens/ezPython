/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview turtle model. Automatically generated by `python3 bin/helpers/modulebot.py turtle`
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.Model.turtle__module')
goog.provide('eYo.Model.turtle__module.Item')

goog.require('eYo.Model')
goog.require('eYo.Model.Item')

/**
 * @constructor
 * @param {*} model 
 */
eYo.Model.turtle__module.Item = function (model) {
  eYo.Model.turtle__module.Item.superClass_.constructor.call(this, model)
}

var Item = eYo.Model.turtle__module.Item

goog.inherits(Item, eYo.Model.Item)

/**
 * model
 */
Item.prototype.model = eYo.Model.turtle__module


eYo.Model.turtle__module.data = {
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
      name: 'forward',
      class: 'turtle',
      category: 0,
      type_: 0,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'distance'
        }
      ]
    }),
    new Item({
      name: 'back',
      class: 'turtle',
      category: 0,
      type_: 0,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'distance'
        }
      ]
    }),
    new Item({
      name: 'right',
      class: 'turtle',
      category: 0,
      type_: 0,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'angle'
        }
      ]
    }),
    new Item({
      name: 'left',
      class: 'turtle',
      category: 0,
      type_: 0,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'angle'
        }
      ]
    }),
    new Item({
      name: 'goto',
      class: 'turtle',
      category: 0,
      type_: 0,
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
      name: 'setx',
      class: 'turtle',
      category: 0,
      type_: 0,
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
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'y'
        }
      ]
    }),
    new Item({
      name: 'setheading',
      class: 'turtle',
      category: 0,
      type_: 0,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'to_angle'
        }
      ]
    }),
    new Item({
      name: 'home',
      class: 'turtle',
      category: 0,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'circle',
      class: 'turtle',
      category: 0,
      type_: 0,
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
      name: 'dot',
      class: 'turtle',
      category: 0,
      type_: 0,
      stmt: true,
      ary: Infinity,
      mandatory: 1,
      arguments: [
        {
          name: 'size',
          default: 'None'
        },
        {
          name: '*color'
        }
      ]
    }),
    new Item({
      name: 'stamp',
      class: 'turtle',
      category: 0,
      type_: 0
    }),
    new Item({
      name: 'clearstamp',
      class: 'turtle',
      category: 0,
      type_: 0,
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
      name: 'undo',
      class: 'turtle',
      category: 0,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'speed',
      class: 'turtle',
      category: 0,
      type_: 0,
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
      name: 'position',
      class: 'turtle',
      category: 1,
      type_: 0
    }),
    new Item({
      name: 'towards',
      class: 'turtle',
      category: 1,
      type_: 0,
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
      name: 'xcor',
      class: 'turtle',
      category: 1,
      type_: 0
    }),
    new Item({
      name: 'ycor',
      class: 'turtle',
      category: 1,
      type_: 0
    }),
    new Item({
      name: 'heading',
      class: 'turtle',
      category: 1,
      type_: 0
    }),
    new Item({
      name: 'distance',
      class: 'turtle',
      category: 1,
      type_: 0,
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
      name: 'degrees',
      class: 'turtle',
      category: 2,
      type_: 0,
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
      name: 'radians',
      class: 'turtle',
      category: 2,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'pendown',
      class: 'turtle',
      category: 3,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'penup',
      class: 'turtle',
      category: 3,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'pensize',
      class: 'turtle',
      category: 3,
      type_: 0,
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
      name: 'pen',
      class: 'turtle',
      category: 3,
      type_: 0,
      ary: Infinity,
      mandatory: 1,
      arguments: [
        {
          name: 'pen',
          default: 'None'
        },
        {
          name: '**pendict'
        }
      ]
    }),
    new Item({
      name: 'isdown',
      class: 'turtle',
      category: 3,
      type_: 0
    }),
    new Item({
      name: 'pencolor',
      class: 'turtle',
      category: 4,
      type_: 0,
      ary: Infinity,
      mandatory: 1,
      arguments: [
        {
          name: '*args'
        }
      ]
    }),
    new Item({
      name: 'fillcolor',
      class: 'turtle',
      category: 4,
      type_: 0,
      ary: Infinity,
      mandatory: 1,
      arguments: [
        {
          name: '*args'
        }
      ]
    }),
    new Item({
      name: 'color',
      class: 'turtle',
      category: 4,
      type_: 0,
      ary: Infinity,
      mandatory: 1,
      arguments: [
        {
          name: '*args'
        }
      ]
    }),
    new Item({
      name: 'filling',
      class: 'turtle',
      category: 5,
      type_: 0
    }),
    new Item({
      name: 'begin_fill',
      class: 'turtle',
      category: 5,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'end_fill',
      class: 'turtle',
      category: 5,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'reset',
      class: 'turtle',
      category: 6,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'clear',
      class: 'turtle',
      category: 6,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'write',
      class: 'turtle',
      category: 6,
      type_: 0,
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
      name: 'hideturtle',
      class: 'turtle',
      category: 7,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'showturtle',
      class: 'turtle',
      category: 7,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'isvisible',
      class: 'turtle',
      category: 7,
      type_: 0
    }),
    new Item({
      name: 'shape',
      class: 'turtle',
      category: 8,
      type_: 0,
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
      name: 'resizemode',
      class: 'turtle',
      category: 8,
      type_: 0,
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
      name: 'shapesize',
      class: 'turtle',
      category: 8,
      type_: 0,
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
      name: 'shearfactor',
      class: 'turtle',
      category: 8,
      type_: 0,
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
      name: 'tilt',
      class: 'turtle',
      category: 8,
      type_: 0,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'angle'
        }
      ]
    }),
    new Item({
      name: 'settiltangle',
      class: 'turtle',
      category: 8,
      type_: 0,
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
      name: 'shapetransform',
      class: 'turtle',
      category: 8,
      type_: 0,
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
      name: 'get_shapepoly',
      class: 'turtle',
      category: 8,
      type_: 0
    }),
    new Item({
      name: 'onclick',
      class: 'turtle',
      category: 9,
      type_: 0,
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
      name: 'onrelease',
      class: 'turtle',
      category: 9,
      type_: 0,
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
      name: 'begin_poly',
      class: 'turtle',
      category: 10,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'end_poly',
      class: 'turtle',
      category: 10,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'get_poly',
      class: 'turtle',
      category: 10,
      type_: 0
    }),
    new Item({
      name: 'clone',
      class: 'turtle',
      category: 10,
      type_: 0
    }),
    new Item({
      name: 'getturtle',
      class: 'turtle',
      category: 10,
      type_: 0
    }),
    new Item({
      name: 'getscreen',
      class: 'turtle',
      category: 10,
      type_: 0
    }),
    new Item({
      name: 'setundobuffer',
      class: 'turtle',
      category: 10,
      type_: 0,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'size'
        }
      ]
    }),
    new Item({
      name: 'undobufferentries',
      class: 'turtle',
      category: 10,
      type_: 0
    }),
    new Item({
      name: 'bgcolor',
      class: 'turtle',
      category: 11,
      type_: 0,
      ary: Infinity,
      mandatory: 1,
      arguments: [
        {
          name: '*args'
        }
      ]
    }),
    new Item({
      name: 'bgpic',
      class: 'turtle',
      category: 11,
      type_: 0,
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
      name: 'clearscreen',
      class: 'turtle',
      category: 11,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'resetscreen',
      class: 'turtle',
      category: 11,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'screensize',
      class: 'turtle',
      category: 11,
      type_: 0,
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
      name: 'setworldcoordinates',
      class: 'turtle',
      category: 11,
      type_: 0,
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
      name: 'delay',
      class: 'turtle',
      category: 12,
      type_: 0,
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
      name: 'tracer',
      class: 'turtle',
      category: 12,
      type_: 0,
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
      name: 'update',
      class: 'turtle',
      category: 12,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'listen',
      class: 'turtle',
      category: 13,
      type_: 0,
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
      name: 'onkey',
      class: 'turtle',
      category: 13,
      type_: 0,
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
      name: 'onscreenclick',
      class: 'turtle',
      category: 13,
      type_: 0,
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
      name: 'mainloop',
      class: 'turtle',
      category: 13,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'textinput',
      class: 'turtle',
      category: 14,
      type_: 0,
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
      name: 'numinput',
      class: 'turtle',
      category: 14,
      type_: 0,
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
      name: 'mode',
      class: 'turtle',
      category: 15,
      type_: 0,
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
      name: 'colormode',
      class: 'turtle',
      category: 15,
      type_: 0,
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
      name: 'getcanvas',
      class: 'turtle',
      category: 15,
      type_: 0
    }),
    new Item({
      name: 'getshapes',
      class: 'turtle',
      category: 15,
      type_: 0
    }),
    new Item({
      name: 'register_shape',
      class: 'turtle',
      category: 15,
      type_: 0,
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
      name: 'turtles',
      class: 'turtle',
      category: 15,
      type_: 0
    }),
    new Item({
      name: 'window_height',
      class: 'turtle',
      category: 15,
      type_: 0
    }),
    new Item({
      name: 'window_width',
      class: 'turtle',
      category: 15,
      type_: 0
    }),
    new Item({
      name: 'bye',
      class: 'turtle',
      category: 16,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'exitonclick',
      class: 'turtle',
      category: 16,
      type_: 0,
      stmt: true
    }),
    new Item({
      name: 'setup',
      class: 'turtle',
      category: 16,
      type_: 0,
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
      name: 'title',
      class: 'turtle',
      category: 16,
      type_: 0,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'titlestring'
        }
      ]
    }),
    new Item({
      name: 'RawTurtle',
      class: 'turtle',
      category: 17,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'canvas'
        }
      ]
    }),
    new Item({
      name: 'Turtle',
      category: 17,
      type_: 1,
      stmt: true
    }),
    new Item({
      name: 'TurtleScreen',
      class: 'turtle',
      category: 17,
      type_: 1,
      stmt: true,
      ary: 1,
      arguments: [
        {
          name: 'cv'
        }
      ]
    }),
    new Item({
      name: 'Screen',
      category: 17,
      type_: 1,
      stmt: true
    }),
    new Item({
      name: 'ScrolledCanvas',
      class: 'turtle',
      category: 17,
      type_: 1,
      stmt: true,
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
      stmt: true,
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
      name: 'addcomponent',
      category: 17,
      type_: 2,
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
      name: 'Vec2D',
      class: 'turtle',
      category: 17,
      type_: 1,
      stmt: true,
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
      name: 'write_docstringdict',
      class: 'turtle',
      category: 18,
      type_: 0,
      stmt: true,
      ary: 1,
      mandatory: 0,
      arguments: [
        {
          name: 'filename',
          default: '"turtle_docstringdict"'
        }
      ]
    })
  ],
  by_name: {
    'mainloop': 75,
    'stamp': 11,
    'delay': 67,
    'write_docstringdict': 98,
    'pensize': 26,
    'shapetransform': 48,
    'Shape': 95,
    'Vec2D': 97,
    'circle': 9,
    'addcomponent': 96,
    'getturtle': 57,
    'bye': 86,
    'getcanvas': 80,
    'RawTurtle': 90,
    'distance': 21,
    'tilt': 45,
    'right': 2,
    'reset': 35,
    'showturtle': 39,
    'register_shape': 82,
    'write': 37,
    'pen': 27,
    'towards': 17,
    'get_shapepoly': 49,
    'setworldcoordinates': 66,
    'hideturtle': 38,
    'Turtle': 91,
    'textinput': 76,
    'ondrag': 52,
    'radians': 23,
    'tiltangle': 47,
    'getshapes': 81,
    'settiltangle': 46,
    'get_poly': 55,
    'shearfactor': 44,
    'Screen': 93,
    'onkey': 71,
    'filling': 32,
    'undo': 14,
    'setx': 5,
    'end_fill': 34,
    'speed': 15,
    'home': 8,
    'screensize': 65,
    'setundobuffer': 59,
    'window_height': 84,
    'undobufferentries': 60,
    'end_poly': 54,
    'clearscreen': 63,
    'onkeypress': 72,
    'title': 89,
    'onclick': 50,
    'xcor': 18,
    'sety': 6,
    'resizemode': 42,
    'penup': 25,
    'isvisible': 40,
    'heading': 20,
    'bgpic': 62,
    'shapesize': 43,
    'onscreenclick': 73,
    'begin_fill': 33,
    'ScrolledCanvas': 94,
    'onrelease': 51,
    'turtles': 83,
    'exitonclick': 87,
    'dot': 10,
    'clearstamps': 13,
    'getscreen': 58,
    'back': 1,
    'resetscreen': 64,
    'degrees': 22,
    'window_width': 85,
    'color': 31,
    'clone': 56,
    'fillcolor': 30,
    'tracer': 68,
    'setheading': 7,
    'pendown': 24,
    'colormode': 79,
    'clear': 36,
    'goto': 4,
    'forward': 0,
    'bgcolor': 61,
    'clearstamp': 12,
    'shape': 41,
    'setup': 88,
    'mode': 78,
    'numinput': 77,
    'TurtleScreen': 92,
    'pencolor': 29,
    'update': 69,
    'listen': 70,
    'left': 3,
    'ycor': 19,
    'begin_poly': 53,
    'ontimer': 74,
    'position': 16,
    'isdown': 28
  },
  by_category: {
    5: [32, 33, 34],
    18: [98],
    10: [53, 54, 55, 56, 57, 58, 59, 60],
    7: [38, 39, 40],
    16: [86, 87, 88, 89],
    2: [22, 23],
    13: [70, 71, 72, 73, 74, 75],
    9: [50, 51, 52],
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    3: [24, 25, 26, 27, 28],
    6: [35, 36, 37],
    1: [16, 17, 18, 19, 20, 21],
    11: [61, 62, 63, 64, 65, 66],
    8: [41, 42, 43, 44, 45, 46, 47, 48, 49],
    4: [29, 30, 31],
    14: [76, 77],
    17: [90, 91, 92, 93, 94, 95, 96, 97],
    15: [78, 79, 80, 81, 82, 83, 84, 85],
    12: [67, 68, 69]
  },
  by_type: {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 98],
    2: [96],
    1: [90, 91, 92, 93, 94, 95, 97]
  }
}
/**
 * Get the item with the given key
 * @param {!String|Number} key  The key or index of the item
 * @return {?Object} return the model object for that item, if any.
 */
eYo.Model.turtle__module.getItem = function (key) {
  if (!goog.isNumber(key)) {
    key = eYo.Model.turtle__module.data.by_name[key]
  }
  if (goog.isNumber(key)) {
    return eYo.Model.turtle__module.data.items[key]
  }
}

/**
 * Get the type of the given item.
 * @param {!Object} item.
 * @return {?String} return the type.
 */
eYo.Model.turtle__module.getType = function (item) {
  return item && item.type && eYo.Model.turtle__module.data.types[item.type]
}

/**
 * Get the indices of the items for the given category
 * @param {!String} key  The name of the category
 * @return {!Array} the list of item indices with the given category (possibly void).
 */
eYo.Model.turtle__module.getItemsInCategory = function (category, type) {
  var ra = eYo.Model.turtle__module.data.by_category[category] || []
  if (goog.isString(type)) {
    type = eYo.Model.turtle__module.data.type.indexOf(type)
  }
  if (goog.isNumber(type) && type >= 0) {
    var ra2 = []
    for (var i = 0; i < ra.length ; i++ ) {
      var item = eYo.Model.turtle__module.getItem(i)
      if (item && item.type === type) {
        ra2.append(i)
      }
    }
    return ra2
  } else {
    return ra
  }
}

// This file was generated by `python3 ./bin/helpers/modulebot.py turtle` on 2018-10-21 13:44:35.793779


