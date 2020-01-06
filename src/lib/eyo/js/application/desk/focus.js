/*
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */

/**
 * @fileoverview Focus utilities for edython.
 * Each board has a focus manager, which remembers the object with focus,
 * either a brick, a magnet or a field.
 * The main focus manager belongs to the application owning all the boards.
 * It takes care of remembering which board has the focus.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.require('Decorate')
eYo.require('C9r.Owned')

eYo.require('Do')
eYo.require('Board')

eYo.require('Brick')
eYo.require('Magnet')
eYo.require('Field')

/**
 * @name{eYo.Focus}
 * @namespace
 */
eYo.provide('Focus')

eYo.forwardDeclare('App')
goog.forwardDeclare('goog.math')

/**
 * @name {eYo.Focus.Main}
 * @constructor
 * The main focus manager is uniquely owned by the application.
 * It maintains a list of focus managers associated to boards.
 * @param {eYo.App} app -  the owning application.
 * @constructor
 */
eYo.Focus.makeClass('Main', eYo.C9r.Owned, {
  computed: {
    /**
     * The board that has current focus, if any
     * @type {eYo.Board}
     */
    board: {
      get () {
        return this.mngr && this.mngr.board
      },
      set (after) {
        if (after !== this.board) {
          this.hasUI && this.ui_driver.boardOff(this)
          this.mngr_ = after && after.focus_mngr || eYo.NA
          this.hasUI && this.ui_driver.boardOn(this)
        }
      }
    },
    /**
     * The brick that has current focus, if any
     * @type {?eYo.Brick.Dflt}
     */
    brick: {
      get () {
        return this.mngr_ && this.mngr_.brick
      },
      set (after) {
        if (after && this.mngr_ && after !== this.mngr_.brick) {
          this.mngr_ = after.focus_mngr
          this.mngr_.brick = after
        }
      }
    },
    /**
     * The field that has current focus, if any
     * @type {?eYo.Field}
     */
    field: {
      get () {
        return this.mngr_ && this.mngr_.field
      },
      set (after) {
        if (after && this.mngr_ && after !== this.mngr_.field) {
          this.mngr_ = after.focus_mngr
          this.mngr_.field = after
        }
      }
    },
    /**
     * The magnet that has current focus, if any
     * @type {!eYo.Magnet.Dflt}
     */
    magnet: {
      get () {
        return this.mngr_ && this.mngr_.magnet
      },
      set (after) {
        if (after && this.mngr_ && after !== this.mngr_.magnet) {
          this.mngr_ = after.focus_mngr
          this.mngr_.magnet = after
        }
      }
    },
  },
  valued: {
    /**
     * The manager that has current focus
     * @type {?eYo.Focus.Mngr}
     */
    mngr: eYo.NA,
  },
  ui: {
    init () {
      this.mngrForEach(m => m.initUI())
    },
    dispose () {
      this.mngrForEach(m => m.disposeUI())
    },
  }
})

// Each newly created focus manager comes here
eYo.Do.Register.add(eYo.Focus.Main, 'mngr')

/**
 * Dispose of the 
 */
eYo.Focus.Main_p.mngrWillDispose = function (mngr) {
  this.mngrUnregister(mngr)
  if (this.mngr_ === mngr) {
    this.mngr_ = null
  }
}
/**
 * Create a standard focus manager, managed by a main focus manager.
 * @param {eYo.Board} board -  the owner of the focus object.
 * @param {eYo.Focus.Main} main -  The main focus manager.
 * @constructor
 */
eYo.Focus.makeClass('Mngr', eYo.C9r.Owned, {
  init () {
    this.focus_main.mngrRegister(this)
  },
  computed: {
    /**
     * The owning board.
     * @type {eYo.Board.Dflt}
     */
    board () {
      return this.owner__
    },
    focus_main () {
      return this.app.focus_main
    },
  },
  valued: {
    /**
     * Focus only on wrappers.
     * @type{eYo.Brick.Dflt}
     */
    brick: {
      validate (after) {
        return after && after.wrapper || after
      },
      willChange() {
        this.hasUI && this.ui_driver.brickOff(this)
      },
      didChange(after) {
        if (after) {
          if (this.magnet__) {
            var b3k = this.magnet__.brick
            if (b3k && after !== b3k.wrapper) {
              this.magnet_ = null
            }
          }
          if (this.field__) {
            var b3k = this.field__.brick
            if (b3k && after !== b3k.wrapper) {
              this.field__ = null
            }
          }
          this.hasUI && this.ui_driver_mngr.brickOn(this)
          this.didAdd()
        } else {
          this.magnet_ = null
          this.field_ = null
          this.didRemove()
        }
      },
    },
    /**
     * Takes care of consistency between the magnet and the brick.
     * @type{eYo.Magnet.Dflt}
     */
    magnet: {
      willChange() {
        this.hasUI && this.ui_driver.magnetOff(this)
        this.field_ = null
      },
      validate(after) {
        if (after) {
          if (!after.board) return eYo.INVALID
          if (after.hidden_) {
            console.error('Do not select a hidden connection')
            return eYo.INVALID
          }
          var b3k = after.brick
          if (b3k && b3k.locked_) {
            return eYo.INVALID
          }
          // if the connection visually belongs to 2 bricks, select the top left most
          if ((after.isHead || after.isSlot) && after.target) {
            after = after.target
          }
          return after
        }
      },
      didChange (after) {
        if (after) {
          this.brick_ = after.brick.wrapper
        }
        this.hasUI && this.ui_driver.magnetOn(this)
      },
    },
    /**
     * Takes care of consistency between the field and the brick.
     * @type{eYo.Field}
     * @private
     */
    field: {
      willChange (after) {
        this.ui_driver.fieldOff(this)
        this.magnet_ = null
        if (after) {
          var b3k = after.brick
          if (b3k !== this.brick) {
            this.brick_ = eYo.NA
          }
        }
      },
      didChange (after) {
        if (after) {
          if (!this.brick) {
            this.brick_ = after.brick
          }
          this.ui_driver.fieldOn(this)
        }
      },
    },
  },
  dispose (builtin) {
    this.focus_main.mngrWillDispose(this)
    builtin()
  },
})

