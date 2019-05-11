/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */
/**
 * @fileoverview Block delegates for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.Delegate.Comprehension')

goog.require('eYo.Delegate.List')

/**
 * Class for a Delegate, comprehension value block.
 * Not normally called directly, eYo.Delegate.create(...) is preferred.
 * For edython.
 */
eYo.Delegate.Expr.makeSubclass('comprehension', {
  data: {
    expression: {
      order: 1,
      init: '',
      placeholder: eYo.Msg.Placeholder.TERM,
      validate: /** @suppress {globalThis} */ function (newValue) {
        var type = eYo.T3.Profile.get(newValue)
        return type.expr === eYo.T3.Expr.identifier
        ? {validated: newValue} : null
      },
      synchronize: true,
      xml: {
        save: /** @suppress {globalThis} */ function (element, opt) {
          if (!this.owner.expression_b) {
            this.save(element, opt)
          }
        }
      }
    },
  },
  slots: {
    expression: {
      order: 1,
      check: eYo.T3.Expr.Check.expression_key_datum,
      fields: {
        bind: {
          validate: true,
          endEditing: true,
        }
      }
    },
    for: {
      order: 2,
      fields: {
        label: 'for'
      },
      wrap: eYo.T3.Expr.target_list
    },
    in: {
      order: 3,
      fields: {
        label: 'in'
      },
      check: eYo.T3.Expr.Check.or_test_all,
      hole_value: 'name'
    },
    for_if: {
      order: 4,
      wrap: eYo.T3.Expr.comp_iter_list
    }
  },
  output: {
    check: /** @suppress {globalThis} */ function (type) {
      // `this` is a magnet
      // we do not take the type argument into account
      var eyo = this.b_eyo
      var b = eyo.expression_b
      if (b) {
        if (b.type === eYo.T3.Expr.key_datum || b.type === eYo.T3.Expr.identifier_annotated) {
          return [eYo.T3.Expr.dict_comprehension]
        }
      } else if (!eyo.expression_p.length) {
        return [eYo.T3.Expr.comprehension, eYo.T3.Expr.dict_comprehension]
      }
      return [eYo.T3.Expr.comprehension]
    }
  }
}, true)

/**
 * getBaseType.
 * The type depends on the variant and the modifiers.
 * As side effect, the subtype is set.
 */
eYo.Delegate.Expr.comprehension.prototype.getBaseType = function () {
  var check = this.magnets.output.check_
  return (check && check[0]) || eYo.T3.Expr.comprehension
}

;['dict_comprehension'].forEach(k => {
  eYo.Delegate.Expr[k] = eYo.Delegate.Expr.comprehension
  eYo.Delegate.Manager.register(k)
})

/**
 * The xml tag name of this block, as it should appear in the saved data.
 * For edython.
 * @return attr name
 */
eYo.Delegate.Expr.comprehension.prototype.xmlAttr = function () {
  return 'comprehension'
}

/**
 * Class for a Delegate, comp_for block.
 * Not normally called directly, eYo.Delegate.create(...) is preferred.
 * For edython.
 */
eYo.Delegate.Expr.makeSubclass('comp_for', {
  slots: {
    for: {
      order: 1,
      fields: {
        label: 'for'
      },
      wrap: eYo.T3.Expr.target_list
    },
    in: {
      order: 2,
      fields: {
        label: 'in'
      },
      check: eYo.T3.Expr.Check.or_test_all,
      hole_value: 'name'
    }
  }
}, true)

/**
 * Class for a Delegate, comp_if block.
 * Not normally called directly, eYo.Delegate.create(...) is preferred.
 * For edython.
 */
eYo.Delegate.Expr.makeSubclass('comp_if', {
  slots: {
    if: {
      order: 1,
      fields: {
        label: 'if'
      },
      check: eYo.T3.Expr.Check.expression_nocond,
      hole_value: 'yorn'
    }
  }
}, true)

/**
 * Class for a Delegate, comp_iter_list block.
 * This block may be wrapped.
 * Not normally called directly, eYo.Delegate.create(...) is preferred.
 * For edython.
 */
eYo.Delegate.List.makeSubclass('comp_iter_list', {
  list: {
    check: eYo.T3.Expr.Check.comp_iter,
    mandatory: 0,
    presep: ''
  }
})

/**
 * Class for a Delegate, key_datum block.
 * Not normally called directly, eYo.Delegate.create(...) is preferred.
 * For edython.
 */
eYo.Delegate.Expr.makeSubclass('key_datum', {
  slots: {
    key: {
      order: 1,
      check: eYo.T3.Expr.Check.expression,
      hole_value: 'key',
      placeholder: eYo.Msg.Placeholder.KEY
    },
    datum: {
      order: 2,
      fields: {
        label: ':'
      },
      check: eYo.T3.Expr.Check.expression,
      hole_value: 'value',
      placeholder: eYo.Msg.Placeholder.VALUE
    }
  }
}, true)

eYo.Delegate.Comprehension.T3s = [
  eYo.T3.Expr.comprehension,
  eYo.T3.Expr.comp_for,
  eYo.T3.Expr.comp_if,
  eYo.T3.Expr.comp_iter_list,
  eYo.T3.Expr.dict_comprehension,
  eYo.T3.Expr.identifier,
  eYo.T3.Expr.key_datum,
]
