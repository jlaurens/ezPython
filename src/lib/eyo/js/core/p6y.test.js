describe ('Tests: Property', function () {
  this.timeout(10000)
  let flag = {
    v: 0,
    reset (what) {
      this.v = what || 0
    },
    push (...$) {
      $.forEach(what => {
        what && (this.v = parseInt(this.v.toString() + what.toString()))
      })
    },
    expect (what) {
      let ans = chai.expect(this.v).equal(what)
      this.reset()
      return ans
    },
  }
  let onr = eYo.c9r.new()
  let p6yMF = eYo.p6y.BaseC9r.eyo.modelFormat
  let p6yModelValidate = p6yMF.validate.bind(p6yMF)
  it ('POC: function arguments', function () {
    chai.assert((() => {}).length === 0)
    chai.assert(((x) => {}).length === 1)
    chai.expect((function () {}).length).equal(0)
    chai.expect((function (x) {}).length).equal(1)
  })
  it ('P6y: Basic', function () {
    chai.assert(eYo.p6y)
  })
  it('P6y: modelFormat', function () {
    var model = {
      foo: {
        get () {},
      },
    }
    model = p6yModelValidate(model)
    chai.assert(eYo.isF(model.foo.get))
    var model = 421
    model = p6yModelValidate(model)
    chai.expect(model.value).equal(421)
  })
  it('P6y: eYo.model.modelValidate(key, {})', function () {
  })
  it('P6y: eYo.model.modelValidate(key, …)', function () {
    var model = p6yModelValidate({})
    chai.expect(model).eql({})
  })
  it('P6y: {}', function () {
    let p = eYo.p6y.new(onr, 'foo', {})
    chai.assert(eYo.isNA(p.value))
    chai.expect(p.key).equal('foo')
    chai.expect(() => {
      p.value = 421
    }).to.throw()
    p.value_ = 421
    chai.expect(p.value).equal(421)
  })
  it('P6y: value', function () {
    let p = eYo.p6y.new(onr, 'foo', {})
    p.value_ = 421
    chai.expect(p.value).equal(421)
    chai.expect(p.value_).equal(421)
    chai.expect(p.value__).equal(421)
    chai.expect(p.stored__).equal(421)
  })
  it('P6y: {value: ...}', function () {
    let p = eYo.p6y.new(onr, 'foo', {
      value: 421
    })
    chai.expect(p.value).equal(421)
    chai.expect(p.value_).equal(421)
    chai.expect(p.value__).equal(421)
    chai.expect(p.stored__).equal(421)
  })
  it('P6y: dispose', function () {
    flag.reset()
    let p = eYo.p6y.new(onr, 'foo', {})
    let value = {
      eyo: true,
      dispose () {
        flag.push(1)
      }
    }
    p.value_ = value
    chai.expect(p.value).equal(value)
    p.dispose()
    chai.assert(eYo.isNA(p.value))
    flag.expect(1)
  })
  it('P6y: this is the owner', function () {
    flag.reset()
    var p = eYo.p6y.new(onr, 'foo', {
      get () {
        flag.push(1)
        return 421
      },
    })
    chai.expect(p.value).equal(421)
    flag.expect(1)
    var p = eYo.p6y.new(onr, 'foo', {
      get_ () {
        flag.push(2)
        return 123
      },
    })
    chai.expect(p.value).equal(123)
    flag.expect(2)
    var p = eYo.p6y.new(onr, 'foo', {
      set (after) {
        flag.push(after)
      },
    })
    p.value_ = 421
    flag.expect(421)
    var p = eYo.p6y.new(onr, 'foo', {
      set_ (after) {
        flag.push(after)
      },
    })
    p.value_ = 123
    flag.expect(123)
    var p = eYo.p6y.new(onr, 'foo', {
      validate (before, after) {
        flag.push(before, after)
        return after
      },
    })
    p.value_ = 123
    flag.expect(123)
    p.value_ = 456
    flag.expect(123456)
    var p = eYo.p6y.new(onr, 'foo', {
      validate (after) {
        flag.push(after)
        return after
      },
    })
    p.value_ = 421
    flag.expect(421)
    var p = eYo.p6y.new(onr, 'foo', {
      willChange (before, after) {
        this.flag = before * 1000 + after
        return after
      },
    })
    p.value_ = 123
    p.value_ = 666
    chai.expect(onr.flag).equal(123666)
    var p = eYo.p6y.new(onr, 'foo', {
      willChange (after) {
        return (this.flag = after)
      },
    })
    p.value_ = 421
    chai.expect(onr.flag).equal(421)
    var p = eYo.p6y.new(onr, 'foo', {
      didChange (before, after) {
        this.flag = before * 1000 + after
        return after
      },
    })
    p.value_ = 123
    p.value_ = 666
    chai.expect(onr.flag).equal(123666)
    var p = eYo.p6y.new(onr, 'foo', {
      didChange (after) {
        return (this.flag = after)
      },
    })
    p.value_ = 421
    chai.expect(onr.flag).equal(421)
  })
  it('P6y: {set_ (builtin, after) ...}', function () {
    flag.reset()
    let onr = eYo.c9r.new({
      methods: {
        do_it (what) {
          flag.push(what)
        }
      },
    })
    let p = eYo.p6y.new(onr, 'foo', {
      set_ (builtin, after) {
        builtin(after)
        this.do_it(456)
      }
    })
    p.value_ = 123
    chai.expect(p.value).equal(123)
    flag.expect(456)
  })
  it('P6y: {get_ (builtin) ...}', function () {
    flag.reset()
    let onr = eYo.c9r.new({
      methods: {
        do_it (what) {
          flag.push(what)
        }
      },
    })
    let p = eYo.p6y.new(onr, 'foo', {
      get_ (builtin) {
        this.do_it(456)
        return builtin()
      }
    })
    p.value_ = 123
    flag.expect(456)
    chai.expect(p.value).equal(123)
    flag.expect(456)
  })
  it('P6y: {set_:..., get_:...}', function () {
    flag.reset()
    let onr = eYo.c9r.new({
      methods: {
        do_it (what) {
          flag.push(what)
        }
      },
    })
    var x = 0
    let p = eYo.p6y.new(onr, 'foo', {
      set_ (after) {
        x = after
        this.do_it(after + 1)
      },
      get_ () {
        this.do_it(x)
        return x
      },
    })
    p.value_ = 1
    flag.expect(2)
    chai.expect(p.value).equal(1)
    flag.expect(1)
    p.value__ = 2
    flag.expect(3)
    chai.expect(p.value).equal(2)
    flag.expect(2)
  })
  it('P6y: {get (builtin) ...}', function () {
    let onr = eYo.c9r.new({
      methods: {
        do_it (what) {
          flag.push(what)
        }
      },
    })
    let p = eYo.p6y.new(onr, 'foo', {
      get (builtin) {
        this.do_it(421)
        return builtin()
      }
    })
    p.value__ = 123
    chai.expect(p.value).equal(123)
    flag.expect(421)
  })
  it('P6y: {set:...}', function () {
    let onr = eYo.c9r.new({
      methods: {
        do_it (what) {
          flag.push(what)
        }
      },
    })
    var x = 0
    let p = eYo.p6y.new(onr, 'foo', {
      get () {
        this.do_it(x)
        return x
      },
      set (after) {
        this.do_it(after)
        x = after
      },
    })
    p.value_ = 123
    flag.expect(123)
    chai.expect(p.value).equal(123)
    flag.expect(123)
    chai.expect(p.value_).equal(123)
    flag.expect(123)
    chai.expect(p.value__).equal(123)
    flag.expect(123)
    chai.expect(p.stored__).equal(eYo.NA)
    flag.expect(0)
    p.value__ = 421
    flag.expect(421)
    chai.expect(p.value).equal(421)
    flag.expect(421)
    chai.expect(p.value_).equal(421)
    flag.expect(421)
    chai.expect(p.value__).equal(421)
    flag.expect(421)
    chai.expect(p.stored__).equal(eYo.NA)
    p.stored__ = 123
    flag.expect(0)
    chai.expect(p.value).equal(421)
    chai.expect(p.value_).equal(421)
    chai.expect(p.value__).equal(421)
    chai.expect(p.stored__).equal(123)
  })
  it('P6y: {set (builtin):...}', function () {
    let onr = eYo.c9r.new({
      methods: {
        do_it (what) {
          flag.push(what)
        }
      },
    })
    var x = 0
    let p = eYo.p6y.new(onr, 'foo', {
      set (builtin, after) {
        this.do_it(after)
        builtin(x = after)
      },
      get (builtin) {
        this.do_it(x)
        return x*1000+builtin()
      },
    })
    flag.reset()
    p.value_ = 123
    flag.expect(123)
    chai.expect(p.value__).equal(123)
    chai.expect(p.stored__).equal(123)
    chai.expect(p.value).equal(123123)
    chai.expect(p.value_).equal(123123)
    p.value__ = 421
    flag.expect(123123)
    chai.expect(p.value__).equal(421)
    chai.expect(p.stored__).equal(421)
    chai.expect(p.value).equal(123421)
    chai.expect(p.value_).equal(123421)
  })
  it('P6y: validate(after)...', function () {
    let onr = eYo.c9r.new({
      methods: {
        do_it (what) {
          flag.push(what)
        }
      },
    })
    let p = eYo.p6y.new(onr, 'foo', {
      validate (after) {
        this.do_it(after + 1)
        return 10 * after
      },
    })
    flag.reset()
    p.value_ = 1
    chai.expect(p.value).equal(10)
    flag.expect(2)
  })
  it('P6y: validate(before, after)...', function () {
    let onr = eYo.c9r.new({
      methods: {
        do_it (what) {
          flag.push(what)
        }
      },
    })
    let p = eYo.p6y.new(onr, 'foo', {
      validate (before, after) {
        this.do_it(after)
        return 10 * after
      },
    })
    p.value_ = 123
    chai.expect(p.value).equal(1230)
    flag.expect(123)
  })
  it('P6y: fooP6yValidate', function () {
    let onr = eYo.c9r.new({
      methods: {
        fooP6yValidate (before, after) {
          flag.push(before, after)
          return after
        },
      },
    })
    let p = eYo.p6y.new(onr, 'foo', {})
    chai.expect(p.owner).equal(onr)
    p.value_ = 123
    flag.expect(123)
    p.value_ = 456
    flag.expect(123456)
  })
  it('P6y: fooPropertyValidate(INVALID)', function () {
    let onr = eYo.c9r.new({
      methods: {
        fooP6yValidate (before, after) {
          this.do_it(before, after)
          return eYo.INVALID
        },
        do_it (...$) {
          flag.push(...$)
        },
      },
    })
    let p = eYo.p6y.new(onr, 'foo', {})
    p.value_ = 123
    flag.expect(123)
    chai.expect(p.value_).equal(eYo.NA)
  })
  it('P6y: (will|at|did)Change([before, ]after)...', function () {
    flag.reset()
    let onr = eYo.c9r.new({
      methods: {
        do_it (...$) {
          flag.push(...$)
        }
      },
    })
    let f_after = function (after) {
      flag.push(9)
      this.do_it(after)
    }
    let f_before_after = function (before, after) {
      flag.push(9)
      this.do_it(after)
    }
    ;['will', 'at', 'did'].forEach(what => {
      let k = what + 'Change'
      ;[f_after, f_before_after].forEach(f => {
        eYo.p6y.new(onr, 'foo', {
          [k]: f,
        }).value_ = 123
        flag.expect(9123)
      })
    })
  })
  it('P6y: foo(Will|At|Did)Change(before, after)...', function () {
    ;['Will', 'At', 'Did'].forEach(what => {
      flag.reset()
      let k = `fooP6y${what}Change`
      let onr = eYo.c9r.new({
        methods: {
          [k]: function (before, after) {
            this.do_it(before, after)
          },
          do_it (...$) {
            flag.push(...$)
          },
        },
      })
      let p = eYo.p6y.new(onr, 'foo', {})
      p.value_ = 123
      flag.expect(123)  
    })
  })
  it('P6y: get_/willChange/set_/didChange', function () {
    flag.reset()
    let onr = eYo.c9r.new({
      methods: {
        do_it (...$) {
          flag.push(...$)
        }
      },
    })
    let p = eYo.p6y.new(onr, 'foo', {
      get_ () {
        this.do_it(1)
        return this.foo__
      },
      willChange (before, after) {
        this.do_it(2, before, 3, after)
      },
      set_ (after) {
        this.do_it(4, after)
        this.foo__ = after
      },
      didChange (before, after) {
        this.do_it(5, before, 6, after)
      },
    })
    onr.foo__ = 1
    flag.reset()
    chai.expect(p.value).equal(1)
    flag.expect(1)
    p.value_ = 9
    flag.expect(12139495169)
  })
  it('P6y: observe', function () {
    let p = eYo.p6y.new(onr, 'foo', {})
    let callback = () => {
      flag.push(666)
    }
    eYo.observe.HOOKS.forEach(when => {
      flag.reset()
      p.value_ = 123
      flag.expect(0)
      let o = p.addObserver(when, callback)
      p.value_ = 123
      flag.expect(0)
      p.value_ = 421
      flag.expect(when === eYo.observe.ANY ? 666666666 : 666)
      p.removeObserver(o)
      p.value_ = 123
      flag.expect(0)
    })
  })
  it('P6y: shared constructor/prototype', function () {
    let model = {}
    let p1 = eYo.p6y.new(onr, 'foo', model)
    let p2 = eYo.p6y.new(onr, 'bar', model)
    chai.expect(p1.constructor).equal(p2.constructor)
    chai.expect(Object.getPrototypeOf(p1)).equal(Object.getPrototypeOf(p2))
  })
  it('P6y: get only', function () {
    var flag = 421
    let p = eYo.p6y.new(onr, 'foo', {
      get () {
        return flag
      }
    })
    chai.expect(p.value === 421)
    chai.expect(p.value_ === 421)
    chai.expect(p.value__ === 421)
    chai.expect(() => {
      p.value_ = 123
    }).to.throw()
    chai.expect(() => {
      p.value__ = 123
    }).to.throw()
  })
  it('P6y: No getValue', function () {
    let p = eYo.p6y.new(onr, 'foo', {
      get: eYo.doNothing
    })
    p.value_ = 123
    chai.expect(() => {
      p.value_
    }).to.throw()
    chai.expect(p.value__).equal(123)
  })
  it('P6y: No setValue', function () {
    let p = eYo.p6y.new(onr, 'foo', {
      set: eYo.doNothing
    })
    chai.expect(() => {
      p.value_ = 123
    }).to.throw()
    p.value__ = 123
    chai.expect(p.value).equal(123)
  })
  it('P6y: No getStored', function () {
    let p = eYo.p6y.new(onr, 'foo', {
      get_: eYo.doNothing
    })
    chai.expect(() => {
      p.value_ = 123
    }).to.throw()
    chai.expect(() => {
      p.value__
    }).to.throw()
    chai.expect(() => {
      p.value_
    }).to.throw()
    p.stored__ = 123
    chai.expect(p.stored__).equal(123)
  })
  it('P6y: No setStored', function () {
    let p = eYo.p6y.new(onr, 'foo', {
      set_: eYo.doNothing
    })
    chai.expect(() => {
      p.value_ = 123
    }).to.throw()
    chai.expect(() => {
      p.value__ = 123
    }).to.throw()
    p.stored__ = 123
    chai.expect(p.value).equal(123)
  })
  it('P6y: value', function () {
    var p = eYo.p6y.new(onr, 'foo', {
      value: 421,
      didChange(after) {
        flag.push(after)
      }
    })
    flag.reset(123)
    chai.expect(p.value).equal(421)
    flag.expect(123)
    p = eYo.p6y.new(onr, 'foo', {
      value () {
        return 421
      },
      didChange(after) {
        flag.push(after)
      }
    })
    flag.reset(123)
    chai.expect(p.value).equal(421)
    flag.expect(123)
  })
  it('P6y: lazy', function () {
    flag.reset()
    var p = eYo.p6y.new(onr, 'foo', {
      lazy () {
        flag.push(421)
        return 123
      }
    })
    flag.expect(0)
    chai.expect(p.value).equal(123)
    flag.expect(421)
  })
  it('P6y: lazy2', function () {
    let onr = eYo.c9r.new({
      methods: {
        do_it (...$) {
          flag.push(...$)
        }
      }
    })
    var p = eYo.p6y.new(onr, 'foo', {
      lazy () {
        flag.push(1)
        this.do_it(2)
        return 3
      }
    })
    flag.reset()
    chai.expect(p.value).equal(3)
    flag.expect(12)
    var p = eYo.p6y.new(onr, 'foo', {
      lazy: 421,
      didChange(after) {
        flag.push(after)
      }
    })
    chai.expect(p.value).equal(421)
    flag.expect(0)
    p.value_ = 123
    flag.expect(123)
    p = eYo.p6y.new(onr, 'foo', {
      lazy () {
        return 421
      },
      didChange(after) {
        flag.push(after)
      }
    })
    chai.expect(p.value).equal(421)
    flag.expect(0)
    p.value_ = 123
    flag.expect(123)
  })
  it ('P6y: lazy reset', function () {
    var flag = 421
    var p = eYo.p6y.new(onr, 'foo', {
      lazy () {
        return flag
      },
      reset (builtin) {
        flag += 100
        builtin()
      },
    })
    chai.expect(p.value).equal(421)
    p.value_ = 123
    chai.expect(p.value).equal(123)
    flag = 666
    chai.expect(p.start()).equal(flag)
    p.setValue(p.start())
    chai.expect(p.value).equal(flag)
    flag = 421
    p.reset()
    chai.expect(p.value).equal(flag)
  })
  it('P6y: dispose', function () {
    var p = eYo.p6y.new(onr, 'foo', {})
    chai.expect(p.owner).equal(onr)
    flag.reset(123)
    p.value_ = 421
    p = p.dispose()
    flag.expect(123)
    p = eYo.p6y.new(onr, 'foo', {})
    p.value_ = eYo.c9r.new({
      dispose (what) {
        flag.push(what)
      },
    })
    p.dispose(666)
    flag.expect(666)
    p = eYo.p6y.new(onr, 'foo', {
      dispose: false
    })
    p.value_ = {
      dispose () {
        flag = 0
      },
      eyo: true, // fake
    }
    p.dispose()
    chai.assert(flag !== 0)
  })
  it('P6y: copy', function () {
    flag.reset()
    var p = eYo.p6y.new(onr, 'foo', {
      copy: true,
    })
    let v = {}
    Object.defineProperty(v, 'copy', {
      get () {
        flag.push(456)
        return self        
      }
    })
    p.value_ = v
    p.value
    flag.expect(456)
  })
  it ('P6y: computed', function () {
    var flag = 0
    var p = eYo.p6y.new(onr, 'foo', {
      get () {
        return flag
      },
    })
    chai.expect(() => {
      p.value_ = 421
    }).to.throw()
    var p = eYo.p6y.new(onr, 'foo', {
      get () {
        return flag
      },
      set (after) {
        flag = after
      },
    })
    p.value_ = 421
    chai.expect(p.value).equal(421)
    chai.expect(() => {
      eYo.p6y.new(onr, 'foo', {
        value: 0,
        get () {
          return flag
        },
      })
    }).to.throw()
    chai.expect(() => {
      eYo.p6y.new(onr, 'foo', {
        lazy: 0,
        get () {
          return flag
        },
      })
    }).to.throw()
    chai.expect(() => {
      eYo.p6y.new(onr, 'foo', {
        reset: 0,
        get () {
          return flag
        },
      })
    }).to.throw()
  })
  it ('P6y: reset', function () {
    var x = 421
    var p = eYo.p6y.new(onr, 'foo', {
      reset () {
        return x
      },
    })
    chai.expect(p.value).equal(421)
    p.value_ = 123
    chai.expect(p.value).equal(123)
    x = 666
    p.reset()
    chai.expect(p.value).equal(666)
  })
  it ('P6y: cached', function () {
    var x = 421
    var p = eYo.p6y.new(onr, 'foo', {
      value () {
        return x
      },
    })
    chai.expect(p.value).equal(421)
    x = 123
    chai.expect(p.value).equal(421)
    p.reset()
    chai.expect(p.value).equal(123)
  })
  it ('P6y: recycle', function () {
    let onr = eYo.c9r.new()
    var flag = 421
    var p = eYo.p6y.new(onr, 'foo', {
      value () {
        return flag
      },
    })
    var flag_what = 0
    var flag_how = 0
    let value = {
      eyo: true,
      eyo_p6y: 421,
      dispose (what, how) {
        flag_what = what
        flag_how = how
      }
    }
    chai.assert((p.value__ = value) === value)
    chai.expect(value.eyo_p6y).equal(421)
    chai.assert((p.value__ = eYo.NA) === eYo.NA)
    chai.expect(value.eyo_p6y).equal(421)
    value.eyo_p6y = eYo.NA
    chai.assert((p.value__ = value) === value)
    chai.expect(value.eyo_p6y).equal(p)
    chai.assert((p.value__ = eYo.NA) === eYo.NA)
    chai.expect(value.eyo_p6y).equal(eYo.NA)

    p = eYo.p6y.new(onr, 'foo', {})
    value.eyo_p6y = 421
    chai.assert((p.value__ = value) === value)
    p.dispose(123,456)
    chai.expect(flag_what).equal(0)
    chai.expect(flag_how).equal(0)

    p = eYo.p6y.new(onr, 'foo', {})
    value.eyo_p6y = eYo.NA
    chai.assert((p.value__ = value) === value)
    p.dispose(123,456)
    chai.expect(flag_what).equal(123)
    chai.expect(flag_how).equal(456)
  })
  it ('P6y: Shortcuts', function () {
    var model = 421
    let validated = eYo.p6y.BaseC9r.eyo.modelValidate(model)
    chai.expect(eYo.isD(validated)).true
    chai.expect(validated.value).equal(421)
  })
  it ('P6y: Observe', function () {
    let onr = eYo.c9r.new()
    var p = eYo.p6y.new(onr, 'foo', {
      value: 421,
    })
    chai.expect(!!p.removeObservers).true
    p = p.dispose()
  })
  describe('P6y: List', function () {
    it ('P6y: new eYo.p6y.List()+splice', function () {
      var l = new eYo.p6y.List(onr)
      chai.assert(l.list__)
      chai.expect(l.length).equal(0)
      l.splice(0,0,421)
      chai.expect(l.length).equal(1)
      let p = l.list__[0]
      chai.expect(eYo.isSubclass(p.constructor, eYo.p6y.BaseC9r)).true
      chai.expect(p.value).equal(421)
    })
    it ('P6y: List splice...', function () {
      var flag = 421
      var l = new eYo.p6y.List(onr)
      var l = new eYo.p6y.List(onr, 'foo', 'a', 'b', 'c')
      let test = (l, ra) => {
        chai.expect(l.length).equal(ra.length)
        for (let i = 0 ; i < Math.max(ra.length, l.length) ; i++) {
          chai.expect(l.values[i]).equal(ra[i])
          chai.expect(l.values[-i-1]).equal(ra[ra.length - i - 1])
        }
      }
      var ra = ['a', 'b', 'c']
      chai.expect(l.length).equal(ra.length)
      test(l, ['a', 'b', 'c'])
      var deleted = l.splice(0, 1)
      test(l, ['b', 'c'])
      chai.expect(deleted[0]).equal('a')
      l.splice(0, 0, deleted[0])
      test(l, ['a', 'b', 'c'])
      var deleted = l.splice(1, 1)
      test(l, ['a', 'c'])
      chai.expect(deleted[0]).equal('b')
      l.splice(1, 0, deleted[0])
      test(l, ['a', 'b', 'c'])
      var deleted = l.splice(2, 1)
      test(l, ['a', 'b'])
      chai.expect(deleted[0]).equal('c')
      l.splice(2, 0, deleted[0])
      test(l, ['a', 'b', 'c'])
    })
    it ('P6y: List dispose...', function () {
      var l = new eYo.p6y.List(onr)
      l.splice(0, 0, {
        eyo: true,
        dispose (x) {
          flag.push(x + 1)
        }
      })
      l.splice(0, 0, {
        eyo: false,
        dispose (x) {
          flag.push(x + 2)
        }
      })
      l.splice(0, 0, 421)
      l.dispose(1)
      flag.expect(2)
      chai.assert(eYo.isNA(l.values[0]))
      chai.assert(eYo.isNA(l.p6yByKey[0]))
    })
    it ('P6y: List iterate...', function () {
      flag.reset()
      var l = new eYo.p6y.List(onr, 'foo', '1', '2', '3')
      for (var x of l) {
        flag.push(parseInt(x))
      }
      flag.expect(123)
    })  
  })
})
