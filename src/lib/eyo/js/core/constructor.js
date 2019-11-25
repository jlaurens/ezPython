/**
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Utility to make a constructor with some edython specific data storage and methods.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.require('eYo.Do')

goog.provide('eYo.Constructor')
goog.provide('eYo.Constructor.Dlgt')

/**
 * Make a constructor with an 'eyo__' property.
 * Caveat, constructors must have the same arguments.
 * Use a key->value design if you do not want that.
 * The `params` object has template: `{init: function, dispose: function}`
 * @param {?Object} ns,  A namespace. Defaults to `eYo`.
 * @param {!String} key,  The key.
 * @param {?Function} superC9r,  The eventual super class. There is no default value. Give a falsy value if you do not want inheritance.
 * @param {?Function} dlgtC9r,  The constructor's delegate class. Defaults to the `super_`'s delegate. Must be a subclass of `eYo.Constructor.Dlgt`.
 * @param {!Object} model,  The dictionary of parameters.
 * @return {Object} the created constructor.
 * 
 */
eYo.Constructor.makeClass = (ns, key, superC9r, dlgtC9r, model) => {
  if (goog.isString(ns)) {
    model = dlgtC9r
    dlgtC9r = superC9r
    superC9r = key
    key = ns
    ns = eYo
  }
  if (eYo.isF(superC9r)) {
    if (eYo.isF(dlgtC9r)) {
      model || (model = {})
    } else if (superC9r.prototype instanceof eYo.Constructor.Dlgt) {
      model = dlgtC9r || {}
      dlgtC9r = superC9r
      superC9r = eYo.NA
    } else {
      model = dlgtC9r || {}
      dlgtC9r = superC9r.eyo && superC9r.eyo.constructor
      var c9r = ns.Dlgt
      if (c9r instanceof eYo.Constructor.Dlgt) {
        dlgtC9r = c9r
      } else {
        dlgtC9r = eYo.Constructor.Dlgt
      }
    }
  } else {
    if (eYo.isF(dlgtC9r)) {
      model || (model = {})
    } else {
      model = superC9r || {}
      dlgtC9r = eYo.Constructor.Dlgt
    }
    c9r = ns.Dflt
    superC9r = eYo.isF(c9r) ? c9r : eYo.NA
  }
  if (eYo.isF(model.init)) {
    var endInit = model.init
  } else if (model.init) {
    var beginInit = model.init.begin
    endInit = model.init.end
  }
  if (superC9r) {
    var c9r = ns[key] = function () {
      c9r.superClass_.constructor.apply(this, arguments)
      beginInit && beginInit.apply(this, arguments)
      c9r.eyo__.initInstance(this)
      endInit && endInit.apply(this, arguments)
    }
    try {
      eYo.Do.inherits(c9r, superC9r)
    } catch(e) {
      console.error('BREAK HERE')
    }
  } else {
    c9r = ns[key] = function () {
      beginInit && beginInit.apply(this, arguments)
      c9r.eyo__.initInstance(this)
      endInit && endInit.apply(this, arguments)
    }
  }
  Object.defineProperties(c9r, {
    eyo: {
      get () {
        return this.eyo__
      },
      set () {
        throw 'Forbidden setter'
      }
    },
    eyo_: {
      get () {
        return this.eyo__
      },
      set () {
        throw 'Forbidden setter'
      }
    },
  })
  var eyo = c9r.eyo__ = new dlgtC9r(c9r, key, model)
  c9r.makeSubclass = (owner_, key_, dlgtC9r_, model_) => {
    if (goog.isString(owner_)) {
      model_ = dlgtC9r_
      dlgtC9r_ = key_
      key_ = owner_
      owner_ = ns
    }
    if (!eYo.isF(dlgtC9r_)) {
      model_ = dlgtC9r_
      dlgtC9r_ = dlgtC9r
    }
    return eyo.makeSubclass(owner_, key_, c9r, dlgtC9r_, model_ || {})
  }
  Object.defineProperty(c9r.prototype, 'eyo', {
    get () {
      return eyo
    },
    set () {
      throw 'Forbidden setter'
    }
  })
  eyo.constructorMake = eYo.Constructor.makeClass
  ;['owned', 'clonable', 'link', 'cached'].forEach(k => {
    var K = k[0].toUpperCase() + k.substring(1)
    var name = 'forEach' + K
    c9r.prototype[name] = function (f) {
      var super_ = c9r.superClass_
      if (super_) {
        var g = super_[name]
        g && g.call(this, f)
      }
      c9r.eyo[name].call(c9r.eyo, (k) => {
        var x = this[k]
        return x && f(x)
      })
    }
    // name = 'some' + K
    // c9r.prototype[name] = function (f) {
    //   var super_ = c9r.superClass_
    //   if (super_) {
    //     var g = super_[name]
    //   }
    //   return g && get.call(this, f) || c9r.eyo[name].call(c9r.eyo, (k) => {
    //     var x = this[k]
    //     return x && f(x)
    //   })
    // }
  })
  var f = c9r.eyo.disposeDecorate (model.dispose)
  c9r.prototype.dispose = function () {
    try {
      this.dispose = eYo.Do.nothing
      f && f.apply(this, arguments)
      eyo.disposeInstance(this)
      var super_ = c9r.superClass_
      !!super_ && !!super_.dispose && !!super_.dispose.apply(this, arguments)
    } finally {
      delete this.dispose
    }
  }
  return c9r
}

