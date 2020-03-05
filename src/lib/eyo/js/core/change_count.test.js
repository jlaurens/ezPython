describe ('Tests: change_count', function () {
  it ('Change_count: basic', function () {
    chai.assert(eYo.o4t.changeCount)
    chai.assert(eYo.o4t.changeCount.merge)
    var ns = eYo.o3d.makeNS()
    ns.makeBase()
    eYo.o4t.changeCount.merge(ns.Base_p)
    let d = new ns.Base()
    chai.assert(d.changeCount_p)
    chai.assert(d.updateChangeCount)
    chai.assert(d.resetChangeCount)
    d.updateChangeCount()
    chai.expect(d.changeCount).equal(1)
    d.updateChangeCount(true)
    chai.expect(d.changeCount).equal(2)
    d.updateChangeCount(false)
    chai.expect(d.changeCount).equal(1)
    d.resetChangeCount()
    chai.expect(d.changeCount).equal(0)
    var event = {}
    d.updateChangeCount(event)
    chai.expect(d.changeCount).equal(1)
    d.updateChangeCount(true, event)
    chai.expect(d.changeCount).equal(2)
    d.updateChangeCount(false, event)
    chai.expect(d.changeCount).equal(1)
    d.resetChangeCount()
    chai.expect(d.changeCount).equal(0)
    d.updateChangeCount(event)
    chai.expect(d.changeCount).equal(1)
    d.updateChangeCount(event, true)
    chai.expect(d.changeCount).equal(2)
    d.updateChangeCount(event, false)
    chai.expect(d.changeCount).equal(1)
    d.resetChangeCount()
    chai.expect(d.changeCount).equal(0)
    event.isUI = true
    d.updateChangeCount(event)
    chai.expect(d.changeCount).equal(0)
    d.updateChangeCount(event, true)
    chai.expect(d.changeCount).equal(0)
    d.updateChangeCount(event, false)
    chai.expect(d.changeCount).equal(0)
    d.resetChangeCount()
    chai.expect(d.changeCount).equal(0)
  })
})
