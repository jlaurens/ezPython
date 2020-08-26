describe('app', function() {
  it ('O3d: app p6y', function () {
    let onr = {
      eyo: true,
      app: 421
    }
    let o = new eYo.o3d.C9rBase(onr)
    chai.assert(o.owner_p)
    chai.expect(o.owner).equal(onr)
    chai.assert(o.app_p)
    chai.expect(o.app).equal(421)
    onr.app = 123
    chai.expect(o.app).equal(421)
    o.app_p.reset()
    chai.expect(o.app).equal(123)
  })
  it ('Application: Basic', function () {
    chai.assert(eYo.app.C9rBase)
    let APP = new eYo.app.C9rBase()
    chai.assert(APP)
  })
  // it ('Application: UI', function () {
  //   ;['fcls', 'fcfl', 'dom', 'svg'].forEach((UI) => {
  //     let options = {
  //       UI: UI
  //     }
  //     let APP = new eYo.app.C9rBase(options)
  //     console.error('BREAK HERE!')
  //     console.error(APP.options)
  //     chai.expect(APP.options.UI).equal(UI)
  //     chai.expect(APP.driver_mngr.constructor).equal(eYo[UI].Mngr)
  //   })
  // })
})

