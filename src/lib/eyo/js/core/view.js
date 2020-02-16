/**
 * edython
 *
 * Copyright 2020 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview namspace for all the view objects.
 * View object are displayed unless for a faceless application.
 * This is a view that contains other views.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

/**
 * @name {eYo.view}
 * @namespace
 */
eYo.o3d.makeNS(eYo, 'view')

/**
 * @name{eYo.view.Dflt}
 * @constructor
 * Widgets with UI capabilities.
 */
eYo.view.makeDflt({
  /**
   * Initializer.
   */
  init() {
    this.disposeUI = eYo.do.nothing // will be used by subclassers
  },
  properties: {
    views: {
      value () {
        return new eYo.view.List(this, 'views', {})
      }
    },
    /**
     * The desk of the receiver.
     * @type {eYo.view.Desk}
     * @readonly
     */
    desk: {
      get () {
        return this.owner.desk
      },
    },
    /**
     * The driver manager shared by all the instances in the app.
     * @type {eYo.driver.Mngr}
     */
    ui_driver_mngr: {
      get () {
        let a = this.app
        return a && a.ui_driver_mngr
      },
    },
    ui_driver: {
      value () {
        var mngr = this.ui_driver_mngr
        return mngr && mngr.driver(this)
      },
      reset (builtin) {
        this.ownedForEach(x => {
          let p = x.ui_driver_p
          p && p.reset()
        })
        builtin()
      }
    },
    /**
     * Whether the receiver's UI has been intialized.
     * 
     * @type {Boolean}
     */
    hasUI: {
      get () {
        return !this.initUI || this.initUI === eYo.do.nothing
      },
    },
    /**
     * Each view has a view rect.
     * @type {eYo.view.Desk}
     * @readonly
     */
    viewRect () {
      return new eYo.geom.Rect()
    },
  },
})

/**
 * Recommanded way to create view instances.
 * @param{Object} owner - and eYo object
 * @param{Object} model - either a `eYo.view.Dflt` instance or an object suitable to create such a view instance.
 */
eYo.view._p.new = (owner, model) => {
  return model instanceof eYo.view.Dflt
  ? model
  : new eYo.view.Dflt(owner, model)
}

/**
 * Recommanded way to create view instances.
 * @param{Function} enhancer - A function with signature (owner, model) => eYo.view.Dflt.
 * The actual `eYo.view._p.new` is overriden to call the enhancer first.
 * If the result is not undefined, then it is returned as is.
 * Otherwise, the original method is called.
 * @throws{Error} when the enhancer does not return
 * an acceptable value.
 */
eYo.view._p.enhanceNew = (enhancer) => {
  let original = eYo.view._p.new
  eYo.view._p.new = (owner, model) => {
    let ans = enhancer(owner, model)
    if (ans instanceof eYo.view.Dflt) {
      return ans
    } else if (ans) {
      eYo.throw(`Unexpected enhancer return value: ${ans}`)
    }
    return original(owner, model)
  }
}

/**
 * Declare the given model.
 * @param {Object} model - Object, like for |makeC9r|.
 */
eYo.view.Dflt_p.initWithModel = function (model) {
  eYo.view.Dflt_p.SuperC9r_p.initWithModel.call(this, model)
  model.views && (this.views.initWithModel(model.views))
}

/**
 * Make the `doInitUI` and `doDisposeUI` methods.
 * @param {Object} ui - model with `init` and `dispose` keys.
 */
eYo.view.Dlgt_p.uiDeclare = function (ui) {
  let C9r_s = this.C9r_s
  let init_m = ui && ui.init
  let init_s = C9r_s && C9r_s.doInitUI
  if (init_m) {
    this.C9r_p.doInitUI = XRegExp.exec(init_m.toString(), eYo.xre.function_builtin)
    ? function (...args) {
      init_m.call(this, () => {
        init_s.call(this, ...args)
      }, ...args)
    } : function (...args) {
      init_s.call(this, ...args)
      init_m.call(this, ...args)  
    }
  }
  // now the dispose ui
  let dispose_m = ui.dispose
  let dispose_s = C9r_s && C9r_s.disposeUI
  if (dispose_m) {
    this.C9r_p.doDisposeUI = XRegExp.exec(dispose_m.toString(), eYo.xre.function_builtin)
    ? function (...args) {
      dispose_m.call(this, () => {
        dispose_s.call(this, ...args)              
      }, ...args)
    } : function (...args) {
      dispose_m.call(this, ...args)
      dispose_s.call(this, ...args)
    }
  }
}

