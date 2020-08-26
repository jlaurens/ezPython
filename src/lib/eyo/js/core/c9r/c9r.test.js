describe ('POC', function () {
  this.timeout(20000)
  var flag, onr
  beforeEach (function() {
    flag = new eYo.test.Flag()
    onr = eYo.c9r && eYo.c9r.new({
      methods: {
        flag (what, ...$) {
          flag.push(1, what, ...$)
          return what
        },
      },
    }, 'onr')
  })
  it ('Change constructor', function () {
    let OYE = function () {}
    OYE.prototype.version = 421
    let oYe = new OYE()
    chai.expect(oYe.version).equal(421)
    let C9r = function () {}
    let c9r = new C9r()
    chai.expect(c9r.version).equal(oYe.NA)
    Object.setPrototypeOf(c9r, OYE.prototype)
    chai.expect(c9r.version).equal(421)
    Object.setPrototypeOf(c9r, C9r.prototype)
    chai.expect(c9r.version).equal(oYe.NA)
    let setConstructorOf = (object, C9r) => {
      object.constructor = C9r
      Object.setPrototypeOf(object, C9r.prototype)
    }
    setConstructorOf(oYe, C9r)
    chai.expect(oYe.version).equal(oYe.NA)
    setConstructorOf(oYe, OYE)
    chai.expect(oYe.version).equal(421)
    C9r.prototype.test = 123
    chai.expect(c9r.test).equal(123)    
    chai.expect(c9r.version).equal(oYe.NA)
    eYo.inherits(C9r, OYE)
    chai.expect(c9r.test).equal(123)
    chai.expect(c9r.version).equal(421)
    setConstructorOf(oYe, C9r)
    setConstructorOf(c9r, OYE)
    chai.expect(c9r.test).equal(eYo.NA)
    chai.expect(c9r.version).equal(421)
    chai.expect(oYe.test).equal(123)
    chai.expect(oYe.version).equal(421)
  })
  it ('init', function () {
    var model = {
      foo (builtin) {
        builtin()
      },
      bar (builtinX) {
        builtiniX()
      }
    }
    var str = model.foo.toString()
    chai.assert(XRegExp.match(str, /^[^(]*\([^,]*builtin\b/))
    var str = model.bar.toString()
    chai.assert(!XRegExp.match(str, /^[^(]*\([^,]*builtin\b/))
  })
  it ('delete', function () {
    var NS = eYo.c9r.newNS()
    chai.assert(!NS.foo)
    NS.foo = 123
    chai.assert(NS.foo)
    delete NS.foo
    chai.assert(!NS.foo)
  })
  it ('Object.defineProperty(…, …, {value: []})', function () {
    let F = function () {}
    Object.defineProperty(F.prototype, 'foo', {value: []})
    let a = new F()
    let b = new F()
    a.foo.push(421)
    chai.expect(b.foo.pop()).equal(421)
  })
  it ('Function signature [B][F][O]', function() {
    let model_d = {}
    let Super_d = function () {}
    let unfinalize_d = 123
    // Possible arguments BFO, BF, BO, B, FO, F, O, ...
    // Possible arguments FOB, OB, FB, FO, F, O, B, ...
    let f = (unfinalize, Super, model) => {
      if (!eYo.isBool(unfinalize)) {
        eYo.isDef(model) && eYo.throw(`Unexpected last argument: ${model}`)
        ;[unfinalize, Super, model] = [unfinalize_d, unfinalize, Super]
      }
      if (!eYo.isF(Super)) {
        eYo.isDef(model) && eYo.throw(`Unexpected argument: ${model}`)
        ;[Super, model] = [
          Super_d,
          Super,
        ]
      }
      if (eYo.isNA(model)) {
        model = model_d
      }
      return [unfinalize, Super, model]
    }
    let Super = function () {}
    let model = {}
    let unfinalize = true
    let test = (before, after) => {
      chai.expect(f(...before)).eql(after)
    }
    test([unfinalize, Super, model], [unfinalize, Super, model])
    test([Super, model], [unfinalize_d, Super, model])
    test([unfinalize, Super], [unfinalize, Super, model_d])
    test([unfinalize, model], [unfinalize, Super_d, model])
    test([Super], [unfinalize_d, Super, model_d])
    test([unfinalize], [unfinalize, Super_d, model_d])
    test([model], [unfinalize_d, Super_d, model])
    test([], [unfinalize_d, Super_d, model_d])
  })
})
describe ('Tests: C9r', function () {
  this.timeout(20000)
  var flag, onr
  beforeEach (function() {
    flag = new eYo.test.Flag()
    onr = eYo.c9r && eYo.c9r.new({
      methods: {
        flag (what, ...$) {
          flag.push(1, what, ...$)
          return what
        },
      },
    }, 'onr')
  })
  it ('C9r: Basic', function () {
    chai.assert(eYo.newNS)
    chai.assert(eYo.c9r)
    chai.assert(eYo.c9r.C9rBase)
    chai.assert(eYo.c9r.C9rBase_p)
    var set = new Set([
      eYo.c9r.C9rBase[eYo.$],
      eYo.c9r.C9rBase[eYo.$][eYo.$],
      eYo.c9r.C9rBase[eYo.$][eYo.$][eYo.$],
      eYo.c9r.C9rBase[eYo.$][eYo.$][eYo.$][eYo.$],
    ])
    chai.expect(set.size).equal(3)
    chai.assert(eYo.c9r.newC9r)
    var C9r = eYo.c9r.newC9r()
    chai.assert(C9r)
    set = new Set([
      C9r[eYo.$],
      C9r[eYo.$][eYo.$],
      C9r[eYo.$][eYo.$][eYo.$],
      C9r[eYo.$][eYo.$][eYo.$][eYo.$],
    ])
    chai.expect(set.size).equal(3)
    chai.expect(C9r[eYo.$]).not.equal(eYo.c9r.C9rBase[eYo.$])
    chai.assert(eYo.isSubclass(C9r[eYo.$].constructor, eYo.dlgt.C9rBase))
    chai.expect(C9r[eYo.$].id__).equal('eYo.c9r.?')
  })
  it ('C9r: finalizeC9r', function () {
    let NS = eYo.c9r.newNS()
    let C9r = NS.newC9r()
    C9r[eYo.$].finalizeC9r()
    new C9r()
  })
  it ('C9r: NS inherit', function () {
    let NS = eYo.c9r.newNS()
    chai.expect(NS.C9rBase).equal(eYo.c9r.C9rBase)
    chai.expect(NS.C9rBase_p).equal(eYo.c9r.C9rBase_p)
    NS.makeC9rBase()
    chai.expect(NS.C9rBase).not.equal(eYo.c9r.C9rBase)
    chai.expect(NS.C9rBase_p).not.equal(eYo.c9r.C9rBase_p)
    chai.expect(NS.newC9r()[eYo.$SuperC9r]).equal(NS.C9rBase)
    chai.expect(NS.newC9r({
      [eYo.$SuperC9r]: eYo.NA,
    })[eYo.$SuperC9r]).undefined
  })
  it ('C9r modelMerge (adding methods)', function () {
    var NS = eYo.c9r.newNS()
    NS.makeC9rBase()
    var d = NS.new()
    chai.assert(!d.foo)
    flag.reset()
    NS.C9rBase[eYo.$].modelMerge({
      methods: {
        foo (x) {
          flag.push(x)
        },
      },
    })
    chai.assert(d.foo)
    d.foo(1)
    flag.expect(1)
    d = NS.new()
    d.foo(2)
    flag.expect(2)
  })
  it ('C9r modelMerge - overriden', function () {
    flag.reset()
    var NS = eYo.c9r.newNS()
    NS.makeC9rBase()
    var d = NS.new()
    chai.assert(!d.foo)
    NS.C9rBase[eYo.$].methodsMerge({
      foo () {
        flag.push(1)
      },
    })
    NS.C9rBase[eYo.$].methodsMerge({
      foo (overriden) {
        return function () {
          overriden()
          flag.push(2)
        }
      },
    })
    new NS.C9rBase().foo()
    flag.expect(12)
  })
  it('C9r: makeC9rBase({methods:...})', function () {
    var NS = eYo.c9r.newNS()
    NS.makeC9rBase({
      methods: {
        foo (x) {
          flag.push(x)
        },
      },
    })
    var d = NS.new()
    flag.reset()
    chai.assert(d.foo)
    d.foo(1)
    flag.expect(1)
  })
  it('C9r: eYo.c9r.new({methods:...})', function () {
    var d = eYo.c9r.new({
      methods: {
        foo (x) {
          flag.push(x)
        },
      },
    })
    chai.expect(eYo.isaC9r(d)).true
    chai.expect(eYo.isaC9r(eYo.NA)).false
    chai.expect(eYo.isaC9r(421)).false
    flag.reset()
    chai.assert(d.foo)
    d.foo(1)
    flag.expect(1)
  })
  describe('C9r: newNS', function () {
    it ('newNS(...)', function () {
      var foo = eYo.newNS('___Foo')
      chai.assert(foo && foo === eYo.___Foo)
      chai.assert(foo.newNS)
      chai.assert(!foo.newC9r)
      chai.expect(foo.super).equal(eYo)
      chai.expect(foo.name).equal('eYo.___Foo')
      var NS = eYo.c9r.newNS()
      chai.assert(NS.newNS)
      chai.assert(NS.newC9r)
      chai.expect(NS.super).equal(eYo.c9r)
      eYo.newNS(NS, 'foo')
      chai.assert(NS.foo)
      chai.assert(NS.foo.newNS)
      chai.assert(!NS.foo.newC9r)
      chai.expect(NS.foo.super).equal(eYo)
      chai.assert(NS.foo.name.endsWith('.foo'))
    })
    it ('NS.newNS(...)', function () {
      var NS = eYo.c9r.newNS()
      chai.expect(() => { NS.newNS() }).not.to.throw()
      NS.newNS('foo')
      chai.assert(NS.foo)
      chai.assert(NS.foo.newNS)
      chai.assert(NS.foo.newC9r)
      chai.expect(NS.foo.super).equal(NS)
      chai.assert(NS.foo.name.endsWith('.foo'))
      chai.assert(!NS.bar)
      NS.bar = 123
      chai.assert(NS.bar)
      chai.expect(() => { NS.newNS('bar') }).to.throw()
      chai.expect(() => { eYo.newNS(NS, 'bar') }).to.throw()
      delete NS.bar
      chai.expect(() => { eYo.newNS(NS, 'bar') }).not.to.throw()
      var nsbis = eYo.newNS()
      nsbis.bar = 123
      chai.expect(() => { nsbis.newNS('bar') }).to.throw()
      chai.expect(() => { eYo.newNS(nsbis, 'bar') }).to.throw()
      delete nsbis.bar
      chai.expect(() => { nsbis.newNS('bar') }).not.to.throw()
    })
  })
  describe ('C9r: makeSubC9r', function () {
    it (`eYo[eYo.$newSubC9r]('AB')`, function () {
      var NS = eYo.c9r.newNS()
      var A = NS.newC9r('A')
      var AB = A[eYo.$newSubC9r]('AB')
      chai.assert(AB)
      chai.expect(AB.prototype.constructor).equal(AB)
    })
    it (`NS.A[eYo.$newSubC9r]('AB')`, function () {
      var NS = eYo.c9r.newNS()
      NS.newC9r('A')
      NS.A[eYo.$newSubC9r]('AB')
      chai.assert(eYo.isF(NS.AB))
      chai.assert(NS.AB[eYo.$].name.endsWith('.AB'))
      chai.expect(NS.AB[eYo.$].ns).equal(NS)
      chai.expect(NS.AB_p).equal(NS.AB.prototype)
      chai.expect(NS.AB_s).equal(NS.A.prototype)
      chai.assert(eYo.isSubclass(NS.AB, NS.A))
      chai.assert(eYo.isSubclass(NS.AB[eYo.$].constructor, NS.A[eYo.$].constructor))
    })
    it ('NS.A[eYo.$newSubC9r]', function () {
      var NS = eYo.c9r.newNS()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', null, {
        init(x) {
          flag.push(x)
        }
      })
      chai.assert(NS.A[eYo.$newSubC9r])
      NS.A[eYo.$newSubC9r]('AB', {
        init(x) {
          flag.push(x+1)
        },
      })
      chai.expect(NS.AB[eYo.$SuperC9r_p]).equal(NS.A.prototype)
      NS.A[eYo.$].finalizeC9r()
      NS.AB[eYo.$].finalizeC9r()
      new NS.AB(1)
      flag.expect(12)
    })
  })
  describe ('C9r: newC9r', function () {
    it (`NS.newC9r('C9rBase')`, function () {
      var NS = eYo.c9r.newNS()
      chai.expect(NS.C9rBase).equal(eYo.c9r.C9rBase)
      NS.newC9r('C9rBase')
      chai.assert(NS.C9rBase)
      chai.assert(NS.C9rBase !== eYo.c9r.C9rBase)
      chai.assert(eYo.isSubclass(NS.C9rBase, eYo.c9r.C9rBase))
      chai.expect(NS.C9rBase[eYo.$].ns).equal(NS)
    })
    it (`eYo.c9r.newC9r(NS, 'C9rBase')`, function () {
      var NS = eYo.c9r.newNS()
      chai.expect(NS.C9rBase).equal(eYo.c9r.C9rBase)
      chai.assert(!NS.C9rBase[eYo.$SuperC9r_p])
      eYo.c9r.newC9r(NS, 'C9rBase')
      chai.assert(NS.C9rBase !== eYo.c9r.C9rBase)
      chai.expect(NS.C9rBase[eYo.$SuperC9r_p]).equal(eYo.c9r.C9rBase_p)
    })
    it (`NS.makeC9rBase()`, function () {
      chai.expect(eYo.c9r).property('C9rBase')
      var NS = eYo.c9r.newNS()
      chai.expect(NS.C9rBase).equal(eYo.c9r.C9rBase)
      NS.makeC9rBase()
      chai.expect(NS.C9rBase).not.equal(eYo.c9r.C9rBase)
      chai.expect(NS.C9rBase[eYo.$].ns).equal(NS)
      var NS = eYo.c9r.newNS()
      Object.defineProperty(NS, 'C9rBase', {
        value: 421
      })
      chai.expect(() => NS.makeC9rBase()).to.throw()
      chai.expect(eYo.c9r.newC9r(NS)[eYo.$].key).equal('eYo.c9r.?')
      chai.expect(NS).property('C9rBase')
      chai.expect(() => eYo.c9r.newC9r(NS, 'C9rBase')).to.throw()
      chai.expect(() => NS.newC9r('C9rBase')).to.throw()
    })
    it(`NS.makeC9rBase({...})`, function () {
      var NS = eYo.c9r.newNS()
      chai.expect(NS.C9rBase).equal(eYo.c9r.C9rBase)
      let model = {}
      NS.makeC9rBase(model)
      chai.expect(NS.C9rBase[eYo.$].model).equal(model)
    })
    it(`eYo.c9r.newC9r('A', eYo.c9r.C9rBase)`, function () {
      let NS = eYo.c9r.newNS()
      let C9r = NS.newC9r('A', eYo.c9r.C9rBase)
      chai.assert(eYo.isSubclass(NS.A, eYo.c9r.C9rBase))
      chai.expect(C9r).equal(C9r[eYo.$].C9r)
      chai.expect(C9r.prototype).equal(C9r[eYo.$].C9r_p)
      chai.expect(eYo.c9r.C9rBase).equal(C9r[eYo.$].C9r_S)
      chai.expect(eYo.c9r.C9rBase_p).equal(C9r[eYo.$].C9r_s)
    })
    it (`eYo.c9r.newC9r(NS, 'A', ...)`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      let C9r = eYo.c9r.newC9r(NS, 'A')
      chai.expect(NS.A_s).equal(eYo.c9r.C9rBase_p)
      chai.expect(()=>{ eYo.c9r.newC9r(NS, 'A') }).to.throw() // Already existing attribute
      chai.expect(eYo.isSubclass(C9r, eYo.c9r.C9rBase)).true
      chai.expect(eYo.isSubclass(C9r, NS.C9rBase)).false
    })
    it (`eYo.c9r.newC9r(NS, 'A', Super, model)`, function () {
      flag.reset()
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      var Super = NS.C9rBase
      eYo.c9r.newC9r(NS, 'A', Super, {
        init (x) {
          flag.push(x)
        }
      })
      chai.assert(NS.A)
      chai.assert(eYo.isSubclass(NS.A, NS.C9rBase))
      chai.expect(NS.A_s).equal(NS.C9rBase_p)
      NS.A[eYo.$].finalizeC9r()
      new NS.A(1)
      flag.expect(1)
    })
    it (`eYo.c9r.newC9r('_A')`, function () {
      if (!eYo._A) {
        var A = eYo.c9r.newC9r('_A')
        chai.assert(A)
        chai.assert(!A.constructor[eYo.$SuperC9r_p])
        chai.assert(eYo.isF(A[eYo.$newSubC9r]))
      }
    })
    it (`NO eYo.c9r.newC9r('_A')`, function () {
      if (eYo._A) {
        chai.expect(() => {eYo.c9r.newC9r('_A')}).to.throw()
      }
    })
    it (`NS.newC9r('A')`, function () {
      var NS = eYo.c9r.newNS()
      NS.newC9r('A')
      chai.assert(eYo.isF(NS.A))
      chai.assert(NS.A[eYo.$].name.endsWith('.A'))
      chai.expect(NS.A[eYo.$].ns).equal(NS)
      chai.expect(NS.A_p).equal(NS.A.prototype)
      chai.expect(NS.A_s).equal(NS.C9rBase_p)
    })
    it ('newC9r: constructor call', function () {
      flag.reset()
      var NS = eYo.c9r.newNS()
      eYo.c9r.newC9r(NS, 'A', null, {
        init (x) {
          flag.push(x)
        }
      })
      NS.A[eYo.$].finalizeC9r()
      var a = new NS.A(1)
      flag.expect(1)
      a = new NS.A(2)
      flag.expect(2)
    })
    it ('newC9r: super !== null', function () {
      var NS = eYo.c9r.newNS()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', {
        init (x) {
          flag.push(x)
        },
      })
      chai.assert(NS.A[eYo.$] instanceof eYo.c9r.C9rBase[eYo.$].constructor)
      NS.A[eYo.$].finalizeC9r()
      new NS.A(1)
      flag.expect(1)
      NS.newC9r('AB', NS.A, {
        init (x) {
          flag.push(x+1)
        },
      })
      chai.assert(NS.AB)
      chai.assert(NS.AB[eYo.$] instanceof eYo.c9r.C9rBase[eYo.$].constructor)
      NS.AB[eYo.$].finalizeC9r()
      new NS.AB(2)
      flag.expect(23)
    })  
    it ('newC9r: multi super !== null', function () {
      var NS = eYo.c9r.newNS()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', {
        init (x) {
          flag.push(x)
        },
      })
      eYo.c9r.newC9r(NS, 'B', {
        init (x) {
          flag.push(x+1)
        },
      })
      eYo.c9r.newC9r(NS, 'AA', NS.A, {
        init (x) {
          flag.push(x+2)
        },
      })
      eYo.c9r.newC9r(NS, 'AB', NS.A, {
        init (x) {
          flag.push(x+3)
        },
      })
      eYo.c9r.newC9r(NS, 'BA', NS.B, {
        init (x) {
          flag.push(x+4)
        },
      })
      eYo.c9r.newC9r(NS, 'BB', NS.B, {
        init (x) {
          flag.push(x+5)
        },
      })
      NS.A[eYo.$].finalizeC9r()
      NS.B[eYo.$].finalizeC9r()
      NS.AA[eYo.$].finalizeC9r()
      NS.AB[eYo.$].finalizeC9r()
      NS.BA[eYo.$].finalizeC9r()
      NS.BB[eYo.$].finalizeC9r()
      new NS.AA(1)
      flag.expect(13)
      new NS.AB(2)
      flag.expect(25)
      new NS.BA(2)
      flag.expect(36)
      new NS.BB(3)
      flag.expect(48)
    })
    it ('newC9r: undefined owner or super', function () {
      var NS = eYo.c9r.newNS()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', null, {
        init (x) {
          flag.push(x)
        }
      })
      eYo.c9r.newC9r(NS, 'AB', NS.A, {
        init (x) {
          flag.push(x+1)
        },
      })
      chai.expect(NS.AB_s.constructor).equal(NS.A)
      NS.A[eYo.$].finalizeC9r()
      NS.AB[eYo.$].finalizeC9r()
      new NS.AB(1)
      flag.expect(12)
    })
    it ('newC9r: init shortcuts 1', function () {
      var NS = eYo.c9r.newNS()
      flag.reset()
      var make = (init) => {
        NS = eYo.c9r.newNS()
        eYo.c9r.newC9r(NS, 'A', null, {
          init: init
        })
        NS.A[eYo.$].finalizeC9r()
        return new NS.A()
      }
      make(function () {
        flag.push(2)
      })
      flag.expect(2)
      make(function (builtin) {
        flag.push(1)
        builtin ()
        flag.push(3)
      })
      flag.expect(13)
    })
    it ('newC9r: init shortcuts 2', function () {
      var NS = eYo.c9r.newNS()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', null, {
        init (x) {
          flag.push(x)
        }
      })
      NS.A[eYo.$].finalizeC9r()
      new NS.A(2)
      flag.expect(2)
      NS.A[eYo.$newSubC9r]('AB', {
        init (builtin, x) {
          flag.push(x)
          builtin () // no argument at all
          flag.push(x+2)
        }
      })
      NS.AB[eYo.$].finalizeC9r()
      new NS.AB(1)
      flag.expect(113)
    })
    it ('newC9r: dispose', function () {
      var NS = eYo.c9r.newNS()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', null, {
        dispose(x) {
          flag.push(x)
        }
      })
      eYo.c9r.newC9r(NS, 'AB', NS.A, {
        dispose(x) {
          flag.push(x+1)
        }
      })
      NS.A[eYo.$].finalizeC9r()
      new NS.A().dispose(1)
      flag.expect(1)
      NS.AB[eYo.$].finalizeC9r()
      new NS.AB().dispose(2)
      flag.expect(32)
    })
    var testX = (X, Super, Dlgt_p) => {
      chai.assert(X)
      chai.assert(eYo.isSubclass(X, Super))
      chai.assert(X[eYo.$])
      chai.assert(!Super || X[eYo.$].super === Super[eYo.$])
      chai.assert(!Super || X[eYo.$SuperC9r_p] === Super.prototype)
      chai.assert(!Super || X[eYo.$SuperC9r_p].constructor === Super)
      chai.assert(!Dlgt_p || eYo.isSubclass(X[eYo.$].constructor, Dlgt_p.constructor))
      chai.expect(() => {
        new X()
      }).not.to.throw()
    }
    it (`eYo.c9r.newC9r('...')`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      eYo.c9r.newC9r(NS, 'A')
      testX(NS.A, eYo.c9r.C9rBase, eYo.c9r.Dlgt_p)
    })
    it (`eYo.c9r.newC9r('...', {...})`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', {
        init () {
          flag.push(1)
        }
      })
      NS.A[eYo.$].finalizeC9r()
      testX(NS.A, eYo.c9r.C9rBase, eYo.c9r.Dlgt_p)
      flag.expect(1)
    })
    it (`eYo.c9r.newC9r(NS, '...')`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      eYo.c9r.newC9r(NS, 'A')
      NS.A[eYo.$].finalizeC9r()
      testX(NS.A, eYo.c9r.C9rBase, eYo.c9r.Dlgt_p)
    })
    it (`eYo.c9r.newC9r(NS, '...', {...})`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', {
        init () {
          flag.push(1)
        }
      })
      NS.A[eYo.$].finalizeC9r()
      testX(NS.A, eYo.c9r.C9rBase, eYo.c9r.Dlgt_p)
      flag.expect(1)
    })
    it (`eYo.c9r.newC9r('...', Super = eYo.c9r.C9rBase)`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      eYo.c9r.newC9r(NS, 'A', NS.C9rBase)
      NS.A[eYo.$].finalizeC9r()
      testX(NS.A, NS.C9rBase, eYo.c9r.Dlgt_p)
    })
    it (`eYo.c9r.newC9r('...', Super = eYo.c9r.C9rBase, {...})`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      flag.reset()
      NS.newC9r('A', {
        init () {
          flag.push(1)
        }
      })
      NS.A[eYo.$].finalizeC9r()
      testX(NS.A, NS.C9rBase, NS.Dlgt_p)
      flag.expect(1)
    })
    it (`eYo.c9r.newC9r(NS, '...', Super = eYo.c9r.C9rBase, {...})`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', eYo.c9r.C9rBase, {
        init () {
          flag.push(1)
        }
      })
      NS.A[eYo.$].finalizeC9r()
      testX(NS.A, eYo.c9r.C9rBase, eYo.c9r.Dlgt_p)
      flag.expect(1)
    })
    it (`eYo.c9r.newC9r('...', eYo.c9r.C9rBase, {...}?)`, function () {
      var Super = eYo.c9r.C9rBase
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      eYo.c9r.newC9r(NS, 'A', Super)
      NS.A[eYo.$].finalizeC9r()
      chai.expect(NS.A[eYo.$].super).equal(Super[eYo.$])
      testX(NS.A, eYo.c9r.C9rBase, eYo.c9r.Dlgt_p)
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      chai.expect(NS.Dlgt_p).equal(NS.Dlgt_p)
      testX(NS.C9rBase, eYo.c9r.C9rBase, NS.Dlgt_p)
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', NS.C9rBase, {
        init () {
          flag.push(1)
        }
      })
      NS.A[eYo.$].finalizeC9r()
      testX(NS.A, NS.C9rBase, eYo.c9r.Dlgt_p)
      flag.expect(1)
    })
    it (`eYo.c9r.newC9r('...', Super = eYo.c9r.C9rBase, {...})`, function () {
      flag.reset()
      var A = eYo.c9r.newC9r('___A', eYo.c9r.C9rBase, {
        init () {
          flag.push(1)
        }
      })
      chai.assert(A)
      chai.assert(A[eYo.$])
      chai.expect(A[eYo.$].super).equal(eYo.c9r.C9rBase[eYo.$])
      chai.expect(A[eYo.$SuperC9r_p]).equal(eYo.c9r.C9rBase_p)
      chai.expect(A[eYo.$SuperC9r_p].constructor).equal(eYo.c9r.C9rBase)
      A[eYo.$].finalizeC9r()
      new A()
      flag.expect(1)
    })
    it (`eYo.c9r.newC9r(NS, '...', Super = eYo.c9r.C9rBase)`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      eYo.c9r.newC9r(NS, 'A', eYo.c9r.C9rBase)
      NS.A[eYo.$].finalizeC9r()
      testX(NS.A, eYo.c9r.C9rBase, eYo.c9r.Dlgt_p)
    })
    it (`eYo.c9r.newC9r(NS, '...', Super = eYo.c9r.C9rBase, {...})`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', eYo.c9r.C9rBase, {
        init () {
          flag.push(1)
        }
      })
      NS.A[eYo.$].finalizeC9r()
      testX(NS.A, eYo.c9r.C9rBase)
      flag.expect(1)
    })
    it (`?eYo.c9r.newC9r(NS, '...', Super, Dlgt, {...})`, function () {
      var NS = eYo.c9r.newNS()
      NS.makeC9rBase()
      flag.reset()
      eYo.c9r.newC9r(NS, 'A', {
        init () {
          flag.push(1)
        }
      })
      eYo.c9r.newC9r(NS, 'AB', NS.A, {
        init () {
          flag.push(2)
        }
      })
      chai.expect(NS.AB[eYo.$].super).equal(NS.A[eYo.$])
      chai.expect(NS.A[eYo.$].super).equal(eYo.c9r.C9rBase[eYo.$])
      NS.A[eYo.$].finalizeC9r()
      NS.AB[eYo.$].finalizeC9r()
      new NS.AB()
      flag.expect(12)
    })
  })
  it ('C9r: eyo setter', function () {
    var NS = eYo.c9r.newNS()
    eYo.c9r.newC9r(NS, 'A', null, {})
    chai.assert(eYo.isSubclass(NS.A[eYo.$].constructor, eYo.dlgt.C9rBase))
    chai.expect(() => {
      NS.A[eYo.$] = null
    }).to.throw()
    chai.expect(() => {
      NS.A[eYo.$] = null
    }).to.throw()
  })
  it ('C9r: dlgt key', function () {
    var NS = eYo.c9r.newNS()
    flag.reset()
    eYo.c9r.newC9r(NS, 'A', {
      [eYo.$] () {
        flag.push(1)
      },
      init() {
        flag.push(2)
      }
    })
    flag.expect(1)
    chai.assert(NS.A[eYo.$newSubC9r])
    NS.A[eYo.$newSubC9r]('AB', {})
    flag.expect(1)
  })
  it ('makeC9rBase({...})', function () {
    var NS = eYo.c9r.newNS()
    NS.makeC9rBase()
    chai.expect(NS.C9rBase[eYo.$].model).eql({})
    let model = {
      foo: 421,
    }
    NS = eYo.c9r.newNS()
    NS.makeC9rBase(model)
    chai.expect(NS.C9rBase[eYo.$].model).equal(model)
    flag.reset()
    model.init = function () {
      flag.push(1)
      chai.expect(this.model).equal(model)
    }
    NS = eYo.c9r.newNS()
    NS.makeC9rBase(model)
    new NS.C9rBase()
    flag.expect(1)
  })
  it ('naming', function () {
    var seed = eYo.genUID(eYo.IDENT)
    var k = 'x' + seed
    var K = 'X' + seed
    let NS = eYo.c9r.newNS(eYo, k)
    chai.expect(NS.name).equal(`eYo.${k}`)
    NS.makeC9rBase({})
    chai.expect(NS.C9rBase[eYo.$].name.endsWith(`.${K}`)).true
  })
})
