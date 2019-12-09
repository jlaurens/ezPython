/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Rendering delegate. Do nothing driver.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.require('eYo.ns.UI')

/**
 * @name {eYo.ns.Driver}
 * @namespace
 */
eYo.ns.make('Driver')

/**
 * Contructor delegate.
 * @name {eYo.ns.Driver.Dlgt}
 * @param {Function} constructor
 */
eYo.ns.UI.Dlgt.makeSubclass(eYo.ns.Driver)

/**
 * Contructor delegate for the driver manager.
 * The driver manager is responsible of a familly of drivers
 * adapted to a certain context.
 * Each context is represented by a namespace.
 * 
 * @name {eYo.ns.Driver.DlgtMngr}
 * @param {Function} constructor
 */
eYo.ns.Driver.Dlgt.makeSubclass('DlgtMngr', {
  init () {
    console.warn('INIT DlgtMngr')
  },
  linked: {
    driverNames () {
      return new Set()
    }
  }
})

/**
 * Convenient driver constructor maker.
 * The prototype will have eventually an `initUI` or `disposeUI`
 * wrapping the model's eponym methods, if any.
 * The owner will have a dafault driver named `Dflt`,
 * which is expected to be the ancestor of all drivers.
 * @param {String} key - a (capitalized) word, the name of the subclass (last component)
 * @param {Function} [Super] - the super class of the driver constructor,
 * defaults to the owner's super_'s key property or the owner's `Dflt`.
 * @param {Object} driverModel
 * An object with various keys:
 * - owner: An object owning the class, basically a namespace object.
 * If the owner is `Foo` and the key is 'Bar', the created constructor
 * is `Foo.Bar`. Actually used with `eYo` as owner, 'Dom' or 'Svg' as key.
 * - initUI: an optional function with signature (object, ...)->eYo.NA
 * - disposeUI: an optional function with signature (object)->eYo.NA
 */
eYo.ns.Driver.DlgtMngr.prototype.makeDriverClass = function (key, Super, driverModel) {
  if (!eYo.isSubclass(Super, eYo.ns.Driver.Dflt)) {
    eYo.parameterAssert(!driverModel, 'Unexpected model')
    driverModel = Super
    Super = this.ns.super[key] || this.ns.Dflt
  }
  var Driver = eYo.makeClass(this.ns, key, Super, eYo.ns.Driver.Dlgt, driverModel)
  this.driverNames.add(key)
  var proto = Driver.prototype
  proto.initUI = function (object, ...rest) {
    Super.initUI.apply(this, arguments)
    f = this.model.initUIMake
    var ff = driverModel.initUI
    f = (f && f(ff)) || ff
    return f && f.apply(object, rest)
  }
  proto.disposeUI = function (object, ...rest) {
    var f = this.model.disposeUIMake
    var ff = driverModel.initUI
    f = (f && f(ff)) || ff
    f && f.apply(object, rest)
    Super.disposeUI.apply(this, arguments)
  }
}

/**
 * Usage: `eYo.ns.Driver.makeMngrClass(model)`.
 * Actual implementation with Fcls, Dom and Svg drivers.
 * {Code: ns.Mngr} is instantiated by the main application object.
 ** @param {Object} [mngrModel] -  model used for creation
 * @return {Function} a constructor equals to ns.Mngr
 */
eYo.ns.Driver.constructor.prototype.makeMngrClass = function (mngrModel) {
  if (this === eYo.ns.Driver) {
    return
  }
  var Mngr = this.super.Mngr.makeSubclass(this, 'Mngr', this.DlgtMngr, mngrModel)
  const pttp = Mngr.prototype
  pttp.initDrivers = function () {
    Mngr.eyo.driverNames.forEach(name => {
      var n = name[0].toLowerCase() + name.substr(1)
      var N = name[0].toUpperCase() + name.substr(1)
      this[n] = new eYo.ns.Driver[N]()
    })
  }
  return Mngr
}

/**
 * Usage: `eYo.ns.Driver.makeMngrClass(model)`.
 * Actual implementation with Fcls, Dom and Svg drivers.
 * {Code: ns.Mngr} is instantiated by the main application object.
 * @param {String} key -  The key of the driver
 * @param {Object} [Super] -  The ancestor of the driver
 * @param {Object} [mngrModel] -  model used for creation
 * @return {Function} a constructor equals to this.Mngr[key]
 */
eYo.ns.Driver.constructor.prototype.makeDriverClass = function (key, Super, driverModel) {
  return this.Mngr.eyo.makeDriverClass(key, Super, driverModel)
}

/**
 * @name {eYo.ns.Driver.Mngr}
 * Default driver manager, abstract class to be subclassed.
 * Owns instances of `eYo.ns.Driver.Dflt`'s descendants.
 * @param {Object} owner
 */
eYo.Owned.makeSubclass(eYo.ns.Driver, 'Mngr', {
  init () {
    this.initDrivers()
  }
})

/**
 * @name {eYo.ns.Driver.Dflt}
 * Default convenient driver, to be subclassed.
 * @param {Object} owner
 * @property {eYo.ns.Driver.Mgt} mngr,  the owning driver manager
 */
eYo.Owned.makeSubclass(eYo.ns.Driver, 'Dflt', {
  computed: {
    mngr () {
      return this.owner
    }
  }
})

/**
 * Init the UI.
 * @param {*} object
 * @return {Boolean}
 */
eYo.ns.Driver.Dflt.prototype.initUI = function (unused) {
  return true
}

/**
 * Dispose of the UI.
 * @param {*} object
 */
eYo.ns.Driver.Dflt.prototype.disposeUI = function (unused) {
  return true
}

