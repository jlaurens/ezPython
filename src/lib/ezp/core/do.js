/**
 * ezPython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License CeCILL-B
 */
/**
 * @fileoverview Various utilities.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('ezP.Do')

goog.require('ezP.Const')

ezP.Do.Name = function () {
  // characters are in ]MIN, MAX[
  var MIN = 32
  var MAX = 127
  var BASE = MAX - MIN
  var me = {
    min_name: String.fromCharCode(MIN+1),
    max_name: String.fromCharCode(MAX-1),
  }
  /**
   * Get an index name between two strings.
   * We assume that there exists infinitely many
   * words between lhs and rhs.
   * This is ensured by assuming that
   * 1) any finite string represents in reality
   * an infinite string ending with '!' characters
   * 2) no finite string last character is '!',
   * except for the one length string '!' itself.
   * @param {!string} lhs
   * @param {!string} rhs
   * @return an object {sign: ±1, value: rhs - lhs as array} or undefined on entry error
   */
  me.getDelta = function (lhs, rhs) {
    // turn rhs and lhs into an array
    // of char codes relative to min
    var L = [], R = [], l, r, i = 0
    while (true) {
      l = lhs.charCodeAt(i)
      r = rhs.charCodeAt(i)
      ++i
      if (isNaN(l)) {
        if (isNaN(r)) {
          break
        }
        l = MIN + 1
      } else if (isNaN(r)) {
        r = MIN + 1
      }
      L.push(Math.max(Math.min(l,MAX-1),MIN+1)-MIN)
      R.push(Math.max(Math.min(r,MAX-1),MIN+1)-MIN)
    }
    // console.log('L', L)
    // console.log('R', R)
    if (L[L.length-1] === 1 && R[R.length-1] === 1) {
      // bad string format
      return undefined
    }
    // both arrays represent a number:
    // L[0]+ L[1]/base + L[2]/base**2 ...
    // where BASE ::= MAX - MIN
    // find the difference R - L
    var delta = []
    i = L.length // == R.length
    var carry = 0
    var different = false
    while(i--) {
      l = L[i] + carry
      r = R[i]
      carry = 0
      if (l >= BASE) {
        carry = 1
        l = 0
        delta.unshift(l)
      } else if (r > l) {
        different = true
        delta.unshift(r-l)
      } else if (r == l) {
        delta.unshift(r-l)
      } else /*if (r < l) */{
        different = true
        delta.unshift(r+(BASE-l))
        carry = 1
      }
    }
    // console.log('delta', delta)
    return {
      sign: carry? 1: (different? -1: 0),
      lhs: L,
      rhs: R,
      delta: delta,
    }
  }
  /**
   * Get the normalized name.
   * 1) characters are in ]MIN, MAX[
   * 2) no '!' at the end
   * @param {!string} name
   * @return a name in the proper format
   */
  me.getNormalized = function (name) {
    // in general name is already in the proper format
    // so just check
    var i = 0
    var seen = -1 // last index where there is MIN+1
    while (true) {
      var code = lhs.charCodeAt(i)
      if (isNaN(code)) {
        if (seen<0) {
          return name
        }
        if (seen>0) {
          return name.substring(0, seen)
        }
        return '!'
      }
      if (code <= MIN || code >= MAX) {
        // Ok there is a problem,
        // restart and fix it
        var RA = []
        i = 0
        seen = -1
        while (true) {
          code = lhs.charCodeAt(i)
          if (isNaN(code)) {
            if (seen<0) {
              return RA.join('')
            }
            if (seen>0) {
              return RA.slice(0, seen).join('')
            }
            return '!'
          }
          if (code <= MIN) {
            RA.push(String.fromCharCode(MIN+1))
          }
          if (code >= MAX) {
            RA.push(String.fromCharCode(MAX-1))
          }
          if (code === MIN + 1 && seen < 0) {
            seen = i
          }
          ++i
        }
      }
      if (code === MIN + 1 && seen < 0) {
        seen = i
      }
      ++i
    }
  }
  /**
   * Get the order of the two given strings.
   * @param {!string} lhs
   * @param {!string} rhs
   * @return -1 if lhs < rhs,
   * 0 if lhs === rhs,
   * 1 if lhs > rhs,
   * undefined if one of lhs or rhs does not have the proper format
   */
  me.getOrder = function (lhs, rhs) {
    var l, r, i = 0
    while (true) {
      l = lhs.charCodeAt(i)
      r = rhs.charCodeAt(i)
      ++i
      if (isNaN(l)) {
        if (isNaN(r)) {
          return 0
        } else if (MIN + 1 < r) {
          return -1
        } else if (l > MIN + 1) {
          return 1
        } else {
          return 0
        }
      } else if (isNaN(r)) {
        if (l < MIN + 1) {
          return -1
        } else if (l > MIN + 1) {
          return 1
        } else {
          return 0
        }
      } else if (l < r) {
        return -1
      } else if (l > r) {
        return 1
      }
    }
    // var D = me.getDelta(lhs, rhs)
    // return (D && D.sign) || D
  }
  /**
   * Get an index name between two strings.
   * We assume that there exists infinitely many
   * words between lhs and rhs.
   * This is ensured by assuming that
   * 1) any finite string represents in reality
   * an infinite string ending with '!' characters
   * 2) no finite string last character is '!'
   * @param {!string} lhs
   * @param {!string} rhs
   * @return a string between lhs and rhs
   */
  me.getBetween = function (lhs, rhs, weight = 0.5) {
    // turn rhs and lhs into an array
    // of char codes relative to min
    var D = me.getDelta(lhs, rhs)
    if (!D || D.sign >= 0) {
      return undefined
    }
    if (weight <= 0) {
      return lhs
    }
    if (weight >= 1) {
      return rhs
    }
    // multiplay delta by weight
    var carry = 0
    var half = []
    for (var i = 0; i < D.delta.length; i++) {
      var r = (D.delta[i] + carry * BASE) * weight
      var h = Math.floor(r)
      half.push(h)
      if (h>1) {
        carry = 0
        break
      }
      carry = r - h
    }
    if (carry) {
      half.push(Math.floor(BASE*weight))
      carry = 0
    }
    // console.log('half', half)
    // the last element of half is >1, assuming that BASE>3
    // Somehow ans = L + half
    var ans = []
    i = half.length
    carry = 0
    while (i--) {
      var l = D.lhs[i]
      if (isNaN(l)) {
        l = 0
      }
      r = half[i]
      var d = l+r+carry
      if (d>BASE) {
        d -= BASE
        carry = 1
      } else if (d===BASE) {
        // no 0, restart here
        ans = []
        carry = 1
        continue
        // can we reach that group?
        // yes, L === [1, BASE - n], R === [2, n]
      } else {
        carry = 0
      }
      if (d || ans.length) {
        ans.unshift(String.fromCharCode(MIN+d))
      }
    }
    return ans.join('')
  }
  me.middle_name = me.getBetween(me.min_name, me.max_name, 0.5)
  return me
} ()

