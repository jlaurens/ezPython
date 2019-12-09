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

eYo.require('eYo.Do')
eYo.require('eYo.ns.Model')

eYo.provide('eYo.Dlgt')


/**
 * @name {eYo.ns.Class}
 * @namespace
 * The class namespace, general purpose namespace for class constructors management.
 */
eYo.ns.make('Class')

/**
 * All the created delegates.
 * @package
 */
eYo.ns.Class.dlgtByKey__ = Object.create(null)

/**
 * @name {eYo.Dlgt}
 * @constructor
 * Object adding data to a constructor in a safe way.
 * @param {Object} [ns] -  namespace of the constructor. Subclass of `eYo`'s constructor.
 * @param {String} [key] -  the key used when the constructor was created.
 * @param {Object} C9r -  the object to which this instance is attached.
 * @param {Object} [model] -  the model used to create the constructor.
 * @readonly
 * @property {!Function} C9r - The associate constructor.
 * @property {?Object} ns - The namespace of the associate constructor, if any.
 * @property {!String} name - The name of the associate constructor.
 * @property {Set<String>} link_ - Set of link identifiers. Lazy initializer.
 * @readonly
 * @property {Set<String>} owned_ - Set of link identifiers. Lazy initializer.
 * @readonly
 * @property {Set<String>} clonable_ - Set of link identifiers. Lazy initializer.
 * @readonly
 * @property {Set<String>} cached_ - Set of cached identifiers. Lazy initializer.
 */
Object.defineProperty(eYo.constructor.prototype, 'Dlgt', {
  value (ns, key, C9r, model) {
    if (eYo.isStr(ns)) {
      model = C9r
      C9r = key
      key = ns
      ns = eYo.NA
    } else if (ns) {
      eYo.parameterAssert(
        eYo.isSubclass(ns.constructor, eYo.constructor),
        'Bad namespace',
      )
    }
    if (!eYo.isStr(key)) {
      model = C9r
      C9r = key
      key = eYo.NA
    }
    eYo.parameterAssert(
      C9r,
      'Missing constructor',
    )
  // compatibility
    var pttp = C9r.superClass_
    if (pttp) {
      var dlgt = pttp.constructor.eyo__
      dlgt && eYo.parameterAssert(
        eYo.isSubclass(this.constructor, dlgt.constructor),
        `Wrong subclass delegate: ${dlgt.name}, ${this.constructor.eyo.name} not a subclass ${dlgt.constructor.eyo.name}`,
      )
    }
    Object.defineProperties(this, {
      C9r__: { value: C9r },
      ns__: { value: ns },
      model__: { value: model },
      key__: {value: key || 'My name is nobody'},
    })  
    C9r.eyo__ = this

    if (model) {
      model.eyo__ = this
      this.props__ = new Set()
      model.linked && this.declareLinked(model.linked)
      model.owned && this.declareOwned(model.owned)
      model.cached && this.declareCached(model.cached)
      model.clonable && this.declareClonable(model.clonable)
      model.computed && this.declareComputed(model.computed)
      eYo.ns.Model.inherits(model, this.super && this.super.model)
    }
  }
})
// convenient variable
Object.defineProperties(eYo.Dlgt.prototype, {
  C9r: eYo.Do.propertyR(function () {
    return this.C9r_
  }),
  C9r_: {
    get () {
      return this.C9r__
    },
    set (after) {
      this.C9r__ = after
    }
  },
  key: eYo.Do.propertyR(function () {
    return this.key__
  }),
  key_: eYo.Do.propertyR(function () {
    return this.key__
  }),
  ns: eYo.Do.propertyR(function () {
    return this.ns__
  }),
  ns_: eYo.Do.propertyR(function () {
    return this.ns__
  }),
  model: eYo.Do.propertyR(function () {
    return this.model__
  }),
  model_: eYo.Do.propertyR(function () {
    return this.model__
  }),
  name: eYo.Do.propertyR(function () {
    return this.ns__ && this.key && `${this.ns__.name}.${this.key}` || this.key
  }),
  name_: {
    get: eYo.Do.noGetter,
    set: eYo.Do.noSetter,
  },
  name__: {
    get: eYo.Do.noGetter,
    set: eYo.Do.noSetter,
  },
  super: eYo.Do.propertyR(function () {
    var C9r = this.C9r.superClass_
    return C9r && C9r.constructor.eyo__
  }),
})

