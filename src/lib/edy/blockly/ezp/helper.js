/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License CeCILL-B
 */

/**
 * @fileoverview helper for edython.
 * In order to avoid name collisions, every subclass of either a
 * closure object or a Blockly object has a minimum of extra properties.
 * All these properties and methods are gathered in the  helper.
 * Block helpers are called delegates.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('edY.Helper')

goog.require('goog.Disposable')

/**
 * Class for a an object helper for edython related subclasses.
 * @constructor
 */
edY.Helper = function () {
  edY.Helper.superClass_.constructor.call(this)
  this.options = {}
}
goog.inherits(edY.Helper, goog.Disposable)
