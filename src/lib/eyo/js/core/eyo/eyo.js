/**
 * edython
 *
 * Copyright 2018-2020 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */

/**
 * @fileoverview utilities for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

//<<< mochai: eYo

/**
 * @name {eYo}
 * @namespace
 */
let eYo = (() => {
  let EYO = function() {}
  Object.defineProperty(EYO.prototype, '_p', {
    get () {
      return this.constructor.prototype
    }
  })
  return new EYO()
}) ()

// Comment next line in production mode
eYo.TESTING = true

//<<< mochai: Basics
//... chai.assert(eYo)
//... chai.assert(eYo._p)
//>>>

/**
 * Convenient shortcut
 * For edython.
 * @param {Object} object
 * @param {String} key
 * @return {Boolean}
 */
eYo.objectHasOwnProperty = function (object, key) {
  return !!object && Object.prototype.hasOwnProperty.call(object, key)
  //<<< mochai: eYo.objectHasOwnProperty'
  //... chai.assert(eYo.objectHasOwnProperty)
  //... chai.expect(eYo.objectHasOwnProperty({foo: true}, 'foo')).true
  //... chai.expect(eYo.objectHasOwnProperty({}, 'foo')).false
  //... chai.expect(eYo.objectHasOwnProperty({}, '')).false
  //... chai.expect(eYo.objectHasOwnProperty(eYo.NA, 'foo')).false
  //... chai.expect(eYo.objectHasOwnProperty(eYo.NA, [eYo.$])).false
  //>>>
}

/**
 * Whether the argument is a function or an arrow.
 * @param {*} what
 * @return {!Boolean}
 */
eYo.isF = (what) => {
  return typeof what === 'function' && !!what.call
  //<<< mochai: eYo.isF
  //... chai.assert(eYo.isF)
  //... chai.assert(eYo.isF(eYo.doNothing))
  //... chai.assert(eYo.isF(() => {}))
  //... let f = function () {return 421}
  //... chai.assert(eYo.isF(f))
  //... chai.assert(!eYo.isF())
  //... chai.assert(!eYo.isF({}))
  //... chai.expect(eYo.asF(eYo.doNothing)).equal(eYo.doNothing)
  //... chai.expect(eYo.asF(f)).equal(f)
  //... chai.assert(eYo.isNA(eYo.asF()))
  //... chai.assert(eYo.isNA(eYo.asF(421)))
  //... chai.expect(eYo.toF(eYo.doNothing)).equal(eYo.doNothing)
  //... chai.expect(eYo.toF(f)).equal(f)
  //... chai.assert(eYo.isF(eYo.toF()))
  //... chai.assert(eYo.isF(eYo.toF(421)))
  //... chai.expect(eYo.toF(421)()).equal(421)
  //>>>
}

/**
 * Whether the argument is a function or an arrow.
 * @param {*} what
 * @return {!Boolean}
 */
eYo.isDoIt = (what) => {
  return what !== eYo.doNothing && typeof what === 'function' && !!what.call
  //<<< mochai: eYo.isDoIt
  //... chai.assert(eYo.isDoIt)
  //... chai.expect(eYo.isDoIt()).false
  //... chai.expect(eYo.isDoIt(421)).false
  //... chai.expect(eYo.isDoIt(eYo.doNothing)).false
  //... chai.expect(eYo.isDoIt(() => 421)).true
  //... chai.expect(eYo.isDoIt(function () {})).true
  //... chai.expect(eYo.isDoIt({foo(){}}.foo)).true
  //>>>
}

/**
 * Whether the argument is a string.
 * @param {*} what
 */
eYo.isStr = (what) => {
  return typeof what === 'string'
  //<<< mochai: eYo.isStr
  //... chai.assert(eYo.isStr)
  //... chai.expect(eYo.isStr('')).true
  //... chai.expect(eYo.isStr()).false
  //... chai.expect(eYo.isStr({})).false
  //>>>
}
/**
 * Whether the argument is a symbol.
 * @param {*} what
 */
eYo.isSym = (what) => {
  return typeof what === 'symbol'
  //<<< mochai: eYo.isSym
  //... chai.expect(eYo).property('isSym')
  //... chai.expect(eYo.isSym(Symbol())).true
  //... chai.expect(eYo.isSym('')).false
  //... chai.expect(eYo.isSym()).false
  //... chai.expect(eYo.isSym({})).false
  //>>>
}
/**
 * Whether the argument is a either a symbol or a string.
 * @param {*} what
 */
eYo.isId = (what) => {
  return typeof what === 'symbol' || typeof what === 'string'
  //<<< mochai: eYo.isId
  //... chai.expect(eYo).property('isId')
  //... chai.expect(eYo.isId(Symbol())).true
  //... chai.expect(eYo.isId('')).true
  //... chai.expect(eYo.isId()).false
  //... chai.expect(eYo.isId({})).false
  //>>>
}
/**
 * Whether the argument is `eYo.NA`.
 * @param {*} what
 */
eYo.isNA = (what) => {
  return what === eYo.NA
  //<<< mochai: eYo.isNA
  //... let x
  //... chai.expect(eYo.NA).equal(x)
  //... chai.assert(eYo.isNA(x))
  //... chai.expect(() => {
  //...   eYo.NA = 1
  //... }).xthrow()
  //>>>
}
/**
 * Whether the argument is a boolean.
 * @param {*} what
 */
eYo.isBool = (what) => {
  return what === true || what === false
  //<<< mochai: eYo.isBool
  //... chai.expect(eYo.isBool(true)).true
  //... chai.expect(eYo.isBool(false)).true
  //... chai.expect(eYo.isBool()).false
  //... chai.expect(eYo.isBool(eYo.NA)).false
  //... chai.expect(eYo.isBool(421)).false
  //>>>
}
/**
 * Whether the argument is a number.
 * @param {*} what
 */
eYo.isNum = (what) => {
  return typeof what === 'number' && !isNaN(what)
  //<<< mochai: eYo.isNum
  //... chai.assert(eYo.isNum)
  //... chai.expect(eYo.isNum()).false
  //... chai.expect(eYo.isNum(421)).true
  //... chai.expect(eYo.isNum(421e20)).true
  //... chai.expect(eYo.isNum(eYo.doNothing)).false
  //... chai.expect(eYo.isNum({})).false
  //... chai.expect(eYo.isNum([])).false
  //... chai.expect(eYo.isNum('')).false
  //... chai.expect(eYo.isNum(NaN)).false
  //>>>
}
/**
 * Whether the argument is an object created with `{...}` syntax.
 * @param {*} what
 */
eYo.isD = (() => {
  let _p = Object.getPrototypeOf({})
  return (what) => {
    if (what) {
      let p = Object.getPrototypeOf(what)
      return !p || p === _p
    }
    return false
  }
  //<<< mochai: eYo.isD
  //... chai.assert(eYo.isD)
  //... chai.expect(eYo.isD({})).true
  //... chai.expect(eYo.isD(Object.create(null))).true
  //... chai.expect(eYo.isD()).false
  //... chai.expect(eYo.isD('')).false
  //>>>
}) ()
/**
 * Whether the argument is not `undefined` nor `null`.
 * @param {*} what
 */
eYo.isDef = what => {
  return what !== eYo.NA && what !== null
  //<<< mochai: eYo.isDef
  //... chai.expect(eYo.isDef({})).true
  //... chai.expect(eYo.isDef()).false
  //... chai.expect(eYo.isDef(null)).false
  //>>>
}
/**
 * Function used when defining a JS property.
 */
