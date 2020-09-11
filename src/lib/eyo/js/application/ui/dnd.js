/*
 * edython
 *
 * Copyright 2019 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */

/**
 * @fileoverview Dragger for bricks, boards and other object. A motion has a dragger in order to drag bricks and text around.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

/**
 * @name{eYo.dnd}
 * @namespace
 */
eYo.o3d.newNS(eYo, 'dnd')

/**
 * @name{eYo.dnd.dragger}
 * @namespace
 */
eYo.provide('dnd.dragger')

/**
 * @name{eYo.dnd.dropper}
 * @namespace
 */
eYo.provide('dnd.dropper')

eYo.forward('event.Motion')
eYo.forward('drvr')

/**
 * @name{eYo.dnd.Mngr}
 * @constructor
 * Main drag and drop manager.
 * It maintains a list of draggers and droppers.
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param{eYo.event.Motion} [motion] -  the owning motion
 */
eYo.dnd.newC3s('Mngr', {
  init (owner, motion) {
    this.motion_ = motion
    /** the dragger_ that started a drag, not owned */
    this.dragger_ = eYo.NA
    /** The list of draggers_, owned */
    this.draggers_ = [
      new eYo.dnd.dragger.Board(this),
      new eYo.dnd.dragger.DraftBoard(this),
      new eYo.dnd.dragger.LibraryBoard(this),
      new eYo.dnd.dragger.Brick(this),
      new eYo.dnd.dragger.DraftBrick(this),
      new eYo.dnd.dragger.LibraryBrick(this),
    ]
    /** the dropper_ that started a possible drop, not owned */
    this.dropper_ = eYo.NA
    /** The list of droppers, owned */
    this.droppers_ = [
      new eYo.dnd.dropper.Board(this),
      new eYo.dnd.dropper.Brick(this),
    ]
  },
  /**
   * Main drag and drop manager.
   * It maintains a list of draggers and droppers
   * * @param{eYo.app.C3sBase} [desktop] -  the owning desktop
   */
  dispose (dispose) {
    this.cancel()
    dispose()
    this.draggers_.length = 0
    this.draggers_ = eYo.NA
    this.droppers_.length = 0
    this.droppers_ = eYo.NA
  },
  properties: {
    motion: {
      dispose: false
    },
    dragger: {
      dispose: false
    },
    driver_mngr: {
      get () {
        if (!this.motion) {
          eYo.test && eYo.test.IN_THROW || console.error('BREAK HERE!')
        }
        return this.motion.driver_mngr
      },
    },
    active: {
      get () {
        return !!this.dragger
      },
    },
  },
})

eYo.dnd.Mngr_p.ownedForEach = function (f) {
  eYo.dnd.Mngr_s.ownedForEach.call(this, f)
  if (!this.draggers_) {
    eYo.test && eYo.test.IN_THROW || console.error('BREAK HERE!!!')
  }
  this.draggers_.foreach(d => d.dispose())
  this.droppers_.foreach(d => d.dispose())
}
/**
 * Ask one of its draggers to initate a dragging operation.
 * @return {Boolean} Whether a drag operation did start.
 */
eYo.dnd.Mngr_p.start = function () {
  this.cancel()
  if ((this.dragger_ = this.draggers_.some(d => d.start()))) {
    return this.update()
  }
}

/**
 * Update a dragging operation.
 * Forwards to the current dragger, then to all its droppers.
 * @return {Boolean} Whether a drag operation did update.
 */
eYo.dnd.Mngr_p.update = function () {
  if (this.dragger_) {
    this.dragger_.update()
    this.droppers_.forEach(d => d.update())
    this.dropper_ = this.droppers_.some(d => d.start())
    return true
  }
}

/**
 * Cancel a dragging operation.
 * Forwards to the current dragger.
 * @return {Boolean} Whether a drag operation did cancel.
 */
eYo.dnd.Mngr_p.cancel = function () {
  if (this.dragger_) {
    this.dragger_.cancel()
    this.droppers_.foreach(d => d.cancel())
    this.dragger_ = this.dropper_ = null
    return true
  }
}

