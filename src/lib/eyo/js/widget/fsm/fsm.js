/**
 * edython
 *
 * Copyright 2020 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Object with data, slots or fields.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.require('drvr')
eYo.forward('changer')

/**
 * Ancestor of object owning data, fields and slots.
 * @name {eYo.fsm}
 * @namespace
 */
eYo.o4t.newNS(eYo, 'fsm', {
  MODIFIER: 'modifier', // this MUST be in lower case
  PREFIX: 'prefix', // lowercase
  LABEL: 'label', // lowercase
  SEPARATOR: 'separator', // lowercase
  START: 'start', // lowercase
  OPERATOR: 'operator', // lowercase
  END: 'end', // lowercase
  SUFFIX: 'suffix', // lowercase
  COMMENT_MARK: 'comment_mark', // lowercase
  COMMENT: 'comment', // lowercase
})

//<<< mochai: Basics
//... chai.assert(eYo.fsm)
//... chai.assert(eYo.fsm.BaseC3s)
//... chai.assert(eYo.Fsm)
//... chai.assert(eYo.Fsm_p)
//... chai.assert(eYo.Fsm$)
//>>>

/**
 * Class for a basic object indirectly owned by a brick.
 * 
 * @name {eYo.fsm.BaseC3s}
 * @constructor
 * @param {eYo.brick|eYo.slot.BaseC3s|eYo.magnet.BaseC3s} owner - the immediate owner of this magnet. When not a brick, it is indirectly owned by a brick.
 * @readonly
 * @property {eYo.brick.UI} ui - The ui object used for rendering.
 * @readonly
 * @property {eYo.brick.BaseC3s} brick - The brick.
 * @readonly
 * @property {eYo.slot.BaseC3s} slot - The slot.
 * @readonly
 * @property {eYo.magnet.BaseC3s} magnet - The magnet.
 */
eYo.fsm.makeBaseC3s(true, {
  init (key, owner) { // eslint-disable-line
    this.resetBSM(owner)
  },
  aliases: {
    //<<< mochai: aliases
    //... let mngr = eYo.drvr.newNS()
    //... let drvr = mngr.getDrvr('')
    //... setup({
    //...   properties: {
    //...     ui: 421,
    //...     drvr,
    //...   }
    //... })
    //... let ns = eYo.fsm.newNS()
    //... ns.makeBaseC3s()
    //... var fsm = ns.new({}, 'fsm', onr)
    //... chai.expect(fsm.brick).equal(onr)
    'brick.ui': 'ui',
    //... chai.expect(onr.ui).equal(fsm.ui)
    //... chai.expect(onr.drvr).eqlDrvr(fsm.drvr)
    'brick.drvr': 'drvr',
    //>>>
  },
  properties: {
    //<<< mochai: properties
    brick: eYo.NA,
    slot: eYo.NA,
    magnet: eYo.NA,
    //>>>
  },
  methods: {
    //<<< mochai: methods
    /**
     * Reset the brick/slot/magnet properties.
     * @param {*} owner 
     */
    resetBSM (owner) {
      //<<< mochai: resetBSM
      //... let ns = eYo.fsm.newNS()
      //... ns.makeBaseC3s()
      //... var fsm = ns.new({}, 'fsm', onr)
      //... chai.expect(fsm.brick).equal(onr)
      //... chai.expect(fsm.slot).undefined
      //... chai.expect(fsm.magnet).undefined
      this.slot_ = this.brick_ = this.magnet_ = eYo.NA
      if (owner) {
        if (owner.isSlot) {
          //... setup({
          //...   properties: {
          //...     brick: 1
          //...   },
          //... })
          //... onr.isSlot = true
          //... fsm = ns.new({}, 'fsm', onr)
          this.brick_ = owner.brick
          this.slot_ = owner
          //... chai.expect(fsm.brick).equal(1)
          //... chai.expect(fsm.slot).equal(onr)
          //... chai.expect(fsm.magnet).undefined
        } else if (owner.isMagnet) {
          //... setup({
          //...   properties: {
          //...     brick: 1
          //...   },
          //... })
          //... onr.isMagnet = true
          //... fsm = ns.new({}, 'fsm', onr)
          this.magnet_ = owner
          this.brick_ = owner.brick
          //... chai.expect(fsm.brick).equal(1)
          //... chai.expect(fsm.slot).undefined
          //... chai.expect(fsm.magnet).equal(onr)
        } else {
          this.brick_ = owner
          //... setup()
          //... fsm = ns.new({}, 'fsm', onr)
          //... chai.expect(fsm.brick).equal(onr)
          //... chai.expect(fsm.slot).undefined
          //... chai.expect(fsm.magnet).undefined
        }  
      }
      //>>>
    },
    /**
     * Hook for owner change
     * @param {Object} before 
     * @param {Object} after 
     */
    ownerDidChange (before, after) {
      //<<< mochai: ownerDidChange
      //... let ns = eYo.fsm.newNS()
      //... ns.makeBaseC3s()
      //... eYo.test.extend(ns.BaseC3s_p, 'ownerDidChange', function (before, after) {
      //...   eYo.flag.push(421)
      //... })
      //... var fsm = ns.new({}, 'fsm', onr)
      //... setup()
      //... fsm.owner_ = onr
      //... eYo.flag.expect(421)
      let inherited = eYo.fsm.BaseC3s[eYo.$SuperC3s_p].ownerDidChange
      inherited && inherited.call(this, before, after)
      this.resetBSM()
      //>>>
    },
    //>>>
  },
})

eYo.Fsm$.drvrEnhanced()
//<<< mochai: drvrEnhanced
//... let mngr = eYo.drvr.newNS()
//... mngr.makeBaseC3s()
//... let drvr = mngr.getDrvr('')
//... setup({
//...   properties: {
//...     drvr
//...   }
//... })
//... chai.expect(onr.drvr).eqlDrvr(drvr)
//... let ns = eYo.fsm.newNS()
//... let fsm = ns.new({}, 'fsm', onr)
//... chai.expect(fsm.drvr).eqlDrvr(drvr)
//... mngr.newDrvrC3s('Foo', {
//...   methods: {
//...     do_push (instance, ...$) {
//...       eYo.flag.push(1, ...$)
//...     },
//...   },
//... })
//... let NS = ns.newNS('foo')
//... chai.expect(NS.makeBaseC3s(true)).equal(ns.Foo)
//... chai.expect(ns.Foo_p).not.undefined
//... mngr.makeForwarder(ns.Foo_p, 'push')
//... ns.Foo$.finalizeC3s()
//... let foo = new ns.Foo('foo', onr)
//... foo.push(2, 3)
//... eYo.flag.expect(123)
//>>>
eYo.Fsm$.finalizeC3s()