eYo.noGetter = function (msg) {
  return eYo.isStr(msg)
    ? function () {
      throw new Error(`Forbidden getter: ${msg}`)
    } : eYo.isF(msg)
      ? function () {
        throw new Error(`Forbidden getter ${msg.call(this)}`)
      } : eYo.isDef(msg)
        ? eYo.throw(`eYo.noGetter: Bad argument {msg}`)
        : function () {
          throw new Error('Forbidden getter')
        }
  //<<< mochai: eYo.noGetter
  //... chai.assert(eYo.noGetter)
  //... chai.expect(() => eYo.noGetter(421)).xthrow()
  //... chai.expect(() => eYo.noGetter()()).xthrow()
  //... chai.expect(() => eYo.noGetter('abc')()).xthrow()
  //... chai.expect(() => eYo.noGetter(() => eYo.flag.push(421))()).xthrow()
  //... eYo.flag.expect(421)
  //>>>
}
/**
 * Function used when defining a JS property.
 * @param {String|Function} [msg] - Either a string of a function.
 */
eYo.noSetter = function (msg) {
  return eYo.isStr(msg)
    ? function () {
      throw new Error(`Forbidden setter: ${msg}`)
    } : eYo.isF(msg)
      ? function () {
        throw new Error(`Forbidden setter ${msg.call(this)}`)
      } : eYo.isDef(msg)
        ? eYo.throw(`eYo.noSetter: Bad argument {msg}`)
        : function () {
          throw new Error('Forbidden setter')
        }
  //<<< mochai: eYo.noSetter
  //... chai.assert(eYo.noSetter)
  //... chai.expect(() => eYo.noSetter(421)).xthrow()
  //... chai.expect(() => eYo.noSetter()()).xthrow()
  //... chai.expect(() => eYo.noSetter('abc')()).xthrow()
  //... chai.expect(() => eYo.noSetter(() => eYo.flag.push(421))()).xthrow()
  //... eYo.flag.expect(421)
  //>>>
}
/**
 * Function used when defining a JS property.
 * Parameters: one string, one function,
 * something truthy than is neither a string nor a function.
 * @param {String} [msg] - Diagnostic message,or object
 * with a `lazy` attribute for a function returning the diagnostic message.
 * @param {String|Object} [msg] - Diagnostic message, or object
 * with a `lazy` attribute for a function returning the dignostic message.
 * @param {Function|Boolean} getter
 * @param {Boolean|Function} configurable
 * @private
 */
eYo.descriptorR = (msg, getter, configurable) => {
  // Expected ordered parameter types : s, f, b
  // f, b, NA -> b, f, NA -> NA, f, b
  // b, f, NA -> NA, f, b
  // s, b, f 
  if (eYo.isF(msg)) {
    eYo.isDef(configurable) && eYo.throw(`eYo.descriptorR: Unexpected last argument ${configurable}`)
    ;[msg, getter, configurable] = [eYo.NA, msg, getter]
  } else if (!eYo.isF(getter)) {
    [getter, configurable] = [configurable, getter]
    if (!eYo.isF(getter)) {
      eYo.test && eYo.test.IN_THROW || console.error('BREAK HERE!')
    }
    eYo.isF(getter) || eYo.throw('descriptorR: Missing getter')
  }
  msg && msg.lazy && (msg = msg.lazy)
  return {
    get: getter,
    set: eYo.noSetter(msg),
    configurable: !!configurable,
  }
  //<<< mochai: eYo.descriptorR
  //... chai.assert(eYo.descriptorR)
  //... let msg_1 = 'foo'
  //... let msg_2 = () => eYo.flag.push(421)
  //... let getter = () => eYo.flag.push(666)
  //... var o, d
  //... o = {}
  //... d = eYo.descriptorR(getter)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar = 123).xthrow()
  //... d = eYo.descriptorR(getter)
  //... chai.expect(() => Object.defineProperty(o, 'bar', d)).xthrow()
  //... o = {}
  //... d = eYo.descriptorR(getter, true)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar = 123).xthrow()
  //... d = eYo.descriptorR(getter)
  //... Object.defineProperty(o, 'bar', d) // now it is configurable
  //... o = {}
  //... d = eYo.descriptorR(msg_1, getter)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar = 123).xthrow()
  //... d = eYo.descriptorR(getter)
  //... chai.expect(() => Object.defineProperty(o, 'bar', d)).xthrow()
  //... o = {}
  //... d = eYo.descriptorR(msg_1, getter, true)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar = 123).xthrow()
  //... eYo.flag.expect()
  //... d = eYo.descriptorR(getter)
  //... Object.defineProperty(o, 'bar', d) // now it is configurable
  //... o = {}
  //... d = eYo.descriptorR({lazy: msg_2}, getter)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar = 123).xthrow()
  //... eYo.flag.expect(421)
  //... d = eYo.descriptorR(getter)
  //... chai.expect(() => Object.defineProperty(o, 'bar', d)).xthrow()
  //... o = {}
  //... d = eYo.descriptorR({lazy: msg_2}, getter, true)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar = 123).xthrow()
  //... eYo.flag.expect(421)
  //... d = eYo.descriptorR(getter)
  //... Object.defineProperty(o, 'bar', d) // now it is configurable
  //>>>
}

/**
 * Function used when defining a JS property.
 * @param {String|Object} [msg] - Diagnostic message, or object
 * with a `lazy` attribute for a function returning the dignostic message.
 * @param {Function} setter
 * @param {Boolean} [configurable]
 * @private
 */
eYo.descriptorW = (msg, setter, configurable) => {
  if (eYo.isF(msg)) {
    eYo.isNA(configurable) || eYo.throw(`eYo.descriptorW: Unexpected last argument ${configurable}`)
    ;[msg, setter, configurable] = [eYo.NA, msg, setter]
  } else if (!eYo.isF(setter)) {
    [setter, configurable] = [configurable, setter]
    if (!eYo.isF(setter)) {
      eYo.test && eYo.test.IN_THROW || console.error('BREAK HERE!')
    }
    eYo.isF(setter) || eYo.throw('descriptorR: Missing setter')
  }
  msg && msg.lazy && (msg = msg.lazy)
  return {
    get: eYo.noGetter(msg),
    set: setter,
    configurable: !!configurable
  }
  //<<< mochai: eYo.descriptorW
  //... chai.assert(eYo.descriptorW)
  //... let msg_1 = 'foo'
  //... let msg_2 = () => eYo.flag.push(421)
  //... let setter = () => eYo.flag.push(666)
  //... var o, d
  //... o = {}
  //... d = eYo.descriptorW(setter)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar = 123
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar).xthrow()
  //... d = eYo.descriptorW(setter)
  //... chai.expect(() => Object.defineProperty(o, 'bar', d)).xthrow()
  //... o = {}
  //... d = eYo.descriptorW(setter, true)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar = 123
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar).xthrow()
  //... d = eYo.descriptorW(setter)
  //... Object.defineProperty(o, 'bar', d) // now it is configurable
  //... o = {}
  //... d = eYo.descriptorW(msg_1, setter, true)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar = 123
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar).xthrow()
  //... eYo.flag.expect()
  //... d = eYo.descriptorW(setter)
  //... Object.defineProperty(o, 'bar', d) // now it is configurable
  //... o = {}
  //... d = eYo.descriptorW({lazy: msg_2}, setter)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar = 123
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar).xthrow()
  //... eYo.flag.expect(421)
  //... d = eYo.descriptorW(setter)
  //... chai.expect(() => Object.defineProperty(o, 'bar', d)).xthrow()
  //... o = {}
  //... d = eYo.descriptorW({lazy: msg_2}, setter, true)
  //... Object.defineProperty(o, 'bar', d)
  //... o.bar = 123
  //... eYo.flag.expect(666)
  //... chai.expect(() => o.bar).xthrow()
  //... eYo.flag.expect(421)
  //... d = eYo.descriptorW(setter)
  //... Object.defineProperty(o, 'bar', d) // now it is configurable
  //>>>
}

/**
 * Function used when defining a JS property.
 * @param {String|Object} [msg] - Diagnostic message, or object
 * with a `lazy` attribute for a function returning the dignostic message.
 * @param {Boolean|Function} configurable
 * @private
 */
