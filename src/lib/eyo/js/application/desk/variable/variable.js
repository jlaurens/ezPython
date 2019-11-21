/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Variable inspector.
 * 
 * @author jerome.laurens@u-bourgogne.fr
 */
'use strict'

goog.require('eYo.Pane')

goog.require('eYo.Decorate')
goog.provide('eYo.Variable')

/**
 * Class for a variable inspector.
 * @param {!eYo.Desk} owner Owner desk.
 * @constructor
 */
eYo.UI.Constructor.make({
  key: 'Variable',
  owner: eYo,
  super: eYo.Pane,
})