/**
 * Reset a dragging operation.
 * Forwards to the current dragger.
 * @return {Boolean} Whether a drag operation did reset.
 */
eYo.dnd.Mngr_p.reset = function () {
  if (this.dragger_) {
    this.dragger_.reset()
    this.droppers_.foreach(d => d.reset())
    this.dragger_ = this.dropper_ = null
    return true
  }
}

/**
 * Conclude a dragging operation.
 * Forwards to the current dragger, then to all its droppers.
 * @return {Boolean} Whether a drag operation did complete.
 */
eYo.dnd.Mngr_p.complete = function () {
  if (this.dragger_) {
    this.droppers_.foreach(d => d.update())
    this.dropper_.complete()
    this.dragger_.complete()
    this.reset()
    return true
  }
}

/**
 * Add a dragger.
 * @param {eYo.dnd.dragger} dragger
 */
eYo.dnd.Mngr_p.addDragger = function (dragger) {
  this.draggers_.push(dragger)
}

/**
 * Add a dropper.
 */
eYo.dnd.Mngr_p.addDropper = function (dropper) {
  this.droppers_.push(dropper)
}

/*******/

/**
 * @name {eYo.dnd.dragger.C3sBase}
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param {eYo.dnd.Mngr} manager -  the owning drag and drop manager.
 */
eYo.dnd.dragger.makeC3sBase({
  /**
   * Sever all the links.
   */
  dispose () {
    this.cancel()
  },
  compropertiesputed: {
    manager: {
      get () {
        return this.owner__
      },
    },
    motion: {
      get () {
        return this.manager.motion_
      },
    },
    /**
     * Whether started
     */
    started: false,
  },
})

/**
 * Start a drag operation.
 * @return {Boolean} true is a drag operation did start
 */
eYo.dnd.dragger.C3sBase_p.start = function () {
  return (this.started_ = true)
}

/**
 * Update a drag operation.
 * @return {Boolean} true if a drag operation did update
 */
eYo.dnd.dragger.C3sBase_p.update = function () {
  return this.started_
}

/**
 * Cancel a drag operation.
 * @return {Boolean} true is a drag operation did cancel
 */
eYo.dnd.dragger.C3sBase_p.cancel = eYo.dnd.dragger.C3sBase_p.update

/**
 * Reset a drag operation.
 * @return {Boolean} true is a drag operation did reset
 */
eYo.dnd.dragger.C3sBase_p.reset = function () {
  if (this.started_) {
    this.started_ = false
    return true
  }
}

/**
 * Complete a drag operation.
 * @return {Boolean} true is a drag operation did complete
 */
eYo.dnd.dragger.C3sBase_p.complete = eYo.dnd.dragger.C3sBase_p.reset

/********/

/**
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param {eYo.dnd.Mngr} manager -  the owning drag and drop manager.
 */
eYo.dnd.dragger.newC3s('Board')

/**
 * Start a drag operation.
 * @return {Boolean} true is a drag operation did start
 */
eYo.dnd.dragger.Board_p.start = function () {
  return eYo.dnd.dragger.Board_s.Start.call(this)
}

/**
 * Update a drag operation.
 * @return {Boolean} true is a drag operation did update
 */
eYo.dnd.dragger.Board_p.update = function () {
  return eYo.dnd.dragger.Board_s.update.call(this)
}

/**
 * Cancel a drag operation.
 * @return {Boolean} true is a drag operation did cancel
 */
eYo.dnd.dragger.Board_p.cancel = function () {
  return eYo.dnd.dragger.Board_s.update.Cancel(this)
}

/**
 * Reset a drag operation.
 * @return {Boolean} true is a drag operation did reset
 */
eYo.dnd.dragger.Board_p.reset = function () {
  return eYo.dnd.dragger.Board_s.update.reset(this)
}

/**
 * Complete a drag operation.
 * @return {Boolean} true is a drag operation did complete
 */
eYo.dnd.dragger.Board_p.complete = function () {
  return eYo.dnd.dragger.Board_s.update.Complete(this)
}

/*******/