/**
 * Make a namespace with a dedicated constructor maker.
 * @param {?Object} owner, existing namespace, defaults to `eYo`.
 * @param {!String} key, capitalised name in `owner`.
 */
eYo.Constructor.makeNS = (owner, key) => {
  if (goog.isString(owner)) {
    key = owner
    owner = eYo
  }
  if (owner[key]) {
    throw new Error('Duplicate namespace:' + owner + ', '
+ key)
  }
  var NS = owner[key] = Object.create(null)
  NS.makeClass = (...args) => {
    return eYo.Constructor.makeClass(NS, ...args)
  }
  NS.makeSublass = (...args) => {
    return eYo.Constructor.makeClass(NS, ...args)
  }
  NS.makeNS = (...args) => {
    return eYo.Constructor.makeNS(NS, ...args)
  }
}

/**
 * Object adding data to a constructor in a safe way.
 * @param {!Object} c9r,  the object to which this instance is attached.
 * @param {!String} key,  the key used when the constructor was created.
 * @param {!Object} model,  the model used to create the constructor.
 * @constructor
 * @readonly
 * @property {Set<String>} link_ - Set of link identifiers. Lazy initializer.
 * @readonly
 * @property {Set<String>} owned_ - Set of link identifiers. Lazy initializer.
 * @readonly
 * @property {Set<String>} clonable_ - Set of link identifiers. Lazy initializer.
 * @readonly
 * @property {Set<String>} cached_ - Set of cached identifiers. Lazy initializer.
 */
eYo.Constructor.Dlgt = function (c9r, key, model) {
  this.c9r__ = c9r
  c9r.eyo__ = this
  if (!model) {
    console.error('NO MODEL')
  }
  this.name_ = key
  var props = model.props
  if (props) {
    this.props_ = new Set()
    props.link && this.declareLink(props.link)
    props.owned && this.declareOwned(props.owned)
    props.cached && this.declareCached(props.cached)
    props.clonable && this.declareClonable(props.clonable)
    props.computed && this.declareComputed(props.computed)
  }
}

Object.defineProperties(eYo.Constructor.Dlgt.prototype, {
  c9r: {
    get () {
      return this.c9r_
    },
    set () {
      throw 'Forbidden setter'
    }
  },
  c9r_: {
    get () {
      return this.c9r__
    },
    set (after) {
      this.c9r__ = after
    }
  },
  eyo: {
    get () {
      return this.eyo_
    },
    set () {
      throw 'Forbidden setter'
    }
  },
  name: {
    get () {
      return this.name_
    },
    set () {
      throw 'Forbidden setter'
    }
  },
  name_: {
    get () {
      return this.name__
    },
    set (after) {
      this.name__ = after
    }
  },
  super: {
    get () {
      var c9r = this.c9r.superClass_
      return c9r && c9r.constructor.eyo
    }
  },
})

;['owned', 'clonable', 'link', 'cached'].forEach(k => {
  var k_ = k + '_'
  var k__ = k + '__'
  Object.defineProperty(eYo.Constructor.Dlgt.prototype, k_, {
    get () {
      return this[k__] || (this[k__] = new Set())
    }
  })
  /**
   * Owned enumerating loop.
   * @param {Function} helper,  signature (name) => {...}
   */
  var K = k[0].toUpperCase() + k.substring(1)
  var name = 'forEach' + K
  eYo.Constructor.Dlgt.prototype[name] = function (f) {
    this[k__] && this[k__].forEach(f)
  }
  // name = 'some' + K
  // eYo.Constructor.Dlgt.prototype[name] = function (f) {
  //   return this[k__] && this[k__].some(f)
  // }
})