ezP.Do.ensureArray = function (object) {
  return goog.isArray(object)? object: (object? [object]: object)
}

ezP.Do.createSPAN = function(text,css) {
  return goog.dom.createDom(goog.dom.TagName.SPAN, css || null,
    goog.dom.createTextNode(text),
  )
}

goog.require('ezP.T3')

ezP.T3.Expr.reserved_identifier = 'reserved identifier'
ezP.T3.Expr.reserved_keyword = 'reserved keyword'
ezP.T3.Expr.builtin_name = 'builtin name'

/**
 * What is the type of this string? an identifier, a number, a reserved word ?
 * For ezPython.
 * @return the type of this candidate
 */
ezP.Do.typeOfString = function (candidate) {
  if (!goog.isString(candidate)) {
    return
  }
  if (['False', 'None', 'True'].indexOf(candidate)>=0) {
    return ezP.T3.Expr.reserved_identifier
  }
  if (['class', 'finally', 'is', 'return', 'continue', 'for', 'lambda', 'try', 'def', 'from', 'nonlocal', 'while', 'and', 'del', 'global', 'not', 'with', 'as', 'elif', 'if', 'or', 'yield', 'assert', 'else', 'import', 'pass', 'break', 'except', 'in', 'raise'].indexOf(candidate)>=0) {
    return ezP.T3.Expr.reserved_keyword
  }
  if (['print', 'input', 'range', 'list', 'len', 'sum'].indexOf(candidate)>=0) {
    return ezP.T3.Expr.builtin_name
  }
  // is it a number ?
  if (ezP.XRE.integer.exec(candidate)) {
    return ezP.T3.Expr.integer
  }
  if (ezP.XRE.floatnumber.exec(candidate)) {
    return ezP.T3.Expr.floatnumber
  }
  if (ezP.XRE.imagnumber.exec(candidate)) {
    return ezP.T3.Expr.imagnumber
  }
  if (candidate === 'start') {
    return ezP.T3.Stmt.start_stmt
  }
  var components = candidate.split('.')
  if (components.length > 1) {
    var dotted_name = true, first
    // skip the void components
    for (var i = 0; i < components.length;) {
      var c = components[i]
      if(c.length) {
        first = i
        break
      }
      i++
    }
    for (; i < components.length; i++) {
      var c = components[i]
      if(!ezP.XRE.identifier.exec(c)) {
        dotted_name = false
        break
      }
    }
    if (dotted_name) {
      return goog.isDef(first) && first>0? ezP.T3.Expr.parent_module: ezP.T3.Expr.dotted_name
    }
  } else if (ezP.XRE.identifier.exec(candidate)) {
    return ezP.T3.Expr.identifier
  }
  if (ezP.XRE.shortstringliteralSingle.exec(candidate) || ezP.XRE.shortstringliteralDouble.exec(candidate)) {
    return ezP.T3.Expr.shortstringliteral
  }
  if (ezP.XRE.shortbytesliteralSingle.exec(candidate) || ezP.XRE.shortbytesliteralDouble.exec(candidate)) {
    return ezP.T3.Expr.shortbytesliteral
  }
  if (ezP.XRE.longstringliteralSingle.exec(candidate) || ezP.XRE.longstringliteralDouble.exec(candidate)) {
    return ezP.T3.Expr.longstringliteral
  }
  if (ezP.XRE.longbytesliteralSingle.exec(candidate) || ezP.XRE.longbytesliteralDouble.exec(candidate)) {
    return ezP.T3.Expr.longbytesliteral
  }
  return undefined
}

