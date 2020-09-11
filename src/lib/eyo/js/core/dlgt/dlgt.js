/**
 * edython
 *
 * Copyright 2020 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Class delegates manage class metadata without conflicting with other extensions.
 * This namespace may not be subclasses.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.require('model')
eYo.require('xre')
eYo.require('do')

/**
 * Management of class delegates.
 * @name {eYo.dlgt}
 * @namespace
 */
eYo.newNS('dlgt')

//<<< mochai: ../
//... var NS = eYo.newNS()
//... var id = 'foo'
//... var $id = Symbol(id)
//... var C3s
//... var dlgt
//... let preparator = model => {
//...   C3s = function (...$) {
//...     this.prepare(...$)
//...     this.init(...$)
//...   }
//...   if (model && model.$SuperC3s) {
//...     eYo.inherits(C3s, model.$SuperC3s)
//...   }
//...   dlgt = eYo.dlgt.new(id, model || {})
//...   dlgt.setC3s(C3s)
//...   if (model && model.$super) {
//...     var $super = dlgt.$super
//...     if (!$super) {
//...       $super = eYo.dlgt.new('$super', {})
//...       $super.setC3s(function () {})
//...       eYo.mixinFR(dlgt, { $super })
//...       $super.finalizeC3s()
//...     }
//...     Object.assign($super, model.$super)
//...   }
//...   let _p = C3s.prototype
//...   _p.flag = function (...$) {
//...     eYo.flag.push('/', ...$)
//...   }
//...   eYo.dlgt.declareDlgt(_p)
//...   chai.expect(_p.eyo$).equal(dlgt)
//...   chai.expect(C3s[eYo.$]).equal(dlgt)
//...   _p.prepare = function (...$) {
//...     this.flag('p', ...$)
//...     this[eYo.$].c9rPrepare && this[eYo.$].c9rPrepare(this, ...$)
//...   }
//...   _p.init = function (...$) {
//...     this.flag('i', ...$) 
//...     this[eYo.$].c9rInit && this[eYo.$].c9rInit(this, ...$)
//...   }
//...   _p.dispose = function (...$) {
//...     this.flag('x', ...$) 
//...     this[eYo.$].c9rDispose && this[eYo.$].c9rDispose(this, ...$)
//...   }
//...   dlgt.finalizeC3s()
//... }
//>>>

//<<< mochai: Basics
//... chai.assert(eYo.dlgt)
//... chai.expect(eYo.dlgt.C3sBase).equal(eYo.Dlgt)
//... chai.expect(eYo.Dlgt).property(eYo.$)
//... var set = new Set([
//...   eYo.dlgt.C3sBase[eYo.$],
//...   eYo.dlgt.C3sBase[eYo.$][eYo.$],
//...   eYo.dlgt.C3sBase[eYo.$][eYo.$][eYo.$],
//... ])
//... chai.expect(set.size).equal(1)
//... chai.expect(eYo.Dlgt[eYo.$]).instanceof(eYo.Dlgt)
//>>>

eYo.mixinFR(eYo.dlgt, {
  /**
   * This is a root class, not to be subclassed except in singletons.
   * Any constructor's delegate is an instance of this subclass.
   * @param {Object} NS - Namespace, can be eYo.NULL_NS
   * @param {String|Symbol} [id] - a unique string id or symbol within the namespace...
   * @param {Function} C3s - the associate constructor
   * @param {Object} model - the model used for extension
   * The problem of constructor delegation is the possibility of an infinite loop :
    object->constructor->eyo$->contructor->eyo$->constructor->[eYo.$]...
    The Base is its own delegate's constructor
  */
  C3sBase: function (ns, id, model) {
    //<<< mochai: eYo.dlgt.C3sBase
    //... chai.expect(eYo.dlgt).property('C3sBase')
    if (ns && !eYo.isNS(ns)) {
      model && eYo.throw(`eYo.dlgt.C3sBase: unexpected model (${model})`)
      //... chai.expect(() => {new eYo.delegate.C3sBase(1, 2, 3, 4)}).xthrow()
      ;[ns, id, model] = [eYo.NA, ns, id]
    }
    var anonymous = false
    var $id // for debugging purposes mainly (2020/08)
    if (eYo.isSym(id)) {
      [$id, id] = [id, id.description]
      anonymous = true
    } else {
      if (!eYo.isStr(id)) {
        model && eYo.throw(`eYo.dlgt.C3sBase: unexpected model 2 (${model})`)
        ;[id, model] = ['?', id]
        anonymous = true
      }
      $id = Symbol(`${ns ? ns.name : '(...)'}.${id}`)
    }
    eYo.mixinRO(this, {
      ns__: ns,
      $id__: $id,
      id__: id,
      model__: model,
      subC3ss__: new Set(), // change it to map ?
      modelFormat__: new eYo.model.Format(),
      anonymous__: anonymous,
    })
    this.makeC3sPrepare()
    //... C3s = function () {}
    //... dlgt = new eYo.Dlgt(NS, id, {})
    //... dlgt.setC3s(C3s)
    //... dlgt.finalizeC3s()
    //... chai.expect(dlgt.ns).equal(NS)
    //... chai.expect(dlgt.id__).equal(id)
    //... chai.expect(dlgt.$id__.description).equal(`(eYo).${id}`)
    //>>>
  },
  /**
   * Declare javascript computed properties pointing to the receiver's delegate.
   * Each namespace also have a delegate.
   * @name {eYo.dlgt.declareDlgt}
   * @param {Object} _p - A prototype
   */
  declareDlgt (_p) {
    eYo.mixinRO(_p, {
      [eYo.$] () {
        return this.constructor[eYo.$]
      },
      eyo$ () {
        return this.constructor[eYo.$]
      },
    })
  },
})