/**
 * Initialize an instance with link, cached, owned and clonable properties.
 * Default implementation forwards to super.
 * @param {Object} instance,  instance is an instance of a subclass of the `c9r_` of the receiver
 */
eYo.Constructor.Dlgt.prototype.initInstance = function (object) {
  var suffix = '__'
  var f = k => {
    Object.defineProperty(object, k, {
      get () {
        return this[k + suffix]
      },
      set() {
        throw "Forbidden setter"
      },
    })
  }
  this.forEachLink(f)
  this.forEachOwned(f)
  this.forEachClonable(f)
  suffix = '_'
  this.forEachCached(f)
  var f = k => {
    var init = this.init_ && this.init_[k]
    if (init) {
      var k__ = k + '__'
      object[k__] = init.call(this)
    }
  }
  this.forEachOwned(f)
  this.forEachClonable(f)
  this.forEachLink(f)
}

/**
 * Dispose of the resources declared at that level.
 * @param {Object} instance,  instance is an instance of a subclass of the `c9r_` of the receiver
 */
eYo.Constructor.Dlgt.prototype.disposeInstance = function (object) {
  this.clearLink_(object)
  this.forgetCached_(object)
  this.disposeOwned_(object)
  this.disposeClonable_(object)
}

/**
 * Register the `init` method  in the model, to be used when necessary.
 * @param {String} k name of the link to add
 * @param {Object} model Object with `init` key, eventually.
 */
eYo.Constructor.Dlgt.prototype.registerInit = function (k, model) {
  var init = (eYo.isF(model) && model) || (eYo.isF(model.init) && model.init)
  if (init) {
    !this.init_ && (this.init_ = Object.create(null))
    this.init_[k] = init
  } 
}

/**
 * Register the `disposer` method  in the model, to be used when necessary.
 * See the `disposeOwned` method for more informations.
 * @param {String} k name of the link to add
 * @param {Object} model Object with `disposer` key, eventually.
 */
eYo.Constructor.Dlgt.prototype.registerDisposer = function (k, model) {
  var disposer = eYo.isF(model.disposer) && model.disposer
  if (disposer) {
    !this.disposer_ && (this.disposer_ = Object.create(null))
    this.disposer_[k] = disposer
  } 
}

/**
 * Add a link property.
 * The receiver is not the owner.
 * @param {String} k name of the link to add
 * @param {Object} model Object with `willChange` and `didChange` keys,
 * f any.
 */
eYo.Constructor.Dlgt.prototype.declareLink_ = function (k, model = {}) {
  eYo.parameterAssert(!this.props_.has(k))
  this.link_.add(k)
  const proto = this.c9r_.prototype
  var k_ = k + '_'
  var k__ = k + '__'
  this.registerInit(k, model)
  Object.defineProperty(proto, k__, {
    value: model.value || eYo.NA,
    writable: true
  })
  Object.defineProperty(proto, k_, {
    get: model.get_ || function () {
      return this[k__]
    },
    set: model.set_ || function (after) {
      var before = this[k__]
      model.validate && (after = model.validate(before, after))
      if (before !== after) {
        var f = model.willChange
        if (!f || (f = f.call(this, before, after))) {
          var ff = this[k + 'WillChange']
          ff && ff.call(this, before, after)
          this[k__] = after
          f && f.call(this, before, after)
          f = model.didChange
          f && f.call(this, before, after)
          ff && ff.call(this, before, after)
          ff = this[k + 'DidChange']
          ff && ff.call(this, before, after)
        }
      }
    },
  })
  Object.defineProperty(proto, k, {
    get: model.get || function () {
      return this[k_]
    },
    set: model.set || function (after) {
      throw 'Forbidden setter'
    },
  })
}

/**
 * Add a link properties.
 * The receiver is not the owner.
 * @param {Object} constructor,  Its prototype object gains a storage named `foo__` and both getters and setters for `foo_`.
 * The initial value is `eYo.NA`.
 * @param {Array<String>} names names of the link to add
 */
eYo.Constructor.Dlgt.prototype.declareLink = function (model) {
  if (model.forEach) {
    model.forEach(k => {
      this.declareLink_(k)
    })
  } else {
    Object.keys(model).forEach(k => {
      this.declareLink_(k, model[k])
    })
  }
}