/**
 * List enumerator
 * For ezPython.
 * @param {!Array} list indexed object.
 * @param {!function} filter an optional filter.
 * @return an enumerator
 */
ezP.Do.Enumerator = function (list, filter) {
  if (goog.isFunction(filter)) {
    var filter = filter
  }
  var i = 0, me = {here: undefined}
  me.start = function() {
    i = 0
    me.here = undefined
  }
  me.end = function() {
    i = list.length
    me.here = undefined
  }
  me.isAtStart = function() {
    return i === 0
  }
  me.isAtEnd = function() {
    return i < list.length
  }
  var next_ = function() {
    return i < list.length? list[i++]: undefined
  }
  var previous_ = function() {
    return i > 0? list[--i]: undefined
  }
  me.next = function() {
    while ((me.here = next_())) {
      if (!filter || filter(me.here)) {
        break
      }
    }
    return me.here
  }
  me.previous = function() {
    while ((me.here = previous_())) {
      if (!filter || filter(me.here)) {
        break
      }
    }
    return me.here
  }
  me.start()
  return me
}

/**
 * Declares and init a named property for the given constructor.
 * For ezPython.
 * @param {Object} Ctor The constructor to add the property to.
 * @param {!string} key Whether to unlock statements too.
 * @param {Object} params.
 * @return the number of block locked
 */