;['owned', 'clonable', 'link', 'cached'].forEach(k => {
  var k_ = k + '_'
  var k__ = k + '__'
  Object.defineProperty(eYo.Dlgt.prototype, k_, {
    get () {
      return this[k__] || (this[k__] = new Set())
    }
  })
  /**
   * Owned enumerating loop.
   * @param {Function} helper -  signature (name) => {...}
   */
  var name = k + 'ForEach'
  eYo.Dlgt.prototype[name] = function (f) {
    this[k__] && this[k__].forEach(f)
  }
  // name = 'some' + K
  // pttp[name] = function (f) {
  //   return this[k__] && this[k__].some(f)
  // }
})

/**
 * Initialize an instance with link, cached, owned and clonable properties.
 * Default implementation forwards to super.
 * @param {Object} instance -  instance is an instance of a subclass of the `C9r_` of the receiver
 */
eYo.Dlgt.prototype.initInstance = function (object) {
  var suffix = '__'
  var f = k => {
    Object.defineProperty(object, k, eYo.Do.propertyR(function () {
      return this[k + suffix]
    }))
  }
  this.linkedForEach(f)
  this.ownedForEach(f)
  this.clonableForEach(f)
  suffix = '_'
  this.cachedForEach(f)
  var f = k => {
    var init = this.init_ && this.init_[k] || object[k+'Init']
    if (init) {
      var k__ = k + '__'
      object[k__] = init.call(this)
    }
  }
  this.ownedForEach(f)
  this.clonableForEach(f)
  this.linkedForEach(f)
}

/**
 * Dispose of the resources declared at that level.
 * @param {Object} instance -  instance is an instance of a subclass of the `C9r_` of the receiver
 */