/**
 * Dispose in the given object, the link given by the constructor.
 * @param {Object} object,  an instance of the receiver's constructor,
 * or one of its subclasses.
 */
eYo.Constructor.Dlgt.prototype.clearLink_ = function (object) {
  this.forEachLink(k => {
    var k_ = k + '_'
    var x = object[k_]
    if (x) {
      object[k_] = eYo.NA
    }
  })
}

//// Properties

/**
 * Add a 3 levels property to a prototype.
 * `key__` is the basic private recorder.
 * `key_` is the basic private setter/getter.
 * Changing this property is encapsulated between `willChange` and `didChange` methods.
 * `k` is the public getter.
 * In the setter, we arrange things such that the new value
 * and the receiver have the same status with respoct to UI. 
 * The `get` and `set` keys allow to provide a getter and a setter.
 * In that case, the setter should manage ownership if required.
 * Add an owned object.
 * The receiver is not the owner.
 * @param {String} k name of the owned to add
 * @param {Object} data,  the object used to define the property: key `value` for the initial value, key `willChange` to be called when the property is about to change (signature (before, after) => function, truthy when the change should take place). The returned value is a function called after the change has been made in memory.
 */
eYo.Constructor.Dlgt.prototype.declareOwned_ = function (k, model = {}) {
  eYo.parameterAssert(!this.props_.has(k))
  this.owned_.add(k)
  const proto = this.c9r_.prototype
  var k_ = k + '_'
  var k__ = k + '__'
  this.registerInit(k, model)
  this.registerDisposer(k, model)
  Object.defineProperties(proto, {
    [k__]: {value: model.value || eYo.NA, writable: true},
    [k_]: {
      get: model.get || function () {
        return this[k__]
      },
      set: model.set
      ? function (after) {
        var before = this[k__]
        if(before !== after) {
          var f = model.willChange
          if (!f || (f = f.call(this, before, after))) {
            model.set.call(this, after)
            f && f(before, after)
          }
        }
      }
      : function (after) {
        var before = this[k__]
        if(before !== after) {
          var f = model.willChange
          if (!f || (f = f.call(this, before, after))) {
            var ff = this[k + 'WillChange']
            ff && ff.call(this, before, after)
            if (!!before && before.owner_) {
              before.owner_ = before.ownerKey_ = eYo.NA
            }
            this[k__] = after
            if (after) {
              if (after.owner_) {
                after.owner_[after.ownerKey_] = eYo.NA
              }
              after.ownerKey_ = k_
              after.owner_ = this
            } else if (typeof after === "object") {
              after.ownerKey_ = k_
              after.owner_ = this
            }
            f && f.call(this, before, after)
            f = model.didChange
            f && f.call(this, before, after)
            ff && ff.call(this, before, after)
            ff = this[k + 'DidChange']
            ff && ff.call(this, before, after)
            if (!!after && this.hasUI && after.initUI) {
              after.initUI()
            }
          }
        }
      },
    }
  })
}

/**
 * Add an owned property.
 * The receiver is the owner.
 * @param {Object} many  key -> data map.
 */
eYo.Constructor.Dlgt.prototype.declareOwned = function (many) {
  if (many.forEach) {
    many.forEach(k => {
      this.declareOwned_(k)
    })
  } else {
    Object.keys(many).forEach(k => {
      this.declareOwned_(k, many[k])
    })  
  }
}

/**
 * Dispose in the given object, the properties given by their main name.
 * @param {Object} object, the object that owns the property. The other parameters are forwarded to the dispose method.
 */
eYo.Constructor.Dlgt.prototype.disposeOwned_ = function (object, ...params) {
  this.forEachOwned(k => {
    var k_ = k + '_'
    var k__ = k + '__'
    var x = object[k__]
    if (x) {
      object[k_] = eYo.NA
      x.dispose(...params)
    }
  })
}

/**
 * Add a 2 levels cached property to the receiver's constructor's prototype.
 * @param {String} key,  the key
 * @param {Object} model,  the model object, must have a `init` key and
 * may have a `forget` or an `update` key.
 * Both are functions called in the contect of the owner
 * (`this` is the owner). `init` takes no arguments.
 * `forget` takes only one argument: the concrete forgetter.
 * `update` arguments are the value before, the value after
 * (computed from the `init`) and the updater which is the function
 * that effectively set the new value.
 * It may take one argument to override the proposed after value.
 */