/**
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param {eYo.dnd.Mngr} manager -  the owning drag and drop manager.
 */
eYo.dnd.dragger.newC3s('DraftBoard')

/**
 * Sever all the links.
 */
eYo.dnd.dragger.DraftBoard.prototype.dispose = function () {
  eYo.dnd.dragger.DraftBoard[eYo.$].C3s_s.dispose.call(this)
}

/**
 * Start a drag operation.
 * @return {Boolean} true is a drag operation did start
 */
eYo.dnd.dragger.DraftBoard.prototype.start = function () {
  return eYo.dnd.dragger.DraftBoard[eYo.$SuperC3s_p].Start.Complete(this)
}

/**
 * Update a drag operation.
 * @return {Boolean} true is a drag operation did update
 */
eYo.dnd.dragger.DraftBoard.prototype.update = function () {
  return eYo.dnd.dragger.DraftBoard[eYo.$].C3s_s.update.call(this)
}

/**
 * Cancel a drag operation.
 * @return {Boolean} true is a drag operation did cancel
 */
eYo.dnd.dragger.DraftBoard.prototype.cancel = function () {
  return eYo.dnd.dragger.DraftBoard[eYo.$].C3s_s.cancel.call(this)
}

/**
 * Reset a drag operation.
 * @return {Boolean} true is a drag operation did reset
 */
eYo.dnd.dragger.DraftBoard.prototype.reset = function () {
  return eYo.dnd.dragger.DraftBoard[eYo.$].C3s_s.reset.call(this)
}

/**
 * Complete a drag operation.
 * @return {Boolean} true is a drag operation did complete
 */
eYo.dnd.dragger.DraftBoard.prototype.complete = function () {
  return eYo.dnd.dragger.DraftBoard[eYo.$].C3s_s.complete.call(this)
}

/*******/

/**
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param {eYo.dnd.Mngr} manager -  the owning drag and drop manager.
 */
eYo.dnd.dragger.newC3s('LibraryBoard')

/**
 * Start a drag operation.
 * @return {Boolean} true is a drag operation did start
 */
eYo.dnd.dragger.LibraryBoard.prototype.start = function () {
  return eYo.dnd.dragger.LibraryBoard[eYo.$SuperC3s_p].Start.Complete(this)
}

/**
 * Update a drag operation.
 * @return {Boolean} true is a drag operation did update
 */
eYo.dnd.dragger.LibraryBoard.prototype.update = function () {
  return eYo.dnd.dragger.LibraryBoard[eYo.$].C3s_s.update.call(this)
}

/**
 * Cancel a drag operation.
 * @return {Boolean} true is a drag operation did cancel
 */
eYo.dnd.dragger.LibraryBoard.prototype.cancel = function () {
  return eYo.dnd.dragger.LibraryBoard[eYo.$].C3s_s.cancel.call(this)
}

/**
 * Reset a drag operation.
 * @return {Boolean} true is a drag operation did reset
 */
eYo.dnd.dragger.LibraryBoard.prototype.reset = function () {
  return eYo.dnd.dragger.LibraryBoard[eYo.$].C3s_s.reset.call(this)
}

/**
 * Complete a drag operation.
 * @return {Boolean} true is a drag operation did complete
 */
eYo.dnd.dragger.LibraryBoard.prototype.complete = function () {
  return eYo.dnd.dragger.LibraryBoard[eYo.$].C3s_s.complete.call(this)
}

/*******/

/**
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param {eYo.dnd.Mngr} manager -  the owning drag and drop manager.
 */
eYo.dnd.dragger.newC3s('Brick')

/**
 * Start a drag operation.
 * @return {Boolean} true is a drag operation did start
 */
eYo.dnd.dragger.Brick_p.start = function () {
  return eYo.dnd.dragger.Brick[eYo.$SuperC3s_p].Start.call(this)
}

/**
 * Update a drag operation.
 * @return {Boolean} true is a drag operation did update
 */
eYo.dnd.dragger.Brick_p.update = function () {
  return eYo.dnd.dragger.Brick[eYo.$].C3s_s.update.call(this)
}

