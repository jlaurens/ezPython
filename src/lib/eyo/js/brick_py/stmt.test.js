describe ('Tests: Stmt', function () {
  it ('Stmt: basic', function () {
    chai.assert(eYo.stmt)
    chai.assert(eYo.isSubclass(eYo.stmt.Dflt, eYo.brick.Dflt))
  })
})