eYo.Constructor.Dlgt.prototype.declareCached_ = function (k, model) {
  eYo.parameterAssert(!this.props_.has(k))
  this.cached_.add(k)
  var proto = this.c9r_.prototype
  var k_ = k + '_'
  var k__ = k + '__'
  if (eYo.isF(model)) {
    var init = model
    model = Object.create(null)
  } else {
    init = model.init
  }
  Object.defineProperties(proto, {
    [k__]: {value: eYo.NA, writable: true},
    [k_]: {
      get () {
        var before = this[k__]
        if (eYo.isDef(before)) {
          return before
        }
        var after = init.call(this)
        return (this[k_] = after)
      },
      set (after) {
        var before = this[k__]
        if (before !== after) {
          var f = model && model.willChange
          if (!f || (f = f.call(this, before, after))) {
            var ff = this[k + 'WillChange']
            ff && ff.call(this, before, after)
            this[k__] = after
            f && f.call(this, before, after)
            f = model && model.didChange
            f && f.call(this, before, after)
            ff && ff.call(this, before, after)
            ff = this[k + 'DidChange']
            ff && ff.call(this, before, after)
          }
        }
      }
    }
  })
  this.forget_ || (this.forget_ = Object.create(null))
  proto[k+'Forget'] = this.forget_[k] = model.forget
  ? function () {
    model.forget.call(this, () => {
      this[k_] = eYo.NA
    })
  } : function () {
    this[k_] = eYo.NA
  }
  this.updateCached_ || (this.updateCached_ = Object.create(null))
  proto[k+'Update'] = this.updateCached_[k] = model.update
  ? function (after) {
    var before = this[k__]
    eYo.isDef(after) || (after = init.call(this))
    if (before !== after) {
      model.update.call(this, before, after, (x) => {
        this[k_] = eYo.isDef(x)? x : after
      })
    }
  } : function (after) {
    var before = this[k__]
    eYo.isDef(after) || (after = init.call(this))
    if (before !== after) {
      this[k_] = after
    }
  }
}

/**
 * Add 3 levels cached properties to a prototype.
 * @param {Object} many,  the K => V mapping to which we apply `declareCached_(K, V)`.
 */
eYo.Constructor.Dlgt.prototype.declareCached = function (many) {
  Object.keys(many).forEach(n => {
    this.declareCached_(n, many[n])
  })
}

/**
 * Forget all the cached values.
 */
eYo.Constructor.Dlgt.prototype.forgetCached_ = function () {
  this.forEachCached(n => {
    this.forget_[n].call(this)
  })
}

/**
 * Add computed properties to a prototype.
 * @param {Map<String, Function>} models,  the key => Function mapping.
 */
eYo.Constructor.Dlgt.prototype.declareComputed = function (models) {
  var proto = this.c9r_.prototype
  var params = {
    get () {
      throw 'Forbidden getter'
    },
    set (after) {
      throw 'Forbidden setter'
    }
  }
  Object.keys(models).forEach(k => {
    eYo.parameterAssert(!this.props_.has(k))
    try {
      var k_ = k + '_'
      var k__ = k + '__'
      var model = models[k]
      var get = model.get || eYo.isF(model) && model
      var set = model.set
      Object.defineProperty(proto, k, model.set ?
        {
          get: get,
          set (after) {
            throw 'Forbidden setter'
          },
        } : {
          get: get,
          set: set,
        }
      )
      k = k_
      get = eYo.isF(model.get_) ? model.get_ : function () {
        return this[k__]
      }
      set = model.set_
      Object.defineProperty(proto, k, get ? set ? {
          get: get,
          set: set,
        } : {
          get: get,
          set () { throw 'Forbidden setter' },
        }
        : set ? {
          get () { throw 'Forbidden setter' },
          set: set,
        } : {
          get () { throw 'Forbidden setter' },
          set () { throw 'Forbidden setter' },
        }
      )
      k = k__
      get = model.get__
      set = model.set__
      Object.defineProperty(proto, k, get ? set ? {
          get: get,
          set: set,
        } : {
          get: get,
          set () { throw 'Forbidden setter' },
        }
        : set ? {
          get () { throw 'Forbidden setter' },
          set: set,
        } : {
          get () { throw 'Forbidden setter' },
          set () { throw 'Forbidden setter' },
        }
      )
    }
    catch (e) {
      console.error('Computed property problem', k, this.name_)
    }
  })
}