eYo.Dlgt.prototype.disposeInstance = function (object) {
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
eYo.Dlgt.prototype.registerInit = function (k, model) {
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
eYo.Dlgt.prototype.registerDisposer = function (k, model) {
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
eYo.Dlgt.prototype.declareLinked_ = function (k, model = {}) {
  eYo.parameterAssert(!this.props__.has(k))
  this.link_.add(k)
  const proto = this.C9r_.prototype
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
      var f = model.validate
      f && (after = f.call(this, before, after))
      f = this[k + 'Validate']
      f && (after = f.call(this, before, after))
      if (before !== after) {
        f = model.willChange
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
    set: model.set || eYo.Do.noSetter,
  })
}

/**
 * Add a link properties.
 * The receiver is not the owner.
 * @param {Object} constructor -  Its prototype object gains a storage named `foo__` and both getters and setters for `foo_`.
 * The initial value is `eYo.NA`.
 * @param {Array<String>} names names of the link to add
 */
eYo.Dlgt.prototype.declareLinked = function (model) {
  if (model.forEach) {
    model.forEach(k => {
      this.declareLinked_(k)
    })
  } else {
    Object.keys(model).forEach(k => {
      this.declareLinked_(k, model[k])
    })
  }
}

/**
 * Dispose in the given object, the link given by the constructor.
 * @param {Object} object -  an instance of the receiver's constructor,
 * or one of its subclasses.
 */
eYo.Dlgt.prototype.clearLink_ = function (object) {
  this.linkedForEach(k => {
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
 * and the receiver have the same status with respect to UI. 
 * The `get` and `set` keys allow to provide a getter and a setter.
 * In that case, the setter should manage ownership if required.
 * Add an owned object.
 * The receiver is not the owner.
 * @param {String} k name of the owned to add
 * @param {Object} data -  the object used to define the property: key `value` for the initial value, key `willChange` to be called when the property is about to change (signature (before, after) => function, truthy when the change should take place). The returned value is a function called after the change has been made in memory.
 */
eYo.Dlgt.prototype.declareOwned_ = function (k, model = {}) {
  eYo.parameterAssert(!this.props__.has(k))
  this.owned_.add(k)
  const proto = this.C9r_.prototype
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
        var f = model && model.validate
        f && (after = f.call(this, before, after))
        var ff = this[k + 'Validate']
        ff && (after = ff.call(this, before, after))
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
            // init the UI if necessary, we intentionnaly did not delete the UI
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
eYo.Dlgt.prototype.declareOwned = function (many) {
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
 * @param {Object} object - the object that owns the property. The other parameters are forwarded to the dispose method.
 */
eYo.Dlgt.prototype.disposeOwned_ = function (object, ...params) {
  this.ownedForEach(k => {
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
 * @param {String} key -  the key
 * @param {Object} model -  the model object, must have a `init` key and
 * may have a `forget` or an `update` key.
 * Both are functions called in the contect of the owner
 * (`this` is the owner). `init` takes no arguments.
 * `forget` takes only one argument: the concrete forgetter.
 * `update` arguments are the value before, the value after
 * (computed from the `init`) and the updater which is the function
 * that effectively set the new value.
 * It may take one argument to override the proposed after value.
 */
eYo.Dlgt.prototype.declareCached_ = function (k, model) {
  eYo.parameterAssert(!this.props__.has(k))
  this.cached_.add(k)
  var proto = this.C9r_.prototype
  var k_ = k + '_'
  var k__ = k + '__'
  model.lazy || this.registerInit(k, model)
  Object.defineProperties(proto, {
    [k__]: {value: eYo.NA, writable: true},
    [k_]: {
      get: model.lazy
      ? function () {
        var before = this[k__]
        if (eYo.isDef(before)) {
          return before
        }
        var after = init.call(this)
        return (this[k_] = after)
      } : function () {
        return this[k__]
      },
      set (after) {
        var before = this[k__]
        var f = model && model.validate
        f && (after = f.call(this, before, after))
        var ff = this[k + 'Validate']
        ff && (after = ff.call(this, before, after))
        if (before !== after) {
          f = model && model.willChange
          if (!f || (f = f.call(this, before, after))) {
            ff = this[k + 'WillChange']
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
 * @param {Object} many -  the K => V mapping to which we apply `declareCached_(K, V)`.
 */
eYo.Dlgt.prototype.declareCached = function (many) {
  Object.keys(many).forEach(n => {
    this.declareCached_(n, many[n])
  })
}

/**
 * Forget all the cached values.
 */
eYo.Dlgt.prototype.forgetCached_ = function () {
  this.cachedForEach(n => {
    this.forget_[n].call(this)
  })
}

/**
 * Add computed properties to a prototype.
 * @param {Map<String, Function>} models,  the key => Function mapping.
 */
eYo.Dlgt.prototype.declareComputed = function (models) {
  Object.keys(models).forEach(k => {
    eYo.parameterAssert(!this.props__.has(k))
    try {
      const proto = this.C9r_.prototype
      var k_ = k + '_'
      var k__ = k + '__'
      var model = models[k]
      var get = model.get || eYo.asF(model)
      var set = model.set
      Object.defineProperty(proto, k, set ?
        {
          get: get,
          set: eYo.Do.noSetter,
        } : {
          get: get,
          set: set,
        }
      )
      k = k_
      get = eYo.asF(model.get_) || function () {
        return this[k__]
      }
      set = model.set_
      Object.defineProperty(proto, k, get ? set ? {
          get: get,
          set: set,
        } : {
          get: get,
          set: eYo.Do.noSetter,
        } : set ? {
          get: eYo.Do.noGetter,
          set: set,
        } : {
          get: eYo.Do.noGetter,
          set: eYo.Do.noSetter,
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
          set: eYo.Do.noSetter,
        }
        : set ? {
          get: eYo.Do.noGetter,
          set: set,
        } : {
          get: eYo.Do.noGetter,
          set: eYo.Do.noSetter,
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
eYo.Dlgt.prototype.declareClonable = function (models) {
  this.init_ || (this.init_ = Object.create(null))
  var proto = this.C9r_.prototype
  Object.keys(models).forEach(k => { // No `for (var k in models) {...}`, models may change during the loop
    eYo.parameterAssert(!this.props__.has(k))
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
            var f = model.validate
            f && (after = f.validate(before, after))
            f = this[k + 'Validate']
            f && (after = f.validate(before, after))
            f = model.willChange
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
          var f = model.validate
          f && (after = f.validate(before, after))
          f = this[k + 'Validate']
          f && (after = f.validate(before, after))
          f = model.willChange
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
 * @param {Object} object - the object that owns the property
 * @param {Array<string>} names -  a list of names
 */
eYo.Dlgt.prototype.disposeClonable_ = function (object) {
  this.clonableForEach(k => {
    var k__ = k + '__'
    var x = object[k__]
    if (x) {
      object[k__] = eYo.NA
      x.dispose()
    }
  })
}

/**
 * Helper to add a dispose function to the prototype of the receiver.
 * @param {Function} f a model value for key `dispose`, or a function given by another constructor delegate.
 */
eYo.Dlgt.prototype.disposeDecorate = function (f) {
  var me = this
  return function () {
    f && f.apply(this, arguments)
    me.disposeInstance(this)
  }
}

/**
 * Convenient shortcut to create subclasses.
 * Forwards to the namespace which must exist!
 * @param {Object} [ns] -  The namespace, possibly `eYo.NA`.
 * @param {String} key -  to create `ns[key]`
 * @param {Function} [Dlgt] -  Delegate class.
 * @param {Object} [model] -  Model object
 * @return {?Function} the constructor created or `eYo.NA` when the receiver has no namespace.
 */
eYo.Dlgt.prototype.makeSubclass = function (ns, key, Dlgt_, model) {
  if (eYo.isStr(ns)) {
    eYo.parameterAssert(!model, 'Unexpected model')
    model = Dlgt_
    Dlgt_ = key
    key = ns
    ns = this.ns__
  } else if (!eYo.isStr(key)) {
    eYo.parameterAssert(!model, 'Unexpected model')
    model = Dlgt_
    Dlgt_ = key
    key = this.key
  }
  if (!eYo.isSubclass(Dlgt_, eYo.Dlgt)) {
    eYo.parameterAssert(!model, 'Unexpected model')
    model = Dlgt_
    Dlgt_ = this.C9r.eyo.constructor
    if (eYo.isSubclass(this.ns__.Dlgt, Dlgt_)) {
      Dlgt_ = this.ns__.Dlgt
    }
  }
  return ns && ns.makeClass(ns, key, this.C9r, Dlgt_, model) || eYo.makeClass(ns, key, this.C9r, Dlgt_, model)
}

/**
 * Convenient shortcut. See 
 * @param {Object} [ns] -  The namespace, possibly `eYo.NA`.
 * @param {String} key -  to create `ns[key]`
 * @param {Function} [Dlgt] -  Delegate class.
 * @param {Object} [model] -  Model object
 * @return {?Function} the constructor created or `eYo.NA` when the receiver has no namespace.
 */
eYo.Dlgt.makeSubclass = function (ns, key, Dlgt_, model) {
  return eYo.Dlgt.eyo.makeSubclass(ns, key, Dlgt_, model)
}

/**
 * @name{eYo.makeClass}
 * Make a constructor with an 'eyo__' property.
 * Caveat, constructors must have the same arguments.
 * Use a key->value design if you do not want that.
 * The `params` object has template: `{init: function, dispose: function}`.
 * Each namespace has its own `makeClass` method which creates classes in itself.
 * @param {Object} [ns] -  The namespace, defaults to the Super's one or the caller.
 * @param {String} key -  The key.
 * @param {Function} [Super] -  The eventual super class. There is no default value. Must be a subclass of `eYo.Dflt`, when no `Dlgt_`is given but not necessarily with an `eyo`.
 * @param {Function} [Dlgt_] -  The constructor's delegate class. Defaults to the `Super`'s delegate. Must be a subclass of `eYo.Dlgt`.
 * @param {Object|Function} [model] -  The dictionary of parameters. Or a function to create such a dictionary. This might overcomplicated.
 * @return {Function} the created constructor.
 */
eYo.constructor.prototype.makeClass = (() => {
  var makeDlgt = (ns, key, C9r, Dlgt, model) => {
    Object.defineProperties(C9r, {
      eyo: eYo.Do.propertyR(function () {
        return this.eyo__
      }),
      eyo_: eYo.Do.propertyR(function () {
          return this.eyo__
      }),
    })
    C9r.eyo__ = new Dlgt(ns, key, C9r, model)
    Object.defineProperty(C9r.prototype, 'eyo', eYo.Do.propertyR(function () {
      return this.constructor.eyo__
    }))
  }
  // the Dlgt is its own Dlgt
  makeDlgt(eYo, 'Dlgt', eYo.Dlgt, eYo.Dlgt, {})

  var C9r = function (ns, key, Super, Dlgt, model) {
    // formal parameters management:
    if (eYo.isStr(ns)) {
      model = Dlgt
      Dlgt = Super
      Super = key
      key = ns
      ns = Super && Super.eyo && Super.eyo.ns || this
    } else {
      eYo.parameterAssert(eYo.isStr(key), '`key` is not a string')
    }
    eYo.parameterAssert(!eYo.Do.hasOwnProperty(ns, key), `${key} is already a property of ns: ${ns.name}`)
    eYo.parameterAssert(!eYo.Do.hasOwnProperty(ns.constructor.prototype, key), `${key} is already a property of ns: ${ns.name}`)
    if (eYo.isSubclass(Super, eYo.Dflt)) {
      // Super is OK
      if (eYo.isSubclass(Dlgt, eYo.Dlgt)) {
        // Dlgt is also OK
        eYo.parameterAssert(
          !Super.eyo || eYo.isSubclass(Dlgt, Super.eyo.constructor),
          'Bad constructor delegate'
        )
        model = eYo.called(model) || {}
      } else {
        eYo.parameterAssert(!model, 'Unexpected model (1)')
        model = eYo.called(Dlgt) || {}
        Dlgt = Super.eyo && Super.eyo.constructor || this.Dlgt
      }
    } else if (eYo.isSubclass(Super, eYo.Dlgt)) {
      if (eYo.isSubclass(Dlgt, eYo.Dlgt)) {
        // we subclass eYo.Dlgt
        model = eYo.called(model) || {}
      } else {
        // we subclass nothing
        eYo.parameterAssert(!model, 'Unexpected model (2)')
        model = eYo.called(Dlgt) || {}
        Dlgt = Super
        Super = eYo.NA
      }
    } else if (eYo.isF(Super)) {
      if (eYo.isSubclass(Dlgt, eYo.Dlgt)) {
        // Dlgt and Super OK
        model = eYo.called(model) || {}
      } else if (Dlgt) {
        eYo.parameterAssert(!model, 'Unexpected model (3)')
        model = eYo.called(Dlgt) || {}
        Dlgt = this.Dlgt
      } else {
        eYo.parameterAssert(!model, 'Unexpected model (4)')
        model = eYo.called(Super) || {}
        Dlgt = this.Dlgt
        Super = eYo.asF(this[key]) || this.Dflt
      }
    } else {
      eYo.parameterAssert(!Dlgt, 'Unexpected Dlgt')
      eYo.parameterAssert(!model, 'Unexpected model (5)')
      model = eYo.called(Super) || {}
      Dlgt = this.Dlgt
      Super = eYo.asF(this[key])
    }
    if (!model) {
      throw new Error('Unexpected void model')
    }
    // prepare init methods
    if (eYo.isF(model.init)) {
      var endInit = model.init
    } else if (model.init) {
      var beginInit = model.init.begin
      endInit = model.init.end
    }
    delete model.init
    // create the constructor
    if (Super) {
      var C9r = function () {
        Super.apply(this, arguments)
        beginInit && beginInit.apply(this, arguments)
        C9r.eyo__.initInstance(this)
        endInit && endInit.apply(this, arguments)
      }
      try {
        eYo.inherits(C9r, Super)
      } catch(e) {
        console.error('BREAK HERE')
      }
    } else {
      C9r = function () {
        beginInit && beginInit.apply(this, arguments)
        C9r.eyo__.initInstance(this)
        endInit && endInit.apply(this, arguments)
      }
    }
    makeDlgt(ns, key, C9r, Dlgt, model)
    // create the iterators
    ;['owned', 'clonable', 'linked', 'cached'].forEach(k => {
      var name = k + 'ForEach'
      C9r.prototype[name] = function (f) {
        var Super = C9r.superClass_
        if (Super) {
          var g = Super[name]
          g && g.call(this, f)
        }
        C9r.eyo[name].call(C9r.eyo, (k) => {
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
    if (!C9r.eyo.disposeDecorate) {
      console.error('WTF')
    }
    var f = C9r.eyo.disposeDecorate (model.dispose)
    delete model.dispose
    C9r.prototype.dispose = function () {
      try {
        this.dispose = eYo.Do.nothing
        f && f.apply(this, arguments)
        C9r.eyo.disposeInstance(this)
        var Super = C9r.superClass_
        !!Super && !!Super.dispose && !!Super.dispose.apply(this, arguments)
      } finally {
        delete this.dispose
      }
    }
    Object.defineProperty(ns.constructor.prototype, key, {value: C9r})
    C9r.makeSubclass = function (ns, key, Dlgt, model) {
      return C9r.eyo.makeSubclass(ns, key, Dlgt, model)
    }
    return C9r
  }
  return C9r
})()

/**
 * The default class.
 * @name {eYo.Dflt}
 * @constructor
 */
eYo.makeClass('Dflt')
