describe('Scrollbar', function() {
  describe ('Visibility', function () {
    eYo.t3.expr
    it ('simple', function () {
      var type = `simple`
      eYo.t3.expr[type] = type
      eYo.expr.makeC9r(type, {})
      var b1 = eYo.brick.newReady(eYo.app.Board, type)
      var b2 = eYo.brick.newReady(eYo.app.Board, type)
      b2.moveTo(eYo.geom.xyWhere(-5, 90))
    })
  })
})

