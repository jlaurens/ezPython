describe ('Tests: magnet', function () {
  this.timeout(20000)
  let flag = new eYo.test.Flag()
  let ns_b3k = eYo.o4t.newNS()
  ns_b3k.makeBaseC3s()

  ns_b3k.newReady = function () {
    
  }
  let ns_m4t = eYo.magnet.newNS()
  ns_m4t.makeBaseC3s()
  /**
   * Create a new target brick.
   * This is the only place where `eYo.brick` is required.
   */
  ns_m4t.BaseC3s_p.newTargetBrick = function () {
    let brick = this.brick
    return ns_b3k.newReady(brick, this.wrapped_, brick.id + '.wrapped:' + this.name_)
  }

})