eYo.mixinFR(eYo.dlgt, {
  C3sBase_p: eYo.dlgt.C3sBase.prototype,
})

eYo.mixinFR(eYo._p, {
  /**
   * Whether the argument is a delegate
   * @param {*} what 
   */
  isaDlgt (what) {
    //<<< mochai: isaDlgt
    return what && what instanceof eYo.Dlgt
    //... chai.expect(eYo.isaDlgt(dlgt)).true
    //>>>
  },
  Dlgt: eYo.dlgt.C3sBase,
  Dlgt_p: eYo.dlgt.C3sBase_p,
  /**
   * Whether the argument is a constructor, in edython paradigm.
   * Such a constructor is a function with an `[eYo.$]` property pointing to
   * a delegate. It is not advisable to change this property on the fly.
   * @param {*} What
   * @return {!Boolean}
   */
  isC3s (What) {
    //<<< mochai: isC3s
    return !!What && !!What[eYo.$] && eYo.isF(What)
    //... let C3s = function () {}
    //... chai.expect(!eYo.isC3s(C3s)).true
    //... C3s[eYo.$] = true
    //... chai.expect(eYo.isC3s(C3s)).true
    //... chai.expect(!eYo.isC3s()).true
    //... chai.expect(!eYo.isC3s('')).true
    //... chai.expect(eYo.isC3s(eYo.Dlgt)).true
    //>>>
  },
})

