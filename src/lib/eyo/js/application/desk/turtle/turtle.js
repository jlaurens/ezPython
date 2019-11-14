/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Turtle graphic environment.
 * 
 * @author jerome.laurens@u-bourgogne.fr
 */
'use strict'

goog.require('eYo.Pane')

goog.require('eYo.Decorate')
goog.provide('eYo.Turtle')

/**
 * Class for a turtle graphic environment.
 * @param {!eYo.Desk} owner Owner desk.
 * @constructor
 */
eYo.Turtle = function(owner) {
  eYo.Turtle.superClass_.constructor.call(this, owner)
}
goog.inherits(eYo.Turtle, eYo.Pane)

/**
 * Make the user interface.
 */
eYo.Turtle.prototype.initUI = eYo.Decorate.makeInitUI(
  eYo.Turtle,
  function() {
    this.driver.turtleInit(this)
  }
)

/**
 * Dispose of UI resources.
 */
eYo.Decorate.makeDisposeUI(
  eYo.Turtle,
  function() {
    this.driver.turtleDispose(this)
  }
)

/**
 * Update the metrics of the receiver.
 */
eYo.Turtle.prototype.updateMetrics = function () {
  this.ui_driver_mgr.turtleUpdateMetrics()
}

/**
 * Place the receiver.
 */
eYo.Turtle.prototype.place = function () {
  this.ui_driver_mgr.turtlePlace()
}