ezP.Do.addInstanceProperty = function (Ctor, key, params) {
  var ezp = Ctor.ezp || (Ctor.ezp = {})
  var properties = ezp.properties || (ezp.properties = {})
  var k = key.charAt(0).toUpperCase() + key.slice(1)
  var Ks = properties[key] = {
    keys: key+'s',
    index: key+'Index',
    get: 'get'+k,
    init: 'init'+k,
    _init: '_init'+k,
    gets: 'get'+k+'s',
    set: 'set'+k,
    validate: 'validate'+k,
    synchronize: 'synchronize'+k,
    setTrusted: 'setTrusted'+k,
    didChange: 'didChange'+k,
    _didChange: '_didChange'+k,
    willChange: 'willChange'+k,
    _willChange: '_willChange'+k,
    event: ezP.Const.Event.PROPERTY+key,
  }
  var p = Ctor.prototype
  if (p[Ks.get]) {
    return
  }
  p[Ks.get] = function(block) {
    var holder = this.properties
    holder = holder[key] || (holder[key] = {})
    if (goog.isDef(holder.value) || holder.lock_get) {
      return holder.value
    }
    try {
      holder.lock_get = true
      p[Ks.init].call(this, block)
    } finally {
      delete holder.lock_get
    }
    return holder.value
  }
  p[Ks.gets] = function(block) {
    return block.ezp.getModel().inputs[Ks.keys]
  }
  p[Ks._init] = params && params.initialize || function(block) {
    var inputs = block.ezp.getModel().inputs
    var values = inputs[Ks.keys]
    if (values) {
      var i = inputs[Ks.index] || 0
      var value = values[i]
      return this[Ks.set].call(this, block, value)
    }
  }
  p[Ks.init] = function(block) {
    var value = this[Ks.get].call(this, block)
    if (goog.isDef(value)) {
      return
    }
    return this[Ks._init].call(this, block)
  }
  p[Ks.validate] = params && params.validate || function(block, newValue) {
    var values = block.ezp.getModel().inputs[Ks.keys]
    return (!values || values.indexOf(newValue) >= 0) && {validated: newValue} || null
  }
  p[Ks.willChange] = params && params.willChange || function(block, oldValue, newValue) {
  }
  p[Ks._willChange] = function(block, oldValue, newValue) {
    var holder = this.properties[key]
    if (holder.lock_willChange) {
      return
    }
    try {
      holder.lock_willChange = true
      this[Ks.willChange].call(this, block, oldValue, newValue)
    } finally {
      delete holder.lock_willChange
    }
  }
  p[Ks.didChange] = params && params.didChange || function(block, oldValue, newValue) {
  }
  p[Ks._didChange] = function(block, oldValue, newValue) {
    var holder = this.properties[key]
    if (holder.lock_didChange) {
      return
    }
    try {
      holder.lock_didChange = true
      this[Ks.didChange].call(this, block, oldValue, newValue)
    } finally {
      delete holder.lock_didChange
    }
  }
  p[Ks.setTrusted] = function (block, newValue) {
    var holder = this.properties
    holder = holder[key] || (holder[key] = {})
    var oldValue = holder.value
    var grouper = new ezP.Events.Grouper()
    var old = this.skipRendering
    try {
      this.skipRendering = true
      this[Ks._willChange].call(this, block, oldValue, newValue)
      if (Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.BlockChange(
        block, Ks.event, null, oldValue, newValue))
      }
      holder.value = newValue
      this[Ks._didChange].call(this, block, oldValue, newValue)
      var synchronize = this[Ks.synchronize]
      synchronize && synchronize.call(this, block, goog.isDef(newValue) && newValue || this[Ks.get].call(this, block))
      this.consolidateType(block)
      this.skipRendering = old
      block.render() // render now or possibly later ?
    } finally {
      this.skipRendering = old
      grouper.stop()
    }
  }
  p[Ks.set] = function (block, newValue) {
    if (goog.isNumber(newValue)) {
      var values = block.ezp.getModel().inputs[Ks.keys]
      if (values) {
        newValue = values[newValue]
      }
    }
    var holder = this.properties
    holder = holder[key] || (holder[key] = {})
    if ((holder.value === newValue) || !(newValue = this[Ks.validate].call(this, block, newValue)) || !goog.isDef(newValue = newValue.validated)) {
      var synchronize = this[Ks.synchronize]
      synchronize && synchronize.call(this, block, newValue || this[Ks.get].call(this, block))
      return false
    }
    this[Ks.setTrusted].call(this, block, newValue)
    return true
  }
}
console.warn('synchronizeFoo has another argument')
/**
 * Declares and init a named property for the given constructor.
 * For ezPython.
 * @param {Object} Ctor The constructor to add the property to.
 * @param {!string} key Whether to unlock statements too.
 */
ezP.Do.addClassProperty = function (Ctor, key) {
  var k = key.charAt(0).toUpperCase() + key.slice(1)
  var Ks = {
    keys: key+'s',
    gets: 'get'+k+'s',
    validate: 'validate'+k
  }
  Ctor.ezp[Ks.gets] = function() {
    return Ctor.ezp.getModel().inputs[Ks.keys]
  }
  Ctor.ezp[Ks.validate] = function(newValue) {
    var values = Ctor.ezp[Ks.gets]()
    return values && values.indexOf(newValue) >= 0 && {validated: newValue}
  }
}

/**
 * Get the flag given the position as argument.
 * Positions are given 1 based
 * For ezPython.
 */
 ezP.Do.getVariantFlag = function(variant, flag) {
  return variant & 1 << (  position - 1)
 }

/**
 * set the flags given the positions as arguments.
 * if the position is negative, unset the symmetric bit
 * Positions are given 1 based
 * For ezPython.
 */
 ezP.Do.makeVariantFlags = function(variant) {
  for(var i = 1; i < arguments.length; i++) {
    var position = arguments[i]
    if (position < 0) {
      variant ^= 1 << (- position - 1 )
    } else if (position > 0) {
      variant |= 1 << (  position - 1)
    }
  }
  return variant
 }
