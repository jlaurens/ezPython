describe ('Tests: magnet', function () {
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
  it ('Magnet: basic', function () {
    chai.expect(!eYo.magnet).false
    chai.expect(eYo.magnet._p.hasOwnProperty('BaseC9r')).true
  })
  describe('eYo.magnet.BaseC9r', function () {
    it ('eYo.magnet.new({})', function () {
      let bs = {
        changeDone () {
          flag.push(1)
        }
      }
      bs.brick = bs
      eYo.magnet.TYPES.forEach(type => {
        flag.reset()
        let m = eYo.magnet.new(bs, type, {
          init () {
            flag.push(2)
            console.error(flag.v)
          },
        })
        chai.expect(eYo.isDef(m))
        console.error(flag.v)
      })
    })
  })
})