/**
 * Cancel a drag operation.
 * @return {Boolean} true is a drag operation did cancel
 */
eYo.dnd.dragger.Brick_p.cancel = function () {
  return eYo.dnd.dragger.Brick[eYo.$].C3s_s.cancel.call(this)
}

/**
 * Reset a drag operation.
 * @return {Boolean} true is a drag operation did reset
 */
eYo.dnd.dragger.Brick_p.reset = function () {
  return eYo.dnd.dragger.Brick[eYo.$].C3s_s.reset.call(this)
}

/**
 * Complete a drag operation.
 * @return {Boolean} true is a drag operation did complete
 */
eYo.dnd.dragger.Brick_p.complete = function () {
  return eYo.dnd.dragger.Brick[eYo.$].C3s_s.complete.call(this)
}

/*******/

/**
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param {eYo.dnd.Mngr} manager -  the owning drag and drop manager.
 */
eYo.dnd.dragger.newC3s('LibraryBrick')

/**
 * Start a drag operation.
 * @return {Boolean} true is a drag operation did start
 */
eYo.dnd.dragger.LibraryBrick_p.start = function () {
  return eYo.dnd.dragger.LibraryBrick[eYo.$SuperC3s_p].Start.call(this)
}

/**
 * Update a drag operation.
 * @return {Boolean} true is a drag operation did update
 */
eYo.dnd.dragger.LibraryBrick_p.update = function () {
  return eYo.dnd.dragger.LibraryBrick[eYo.$].C3s_s.update.call(this)
}

/**
 * Cancel a drag operation.
 * @return {Boolean} true is a drag operation did cancel
 */
eYo.dnd.dragger.LibraryBrick_p.cancel = function () {
  return eYo.dnd.dragger.LibraryBrick[eYo.$].C3s_s.cancel.call(this)
}

/**
 * Reset a drag operation.
 * @return {Boolean} true is a drag operation did reset
 */
eYo.dnd.dragger.LibraryBrick_p.reset = function () {
  return eYo.dnd.dragger.LibraryBrick[eYo.$].C3s_s.reset.call(this)
}

/**
 * Complete a drag operation.
 * @return {Boolean} true is a drag operation did complete
 */
eYo.dnd.dragger.LibraryBrick_p.complete = function () {
  return eYo.dnd.dragger.LibraryBrick[eYo.$].C3s_s.complete.call(this)
}

/*******/

/**
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param {eYo.dnd.Mngr} manager -  the owning drag and drop manager.
 */
eYo.dnd.dragger.newC3s('DraftBrick')

/**
 * Start a drag operation.
 * @return {Boolean} true is a drag operation did start
 */
eYo.dnd.dragger.DraftBrick_p.start = function () {
  return eYo.dnd.dragger.DraftBrick[eYo.$SuperC3s_p].Start.call(this)
}

/**
 * Update a drag operation.
 * @return {Boolean} true is a drag operation did update
 */
eYo.dnd.dragger.DraftBrick_p.update = function () {
  return eYo.dnd.dragger.DraftBrick[eYo.$].C3s_s.update.call(this)
}

/**
 * Cancel a drag operation.
 * @return {Boolean} true is a drag operation did cancel
 */
eYo.dnd.dragger.DraftBrick_p.cancel = function () {
  return eYo.dnd.dragger.DraftBrick[eYo.$].C3s_s.cancel.call(this)
}

/**
 * Reset a drag operation.
 * @return {Boolean} true is a drag operation did reset
 */
eYo.dnd.dragger.DraftBrick_p.reset = function () {
  return eYo.dnd.dragger.DraftBrick[eYo.$].C3s_s.reset.call(this)
}

/**
 * Complete a drag operation.
 * @return {Boolean} true is a drag operation did complete
 */
eYo.dnd.dragger.DraftBrick_p.complete = function () {
  return eYo.dnd.dragger.DraftBrick[eYo.$].C3s_s.complete.call(this)
}

/*******/

/**
 * @name {eYo.dnd.dropper.C3sBase}
 * @constructor
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param {eYo.dnd.Mngr} manager -  the owning drag and drop manager.
 */