eYo.descriptorNORW = (msg, configurable) => {
  if (eYo.isBool(msg)) {
    eYo.isDef(configurable) && eYo.throw(`eYo.descriptorNORW: Unexpected last argument ${configurable}`)
    ;[msg, configurable] = [eYo.NA, msg]
  }
  msg && msg.lazy && (msg = msg.lazy)
  return {
    get: eYo.noGetter(msg),
    set: eYo.noSetter(msg),
    configurable: !!configurable,
  }
  //<<< mochai: eYo.descriptorNORW
  //... chai.assert(eYo.descriptorNORW)
  //... let msg_1 = 'foo'
  //... let msg_2 = () => eYo.flag.push(421)
  //... var o, d
  //... o = {}
  //... d = eYo.descriptorNORW()
  //... Object.defineProperty(o, 'bar', d)
  //... chai.expect(() => o.bar).xthrow()
  //... eYo.flag.expect()
  //... chai.expect(() => o.bar = 123).xthrow()
  //... eYo.flag.expect()
  //... d = eYo.descriptorNORW()
  //... chai.expect(() => Object.defineProperty(o, 'bar', d)).xthrow()
  //... o = {}
  //... d = eYo.descriptorNORW(true)
  //... Object.defineProperty(o, 'bar', d)
  //... chai.expect(() => o.bar).xthrow()
  //... eYo.flag.expect()
  //... chai.expect(() => o.bar = 123).xthrow()
  //... eYo.flag.expect()
  //... d = eYo.descriptorNORW()
  //... Object.defineProperty(o, 'bar', d) // now it is configurable
  //... o = {}
  //... d = eYo.descriptorNORW(msg_1)
  //... Object.defineProperty(o, 'bar', d)
  //... chai.expect(() => o.bar).xthrow()
  //... eYo.flag.expect()
  //... chai.expect(() => o.bar = 123).xthrow()
  //... eYo.flag.expect()
  //... d = eYo.descriptorNORW()
  //... chai.expect(() => Object.defineProperty(o, 'bar', d)).xthrow()
  //... o = {}
  //... d = eYo.descriptorNORW(msg_1, true)
  //... Object.defineProperty(o, 'bar', d)
  //... chai.expect(() => o.bar).xthrow()
  //... eYo.flag.expect()
  //... chai.expect(() => o.bar = 123).xthrow()
  //... eYo.flag.expect()
  //... d = eYo.descriptorNORW()
  //... Object.defineProperty(o, 'bar', d) // now it is configurable
  //... o = {}
  //... d = eYo.descriptorNORW({lazy: msg_2})
  //... Object.defineProperty(o, 'bar', d)
  //... chai.expect(() => o.bar).xthrow()
  //... eYo.flag.expect(421)
  //... chai.expect(() => o.bar = 123).xthrow()
  //... eYo.flag.expect(421)
  //... d = eYo.descriptorNORW()
  //... chai.expect(() => Object.defineProperty(o, 'bar', d)).xthrow()
  //... o = {}
  //... d = eYo.descriptorNORW({lazy: msg_2}, true)
  //... Object.defineProperty(o, 'bar', d)
  //... chai.expect(() => o.bar).xthrow()
  //... eYo.flag.expect(421)
  //... chai.expect(() => o.bar = 123).xthrow()
  //... eYo.flag.expect(421)
  //... d = eYo.descriptorNORW()
  //... Object.defineProperty(o, 'bar', d) // now it is configurable
  //>>>
}

Object.defineProperty(eYo._p, '$$', {
  //<<< mochai: eYo.$$
  //... chai.expect(eYo).property('$$')
  value: {}
  //>>>
})

/**
 * Creates a symbol uniquely attached to the given key
 * @param {String} key - The result is `eYo.$$[key]
 */
eYo._p.new$$ = function (key) {
  //<<< mochai: make$$
  if (eYo.objectHasOwnProperty(this.$$, key)) {
    throw `Do not declare a symbol twice`
  }
  return this.$$[key] = Symbol(key)
  //... var id = eYo.genUID(eYo.IDENT)
  //... chai.expect(eYo.new$$(id)).equal(eYo.$$[id])
  //... chai.expect(() => {
  //...   eYo.new$$(id)
  //... }).xthrow()
  //>>>
}

/**
 * To create many symbols in one instruction.
 * @param {String} ...
 */
eYo._p.make$$ = function (...$) {
  //<<< mochai: make$$
  for(let key of $) {
    this.new$$(key)
  }
  //... var id1 = eYo.genUID(eYo.IDENT)
  //... var id2 = eYo.genUID(eYo.IDENT)
  //... eYo.make$$(id1, id2)
  //... chai.expect(eYo.$$).property(id1)
  //... chai.expect(eYo.$$).property(id2)
  //... chai.expect(() => {
  //...   eYo.make$$(id1)
  //... }).xthrow()
  //>>>
}

eYo.make$$('target', 'handler', 'fired') // used by proxies

/**
 * The props dictionary is a `key=>value` mapping where values
 * are getters, not a dictionary containing a getter.
 * @param {*} object - The destination
 * @param {*} props - the source
 * @return {*} the destination
 */
eYo.mixinRO = (object, props) => {
  [Object.keys, Object.getOwnPropertySymbols].forEach(f => {
    f(props).forEach(key => {
      eYo.objectHasOwnProperty(object, key) && eYo.throw(`Duplicate keys|symbols are forbidden: ${object}, ${key.toString ? key.toString() : key}`)
      var value = props[key]
      Reflect.defineProperty(
        object,
        key,
        eYo.descriptorR(eYo.isF(value) ? value : function () {
          return value
        })
      ) || eYo.throw(`eYo.mixinRO: problem with ${key.toString ? key.toString() : key}`)
    })
  })
  return object
  //<<< mochai: mixinR
  //... let o = {}
  //... eYo.mixinRO(o, {
  //...   foo: 421
  //... })
  //... chai.expect(o.foo).equal(421)
  //... chai.expect(() => {
  //...   o.foo = 421
  //... }).xthrow()
  //... chai.expect(() => {
  //...   eYo.mixinRO(o, {
  //...     foo: 123
  //...   })
  //... }).xthrow()
  //... eYo.mixinRO(o, {
  //...   bar: 123
  //... })
  //... chai.expect(o.foo).equal(421)
  //... chai.expect(o.bar).equal(123)
  //... let a = {}
  //... let b = {}
  //... chai.expect(() => eYo.mixinRO(eYo.NS, eYo.NA)).xthrow()
  //... chai.expect(() => eYo.mixinRO(a, eYo.NA)).xthrow()
  //... eYo.mixinRO(a, b)
  //... chai.expect(a).deep.equal(b)
  //... b.foo = 421
  //... chai.expect(() => eYo.mixinRO(eYo.NS, b)).xthrow()
  //... chai.expect(a).not.deep.equal(b)
  //... eYo.mixinRO(a, b)
  //... chai.expect(a.foo).equal(b.foo).equal(421)
  //... chai.expect(() => eYo.mixinRO(a, b)).xthrow()
  //... let c = {}
  //... eYo.mixinRO(c, {
  //...   foo () {
  //...     eYo.flag.push(1)
  //...   }
  //... })
  //... eYo.flag.expect()
  //>>>
}

/**
 * The props dictionary is a `key=>value` mapping where values
 * are methods when a function.
 * @param {*} object - The destination
 * @param {*} props - the source
 * @return {*} the destination
 */