/**
 * Add a 3 levels clonable property to a prototype.
 * `foo` is a clonable object means that `foo.clone` is a clone of `foo`
 * and `foo.set(bar)` will set `foo` properties according to `bar`.
 * @param {Map<String, Function|Object>} models,  the key => Function mapping.
 */
eYo.Constructor.Dlgt.prototype.declareClonable = function (models) {
  this.init_ || (this.init_ = Object.create(null))
  var proto = this.c9r_.prototype
  Object.keys(models).forEach(k => {
    eYo.parameterAssert(!this.props_.has(k))
    this.clonable_.add(k)
    var model = models[k]
    if (eYo.isF(model)) {
      var init = model
      model = {}
    } else {
      init = model.init
    }
    this.init_[k] = init
    var k_ = k + '_'
    var k__ = k + '__'
    Object.defineProperties(proto, {
      [k__]: {value: eYo.KeyHandler, writable: true},
      [k_]: {
        get() {
          return this[k__].clone
        },
        set (after) {
          var before = this[k__]
          if (!before) {
            if (!after) {
              return
            }
            var setter = () => {
              this[k__] = after.clone
            }
            var f = model.willChange
            if (!f || (f = f.call(this, before, after))) {
              var ff = this[k + 'WillChange']
              ff && ff.call(this, before, after)
              this.wrapUpdate && this.wrapUpdate(setter) || setter()
              if (after.owner_) {
                after.owner_[after.ownerKey_] = eYo.NA
              }
              after.ownerKey_ = k_
              after.owner_ = this
              f && f.call(this, before, after)
              f = model.didChange
              f && f.call(this, before, after)
              ff && ff.call(this, before, after)
              ff = this[k + 'DidChange']
              ff && ff.call(this, before, after)
              if (!!after && this.hasUI && after.initUI) {
                after.initUI()
              }
            }
          } else if (before.equals(after)) {
            return
          }
          var f = model.willChange
          if (!f || (f = f(before, after))) {
            var ff = this[k + 'WillChange']
            ff && ff.call(this, before, after)
            if (!after) {
              before.owner_ = before.ownerKey_ = eYo.NA
            }
            var setter = () => {
              this[k__].set(after)
            }
            if (!!after && !!after.ownerKey_) {
              after.owner_[after.ownerKey_] = eYo.NA
            }
            this.wrapUpdate && this.wrapUpdate(setter) || setter()
            if (typeof after === "object") {
              after.ownerKey_ = k_
              after.owner_ = this
            }
            f && f(before, after)
            f = model.didChange
            f && f(before, after)
            ff && ff.call(this, before, after)
            ff = this[k + 'DidChange']
            ff && ff.call(this, before, after)
            if (!!after && this.hasUI && after.initUI) {
              after.initUI()
            }
          }
        },
      },
    })
  })
}

/**
 * Dispose in the given object, the properties given by their main name.
 * @param {Object} object, the object that owns the property
 * @param {Array<string>} names,  a list of names
 */
eYo.Constructor.Dlgt.prototype.disposeClonable_ = function (object) {
  this.forEachClonable(k => {
    var k__ = k + '__'
    var x = object[k__]
    if (x) {
      object[k__] = eYo.NA
      x.dispose()
    }
  })
}

/**
 * Add the cached `app` property to the prototype.
 * @param {Object} proto
 */
eYo.Constructor.Dlgt.prototype.addApp = function () {
  this.declareCached_('app', {
    get () {
      return this.owner__.app
    },
    forget () {
      this.forEachOwned(k => {
        var x = this[k]
        x && x.appForget && x.appForget()
      })
      this.ui_driverForget && this.ui_driverForget()
    }
  })
}

/**
 * Convenient shortcut to create subclasses.
 * @param {!Object} owner,  required namespace
 * @param {!String} key,  to create `owner[key]`
 * @param {?Function} superC9r,  super class, defaults to the receiver's class.
 * @param {?Object} model,  Model object
 */
eYo.Constructor.Dlgt.prototype.makeSubclass = function (owner, key, superC9r, model = {}) {
  if (!eYo.isF(superC9r)) {
    model = superC9r || {}
    superC9r = this.constructor
  }
  this.constructorMake(owner, key, superC9r, model)
}

/**
 * Helper to add a dispose function to the prototype of the receiver.
 * @param {Function} f a model value for key `dispose`, or a function given by another constructor delegate.
 */
eYo.Constructor.Dlgt.prototype.disposeDecorate = function (f) {
  var me = this
  return function () {
    f && f.apply(this, arguments)
    me.disposeInstance(this)
  }
}