{
  //<<< mochai: utils
  let _p = eYo.Dlgt_p

  eYo.dlgt.declareDlgt(_p)
  //<<< mochai: delegate
  //... chai.expect(eYo.dlgt.eyo$).equal(eYo.dlgt.constructor[eYo.$])
  //... let SuperC3s = function () {}
  //... let superDlgt = eYo.dlgt.new('chi', {})
  //... superDlgt.setC3s(SuperC3s)
  //... chai.expect(!!superDlgt.hasFinalizedC3s).false
  //... chai.expect(superDlgt).not.undefined
  //... chai.expect(superDlgt.constructor).not.equal(eYo.Dlgt)
  //... chai.expect(SuperC3s[eYo.$]).equal(superDlgt)
  //... chai.expect(SuperC3s).equal(superDlgt.C3s)
  //... chai.expect(SuperC3s.prototype).equal(superDlgt.C3s_p)
  //... chai.expect(superDlgt.C3s).equal(superDlgt.C3s__).equal(SuperC3s)
  //... dlgt = eYo.dlgt.new(id, {})
  //... chai.expect(dlgt).not.undefined
  //... chai.expect(dlgt.constructor).not.equal(eYo.Dlgt)
  //... C3s = function (...$) {}
  //... eYo.inherits(C3s, SuperC3s)
  //... dlgt.setC3s(C3s)
  //... let _p = C3s.prototype
  //... eYo.dlgt.declareDlgt(_p)
  //... chai.expect(_p.eyo$).equal(dlgt)
  //... chai.expect(C3s[eYo.$]).equal(dlgt)
  //... chai.expect(() => {
  //...   dlgt.finalizeC3s()
  //... }).xthrow()
  //... superDlgt.finalizeC3s()
  //... chai.expect(superDlgt.hasFinalizedC3s).true
  //... dlgt.finalizeC3s()
  //... chai.expect(dlgt.hasFinalizedC3s).true
  //... chai.expect(dlgt.constructor).not.equal(superDlgt)
  //... chai.expect(dlgt instanceof superDlgt.constructor)
  //... chai.expect(dlgt.$super).equal(superDlgt)
  //... chai.expect(SuperC3s).equal(dlgt.C3s_S)
  //... chai.expect(SuperC3s.prototype).equal(dlgt.C3s_s)
  //... chai.expect(superDlgt).equal(dlgt.$super)
  // convenient shortcut
  //... chai.expect(dlgt).instanceof(eYo.Dlgt)
  //... chai.expect(eYo.Dlgt_p).equal(eYo.dlgt.C3sBase_p).equal(eYo.dlgt.C3sBase.prototype)
  eYo.mixinRO(_p, {
    _p () {
      return this.constructor.prototype
      //... chai.expect(dlgt._p).eql(dlgt.constructor.prototype) 
    },
    /**
     * Whether the receiver has already finalized the constructor. 
     */
    hasFinalizedC3s () {
      return !!this.finalizeC3s[eYo.$$.fired]
    },
  })

  // Readonly access to some properties
  ;['ns', 'id', '$id', 'C3s', 'model', 'modelFormat', 'anonymous'].forEach(k => {
    let d = eYo.descriptorR({$ () {
      return this[k + '__']
    }}.$)
    Object.defineProperties(_p, {
      [k]: d,
      [k + '_']: d,
    })
  })
  //... ;['ns', 'id', '$id', 'C3s', 'model', 'modelFormat', 'anonymous'].forEach(k => {
  //...   chai.expect(dlgt[k]).equal(dlgt[k+'_']).equal(dlgt[k+'__'])
  //... })
  ;['name', '$super', 'genealogy'].forEach(k => {
    let k_ = k + '_'
    let k__ = k + '__'
    Object.defineProperties(_p, {
      [k_]: eYo.descriptorNORW(k_),
      [k__]: eYo.descriptorNORW(k__),
    })
  })
  //... ;['name', '$super', 'genealogy'].forEach(k => {
  //...   chai.expect(() => dlgt[k+'_']).xthrow()
  //...   chai.expect(() => dlgt[k+'__']).xthrow()
  //... })
  // Convenient shortcuts
  //... eYo.inherits(C3s, SuperC3s)
  //... let ChildC3s = function () {}
  //... eYo.inherits(ChildC3s, C3s)
  //... let childDlgt = eYo.dlgt.new('mee', {})
  //... childDlgt.setC3s(ChildC3s)
  //... chai.expect(childDlgt.C3s__).equal(ChildC3s)
  //... let eyo$ = new eYo.Dlgt(eYo.newNS(), 'foo', {})
  //... eyo$.setC3s(function () {})
  //... eyo$.finalizeC3s()
  eYo.mixinRO(_p, {
    C3s_p () {
      return this.C3s__.prototype
      //... chai.expect(superDlgt.C3s_p).equal(SuperC3s.prototype)
      //... chai.expect(dlgt.C3s_p).equal(C3s.prototype)
      //... chai.expect(childDlgt.C3s_p).equal(ChildC3s.prototype)
    },
    C3s_S () {
      return this.C3s__[eYo.$SuperC3s]
      //... chai.expect(superDlgt.C3s_S).undefined
      //... chai.expect(dlgt.C3s_S).equal(SuperC3s)
      //... chai.expect(childDlgt.C3s_S).equal(C3s)
    },
    C3s_s () {
      return this.C3s__[eYo.$SuperC3s_p]
      //... chai.expect(eyo$.C3s_s).undefined
      //... chai.expect(dlgt.C3s_s).equal(SuperC3s.prototype).equal(C3s[eYo.$SuperC3s_p])
      //... chai.expect(childDlgt.C3s_s).equal(C3s.prototype).equal(ChildC3s[eYo.$SuperC3s_p])
    },
    name () {
      return this.$id__.description
      //... chai.expect(eyo$.name).equal('(eYo).foo')
      //... chai.expect(superDlgt.name).equal('(...).chi')
      //... chai.expect(dlgt.name).equal('(...).foo')
      //... chai.expect(childDlgt.name).equal('(...).mee')
    },
    super () {
      eYo.throw('`super` has moved to `$super`')
      //... chai.expect(() => eyo$.super).xthrow()
    },
    $super () {
      var S = this.C3s__[eYo.$SuperC3s]
      return S && S[eYo.$]
      //... chai.expect(eyo$.$super).undefined
      //... chai.expect(superDlgt.$super).undefined
      //... chai.expect(dlgt.$super).eql(SuperC3s[eYo.$])
      //... chai.expect(childDlgt.$super).eql(C3s[eYo.$]).eql(dlgt)
    },
    genealogy () {
      var s = this
      var ans = []
      do {
        ans.push(s.name)
      } while ((s = s.$super))
      return ans
    },
    C3s_s_up () {
      if (this.C3s_s_up__) {
        return this.C3s_s_up__
      }
      var s = this
      var ans = []
      while ((s = s.$super)) {
        ans.push(s.C3s_p)
      }
      return (this.C3s_s_up__ = ans)
      //... chai.expect(superDlgt.C3s_s_up).eql([])
      //... chai.expect(dlgt.C3s_s_up).eql([SuperC3s.prototype])
      //... chai.expect(childDlgt.C3s_s_up).eql([C3s.prototype, SuperC3s.prototype])
    },
    C3s_s_down () {
      return this.C3s_s_down__ || (this.C3s_s_down__ = this.C3s_s_up.reverse())
      //... chai.expect(superDlgt.C3s_s_down).eql([])
      //... chai.expect(dlgt.C3s_s_down).eql([SuperC3s.prototype])
      //... chai.expect(childDlgt.C3s_s_down).eql([SuperC3s.prototype, C3s.prototype])
    },
    C3s_p_up () {
      if (this.C3s_p_up__) {
        return this.C3s_p_up__
      }
      var s = this
      var ans = []
      do {
        ans.push(s.C3s_p)
      } while ((s = s.$super))
      return (this.C3s_p_up__ = ans)
      //... chai.expect(superDlgt.C3s_p_up).eql([SuperC3s.prototype])
      //... chai.expect(dlgt.C3s_p_up).eql([C3s.prototype, SuperC3s.prototype])
      //... chai.expect(childDlgt.C3s_p_up).eql([ChildC3s.prototype, C3s.prototype, SuperC3s.prototype])
    } ,
    C3s_p_down () {
      return this.C3s_p_down__ || (this.C3s_p_down__ = this.C3s_p_up.reverse())
      //... chai.expect(superDlgt.C3s_p_down).eql([SuperC3s.prototype])
      //... chai.expect(dlgt.C3s_p_down).eql([SuperC3s.prototype, C3s.prototype])
      //... chai.expect(childDlgt.C3s_p_down).eql([SuperC3s.prototype, C3s.prototype, ChildC3s.prototype])
    },
    //>>>
  })
  eYo.mixinFR(_p, {
    /**
     * Set the C3s of the receiver.
     * Shortcuts functions are eventually created in he namespace.
     * If the receiver's `id` is a string, say 'Foo',
     * then the receiver's `ns.Foo$` points to the receiver itself,
     * and its `ns.newFoo` is a convenient creator.
     * @param {Function} C3s 
     * @param {Boolean} [noShortCuts] - Defaults to false.
     */
    setC3s (C3s, noShortCuts) {
      //<<< mochai: setC3s
      //... let NS = eYo.newNS()
      //... var model = {}
      //... var dlgt = new eYo.Dlgt(NS, 'Foo', model)
      //... var Foo = function() {}
      //... Foo.prototype.init = function (...$) {
      //...   eYo.flag.push(1, ...$)
      //... }
      //... dlgt.setC3s(Foo, true)
      //... dlgt.finalizeC3s()
      eYo.isDef(this.C3s__) && eYo.throw('setC3s only once')
      eYo.mixinFR(this, {
        C3s__: C3s,
      })
      //... chai.expect(dlgt.C3s__).equal(Foo)
      //... chai.expect(dlgt.model__).equal(model)
      eYo.mixinRO(C3s, {
        [eYo.$]:  this,
        [eYo.$_p]: this._p,
        //... chai.expect(() => {
        //...   let dlgt = eYo.dlgt.new(eYo.newNS(), 'Foo', {})
        //...   let C3s = function() {}
        //...   dlgt.setC3s(C3s)
        //...   dlgt.finalizeC3s()
        //...   eYo.dlgt.new(eYo.newNS(), 'Foo', {})
        //...   dlgt.setC3s(C3s) // raises here
        //... }).xthrow()
      })
      //... chai.expect(Foo[eYo.$]).equal(dlgt)
      //... chai.expect(Foo[eYo.$_p]).equal(dlgt._p)
      //... chai.expect(NS.Foo$).undefined
      //... chai.expect(NS.newFoo).undefined
      //... dlgt = new eYo.Dlgt(NS, 'Foo', model)
      //... Foo = function() {}
      //... Foo.prototype.init = function (...$) {
      //...   eYo.flag.push(1, ...$)
      //... }
      //... dlgt.setC3s(Foo)
      //... dlgt.finalizeC3s()
      if (!noShortCuts) {
        let ns = this.ns
        let id = this.id
        if (ns && id && !this.anonymous) {
          eYo.mixinRO(ns._p, {
            [id + '$'] () {
              return C3s[eYo.$]
            },
            //... chai.expect(NS.Foo$).equal(dlgt)
            ['new' + id] () {
              return C3s[eYo.$new]
            },
            //... chai.expect(NS.newFoo).eyo_F
            //... var foo = NS.newFoo()
            //... chai.expect(foo).instanceOf(Foo)
          })
        }
        eYo.mixinFR(C3s, {
          [eYo.$new] (...$) {
            let ans = new C3s(...$) // top to bottom
            ans.init(...$) // bottom to top, unless overriden
            return ans
          },
        })
      }
      this.init()
      //... var model = {
      //...   [eYo.$] () {
      //...     eYo.flag.push(4, 2, 1)
      //...   },
      //... }
      //... var id = 'bar'
      //... var C3s = function () {}
      //... var dlgt = eYo.dlgt.new(NS, id, model)
      //... dlgt.setC3s(C3s)
      //... dlgt.finalizeC3s()
      //... chai.expect(C3s[eYo.$]).equal(dlgt)
      //... chai.expect(C3s[eYo.$_p]).equal(dlgt._p)  
      //... eYo.flag.expect(1421)
      //>>>
    },
    /**
     * Make the `c9rPrepare` method of the receiver.
     * Any edython delegate has a `c9rPrepare`.
     * It will call the model's `prepare` method when available.
     * @this {eYo.Dlgt}
     */
    makeC3sPrepare () {
      //<<< mochai: eYo.Dlgt_p.makeC3sPrepare
      eYo.mixinFR(this, {
        makeC3sPrepare: eYo.oneShot('makeC3sPrepare only once'),
      })
      let K = 'c9rPrepare'
      let f_m = this.model.prepare
      if (f_m) {
        if (!eYo.isF(f_m)) {
          eYo.test && eYo.test.IN_THROW || console.error('BREAK HERE! BUG')
        }
        //... preparator({
        //...   prepare (...$) {
        //...     eYo.flag.push('<', ...$, '>')
        //...   }
        //... })
        //... new C3s(1, 2)
        //... eYo.flag.expect('/p12<12>/i12')
        this.constructor.prototype[K] = {[K] (...$) {
          f_m.call(...$)
        }}[K]
      } else {
        this.constructor.prototype[K] = eYo.doNothing
      }
      //>>>
    },
    /**
     * Make the `c9rInit` method of the associate contructor.
     * Any constructor must have a `init` method.
     * This methods forwards to the delegate
     * @this {eYo.Dlgt}
     */
    makeC3sInit () {
      //<<< mochai: eYo.dlgt.C3sBase_p.makeC3sInit
      eYo.mixinFR(this, {
        makeC3sInit: eYo.oneShot('makeC3sInit only once'),
      })
      let K = 'c9rInit'
      let f_m = this.model.init
      let f_p = this.$super && this.$super[K]
      if (f_m) {
        if (!eYo.isF(f_m)) {
          eYo.test && eYo.test.IN_THROW || console.error('BREAK HERE! BUG')
        }
        if (XRegExp.exec(f_m.toString(), eYo.xre.function_builtin)) {
          if (f_p) {
            var m = {[K] ($this, ...$) {
              let f = (...$$) => f_p.call(this, $this, ...$$)
              f_m.call($this, f, ...$)
            }}
            //... preparator({
            //...   init (builtin, ...$) {
            //...     this.flag('I', ...$)
            //...     chai.expect(builtin).equal(eYo.doNothing)
            //...   }
            //... })
            //... new C3s(1, 2)
            //... eYo.flag.expect('/p12/i12/I12')
            //... preparator({
            //...   init (builtin, ...$) {
            //...     this.flag('I<')
            //...     builtin(...$)
            //...     eYo.flag.push('>')
            //...   },
            //...   $super: {
            //...     c9rInit ($this, ...$) {
            //...       $this.flag('$I', ...$)
            //...     }
            //...   }
            //... })
            //... new C3s(1, 2)
            //... eYo.flag.expect('/p12/i12/I</$I12>')
          } else {
            m = {[K] ($this, ...$) {
              f_m.call($this, eYo.doNothing, ...$)
            }}
            //... // no inherited `init`.
            //... preparator({
            //...   init (builtin, ...$) {
            //...     this.flag('I', ...$)
            //...     chai.expect(builtin).equal(eYo.doNothing)
            //...   }
            //... })
            //... new C3s(1, 2)
            //... eYo.flag.expect('/p12/i12/I12')
          }
        } else if (f_p) {
          m = {[K] (...$) {
            f_m.call(...$)
            f_p.call(this, ...$)
          }}
          //... preparator({
          //...   init (...$) {
          //...     this.flag('I', ...$)
          //...   },
          //...   $super: {
          //...     c9rInit ($this, ...$) {
          //...       $this.flag('$I', ...$)
          //...     },
          //...   },
          //... })
          //... new C3s(1, 2)
          //... eYo.flag.expect('/p12/i12/I12/$I12')
        } else {
          m = {[K] (...$) {
            f_m.call(...$)
          }}
          //... preparator({
          //...   init (...$) {
          //...     this.flag('I', ...$)
          //...   }
          //... })
          //... new C3s(1, 2)
          //... eYo.flag.expect('/p12/i12/I12')
        }
      } else if (f_p) {
        m = {[K] (...$) {
          f_p.call(this, ...$)
        }}
        //... preparator({
        //...   $super: {
        //...     c9rInit ($this, ...$) {
        //...       $this.flag('$I', ...$)
        //...     },
        //...   },
        //... })
        //... new C3s(1, 2)
        //... eYo.flag.expect('/p12/i12/$I12')
      }
      this._p[K] = m ? m[K] : eYo.doNothing
      //>>>
    },
    /**
     * Make the dispose method.
     */
    makeC3sDispose () {
      eYo.mixinFR(this, {
        makeC3sDispose: eYo.oneShot('makeC3sDispose only once'),
      })
      let f_m = this.model.dispose
      let K = 'c9rDispose'
      let f_p = this.$super && this.$super[K]
      //<<< mochai: eYo.dlgt.C3sBase_p.makeC3sDispose
      if (f_m) {
        if (XRegExp.exec(f_m.toString(), eYo.xre.function_builtin)) {
          if (f_p) {
            var m = {[K] ($this, ...$) {
              f_m.call($this, (...$) => f_p.call(this, $this, ...$), ...$)
            }}
            //... preparator({
            //...   dispose (builtin, ...$) {
            //...     this.flag('X<')
            //...     builtin(...$)
            //...     eYo.flag.push('>')
            //...   },
            //...   $super: {
            //...     c9rDispose ($this, ...$) {
            //...       $this.flag('$X', ...$)
            //...     },
            //...   },
            //... })
            //... new C3s().dispose(1, 2)
            //... eYo.flag.expect('/p/i/x12/X</$X12>')
          } else {
            m = {[K] ($this, ...$) {
              f_m.call($this, eYo.doNothing, ...$)
            }}
            //... preparator({
            //...   dispose (builtin, ...$) {
            //...     this.flag('X', ...$)
            //...     chai.expect(builtin).equal(eYo.doNothing)
            //...   }
            //... })
            //... new C3s().dispose(1, 2)
            //... eYo.flag.expect('/p/i/x12/X12')
          }
        } else if (f_p) {
          m = {[K] (...$) {
            f_m.call(...$)
            f_p.call(this, ...$)
          }}
          //... preparator({
          //...   dispose (...$) {
          //...     this.flag('X', ...$)
          //...   },
          //...   $super: {
          //...     c9rDispose ($this, ...$) {
          //...       $this.flag('$X', ...$)
          //...     },
          //...   },
          //... })
          //... new C3s().dispose(1, 2)
          //... eYo.flag.expect('/p/i/x12/X12/$X12')
        } else {
          m = {[K] (...$) {
            f_m.call(...$)
          }}
          //... preparator({
          //...   dispose (...$) {
          //...     this.flag('X', ...$)
          //...   }
          //... })
          //... new C3s().dispose(1, 2)
          //... eYo.flag.expect('/p/i/x12/X12')
        }
      } else if (f_p) {
        m = {[K] (...$) {
          f_p.call(this, ...$)
        }}
        //... preparator({
        //...   $super: {
        //...     c9rDispose ($this, ...$) {
        //...       $this.flag('$X', ...$)
        //...     },
        //...   },
        //... })
        //... new C3s().dispose(1, 2)
        //... eYo.flag.expect('/p/i/x12/$X12')
      }
      this._p[K] = m ? m[K] : eYo.doNothing
      //>>>
    },
    /**
     * Add a subclass
     * @param {Function} C3s - constructor
     */
    addSubC3s (C3s) {
      //<<< mochai: addSubC3s + forEachSubC3s + someSubC3s
      eYo.isSubclass(C3s, this.C3s) || eYo.throw(`${C3s[eYo.$].name} is not a subclass of ${this.name}`)
      if (!this.subC3ss__) {
        eYo.test && eYo.test.IN_THROW || console.error('BREAK!!! !this.subC3ss__')
      }
      this.subC3ss__.add(C3s)
      //... let SuperC3s = function () {}
      //... let superDlgt = eYo.dlgt.new('Foo', {})
      //... superDlgt.setC3s(SuperC3s)
      //... superDlgt.finalizeC3s()
      //... var C3s = function () {}
      //... eYo.inherits(C3s, SuperC3s)
      //... var dlgt = eYo.dlgt.new('Bar', {})
      //... dlgt.setC3s(C3s)
      //... dlgt.finalizeC3s()
      //... superDlgt.addSubC3s(C3s)
      //... eYo.flag.reset()
      //... dlgt.do_it = (x) => {
      //...   eYo.flag.push(x+1)
      //... }
      //... superDlgt.forEachSubC3s(C3s => {
      //...   C3s[eYo.$].do_it && C3s[eYo.$].do_it(1)
      //... })
      //... eYo.flag.expect(2)
      //... C3s = function () {}
      //... eYo.inherits(C3s, SuperC3s)
      //... let other = eYo.dlgt.new('Bar', {})
      //... other.setC3s(C3s)
      //... other.finalizeC3s()
      //... other.do_it = dlgt.do_it
      //... superDlgt.addSubC3s(C3s)
      //... superDlgt.forEachSubC3s(C3s => {
      //...   C3s[eYo.$].do_it && C3s[eYo.$].do_it(2)
      //... })
      //... eYo.flag.expect(33)
      //... dlgt.do_it = (x) => {
      //...   eYo.flag.push(x+2)
      //...   return x+3
      //... }
      //... other.do_it = (x) => {
      //...   eYo.flag.push(x+3)
      //...   return x+3
      //... }
      //... superDlgt.forEachSubC3s(C3s => {
      //...   C3s[eYo.$].do_it && C3s[eYo.$].do_it(3)
      //... })
      //... eYo.flag.expect([56,65])
      //... eYo.flag.reset()
      //... chai.expect(superDlgt.someSubC3s(C3s => {
      //...   return C3s[eYo.$].do_it && C3s[eYo.$].do_it(3)
      //... })).equal(6)
      //... eYo.flag.expect([5,6])
      //>>>
    },
    /**
     * Iterator
     * @param {Function} helper
     * @param {Boolean} deep - Propagates when true.
     * @this {eYo.Dlgt}
     */
    forEachSubC3s (f, deep) {
      if (eYo.isF(deep)) {
        [f, deep] = [deep, f]
      }
      this.subC3ss__.forEach(C3s => {
        f(C3s)
        deep && C3s[eYo.$].forEachSubC3s(f, deep)
      })
    },  
    /**
     * Iterator
     * @param {Function} helper
     * @this {eYo.Dlgt}
     */
    someSubC3s (f) {
      for (let C3s of this.subC3ss__) {
        let ans = f(C3s)
        if (ans) {
          return ans
        }
      }
    },
  })

  Object.assign(_p, {
    /**
     * Defined by subclassers.
     */
    init: eYo.doNothing,
    /**
     * Prepare an instance.
     * Default implementation does nothing.
     * @param {Object} instance -  instance is an instance of a subclass of the `C3s_` of the receiver
     */
    c9rPrepare: eYo.doNothing,
    /**
     * Defined by subclassers.
     * @param {Object} instance -  instance is an instance of a subclass of the `C3s_` of the receiver
     */
    c9rInit: eYo.doNothing,
    /**
     * Defined by subclassers.
     */
    c9rDispose: eYo.doNothing,
  })
  let dlgt = new eYo.Dlgt(eYo.dlgt, 'C3sBase', {})
  dlgt.setC3s(eYo.Dlgt, true)
  eYo.mixinRO(eYo._p, {
    Dlgt$: eYo.dlgt.C3sBase[eYo.$]
  })
  //>>>

  eYo.mixinFR(_p, {
    /**
     * Create and set the receiver's constructor.
     * @param {*} [SuperC3s] - Optional super class of the returned constructor
     */
    newC3s (SuperC3s) {
      //<<< mochai: eYo.Dlgt_p.newC3s
      let ns = this.ns
      let id = this.id
      let eyo$ = this // catch this
      //... let NS = eYo.newNS()
      //... let superDlgt = eYo.dlgt.new(NS, 'foo', {
      //...   prepare (...$) {
      //...     eYo.flag.push('P', ...$)
      //...   }
      //... })
      if (SuperC3s) {
        eYo.isC3s(SuperC3s) || eYo.throw(`${this.name}/newC3s: Bad SuperC3s: ${SuperC3s}`)
        //... chai.expect(() => {
        //...   superDlgt.newC3s(function() {})
        //... }).xthrow()
        // create the constructor
        var C3s = function (...$) {
          if (this.dispose === eYo.doNothing) {
            SuperC3s.call(this, ...$) // top down call
            eyo$.c9rPrepare(this, ...$)
          } else {
            try {
              this.dispose = eYo.doNothing
              SuperC3s.call(this, ...$) // top down call
              eyo$.c9rPrepare(this, ...$)
            } finally {
              delete this.dispose
            }
          }
        }
        eYo.inherits(C3s, SuperC3s)
        eYo.isSubclass(C3s, SuperC3s) || eYo.throw('MISSED inheritance)')
        SuperC3s[eYo.$].addSubC3s(C3s)
        // syntactic sugar shortcuts
        if (ns && id && !this.anonymous) {
          (eYo.objectHasOwnProperty(ns, id) || eYo.objectHasOwnProperty(ns._p, id)) && eYo.throw(`${id.toString ? id.toString() : id} is already a property of ns: ${ns.name}`)
          eYo.mixinFR(ns._p, { [id]: C3s })
          if (id.length) {
            if (id.startsWith('eyo:')) {
              id = id.substring(4)
            }
            eYo.mixinFR(ns._p, {
              [id + '_p']: C3s.prototype,
              [id + '_s']: SuperC3s.prototype,
              [id + '_S']: SuperC3s,            
            })
          }
        }
      } else {
        // create the constructor
        C3s = function (...$) {
          if (this.dispose === eYo.doNothing) {
            eyo$.c9rPrepare(this, ...$)
          } else {
            try {
              this.dispose = eYo.doNothing
              eyo$.c9rPrepare(this, ...$)
            } finally {
              delete this.dispose
            }
          }
        }
        // store the constructor
        var _p = C3s.prototype
        if (ns && id && !this.anonymous) {
          (eYo.objectHasOwnProperty(ns, id) || eYo.objectHasOwnProperty(ns._p, id)) && eYo.throw(`${id.toString ? id.toString() : id} is already a property of ns: ${ns.name}`)
          eYo.mixinFR(ns._p, { [id]: C3s })
          if (id.length) {
            if (id.startsWith('eyo:')) {
              id = id.substring(4)
            }
            eYo.mixinRO(ns._p, { [id + '_p']: _p })
          }
        }
        eYo.dlgt.declareDlgt(_p) // computed properties `eyo`
      }
      this.setC3s(C3s)
      eyo$ === C3s[eYo.$] || eYo.throw('MISSED')
      return C3s
      //... let SuperC3s = superDlgt.newC3s()
      //... chai.expect(SuperC3s[eYo.$]).equal(superDlgt)
      //... chai.expect(superDlgt.C3s).equal(SuperC3s)
      //... new SuperC3s(1, 2)
      //... eYo.flag.expect('P12')
      //... let dlgt = eYo.dlgt.new(NS, 'bar', {
      //...   prepare (...$) {
      //...     eYo.flag.push('p', ...$)
      //...   }
      //... })
      //... let C3s = dlgt.newC3s(SuperC3s)
      //... chai.expect(C3s[eYo.$]).equal(dlgt)
      //... chai.expect(dlgt.C3s).equal(C3s)
      //... new C3s(1, 2)
      //... eYo.flag.expect('P12p12')
      //>>>
    }
  })  
}