eYo.mixinFR = (object, props) => {
  [Object.keys, Object.getOwnPropertySymbols].forEach(f => {
    f(props).forEach(key => {
      eYo.objectHasOwnProperty(object, key) && eYo.throw(`Duplicate keys|symbols are forbidden: ${object}, ${key.toString ? key.toString() : key}`)
      let value = props[key]
      Reflect.defineProperty(
        object,
        key,
        eYo.descriptorR({$ () {
          return value
        }}.$)
      ) || eYo.throw(`eYo.mixinFR: problem with ${key.toString ? key.toString() : key}`)
    })
  })
  return object
  //<<< mochai: mixinFR
  //... let o = {}
  //... eYo.mixinFR(o, {
  //...   foo: 421
  //... })
  //... chai.expect(o.foo).equal(421)
  //... chai.expect(() => {
  //...   o.foo = 421
  //... }).xthrow()
  //... chai.expect(() => {
  //...   eYo.mixinFR(o, {
  //...     foo: 123
  //...   })
  //... }).xthrow()
  //... eYo.mixinFR(o, {
  //...   bar: 123
  //... })
  //... chai.expect(o.foo).equal(421)
  //... chai.expect(o.bar).equal(123)
  //... let a = {}
  //... let b = {}
  //... chai.expect(() => eYo.mixinFR(eYo.NS, eYo.NA)).xthrow()
  //... chai.expect(() => eYo.mixinFR(a, eYo.NA)).xthrow()
  //... eYo.mixinFR(a, b)
  //... chai.expect(a).deep.equal(b)
  //... b.foo = 421
  //... chai.expect(() => eYo.mixinFR(eYo.NS, b)).xthrow()
  //... chai.expect(a).not.deep.equal(b)
  //... eYo.mixinFR(a, b)
  //... chai.expect(a.foo).equal(b.foo).equal(421)
  //... chai.expect(() => eYo.mixinFR(a, b)).xthrow()
  //... let c = {}
  //... eYo.mixinFR(c, {
  //...   foo () {
  //...     eYo.flag.push(1)
  //...   }
  //... })
  //... eYo.flag.expect()
  //... eYo.mixinFR(c, {
  //...   bar () {
  //...     eYo.flag.push(1)
  //...   }
  //... })
  //... eYo.flag.expect()
  //... c.bar()
  //... eYo.flag.expect(1)
  //>>>
  //<<< mochai: mixinFR+inherits
  //... let A = function () {}
  //... var B = function () {}
  //... eYo.inherits(B, A)
  //... eYo.mixinFR(A.prototype, {
  //...   foo: 421,
  //...   bar (...$) {
  //...     eYo.flag.push(1, ...$)
  //...   },
  //... })
  //... eYo.mixinFR(B.prototype, {
  //...   foo: 123,
  //...   bar (...$) {
  //...     eYo.flag.push(2, ...$)
  //...   },
  //... })
  //... let a = new A()
  //... chai.expect(a.foo).equal(421)
  //... a.bar(2, 3)
  //... eYo.flag.expect(123)
  //... var b = new B()
  //... chai.expect(b.foo).equal(123)
  //... b.bar(4, 6)
  //... eYo.flag.expect(246)
  //... var B = function () {}
  //... eYo.inherits(B, A)
  //... chai.expect(() => {b.foo = 123}).xthrow()
  //>>>
}

/**
 * The props dictionary is a `key=>value` mapping where values
 * are getters, not a dictionary containing a getter.
 * The difference with the `mixinR` is that an existing key is not overriden.
 * @param {*} dest - The destination
 * @param {*} props - the source
 * @return {*} the destination
 */
eYo.provideRO = (dest, props) => {
  [Object.keys, Object.getOwnPropertySymbols].forEach(f => {
    f(props).forEach(key => {
      if (!eYo.objectHasOwnProperty(dest, key)) {
        let value = props[key]
        let d = eYo.descriptorR(eYo.isF(value) ? value : {$ () {
          return value
        }}.$)
        let dd = Object.getOwnPropertyDescriptor(props, key)
        d.enumerable = dd.enumerable
        d.configurable = dd.configurable
        Reflect.defineProperty(dest, key, d) || eYo.throw(`eYo.provideRO: problem with ${key.toString ? key.toString() : key}`)
      }
    })
  })
  return dest
  //<<< mochai: provideRO
  //... let a = {}
  //... let b = {}
  //... chai.expect(() => eYo.provideRO(eYo.NS, eYo.NA)).to.xthrow()
  //... chai.expect(() => eYo.provideRO(a, eYo.NA)).to.xthrow()
  //... eYo.provideRO(a, b)
  //... chai.expect(a).to.deep.equal(b)
  //... b.foo = 421
  //... chai.expect(() => eYo.provideRO(eYo.NS, b)).to.xthrow()
  //... chai.expect(a).not.to.deep.equal(b)
  //... eYo.provideRO(a, b)
  //... chai.expect(a.foo).equal(b.foo).equal(421)
  //... b.foo = 123
  //... chai.expect(() => eYo.provideRO(a, b)).not.to.xthrow()
  //... chai.expect(a.foo).not.equal(b.foo)
  //>>>
}

/**
 * The props dictionary is a `key=>value` mapping where values
 * are getters, not a dictionary containing a getter.
 * The difference with the `mixinR` is that an existing key is not overriden.
 * @param {*} dest - The destination
 * @param {*} props - the source
 * @return {*} the destination
 */
eYo.provideFR = (dest, props) => {
  [Object.keys, Object.getOwnPropertySymbols].forEach(f => {
    f(props).forEach(key => {
      if (!eYo.objectHasOwnProperty(dest, key)) {
        let value = props[key]
        let d = eYo.descriptorR({$ () {
          return value
        }}.$)
        let dd = Object.getOwnPropertyDescriptor(props, key)
        d.enumerable = dd.enumerable
        d.configurable = dd.configurable
        Reflect.defineProperty(dest, key, d) || eYo.throw(`eYo.provideFR: problem with ${key.toString ? key.toString() : key}`)
      }
    })
  })
  return dest
  //<<< mochai: eYo: provideFR
  //... let a = {}
  //... let b = {}
  //... chai.expect(() => eYo.provideFR(eYo.NS, eYo.NA)).to.xthrow()
  //... chai.expect(() => eYo.provideFR(a, eYo.NA)).to.xthrow()
  //... eYo.provideFR(a, b)
  //... chai.expect(a).to.deep.equal(b)
  //... b.foo = 421
  //... chai.expect(() => eYo.provideFR(eYo.NS, b)).to.xthrow()
  //... chai.expect(a).not.to.deep.equal(b)
  //... eYo.provideFR(a, b)
  //... chai.expect(a.foo).equal(b.foo).equal(421)
  //... b.foo = 123
  //... chai.expect(() => eYo.provideFR(a, b)).not.to.xthrow()
  //... chai.expect(a.foo).not.equal(b.foo)
  //>>>
}

//<<< mochai: utilities (1)
eYo.mixinFR(eYo, {
  /**
   * @const
   */
  $id: Symbol('eYo'),
  /**
   * Reference to the global object.
   * https://www.ecma-international.org/ecma-262/9.0/index.html#sec-global-object
   *
   * More info on this implementation here:
   * https://docs.google.com/document/d/1NAeW4Wk7I7FV0Y2tcUFvQdGMc89k2vdgSXInw8_nvCI/edit
   *
   * @const
   * @suppress {undefinedVars} self won't be referenced unless `this` is falsy.
   * @type {!Global}
   */
  GLOBAL:
  // Check `this` first for backwards compatibility.
  // Valid unless running as an ES module or in a function wrapper called
  //   without setting `this` properly.
  // Note that base.js can't usefully be imported as an ES module, but it may
  // be compiled into bundles that are loadable as ES modules.
  this ||
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/self
  // For in-page browser environments and workers.
  self,
  /**
   * Function to throw. Trick to throw in an expression.
   * @param {String} [what]
   */
  error (what) {
    console.error(what)
    return what
  },
  /**
   * Function to throw. Trick to throw in an expression.
   * @param {String} [what]
   */
  throw (what) {
    throw what
  },
  /**
   * Void function frequently used.
   */
  doNothing: function () {}, // NO SHORTHAND
  /**
   * Identity function frequently used.
   */
  doReturn (what) {
    return what
  },
  /**
   * Projection function frequently used.
   */
  doReturn2nd (what, $else) {
    return $else
  },
  /**
   * Function used to disallow sending twice the same message.
   */
  neverShot (msg) {
    return eYo.isStr(msg)
      ? function () {
        throw new Error(`Forbidden call: ${msg}`)
      } : eYo.isF(msg)
        ? function () {
          throw new Error(`Forbidden call ${msg.call(this)}`)
        } : eYo.isDef(msg)
          ? eYo.throw(`eYo.neverShot: Bad argument ${msg}`)
          : function () {
            throw new Error('Forbidden shot')
          }
    //<<< mochai: eYo.neverShot
    //... chai.assert(eYo.neverShot)
    //... chai.expect(() => eYo.neverShot(421)).xthrow()
    //... chai.expect(() => eYo.neverShot()()).xthrow()
    //... chai.expect(() => eYo.neverShot('abc')()).xthrow()
    //... chai.expect(() => eYo.neverShot(() => eYo.flag.push(421))()).xthrow()
    //... eYo.flag.expect(421)
    //>>>
  },
  /**
   * Function used to disallow sending twice the same message.
   */
  oneShot (msg) {
    let ans = (eYo.isStr(msg)
      ? {$ () {
        throw new Error(`Forbidden call: ${msg}`)
      }} : eYo.isF(msg)
        ? {$ () {
          throw new Error(`Forbidden call ${msg.call(this)}`)}
        } : eYo.isDef(msg)
          ? eYo.throw(`eYo.oneShot: Bad argument ${msg}`)
          : {$ () {
            throw new Error('Forbidden second shot')
          }}).$
    ans[eYo.$$.fired] = true
    return ans
    //<<< mochai: eYo.oneShot
    //... chai.assert(eYo.oneShot)
    //... chai.expect(() => eYo.oneShot(421)).xthrow()
    //... chai.expect(() => eYo.oneShot()()).xthrow()
    //... chai.expect(() => eYo.oneShot('abc')()).xthrow()
    //... chai.expect(() => eYo.oneShot(() => eYo.flag.push(421))()).xthrow()
    //... eYo.flag.expect(421)
    //>>>
  }
})

