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

eYo.require('eYo.Pane')

eYo.require('eYo.Decorate')
eYo.provide('eYo.Variable')

/**
 * Class for a variable inspector.
 * @param {eYo.Desk} owner Owner desk.
 * @constructor
 */
eYo.NS_UI.makeClass('Variable', eYo.Pane)