// ANCHOR eYo.p6y.List
/**
 * Make the ui.
 * Default implementation calls the inherited method
 * and forwards to the views.
 */
eYo.view.Dflt_p.doInitUI = function (...args) {
  eYo.view.Dlgt_p.SuperC9r_p.doInitUI.call(this, ...args)
  this.viewForEach(v => v.doInitUI(...args))
}

/**
 * Dispose of the ui.
 * Default implementation forwards to the views
 * and calls the inherited method.
 */
eYo.view.Dflt_p.doDisposeUI = function (...args) {
  this.viewForEach(v => v.doDisposeUI(...args))
  eYo.view.Dlgt_p.SuperC9r_p.doDisposeUI.call(this, ...args)
}

/**
 * Properties to handle views are owned by a view list but
 * their parent is the owner of the view list.
 * 
 */


/**
 * Layout the receiver.
 * The default implementation does nothing.
 */
eYo.view.Dflt_p.layout = eYo.do.nothing

/**
 * Update the metrics of the receiver.
 */
eYo.view.Dflt_p.updateMetrics = eYo.do.nothing

/**
 * Place the receiver.
 */
eYo.view.Dflt_p.place = eYo.do.nothing

/**
 * Consolidate the given model.
 * @param {Object} model - The model contains informations to extend the receiver's associate constructor.
 */
eYo.view.Dlgt_p.modelConsolidate = function (...args) {
  eYo.c9r.model.consolidate(...args)
}

/**
 * Add a valued consolidation method.
 * The receiver is not the owner.
 * @param {String} k -  Create `fooConsolidate` if `k` is 'foo'.
 * @param {Object} model - The model used to make the consolidator.
 */
eYo.view.Dlgt_p.consolidatorMake = function (k, model) {
  let C9r = this.C9r_
  let C9r_p = C9r.prototype
  let consolidators = this.consolidators__ || (this.consolidators__ = Object.create(null))
  let kC = k+'Consolidate'
  C9r_p[kC] = consolidators[k] = model.consolidate
  ? function () {
    let Super = C9r.SuperC9r_p[kC]
    !!Super && Super.apply(this, arguments)
    model.consolidate.call(this, arguments)
    this.ownedForEach(x => {
      let f = x[kC] ; f && f.apply(this, arguments)
    })
  } : function () {
    this[k_] = eYo.NA
  }
}

/**
 * Make the ui.
 * Default implementation forwards to the driver.
 */
eYo.view.Dflt_p.doInitUI = function (...args) {
  this.ui_driver.doInitUI(this, ...args)
}

/**
 * Make the ui.
 * Default implementation forwards to the driver.
 */
eYo.view.Dflt_p.initUI = function (...args) {
  try {
    this.initUI = eYo.do.nothing
    this.doInitUI(...args)

  } finally {
    delete this.initUI
  }
}

/**
 * Dispose of the ui.
 * Default implementation forwards to the driver.
 */
eYo.view.Dflt_p.doDisposeUI = function (...args) {
  this.ui_driver.doDisposeUI(this, ...args)
}

/**
 * Dispose of the ui.
 * Default implementation forwards to the driver.
 */
eYo.view.Dflt_p.disposeUI = function (...args) {
  try {
    this.disposeUI = eYo.do.nothing
    this.doDisposeUI(...args)

  } finally {
    delete this.disposeUI
  }
}


/**
 * List of views.
 * @name{eYo.view.List}
 * @constructor
 */
eYo.p6y.List.makeInheritedC9r(eYo.view)

/**
 * initialize from the model.
 * @param {Array<Object>} model - An array of views or view models
 */
eYo.view.List_p.initWithModel = function (model) {
  this.splice(this.length, 0, ...(map(x => {
    return eYo.view.new(model)
  }, model)))
}

