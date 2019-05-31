/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Factory model.
 * @author jerome.laurens@u-bourgogne.fr
 */
'use strict'

goog.provide('eYo.Factory')

goog.require('eYo')

goog.forwardDeclare('goog.array');
goog.forwardDeclare('goog.math');

goog.forwardDeclare('eYo.Desktop')
goog.forwardDeclare('eYo.Options')


/**
 * Class for a factory.
 * This is the structure above the workspace and the flyout.
 * @param {?Object=} options Dictionary of options.
 * @constructor
 */
eYo.Factory = function(options) {
  /** @type {!eYo.Options} */
  options = new eYo.Options(options || {})
  // Load CSS.
  // Strip off any trailing slash (either Unix or Windows).
  pathToMedia = pathToMedia.replace(/[\\\/]$/, '')

  eYo.Css.inject(options.hasCss, options.pathToMedia)
  this.options_ = options
  // create the various workspaces and flyout
  this.mainWorkspace_ = new eYo.Workspace(this, options)
}

Object.defineProperties(eYo.Factory.prototype, {
  hasUI: {
    get () {
      return this.makeUI === eYo.Do.nothing
    }
  },
  mainWorkspace: {
    get () {
      return this.mainWorkspace_
    }
  },
  flyout: {
    get () {
      return this.flyout_
    }
  },
  audio: {
    get () {
      return this.audio_
    }
  },
})

/**
 * Class for a factory. This is the structure above the workspace.
 * @param {?eYo.Options=} options Dictionary of options.
 * @constructor
 */
eYo.Factory.prototype.makeUI = function() {
  this.makeUI = eYo.Do.nothing
  delete this.deleteUI
  this.audio_ = new eYo.Audio(this.options.pathToMedia)
  this.ui_driver = new eYo.Svg(this)
  this.ui_driver.factoryInit(this)
  options.backgroundClass || (options.backgroundClass = 'eyo-main-background')
  this.mainWorkspace_.makeUI()
}

/**
 * Dispose of UI resources.
 */
eYo.Factory.prototype.disposeUI = function() {
  delete this.makeUI
  this.mainWorkspace_ && this.mainWorkspace_.disposeUI()
  this.audio_.dispose()
  this.audio_ = null
  this.flyout_ && this.flyout_.disposeUI()
  this.flyoutSpace_ && this.flyoutSpace_.disposeUI()
  this.ui_driver = null
}

/**
 * Dispose of this factory.
 */
eYo.Factory.prototype.dispose = function() {
  if (this.flyout_) {
    this.mainWorkspace_.flyout = null
    this.flyout_.dispose()
    this.flyout_ = null
  }
  if (this.flyoutSpace_) {
    this.flyoutSpace_.dispose()
    this.flyoutSpace_ = null
  }
  if (this.mainWorkspace_) {
    this.mainWorkspace_.dispose()
    this.mainWorkspace_ = null
  }
}

/**
 * Add a flyout element in an element with the given tag name.
 * @param {!Object} switcher  See eYo.FlyoutToolbar constructor.
 */
eYo.Factory.prototype.addFlyout = function(switcher) {
  var flyoutOptions = {
    flyoutAnchor: this.options.flyout.anchor,
    switcher: switcher
  }
  /**
  * @type {!eYo.Flyout}
  * @private
  */
  var flyout = this.flyout = new eYo.Flyout(this, flyoutOptions)
  var options = {
    getMetrics: flyout.getMetrics_.bind(flyout),
    setMetrics: flyout.setMetrics_.bind(flyout),
  }
  var space = this.flyoutSpace_ = new eYo.Workspace(this, options)
  space.options = this.mainWorkspace_.options
  this.mainWorkspace_.flyout = flyout
  space.targetWorkspace_ = this.mainWorkspace_
}

/**
 * Size the main workspace to completely fill its container.
 * Call this when the view actually changes sizes
 * (e.g. on a window resize/device orientation change).
*/
eYo.Factory.prototype.resize = function() {
  this.ui_driver.factoryResize(this)
}

/**
 * Size the main workspace to completely fill its container.
 * Call this when the view actually changes sizes
 * (e.g. on a window resize/device orientation change).
*/
eYo.Factory.prototype.xyElementInFactory = function(element) {
  this.ui_driver.factoryXYElement(this, element)
}