eYo.make$$('unknown')

//<<< mochai: eYo.$$.unknown
//... chai.expect(eYo.$$).property('unknown')
//>>>

eYo.mixinFR(eYo.dlgt._p, {
  /**
   * Create a delegate to be associated to a constructor.
   * The added delegate is a singleton.
   * This is the recommended way to create a new delegate.
   * Using `new eYo.Dlgt(...)` may unecpectedly pollute the space.
   * @param {Object} [ns] - The namespace owning the constructor
   * @param {String|Symbol} id - The id associate to the constructor.
   * @param {Function} [SuperDlgt] - the superclass of the created delegate, defaults to `eYo.Dlgt`.
   * @param {Object} model - the model object associate to the delegate, used for extension.
   */
  new (ns, id, SuperDlgt, model) {
    // prepare
    if (ns && !eYo.isNS(ns)) {
      model && eYo.throw(`eYo.dlgt.new: Unexpected model (1) ${model}`)
      ;[ns, id, SuperDlgt, model] = [eYo.NA, ns, id, SuperDlgt]
    } else {
      ns === eYo.NULL_NS || eYo.isNS(ns) || eYo.throw('Bad namespace')
    }
    if (!eYo.isId(id)) {
      if (id) {
        model && eYo.throw(`eYo.dlgt.new: Unexpected model (2) ${model}`)
        ;[id, SuperDlgt, model] = [eYo.$$.unknown, id, SuperDlgt]
      } else {
        id = eYo.$$.unknown
      }
    }
    if (!eYo.isF(SuperDlgt)) {
      model && eYo.throw(`eYo.dlgt.new: Unexpected model (3) ${model}`)
      ;[SuperDlgt, model] = [eYo.Dlgt, SuperDlgt]
    }
    model || (model = {})
    ns === eYo.NULL_NS || eYo.isNS(ns) || (ns = SuperDlgt[eYo.$].ns)
    let Dlgt = function (ns, id, model) {
      SuperDlgt.call(this, ns, id, model)
    }
    eYo.inherits(Dlgt, SuperDlgt)
    // initialization of the dlgt
    // when defined, init must be a self contained function,
    // ie with no inherited reference...
    let dlgt_m = model[eYo.$]
    if (dlgt_m) {
      eYo.isF(dlgt_m) || eYo.throw(`model[eYo.$] is not a function: ${model[eYo.$]}`)
      Dlgt.prototype.init = {init (...$) {
        this.init = eYo.doNothing
        SuperDlgt.prototype.init.call(this, ...$)
        dlgt_m.call(this, ...$)
      }}.init
    }
    // in next function call, all the parameters are required
    // but some may be eYo.NA
    let dlgt = new eYo.Dlgt(ns, Symbol('C3sBase'), {})
    dlgt.setC3s(Dlgt, true)
    let ans = new Dlgt(ns, id, model)
    return ans
  },
})