eYo.mixinRO(eYo, {
  [eYo.$id]: eYo,
})

//>>>

// ANCHOR Utilities
eYo.mixinFR(eYo, {
  //<<< mochai: utilities (2)
  /**
   * Readonly undefined
   */
  NA: (() => {
    var x
    return x
  })(),
  /**
   * Whether the argument is an object.
   * @param {*} what 
   */
  isObject (what) { // see g@@g.isObject
    var type = typeof what
    return type == 'object' && what != null || type == 'function'
  },
  /**
   * Returns the receiver if it is defined, the fallout otherwise.
   * Defined means not |eYo.NA|.
   * @param {*} object - Whathever may be defined
   * @param {*} [fallout] - Optional fallout when |object| is not defined.
   * @return {*}
   */
  asDef (object, fallout) {
    return eYo.isDef(object) ? object : fallout
    //<<< mochai: eYo.asDef
    //... var what = {}
    //... chai.expect(eYo.asDef(what)).equal(what)
    //... chai.expect(eYo.isDef(eYo.asDef())).false
    //... chai.expect(eYo.asDef(eYo.NA, what)).equal(what)
    //... chai.expect(eYo.asDef(null, what)).equal(what)
    //>>>
  },
  INVALID: Symbol('eYo.INVALID'),
  //<<< mochai: eYo.INVALID
  //... chai.expect(eYo.INVALID).not.undefined
  //>>>
  /**
   * Whether the argument is not `eYo.INVALID`.
   * @param {*} what
   */
  isVALID (what) {
    return what !== eYo.INVALID
    //<<< mochai: eYo.isVALID
    //... chai.assert(eYo.isVALID)
    //... chai.expect(eYo.isVALID(eYo.INVALID)).false
    //... chai.expect(eYo.isVALID()).true
    //... chai.expect(eYo.isVALID({})).true
    //>>>
  },
  /**
   * Whether the argument is `eYo.INVALID`.
   * @param {*} what
   */
  isINVALID (what) {
    return what === eYo.INVALID
    //<<< mochai: eYo.isINVALID
    //... chai.assert(eYo.isVALID)
    //... chai.expect(eYo.isINVALID(eYo.INVALID)).true
    //... chai.expect(eYo.isINVALID()).false
    //... chai.expect(eYo.isINVALID({})).false
    //>>>
  },
  /**
   * Calls `helper` if the `ans` is valid.
   * `ans` may be the output of a reentrant method.
   * @param {*} ans
   * @param {function|*} [f] – function or default value
   * @return The result of the call to `f`, when `f` is defined,
   * `ans` if it is valid, `f` if not a function else `eYo.NA` otherwise.
   */
  whenVALID  (ans, f) {
    if (eYo.isVALID(ans)) {
      return (eYo.isF(f) && f(ans)) || ans
    }
    return eYo.isF(f) ? eYo.NA : f
    //<<< mochai: eYo.INVALID
    //... eYo.whenVALID({}, () => {
    //...   eYo.flag.push(421)
    //... })
    //... eYo.flag.expect(421)
    //... eYo.whenVALID(eYo.INVALID, () => {
    //...   eYo.flag.push(421)
    //... })
    //... eYo.flag.expect()
    //>>>
  },
  /**
   * Whether the argument is na array.
   * @param {*} what
   */
  isRA (what) {
    return Array.isArray(what)
    //<<< mochai: eYo.isRA
    //... chai.assert(eYo.isRA)
    //... chai.expect(eYo.isRA([])).true
    //... chai.expect(eYo.isRA()).false
    //... chai.expect(eYo.isRA('')).false
    //>>>
  },
  /**
   * Convenient method to return  the copy of an array.
   * @param {*} what
   */
  copyRA (what) {
    return Array.prototype.slice.call(what, 0)
    //<<< mochai: eYo.copyRA
    //... let original = []
    //... var copy = eYo.copyRA(original)
    //... chai.expect(copy).to.deep.equal(original)
    //... original.push(1)
    //... chai.expect(copy).not.to.deep.equal(original)
    //... copy = eYo.copyRA(original)
    //... chai.expect(copy).to.deep.equal(original)
    //... copy.push(2)
    //... chai.expect(copy).not.to.deep.equal(original)
    //... original.push(2)
    //... chai.expect(copy).to.deep.equal(original)
    //>>>
  },
  /**
   * Whether the argument is a function.
   * @param {*} what
   * @return {!Boolean}
   */
  isNS (what) {
    return !!what && eYo.isSubclass(what.constructor, eYo.constructor)
  },
  /**
   * Returns the argument if its a function, `eYo.NA` otherwise.
   * @param {*} what
   * @param {*} defaults - a default function
   * @return {Function|eYo.NA}
   */
  asF (what, defaults = eYo.NA) {
    return eYo.isF(what) ? what : defaults
    //<<< mochai: eYo.asF
    //... chai.assert(eYo.asF)
    //... chai.expect(eYo.asF()).equals(eYo.NA)
    //... chai.expect(eYo.asF(1)).equals(eYo.NA)
    //... chai.expect(eYo.asF([])).equals(eYo.NA)
    //... chai.expect(eYo.asF(1, 2)).equals(2)
    //... chai.expect(eYo.asF([], 2)).equals(2)
    //... let f = function () {}
    //... chai.expect(eYo.asF(f)).equals(f)
    //... chai.expect(eYo.asF(f, 2)).equals(f)
    //>>>
  },
  /**
   * Turns the argument into a function.
   * Returns the argument when a function that returns the argument otherwise.
   * @param {*} what
   * @return {Function}
   */
  toF (what) {
    return eYo.isF(what) ? what : () => {
      return what
    }
    //<<< mochai: eYo.toF
    //... chai.assert(eYo.toF)
    //... let f = function () {}
    //... chai.expect(eYo.toF(f)).equal(f)
    //... chai.expect(eYo.toF()()).equal(eYo.NA)
    //... chai.expect(eYo.toF(eYo.NA)()).equal(eYo.NA)
    //... chai.expect(eYo.toF(421)()).equal(421)
    //>>>
  },
  /**
   * When not a function, returns the argument into
   * a function that returns an array.
   */
  toRAF: (x) => {
    //<<< mochai: eYo.toRAF
    //... chai.assert(eYo.toRAF)
    //... var what
    if (eYo.isRA(x)) {
      return function () {
        return x
      }
      //... what = []
      //... chai.expect(eYo.toRAF(what)()).equal(what)
    } else if (eYo.isF(x)) {
      return x
      //... what = function () {}
      //... chai.expect(eYo.toRAF(what)).equal(what)
    } else {
      return function () {
        return [x]
      }
      //... what = 421
      //... chai.expect(eYo.toRAF(what)()).eql([what])
    }
    //>>>
  },
  /**
   * Returns the evaluated argument if its a function,
   * the argument itself otherwise.
   * @param {*} what
   * @return {Function|eYo.NA}
   */
  called (what) {
    return eYo.isF(what) ? what() : what
    //<<< mochai: eYo.called
    //... chai.assert(eYo.called)
    //... chai.expect(eYo.called()).undefined
    //... chai.expect(eYo.called(421)).equal(421)
    //... chai.expect(eYo.called(() => 421)).equal(421)
    //>>>
  },
  //>>>
})