/**
 * Scroll the focused brick to visible.
 * UI related.
 */
eYo.Focus.Mngr_p.scrollToVisible = function (force) {
  this.brick && this.brick.scrollToVisible(force)
}

/**
 * Hook.
 */
eYo.Focus.Mngr_p.didAdd = eYo.Do.nothing

/**
 * Hook.
 */
eYo.Focus.Mngr_p.didRemove = eYo.Do.nothing

/**
 * Select one of the given bricks.
 * @param {Array<eYo.BrickNSs>} bricks
 * @param {Boolean} force
 */
eYo.Focus.Mngr_p.selectOneBrickOf = function (bricks, force) {
  var select
  bricks = bricks.slice()
  var f = brick => {
    if (brick.isControl && brick.span.suite) {
      select = brick
      return true
    }
  }
  var g = brick => {
    if (brick.isControl) {
      select = brick
      return true
    }
  }
  if (bricks.length && !bricks.some(f) && !bricks.some(g)) {
    select = bricks[0]
  }
  if (select && select.focusOn()) {
    select.scrollToVisible(force)
  }
}


eYo.C9r.Owned.eyo.modelDeclare({
  computed: {
    focus_main () {
      this.app.focus_main
    },
  }
})


eYo.Brick.Dflt.eyo.modelDeclare({
  computed: {
    focus_mngr () {
      return this.board.focus_mngr
    },
    hasFocus: {
      get() {
        return this === this.focus_mngr.brick
      },
      set (after) {
        after ? this.focusOn() : this.focusOff()
      }
    },
  }
})

eYo.Magnet.Dflt.eyo.modelDeclare({
  computed: {
    focus_mngr () {
      return this.board.focus_mngr
    },
    hasFocus: {
      get() {
        return this === this.focus_mngr.magnet
      },
      set (after) {
        after ? this.focusOn() : this.focusOff()
      }
    },
  },
})

eYo.Field.Dflt.eyo.modelDeclare({
  computed: {
    focus_mngr () {
      return this.board.focus_mngr
    },
    hasFocus: {
      get() {
        return this === this.focus_mngr.field
      },
      set (after) {
        after ? this.focusOn() : this.focusOff()
      },
    },
  }
})

/**
 * Focus on this board.
 * @return {Boolean} Whether the receiver gained focus.
 */
eYo.Board.Dflt_p.focusOn = function () {
  return !!(this.focus_main.board = this)
}

/**
 * Select this brick.  Highlight it visually.
 * Wrapped bricks are not selectable.
 * @param {Boolean} noBoard -  Do not focus on the receiver' board.
 * Defaults to false, which means that focusing on an object
 * also focuses on its enclosing board.
 * @return {Boolean} Whether the receiver gained focus.
 */
eYo.Brick.Dflt_p.focusOn = function (noBoard) {
  noBoard || this.board.focusOn()
  return !!(this.focus_mngr.brick = this)
}

/**
 * Select this field. Highlight it visually.
 * @param {Boolean} noBoard -  Do not focus on the receiver' board.
 * Defaults to false, which means that focusing on an object
 * also focuses on its enclosing board.
 * @return {Boolean} Whether the receiver gained focus.
 */
eYo.Field.Dflt_p.focusOn = function (noBoard) {
  noBoard || this.board.focusOn()
  return !!(this.focus_mngr.field = this)
}

/**
 * Select this magnet. Highlight it visually.
 * Wrapped magnets are not selectable.
 * @param {Boolean} noBoard -  Do not focus on the receiver' board.
 * Defaults to false, which means that focusing on an object
 * also focuses on its enclosing board.
 * @return {Boolean} Whether the receiver gained focus.
 */
eYo.Magnet.Dflt_p.focusOn = function (noBoard) {
  noBoard || this.board.focusOn()
  return !!(this.focus_mngr.magnet = this)
}

/**
 * Focus off this board.
 */
eYo.Board.Dflt_p.focusOff = function () {
  this.focus_main.board = eYo.NA
}

/**
 * Focus off this brick.
 * If there is a selected connection, it is removed.
 * `focusOff` is used from click handling methods.
 */
eYo.Brick.Dflt_p.focusOff = function () {
  this.hasFocus && (this.focus_mngr.brick = eYo.NA)
}

/**
 * Focus off this magnet.
 * If `this` is the selected magnet, it looses its status.
 * `focusOff` is used from click handling methods.
 * Does nothing if the receiver is not selected.
 */
eYo.Magnet.Dflt_p.focusOff = function () {
  this.hasFocus && (this.focus_mngr.magnet = eYo.NA)
}

/**
 * Focus off this field.
 * `focusOff` is used from click handling methods.
 */
eYo.Field.Dflt_p.focusOff = function () {
  this.hasFocus && (this.focus_mngr.field = eYo.NA)
}