eYo.dlgt.declareDlgt(eYo._p)

// ANCHOR modelling functions
eYo.mixinFR(eYo.dlgt.C3sBase_p, {
  //<<< mochai: model
  /**
   * Finalize the associate constructor and allow some model format.
   * This must be called once for any delegate, raises otherwise.
   * Calls `modelPrepare`, `makeC3sInit` and `makeC3sDispose`.
   * Raises if the `$super` is not already finalized.
   * This must be done by hand because we do not know
   * what is the ancestor's model format.
   * @name {eYo.dlgt.C3sBase.modelAllow}
   */
  finalizeC3s (...$) {
    //<<< mochai: finalizeC3s
    let $super = this.$super
    let mf = this.modelFormat
    if ($super) {
      if (!$super.hasFinalizedC3s) {
        eYo.test && eYo.test.IN_THROW || console.error('BREAK HERE!')
      }
      !$super.hasFinalizedC3s && eYo.throw(`Parent is not finalized: ${$super.name}`)
      mf.fallback = $super.modelFormat
    }
    let ans = mf.allow(...$)
    this.modelPrepare()
    this.makeC3sInit()
    this.makeC3sDispose()
    //... let dlgt = eYo.dlgt.new('Foo', {})
    //... let C3s = function () {}
    //... dlgt.setC3s(C3s)
    //... chai.expect(dlgt.hasFinalizedC3s).false
    //... dlgt.finalizeC3s()
    //... chai.expect(dlgt.hasFinalizedC3s).true
    //... chai.expect(dlgt.c9rPrepare).eyo_F
    //... chai.expect(dlgt.c9rInit).eyo_F
    //... chai.expect(dlgt.c9rDispose).eyo_F
    //... chai.expect(() => {
    //...   dlgt.finalizeC3s()
    //... }).xthrow()
    eYo.mixinFR(this, {
      finalizeC3s: eYo.oneShot('finalizeC3s cannot be sent twice to the same delegate.')
    })
    return ans

    //>>>
  }, 
  /**
   * Forwards all the arguments to the `modelFormat` of the receiver.
   * @name {eYo.dlgt.C3sBase.modelValidate}
   * @return {Object} a validated model object
   */
  modelValidate (...$) {
    return this.modelFormat.validate(...$)
  },
  /**
   * @name{eYo.dlgt.C3sBase.modelIsAllowed}
   * @return {Boolean} Whether the key is authorized with the given path.
   */
  modelIsAllowed (...$) {
    return this.modelFormat.isAllowed(...$)
  },
  /**
   * Declare CONSTs.
   * Allows to split the definition of CONST into different files,
   * eventually.
   * @param{Object} model - the model
   */
  CONSTsMerge (model) {
    eYo.isD(model) || eYo.throw(`Unexpected model argument: ${model}`)
    for (let k of Object.keys(model)) {
      k && eYo.isStr(k) || eYo.throw(`Unexpected model key: ${k}`)
      k[0] === k[0].toUpperCase() || eYo.throw(`Bad model key: ${k}`)
    }
    let _p = this.C3s_p
    eYo.mixinRO(_p, model)
    //<<< mochai: eYo.Dlgt_p.CONSTsMerge
    //... preparator()
    //... C3s[eYo.$].CONSTsMerge({
    //...   FOO: 'bar',
    //... })
    //... chai.expect((new C3s()).FOO).equal('bar')
    //... preparator({
    //...   CONSTs: {
    //...     FOO: 'bar',
    //...   },
    //... })
    //... chai.expect((new C3s()).FOO).equal('bar')
    //>>>
  },
  /**
   * Declare methods.
   * Allows to split the definition of methods into different files,
   * eventually.
   * If the method is a function with exactly one argument named 'overriden',
   * then we override the previously defined method.
   * The model object is a function decorator.
   * @param{Object} model - the model
   */
  methodsMerge (model) {
    eYo.isD(model) || eYo.throw(`Unexpected model argument: ${model}`)
    let _p = this.C3s_p
    for (let [k, m] of Object.entries(model)) {
      if (m) {
        eYo.isF(m) || eYo.throw(`Unexpected model entry: ${k} -> ${m}`)
        if (m.length === 1 && _p[k] && XRegExp.exec(m.toString(), eYo.xre.function_overriden)) {
          _p[k] = eYo.asF(m.call(this, eYo.toF(_p[k]).bind(this)))
        } else {
          _p[k] = m
        }
      } else {
        _p[k] = eYo.doNothing
      }
    }
  },
  /**
   * For subclassers.
   * @param {Object} model - model object
   */
  // modelHandle: eYo.doNothing,
  /**
   * Declare the given model for the associate constructor.
   * The default implementation just calls `methodsMerge` and `CONSTsMerge`.
   * 
   * @param {Object} model - Object, like for |newC3s|.
   */
  modelMerge (model) {
    model.methods && this.methodsMerge(model.methods)
    model.CONSTs && this.CONSTsMerge(model.CONSTs)
  },
  /**
   * Prepare the model fo the receiver.
   * The default implementation just calls `modelMerge` after `modelValidate`.
   * Called by `finalizeC3s`.
   */
  modelPrepare () {
    let model = this.model
    if (Object.keys(model).length) {
      model = this.modelValidate(model)
      this.modelMerge(model)
    }
  },
  /**
   * Get the model method with the given id
   * @param {String| Symbol} id 
   */
  getModelMethod (id) {
    //<<< mochai: getModelMethod
    var methods = this.model.methods
    return methods && methods[id]
    //... var dlgt = eYo.dlgt.new({
    //...   methods: {
    //...     foo (...$) {
    //...       eYo.flag.push(1, ...$)
    //...     },
    //...   },
    //... })
    //... var f = dlgt.getModelMethod('foo')
    //... chai.expect(f).eyo_F
    //... f.call(dlgt, 2, 3)
    //... eYo.flag.expect(123)
    //>>>
  },
  //>>>
})

eYo.Dlgt$.finalizeC3s()

eYo.provide('dlgt.C3sBase')
eYo.provide('Dlgt')