eYo.mixinRO(eYo._p, {
  /**
   * The name of the namespace.
   */
  name () {
    //<<< mochai: name
    return this.$id.description
    //... var A = eYo.genUID(eYo.IDENT)
    //... var ns0 = eYo.newNS()
    //... var ns1 = ns0.newNS()
    //... var foo0 = eYo.newNS(eYo.NULL_NS, 'foo')
    //... var foo1 = foo0.newNS()
    //... ;[
    //...    [eYo, 'eYo'],
    //...    [ns0, '(eYo)'],
    //...    [ns1, '((eYo))'],
    //...    [eYo.newNS(A), `eYo.${A}`],
    //...    [ns0.newNS(A), `(eYo).${A}`],
    //...    [ns1.newNS(A), `((eYo)).${A}`],
    //...    [foo0, `foo`],
    //...    [foo0.newNS(A), `foo.${A}`],
    //...    [foo1, `(foo)`],
    //...    [foo1.newNS(A), `(foo).${A}`],
    //... ].forEach(ra => chai.expect(ra[0].name).equal(ra[1]))
    //... 

    //... var A = eYo.genUID(eYo.IDENT)
    //... var $A = Symbol(A)
    //... var nsA = eYo.newNS($A)
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var ns0A = ns0.newNS($A)
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var ns1A = ns1.newNS($A)
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var ns0 = eYo.newNS()
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var ns1 = ns0.newNS()
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var A = eYo.genUID(eYo.IDENT)
    //... var $A = Symbol(A)
    //... var nsA = eYo.newNS($A)
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var ns0A = ns0.newNS($A)
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var ns1A = ns1.newNS($A)
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var ns0 = eYo.newNS(eYo.NULL_NS, 'foo')
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var ns1 = ns0.newNS()
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var A = eYo.genUID(eYo.IDENT)
    //... var $A = Symbol(A)
    //... var nsA = eYo.newNS($A)
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var ns0A = ns0.newNS($A)
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //... var ns1A = ns1.newNS($A)
    //... chai.expect(nsA.name).equal(A)
    //... chai.expect(nsA.$id).equal($A)
    //>>>
  },
})

eYo.mixinFR(eYo._p, {
  /**
   * Whether Sub is a subclass of Super, or equals to Super...
   * @param {Function} Sub
   * @param {Function} Super
   * @return {Boolean}
   */
  isSubclass (Sub, Super) {
    return !!Super && !!Sub && eYo.isF(Super) && (Sub === Super || Sub.prototype instanceof Super)
  },
  //<<< mochai: symbols
  $SuperC3s: Symbol('SuperC3s'),
  $SuperC3s_p: Symbol('SuperC3s_p'),
  //... chai.expect(!eYo.$SuperC3s).false
  //... chai.expect(!eYo.$SuperC3s_p).false
  $: Symbol('$'),
  $_p: Symbol('$_p'),
  //... chai.expect(!eYo.$).false
  //... chai.expect(!eYo.$_p).false
  //>>>
})