eYo.dnd.dropper.makeC3sBase({
  /**
   * Sever all the links.
   */
  dispose () {
    this.cancel()
  },
  properties: {
    motion: {
      get () {
        return this.manager.motion_
      },
    },
    /**
     * Whether started
     */
    started: false,
  },
})

/**
 * Start a drop operation.
 * @return {Boolean} true is a drop operation did start
 */
eYo.dnd.dropper.C3sBase_p.start = function () {
  return (this.started_ = true)
}

/**
 * Update a drop operation.
 * @return {Boolean} true is a drop operation did update
 */
eYo.dnd.dropper.C3sBase_p.update = function () {
  return this.started_
}

/**
 * Cancel a drop operation.
 * @return {Boolean} true is a drop operation did cancel
 */
eYo.dnd.dropper.C3sBase_p.cancel = eYo.dnd.dropper.C3sBase_p.update

/**
 * Reset a drop operation.
 * @return {Boolean} true is a drop operation did reset
 */
eYo.dnd.dropper.C3sBase_p.reset = function () {
  if (this.started_) {
    this.started_ = false
    return true
  }
}

/**
 * Complete a drop operation.
 * @return {Boolean} true is a drop operation did complete
 */
eYo.dnd.dropper.C3sBase_p.complete = eYo.dnd.dropper.C3sBase_p.reset

/*******/

/**
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param {eYo.dnd.Mngr} manager -  the owning drag and drop manager.
 */
eYo.dnd.dropper.newC3s('Board')

/**
 * Start a drop operation.
 * @return {Boolean} true is a drop operation did start
 */
eYo.dnd.dropper.Board_p.start = function () {
  return eYo.dnd.dropper.Board_s.Start.call(this)
}

/**
 * Update a drop operation.
 * @return {Boolean} true is a drop operation did update
 */
eYo.dnd.dropper.Board_p.update = function () {
  return eYo.dnd.dropper.Board_s.update.call(this)
}

/**
 * Cancel a drop operation.
 * @return {Boolean} true is a drop operation did cancel
 */
eYo.dnd.dropper.Board_p.cancel = function () {
  return eYo.dnd.dropper.Board_s.cancel.call(this)
}

/**
 * Reset a drop operation.
 * @return {Boolean} true is a drop operation did reset
 */
eYo.dnd.dropper.Board_p.reset = function () {
  return eYo.dnd.dropper.Board_s.reset.call(this)
}

/**
 * Complete a drop operation.
 * @return {Boolean} true is a drop operation did complete
 */
eYo.dnd.dropper.Board_p.complete = function () {
  return eYo.dnd.dropper.Board_s.complete.call(this)
}

/*******/

/**
 * Main methods, `start`, `update`, `cancel`, `complete` and `reset`.
 * @param {eYo.dnd.Mngr} manager -  the owning drag and drop manager.
 */
eYo.dnd.dropper.newC3s('Brick')

/**
 * Start a drop operation.
 * @return {Boolean} true is a drop operation did start
 */
eYo.dnd.dropper.Brick_p.start = function () {
  return eYo.dnd.dropper.Brick_s.Start.call(this)
}

/**
 * Update a drop operation.
 * @return {Boolean} true is a drop operation did update
 */
eYo.dnd.dropper.Brick_p.update = function () {
  return eYo.dnd.dropper.Brick_s.update.call(this)
}

/**
 * Cancel a drop operation.
 * @return {Boolean} true is a drop operation did cancel
 */
eYo.dnd.dropper.Brick_p.cancel = function () {
  return eYo.dnd.dropper.Brick_s.cancel.call(this)
}

/**
 * Reset a drop operation.
 * @return {Boolean} true is a drop operation did reset
 */
eYo.dnd.dropper.Brick_p.reset = function () {
  return eYo.dnd.dropper.Brick_s.reset.call(this)
}

/**
 * Complete a drop operation.
 * @return {Boolean} true is a drop operation did complete
 */
eYo.dnd.dropper.Brick_p.complete = function () {
  return eYo.dnd.dropper.Brick_s.complete.call(this)
}

/*******/