/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * @license EUPL-1.2
 */
/**
 * @fileoverview Bricks for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

eYo.require('Stmt')
eYo.require('Brick.List')

/// /////// gobal/nonlocal statement
/**
 * Class for a Delegate, non_void_identifier_list brick.
 * This brick may be wrapped.
 * Not normally called directly, eYo.Brick.create(...) is preferred.
 * For edython.
 */
eYo.Brick.List.makeSubclass(eYo.T3.Expr.non_void_identifier_list, {
  list: {
    check: eYo.T3.Expr.Check.non_void_identifier_list,
    presep: ',',
    mandatory: 1
  }
})

/**
 * Class for a Delegate, global_stmt.
 * For edython.
 */
eYo.Stmt.makeClass(eYo.T3.Stmt.global_stmt, {
  data: {
    variant: {
      all: [
        eYo.Key.PASS,
        eYo.Key.CONTINUE,
        eYo.Key.BREAK,
        eYo.Key.GLOBAL,
        eYo.Key.NONLOCAL,
        eYo.Key.DEL,
        eYo.Key.RETURN
      ],
      init: eYo.Key.PASS,
      synchronize: /** @suppress {globalThis} */ function (newValue) {
        this.synchronize(newValue)
        var b3k = this.brick
        b3k.identifiers_s.incog = newValue !== eYo.Key.GLOBAL && newValue !== eYo.Key.NONLOCAL
        b3k.del_s.incog = newValue !== eYo.Key.DEL
        b3k.return_s.incog = newValue !== eYo.Key.RETURN
      },
      xml: {
        save: /** @suppress {globalThis} */ function (element, opt) {
        },
        load: /** @suppress {globalThis} */ function (element) {
          this.brick.variant_p = element.getAttribute(eYo.Key.EYO)
        }
      },
      fromType: /** @suppress {globalThis} */ function (type) {
        this.set({
          [eYo.T3.Stmt.pass_stmt]: eYo.Key.PASS,
          [eYo.T3.Stmt.continue_stmt]: eYo.Key.CONTINUE,[eYo.T3.Stmt.break_stmt]: eYo.Key.BREAK,
          [eYo.T3.Stmt.global_stmt]: eYo.Key.GLOBAL,
          [eYo.T3.Stmt.nonlocal_stmt]: eYo.Key.NONLOCAL,
          [eYo.T3.Stmt.del_stmt]: eYo.Key.DEL,
          [eYo.T3.Stmt.return_stmt]: eYo.Key.RETURN
        } [type])
      }
    }
  },
  fields: {
    variant: {
      reserved: ''
    }
  },
  slots: {
    identifiers: {
      order: 1,
      promise: eYo.T3.Expr.non_void_identifier_list,
      xml: {
        key: 'list',
        save: /** @suppress {globalThis} */ function (element) {
          var variant = this.brick.variant_p
          if (variant === eYo.Key.GLOBAL || variant === eYo.Key.NONLOCAL) {
            this.save(element)
          }
        },
        load: /** @suppress {globalThis} */ function (element) {
          var variant = this.brick.variant_p
          if (variant === eYo.Key.GLOBAL || variant === eYo.Key.NONLOCAL) {
            this.load(element)
          }
        }
      }
    },
    del: {
      order: 2,
      wrap: eYo.T3.Expr.target_list,
      xml: {
        key: 'list',
        save: /** @suppress {globalThis} */ function (element) {
          if (this.brick.variant_p === eYo.Key.DEL) {
            this.save(element)
          }
        },
        load: /** @suppress {globalThis} */ function (element) {
          if (this.brick.variant_p === eYo.Key.DEL) {
            this.load(element)
          }
        }
      }
    },
    return: {
      order: 3,
      wrap: eYo.T3.Expr.optional_expression_list,
      xml: {
        key: 'list',
        save: /** @suppress {globalThis} */ function (element) {
          if (this.brick.variant_p === eYo.Key.RETURN) {
            this.save(element)
          }
        },
        load: /** @suppress {globalThis} */ function (element) {
          if (this.brick.variant_p === eYo.Key.RETURN) {
            this.load(element)
          }
        }
      }
    }
  }
})

;[
  'pass',
  'continue',
  'break',
  'nonlocal',
  'del',
  'return'
].forEach((k) => {
  k = k + '_stmt'
  eYo.Stmt[k] = eYo.Stmt.global_stmt
  eYo.Brick.mngr.register(k)
})

/**
 * The type and connection depend on the properties modifier, value and variant.
 * For edython.
 */
eYo.Stmt.global_stmt.prototype.getType = eYo.C9r.decorateChange(
  'getType',
  function () {
    this.setupType(
      {
        [eYo.Key.PASS]: eYo.T3.Stmt.pass_stmt,
        [eYo.Key.CONTINUE]: eYo.T3.Stmt.continue_stmt,
        [eYo.Key.BREAK]: eYo.T3.Stmt.break_stmt,
        [eYo.Key.GLOBAL]: eYo.T3.Stmt.global_stmt,
        [eYo.Key.NONLOCAL]: eYo.T3.Stmt.nonlocal_stmt,
        [eYo.Key.DEL]: eYo.T3.Stmt.del_stmt,
        [eYo.Key.RETURN]: eYo.T3.Stmt.return_stmt
      } [this.variant_p]
    )
    return this.type
  }
)

/**
 * The xml `eyo` attribute of this brick, as it should appear in the saved data.
 * For edython.
 * @return !String
 */
eYo.Stmt.global_stmt.prototype.xmlAttr = function () {
  return this.variant_p
}

/**
 * Populate the context menu for the given brick.
 * @param {eYo.Brick.Dflt} brick The brick.
 * @param {eYo.MenuManager} mngr mngr.menu is the menu to populate.
 * @private
 */
eYo.Stmt.global_stmt.prototype.populateContextMenuFirst_ = function (mngr) {
  var current = this.variant_p
  var variants = this.variant_d.getAll()
  var F = (i) => {
    var key = variants[i]
    var content = goog.dom.createDom(goog.dom.TagName.SPAN, 'eyo-code',
      eYo.Do.createSPAN(key, 'eyo-code-reserved')
    )
    var menuItem = mngr.newMenuItem(content, () => {
      this.variant_p = key
    })
    mngr.addChild(menuItem, true)
    menuItem.setEnabled(key !== current)
  }
  F(0)
  F(1)
  F(2)
  mngr.shouldSeparate()
  F = (i) => {
    var key = variants[i]
    var content = goog.dom.createDom(goog.dom.TagName.SPAN, 'eyo-code',
      eYo.Do.createSPAN(key, 'eyo-code-reserved'),
      eYo.Do.createSPAN(' …', 'eyo-code-placeholder')
    )
    var menuItem = mngr.newMenuItem(content, () => {
      this.variant_p = key
    })
    mngr.addChild(menuItem, true)
    menuItem.setEnabled(key !== current)
  }
  F(3)
  F(4)
  F(5)
  F(6)
  mngr.shouldSeparate()
  return eYo.Stmt.global_stmt.superClass_.populateContextMenuFirst_.call(this, mngr)
}