// ANCHOR newNS, provide
eYo.mixinFR(eYo._p, {
  /**
   * 
   * @param {String} p 
   */
  valueForKeyPath: function (p) {
    let components = p.split('.')
    var ans = this
    if (this === eYo && components[0] === 'eYo') {
      components.shift()
    }
    for (let component of components) {
      if (component.length && eYo.isNA(ans = ans[component])) {
        return
      }
    }
    return ans
    //<<< mochai: eYo.valueForKeyPath
    //... chai.expect(eYo.valueForKeyPath('eYo.test')).equal(eYo.test)
    //... chai.expect(eYo.valueForKeyPath('test')).equal(eYo.test)
    //... var key = eYo.genUID(eYo.IDENT)
    //... eYo.test[key] = {
    //...   foo: {bar: 421}
    //... }
    //... chai.expect(eYo.valueForKeyPath(`eYo.test.${key}.foo.bar`)).equal(421)
    //... delete eYo.test[key]
    //>>>
  },
  /**
   * Contrary to goog.inherits, does not erase the childC3s.prototype.
   * IE<11
   * No delegation managed yet.
   * @param {Function} ChildC3s
   * @param {Function} SuperC3s
   */
  inherits (ChildC3s, SuperC3s) {
    ChildC3s[eYo.$SuperC3s] = SuperC3s
    let Super_p = SuperC3s.prototype
    let Child_p = ChildC3s.prototype
    ChildC3s[eYo.$SuperC3s_p] = Child_p[eYo.$SuperC3s_p] = Super_p
    Object.setPrototypeOf(Child_p, Super_p)
    Object.defineProperty(Child_p, 'constructor', {
      value: ChildC3s
    })
    //<<< mochai: eYo.isSubclass | eYo.inherits
    //... chai.assert(eYo.isSubclass)
    //... chai.expect(eYo.isSubclass()).false
    //... chai.expect(eYo.isSubclass(123)).false
    //... chai.expect(eYo.isSubclass(123, 421)).false
    //... let SuperC3s = function () {}
    //... chai.expect(eYo.isSubclass(SuperC3s, SuperC3s)).true
    //... let ChildC3s = function () {}
    //... chai.expect(eYo).property('inherits')
    //... eYo.inherits(ChildC3s, SuperC3s)
    //... chai.expect(eYo.isSubclass(ChildC3s, SuperC3s)).true
    //... chai.expect(ChildC3s[eYo.$SuperC3s_p]).equal(ChildC3s.prototype[eYo.$SuperC3s_p]).equal(SuperC3s.prototype)
    //>>>
  },
  /**
   * @name {eYo.newNS}
   * Make a namespace by subclassing the caller's constructor.
   * Will create 'foo' namespace together with an 'foo_p' property to access the prototype.
   * @param {!Object} [ns] - a namespace, created object will be `ns[key]`. Defaults to the receiver.
   * @param {String|Symbol} [id] - Sentence case name when a string. Created object will be `ns[id]` and `eYo[ns.$id]`.
   * @param {Object} [model] - Key/value pairs
   * @param {Boolean} [getters] - Whether in the model, function values are getters
   * @return {Object}
   */
  newNS (ns, id, model, getters) {
    //<<< mochai: eYo.newNS'
    //... chai.assert(eYo.isNS)
    //... chai.expect(eYo).eyo_NS
    //... chai.assert(eYo.newNS)
    if (ns && !eYo.isNS(ns)) {
      eYo.isDef(getters) && eYo.throw(`${this.name}/newNS: Unexpected last argument: ${getters}`)
      //... chai.expect(() => {eYo.newNS(1, 2, 3, 4)}).xthrow()
      ;[ns, id, model, getters] = [this, ns, id, model]
    }
    var $id, key
    if (eYo.isSym(id)) {
      key = id.description
      $id = id
    } else if (eYo.isStr(id)) {
      key = id
      $id = Symbol(ns ? `${ns.name}.${key}` : key)
    } else {
      eYo.isDef(getters) && eYo.throw(`${this.name}/newNS: Unexpected last argument (2): ${getters}`)
      //... chai.expect(() => {eYo.newNS(2, 3, 4)}).xthrow()
      //... chai.expect(() => {eYo.newNS(eYo.NA, 2, 3, 4)}).xthrow()
      ;[model, getters] = [id, model]
      var anonymous = true
      if (ns) {
        key = '?'
        $id = Symbol(`${ns.name}.${key}`)
      } else {
        key = `(${this.name})`
        $id = Symbol(key)
      }
    }
    if (eYo.isBool(model)) {
      [model, getters] = [getters, model]
    }
    if (anonymous) {
      ns && key && !eYo.isNA(ns[key]) && eYo.throw(`${ns.name}[${key}] already exists.`)
    }
    //... var ns = eYo.newNS()
    //... chai.expect(ns).eyo_NS
    //... chai.expect(ns).not.equal(eYo)
    var Super = this.constructor
    var NS = function () {
      Super.call(this)
    }
    eYo.inherits(NS, Super)
    //... var ns_super = eYo.newNS()
    //... chai.expect(ns_super).eyo_NS
    //... var ns = ns_super.newNS()
    //... chai.expect(ns).eyo_NS
    //... chai.expect(() => ns.foo()).xthrow()
    //... ns_super._p.foo = eYo.doNothing
    //... ns.foo()

    //... var ns_super = eYo.newNS()
    //... var ns = ns_super.newNS()
    //... var key = eYo.genUID(eYo.IDENT)
    //... var ns = ns_super.newNS(eYo.NULL_NS, key)
    //... chai.assert(ns)
    //... chai.expect(ns_super[key]).undefined
    Object.defineProperty(NS.prototype, '$super', {
      value: this,
      writable: false,
    })
    //... var ns_super = eYo.newNS()
    //... var ns = ns_super.newNS()
    //... chai.expect(ns).not.equal(ns_super)
    //... chai.expect(ns.$super).equal(ns_super)
    if (ns) {
      Object.defineProperty(NS.prototype, 'parent', {
        get () {
          eYo.test && eYo.test.IN_THROW || console.error('BREAK HERE!!! parent')
          return ns
        },
        // value: ns, // used in makeC3sBase
        // writable: false,
      })
      Object.defineProperty(NS.prototype, 'parentNS', {
        value: ns, // used in makeC3sBase
        writable: false,
      })
    }
    model && (getters
      ? eYo.mixinRO(NS.prototype, model)
      : eYo.mixinFR(NS.prototype, model))
    //... var ns = eYo.newNS(eYo.NULL_NS, 'fu', {
    //...   shi: 421
    //... })
    //... chai.expect(ns.shi).equal(421)
    //... var ns = eYo.newNS(eYo.NULL_NS, 'fu', true, {
    //...   shi () { return 421 }
    //... })
    //... chai.expect(ns.shi).equal(421)
    var ans = new NS()
    anonymous && (ans.anonymous = anonymous)
    if (key) {
      if (!anonymous && ns) {
        eYo.objectHasOwnProperty(ns, key) && eYo.throw(`${this.name}/newNS: already property (${key})`)
        Object.defineProperties(ns, {
          [key]: { value: ans, writable: false },
          [key + '_p']: { value: NS.prototype, writable: false },
          [key + '_s']: { value: Super.prototype, writable: false },
        })
      }
      Object.defineProperties(ans, {
        key: {value: key, writable: false},
        $id: {value: $id, writable: false},
      })
      var parentNS = ns
      if (ns && !eYo.isSym(id)) {
        while (true) { // eslint-disable-line
          if ((parentNS = ns.parentNS)) {
            ns = parentNS
            continue
          }
          if (ns !== eYo) {
            Object.defineProperties(eYo, {
              [$id]: { value: ans, writable: false },
            })
          }
          break
        }
      }
      //... var ns_super = eYo.newNS()
      //... var ns = ns_super.newNS('foo')
      //... chai.expect(ns).eyo_NS
      //... chai.expect(ns).equal(ns_super.foo)
      //... ns.newNS('chi')
      //... chai.expect(ns_super.foo.chi).eyo_NS
    }
    return ans
    //>>>
  },
  /**
   * @param {String} name - dotted components, some kind of path.
   * @param {Object} value - When false, nothing is performed. Thit is the value used to create some object at the given path, instead of the default namespace.
   */
  provide (name, value) {
    //<<< mochai: eYo.provide
    if (value === false) {
      return
    }
    var $ = name.split('.')
    if ($[0] === 'eYo') {
      return
    }
    var ns = eYo
    var f = (first, second, ...$$) => {
      if (first) {
        if (!ns[first]) {
          if (eYo.isStr(second)) {
            ns = ns.newNS(first)
            f(second, ...$$)
          } else if (second) {
            ns[first] = second
          } else {
            ns.newNS(first)
          }
        } else if (eYo.isStr(second)) {
          ns = ns[first]
          f(second, ...$$)
        } 
      }
    }
    f(...$, value)
    //... var key = eYo.genUID(eYo.IDENT)
    //... eYo.provide(`${key}.bar`)
    //... chai.expect(eYo[key]).eyo_NS
    //... chai.expect(eYo[key].bar).eyo_NS
    //>>>
  },
  /**
   * @param {String} path - dotted separated components.
   */
  require (name) {
    //<<< mochai: eYo.require
    var ns = eYo
    name.split('.').forEach(k => {
      if (eYo.isDef(ns)) {
        ns = ns[k]
        if (eYo.isNS(ns)) {
          return
        }
        if (ns) {
          ns = eYo.NA // no more component allowed
          return
        }
      }
      eYo.throw(`Missing required ${name}`)
    })
    //... var key = eYo.genUID(eYo.IDENT)
    //... eYo.provide(`${key}.foo`)
    //... eYo.require(`${key}`)
    //... eYo.require(`${key}.foo`)
    //... chai.expect(() => eYo.require(`${key}.foo.bar`)).xthrow()
    //... chai.expect(() => eYo.require(`${key}.bor`)).xthrow()
    //... chai.expect(() => eYo.require(`${key}1.foo`)).xthrow()
    //>>>
  },
  forward: eYo.doNothing,
})

// ANCHOR Assert
eYo.mixinFR(eYo, {
  /**
   * The default error handler.
   * @param {eYo.AssertionError} e The exception to be handled.
   */
  DEFAULT_ERROR_HANDLER (e) {
    throw e
  },
  /**
   * Error object for failed assertions.
   * https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
   * @param {string} pattern The pattern that was used to form message.
   * @param {...*} messageArgs The items to substitute into the pattern.
   * @constructor
   * @extends {Error}
   * @final
   */
  AssertionError: (() => {
    let AE = function(pattern, ...$) {
      this.message = eYo.subs_(pattern, ...$)
      this.stack = Error().stack
      /**
       * The message pattern used to format the error message. Error handlers can
       * use this to uniquely identify the assertion.
       * @type {string}
       */
      this.messagePattern = pattern
    }
    eYo.inherits(AE, Error)
    AE.prototype.name = "AssertionError"
    return AE
  })(),
  /**
   * Checks if the condition evaluates to true.
   * @template T
   * @param {T} condition The condition to check.
   * @param {string=} opt_message Error message in case of failure.
   * @param {...*} args The items to substitute into the failure message.
   * @return {T} The value of the condition.
   * @throws {eYo.AssertionError} When the condition evaluates to false.
   * @closurePrimitive {asserts.truthy}
   */
  assert (condition, message, ...$) {
    if (eYo.ENABLE_ASSERTS && !condition) {
      var e = new eYo.AssertionError(message, ...$)
      eYo.errorHandler_(e)
    }
    return condition
  },
  /**
   * Does simple python-style string substitution.
   * subs("foo%s hot%s", "bar", "dog") becomes "foobar hotdog".
   * @param {string} pattern The string containing the pattern.
   * @param {Array<*>} subs The items to substitute into the pattern.
   * @return {string} A copy of `str` in which each occurrence of
   *     {@code %s} has been replaced by an argument from `subs`.
   * @private
   */
  subs_ (pattern, ...subs) {
    var splitParts = pattern.split('%s')
    var returnString = ''
    // Replace up to the last split part. We are inserting in the
    // positions between split parts.
    var subLast = splitParts.length - 1
    for (var i = 0; i < subLast; i++) {
      // keep unsupplied as '%s'
      var sub = (i < subs.length) ? subs[i] : '%s'
      returnString += splitParts[i] + sub
    }
    return returnString + splitParts[subLast]
  },
})

