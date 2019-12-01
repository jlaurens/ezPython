/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Protocol utilities.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.require('eYo')

goog.provide('eYo.Protocol')

/**
 * Enhance the prototype with the given methods and properties.
 * Only new methods are allowed.
 */
eYo.Protocol.add = function () {
  var args = Array.prototype.slice.call(arguments)
  var proto = args.shift()
  var base = args.shift()
  if (eYo.isStr(base)) {
    base = eYo.Protocol[base]
  }
  if (goog.isFunction(base)) {
    base = base.apply(proto, args)
  }
  if (base.methods) {
    var key
    for(key in base.methods) {
      if (eYo.Do.hasOwnProperty(base.methods, key)) {
        var method = base.methods[key]
        if (goog.isFunction(method)) {
          goog.asserts.assert(!proto[key], key + 'already exists')
          proto[key] = method
        }
      }
    }
  }
  base.properties && Object.defineProperties(
    proto,
    base.properties
  )
}