/**
 * The handler responsible for throwing or logging assertion errors.
 * @private {function(!eYo.AssertionError)}
 */
eYo.errorHandler_ = eYo.DEFAULT_ERROR_HANDLER
eYo.ENABLE_ASSERTS = true

eYo.provide('eYo')

//<<< mochai: version
eYo.newNS('version', {
  //<<< mochai: CONST
  /** @define {number} */
  MAJOR: 0,
  //... chai.expect(eYo.version.MAJOR).eyo_Num
  /** @define {number} */
  MINOR: 1,

  /** @define {number} */
  PATCH: 0,

  /** @define {string} */
  PRERELEASE: '',

  /** @define {string} */
  BUILD_DATE: '',

  /** @define {string} */
  GIT_HEAD: '',
  //>>>
})
//>>>

eYo.newNS('session')

eYo.newNS('temp')
eYo.newNS('debug')

goog.require('goog.userAgent')

// ANCHOR Assert
eYo.mixinRO(eYo, {
  userAgent: goog.userAgent,
  LETTER: 'letter',
  ALNUM: 'alnum',
  IDENT: 'ident',
  EPSILON: 1e-10,
})

eYo.mixinFR(eYo._p, {
  greater (left, right, tol = eYo.EPSILON) {
    return left - right >= -tol * (Math.abs(left) + Math.abs(right) + 2)
  },
  equals (left, right, tol = eYo.EPSILON) {
    return Math.abs(left - right) <= tol * (Math.abs(left) + Math.abs(right) + 2)
    /*
    assume left < right with no restriction, let
    0 < ∆ = (right - left) / 2
    µ = (left+right) / 2
    such that
    left = µ - ∆
    right = µ + ∆
    Math.abs(left - right) <= tol * (Math.abs(left) + Math.abs(right) + 2)
    becomes
    (*) 2 ∆ ≤ ε * (|µ - ∆| + |µ + ∆| + 2)
    * when 0 ≤ |µ| ≤ ∆, (*) becomes
    2 ∆ ≤ ε * (∆ - |µ| + |µ| + ∆ + 2)
    ∆ ≤ ε * (∆ + 1)
    It is true when either
    i) ∆ / (∆ + 1) ≤ ε
    ii) ∆ ≤ ε / (1 - ε)
    * when 0 ≤ ∆ ≤ |µ|, (*) becomes
    2 ∆ ≤ ε * (|µ| - ∆ + |µ| + ∆ + 2)
    ∆ ≤ ε * (|µ| + 1)
    It is true when either
    i) ∆ / (|µ| + 1) ≤ ε
    ii) ∆ ≤ ε * (|µ| + 1)
    */
  },
  //<<< mochai: eYo.greater|equals
  // left = 0.9, right = 1.1, µ = 1, ∆ = 0.1
  // 0 ≤ ∆ ≤ |µ|:
  // ε_critical = ∆ / (|µ| + 1) = 0.05
  // Math.abs(left - right) <= tol * (Math.abs(left) + Math.abs(right) + 2)
  // 0.2 <= tol * 4 = 0.05 * 4 * 1.01 = 0.202
  //... chai.expect(eYo.equals(0.9, 1.1, 1.01 * 0.05)).true
  //... chai.expect(eYo.greater(0.9, 1.1, 1.01 * 0.05)).true
  //... chai.expect(eYo.equals(0.9, 1.1, 0.99 * 0.05)).false
  //... chai.expect(eYo.greater(0.9, 1.1, 0.99 * 0.05)).false
  // left = -1, right = 3, µ = 1, ∆ = 2
  // 0 ≤ |µ| ≤ ∆:
  // ε_critical = ∆ / (∆ + 1) = 2/3
  // Math.abs(left - right) <= tol * (Math.abs(left) + Math.abs(right) + 2)
  // 4 <= tol * (6)
  //... chai.expect(eYo.equals(-1, 3, 1.01 * 2/3)).true
  //... chai.expect(eYo.greater(-1, 3, 1.01 * 2/3)).true
  //... chai.expect(eYo.equals(-1, 3, 0.99 * 2/3)).false
  //... chai.expect(eYo.greater(-1, 3, 0.99 * 2/3)).false
  //... var mean = eYo.test.randN()
  //... var delta = mean + eYo.test.randN()
  //... var epsilon = delta / (delta + 1)
  //... chai.expect(eYo.equals(mean - delta, mean + delta, 1.01 * epsilon)).true
  //... chai.expect(eYo.equals(mean - delta, mean + delta, 0.99 * epsilon)).false
  //... var delta = eYo.test.randN()
  //... var mean = delta + eYo.test.randN()
  //... var epsilon = delta / (mean + 1)
  //... chai.expect(eYo.equals(mean - delta, mean + delta, 1.01 * epsilon)).true
  //... chai.expect(eYo.equals(mean - delta, mean + delta, 0.99 * epsilon)).false
  //... var c = 1.23
  //... var epsilon = 0.01
  /*
  left = c
  right = c + 2 ∆
  Math.abs(left - right) <= tol * (Math.abs(left) + Math.abs(right) + 2)
  2 ∆ ≤ ε * (c + c + 2 ∆ + 2)
  ∆ ≤ ε * (c + ∆ + 1)
  ∆ ≤ ε * (c + 1) / (1 - ε)
  */
  // 
  //... var delta = epsilon * (c + 1) / (1 - epsilon)
  /*
  Math.abs(left - right) <= tol * (Math.abs(left) + Math.abs(right) + 2)
  2 ∆ ≤ 0.99 * ε * (c + c + 2 ∆ + 2)
  ∆ ≤ 0.99 * ε * (c + ∆ + 1)
  ε * (c + 1) / (1 - ε) ≤ 0.99 * ε * (c + ε * (c + 1) / (1 - ε) + 1)
  c + 1 ≤ 0.99 * (c + ε * (c + 1) / (1 - ε) + 1) * (1 - ε)
  c + 1 ≤ 0.99 * (c * (1 - ε) + ε * (c + 1) + 1 - ε)
  c + 1 ≤ 0.99 * (c - c * ε + ε * c + ε + 1 - ε)
  c + 1 ≤ 0.99 * (c + 1)
  */
  //... chai.expect(eYo.equals(c, c + 2 * delta, 1.01 * epsilon)).true
  //... chai.expect(eYo.equals(c, c + 2 * delta, 0.99 * epsilon)).false
  //>>>
})

;(() => {
  // remove characters '`:()[]{}' for convenience
  var letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'
  var alnum = letter + '0123456789'
  var all = alnum + '!#$%*+,-./;=?@^|'
  /**
   * Generate a unique ID.  This should be globally unique.
   * 79 characters ^ 20, length > 128 bits (better than a UUID).
   * @param {type} String - One of `eYo.IDENT`, `eYo.LETTER`, `eYo.ALNUM`.
   * @return {string} A globally unique ID string.
   */
  eYo._p.genUID = (type, length) => {
    if (!eYo.isStr(type)) {
      [length, type] = [type, length]
    }
    length || (length = 20)
    if (type === eYo.IDENT) {
      return eYo.genUID(eYo.LETTER, 1) + eYo.genUID(eYo.ALNUM, length - 1)
    }
    let soup = type === eYo.LETTER ? letter :
      type === eYo.ALNUM ? alnum : all
    let soupLength = soup.length
    let id = []
    var i = length || 20
    while (i) {
      id[--i] = soup.charAt(Math.random() * soupLength)
    }
    return id.join('')
  }
})()

//>>>