/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */
/**
 * @fileoverview BlockSvg delegates for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.DelegateSvg.List')

goog.require('eYo.Decorate')
goog.require('eYo.Consolidator.List')
goog.require('eYo.DelegateSvg.Expr')

/**
 * Class for a DelegateSvg, value block.
 * Not normally called directly, eYo.DelegateSvg.create(...) is preferred.
 * For edython.
 */
eYo.DelegateSvg.Expr.makeSubclass('List', {
  list: {}
}, eYo.DelegateSvg)

/**
 * Fetches the named input object, getInput.
 * @param {String} name The name of the input.
 * @param {?Boolean} dontCreate Whether the receiver should create inputs on the fly.
 * @return {Blockly.Input} The input object, or null if input does not exist or undefined for the default block implementation.
 */
eYo.DelegateSvg.List.prototype.getInput = function (name, dontCreate) {
  var input = eYo.DelegateSvg.List.superClass_.getInput.call(this, name)
  if (!input) {
    this.createConsolidator()
    input = this.consolidator.getInput(this.block_, name, dontCreate)
  }
  return input
}

/**
 * Create a consolidator.
 *
 * @param {boolean} force
 */
eYo.DelegateSvg.List.prototype.createConsolidator = eYo.Decorate.reentrant_method(
  'createConsolidator',
  function (force) {
  var block = this.block_
  if (!block.type) {
    console.error('unexpected void type')
  }
  var D = eYo.DelegateSvg.Manager.getModel(block.type).list
  goog.asserts.assert(D, 'inputModel__.list is missing in ' + block.type)
  var C10r = this.consolidatorConstructor || D.consolidator || eYo.Consolidator.List
  if (this.consolidator) {
    if (this.consolidator.constructor !== C10r) {
      this.consolidator = new C10r(D)
      goog.asserts.assert(this.consolidator, eYo.Do.format('Could not create the consolidator {0}', block.type))
    } else {
      this.consolidator.init(D)
    }
    if (force) {
      this.consolidate()
    }
  } else {
    this.consolidator = new C10r(D)
    goog.asserts.assert(this.consolidator, eYo.Do.format('Could not create the consolidator {0}', block.type))
    this.consolidate()
  }
})

/**
 * Fetches the named input object, getInput.
 * @param {String} name The name of the input.
 * @param {?Boolean} dontCreate Whether the receiver should create inputs on the fly.
 * @return {Blockly.Input} The input object, or null if input does not exist or undefined for the default block implementation.
 */
eYo.DelegateSvg.List.prototype.didConnect = function (connection, oldTargetC8n, targetOldC8n) {
  eYo.DelegateSvg.List.superClass_.didConnect.call(this, connection, oldTargetC8n, targetOldC8n)
  if (connection.eyo.isOutput) {
    this.createConsolidator(true)
  }
}

/**
 * Consolidate the input.
 * Removes empty place holders.
 * This must not be overriden.
 *
 * @param {!Block} block
 */
eYo.DelegateSvg.List.prototype.doConsolidate = (() => {
  // this is a closure
  /**
   * Consolidate the input.
   * Removes empty place holders.
   * This must not be overriden.
   */
  var doConsolidate = function (deep, force) {
    if (this.will_connect_ || this.change.level) {
      // reentrant flag or wait for the new connection
      // to be established before consolidating
      // reentrant is essential because the consolidation
      // may cause rerendering ad vitam eternam.
      return
    }
    force = true  // always force consolidation because of the dynamics
    if (eYo.DelegateSvg.List.superClass_.doConsolidate.call(this, deep, force)) {
      return !this.connectionsIncog && this.consolidator.consolidate(this.block_, deep, force)
    }
  }
  return function (deep, force) {
    this.createConsolidator()
    this.doConsolidate = doConsolidate
    return doConsolidate.apply(this, arguments)// this is not recursive
  }
}) ()

// eYo.DelegateSvg.List.prototype.consolidator = undefined

/**
 * Clear the list af all items.
 * For edython.
 * @param {!Block} block
 * @private
 */
eYo.DelegateSvg.List.prototype.removeItems = function (block) {
  var block = this.block_
  var list = block.inputList
  var i = 0
  var input
  eYo.Events.groupWrap(
    () => {
      while ((input = list[i++])) {
        var c8n = input.connection
        var target = c8n.targetBlock()
        if (target) {
          c8n.disconnect()
          target.dispose()
        }
      }
      this.consolidate()
    }
  )
}

/**
 * Increment the change count.
 * Force to recompute the chain tile.
 * For edython.
 */
eYo.DelegateSvg.List.prototype.incrementInputChangeCount = function () {
  var i = 0
  var input
  while ((input = this.block_.inputList[i++])) {
    var c8n = input.connection
    var target = c8n.targetBlock()
    if (target) {
      target.eyo.incrementChangeCount()
    }
  }
  this.incrementChangeCount()
}

Object.defineProperties(eYo.DelegateSvg.List.prototype, {
  firstTarget: {
    get () {
      var t
      this.block_.inputList.some(input => (t = input.eyo.target))
      return t
    }
  }
})

/**
 * Class for a DelegateSvg, optional expression_list block.
 * This block may be wrapped.
 * Not normally called directly, eYo.DelegateSvg.create(...) is preferred.
 * For edython.
 */
eYo.DelegateSvg.List.makeSubclass('optional_expression_list', {
  list: {
    check: eYo.T3.Expr.Check.expression,
    mandatory: 0,
    presep: ',',
    hole_value: 'name'
  }
})

/**
 * Class for a DelegateSvg, expression_list block.
 * This block may be wrapped.
 * Not normally called directly, eYo.DelegateSvg.create(...) is preferred.
 * For edython.
 */
eYo.DelegateSvg.List.makeSubclass('non_void_expression_list', {
  list: {
    check: eYo.T3.Expr.Check.expression,
    mandatory: 1,
    presep: ',',
    hole_value: 'name'
  }
})

/**
 * Class for a DelegateSvg, slice_list block.
 * This block may be wrapped.
 * Not normally called directly, eYo.DelegateSvg.create(...) is preferred.
 * For edython.
 */
eYo.DelegateSvg.List.makeSubclass('slice_list', {
  list: {
    check: eYo.T3.Expr.Check.slice_item,
    mandatory: 1,
    presep: ','
  }
})

/**
 * Class for a DelegateSvg, with_item_list block.
 * This block may be wrapped.
 * Not normally called directly, eYo.DelegateSvg.create(...) is preferred.
 * For edython.
 */
eYo.DelegateSvg.List.makeSubclass('with_item_list', {
  list: {
    check: eYo.T3.Expr.Check.with_item,
    mandatory: 1,
    presep: ',',
    hole_value: 'nom'
  }
})

/**
 * Class for a DelegateSvg, enclosure block.
 * This block is for subclassing only.
 * Not normally called directly, eYo.DelegateSvg.create(...) is preferred.
 * For edython.
 * There are 4 kinds of enclosure lists:
 * 1) parent_form
 * 2) list_display
 * 3) set_display
 * 4) dict_display
 * Depending on the content of the list, the type is one of these.
 * We do not make the difference, except concerning the delimiters.
 * When the list is void, the type is not set_display.
 * Actually, the lists are stored as expression in xml.
 * There `eyo` attribute is built upon the delimiter,
 * '()' for parenth_form, '[]' for list_display,
 * '{}' for set_display and dict_display.
 * To make the difference between set_display and dict_display,
 * we must see the content.
 * The first connection will decide whether it is one or the other.
 * What is the check for a unique connection:
 * '()' and '[]': enclosure_list_unique
 * '{}': dict_comprehension
 * What are the checks for all the connections, when not unique
 * '()' and '{}': starred_item
 * '{}': key_datum_all
 * What are the possibilities with braces.
 * 1) void :
 * what can be connected: comprehension, dict_comprehension, star_item, key_datum_all
 * 2) singleton set_display: replacement for the unique connection: same as above
 * 3) singleton dict_display: replacement for the unique connection: same as above
 */
eYo.DelegateSvg.List.makeSubclass('enclosure', {
  data: {
    variant: {
      order: 0,
      all: [
        eYo.Key.PAR,
        eYo.Key.SQB,
        eYo.Key.BRACE
      ],
      init: eYo.Key.PAR,
      synchronize: /** @suppress {globalThis} */ function (newValue) {
        var o = this.owner
        o.fields.prefix.setValue(newValue[0])
        o.fields.suffix.setValue(newValue[1])
      },
      fromType: /** @suppress {globalThis} */ function (type) {
        if (type === eYo.T3.Expr.parenth_form) {
          this.set(eYo.Key.PAR)
        } else if (type === eYo.T3.Expr.list_display) {
          this.set(eYo.Key.SQB)
        } else if (type === eYo.T3.Expr.set_display) {
          this.set(eYo.Key.BRACE)
        } else if (type === eYo.T3.Expr.dict_display) {
          this.set(eYo.Key.BRACE)
        } else {
          this.set(eYo.Key.PAR)
        }
      }
    }
  },
  fields: {
    prefix: '',
    suffix: ''
  },
  list: (() => {
    var me = {
      unique: (type) => {
        return {
          [eYo.T3.Expr.parenth_form]: eYo.T3.Expr.Check.enclosure_list_unique,
          [eYo.T3.Expr.list_display]: [eYo.T3.Expr.comprehension],
          [eYo.T3.Expr.one_set_display]: [eYo.T3.Expr.comprehension, eYo.T3.Expr.dict_comprehension],
          [eYo.T3.Expr.set_display]: [eYo.T3.Expr.comprehension, eYo.T3.Expr.dict_comprehension],
          [eYo.T3.Expr.one_dict_display]: [eYo.T3.Expr.comprehension, eYo.T3.Expr.dict_comprehension],
          [eYo.T3.Expr.dict_display]: [eYo.T3.Expr.comprehension, eYo.T3.Expr.dict_comprehension]
        } [type]
      },
      check: (type) => {
        return {
          [eYo.T3.Expr.parenth_form]: eYo.T3.Expr.Check.starred_item,
          [eYo.T3.Expr.list_display]: eYo.T3.Expr.Check.starred_item,
          [eYo.T3.Expr.one_set_display]: eYo.T3.Expr.Check.starred_item,
          [eYo.T3.Expr.set_display]: eYo.T3.Expr.Check.starred_item,
          [eYo.T3.Expr.one_dict_display]: eYo.T3.Expr.Check.key_datum_all,
          [eYo.T3.Expr.dict_display]: eYo.T3.Expr.Check.key_datum_all
        } [type]
      },
      mandatory: 0,
      presep: ','
    }
    var all = {}
    ;[eYo.T3.Expr.parenth_form,
      eYo.T3.Expr.list_display,
      eYo.T3.Expr.set_display,
      eYo.T3.Expr.dict_display].forEach(k => {
      all[k] = goog.array.concat(me.unique(k), me.check(k))
    })
    all[eYo.T3.Expr.one_set_display] = all[eYo.T3.Expr.one_dict_display] = goog.array.concat(
      me.unique(eYo.T3.Expr.one_set_display),
      me.check(eYo.T3.Expr.dict_display),
      me.check(eYo.T3.Expr.set_display))
    me.all = (type) => {
      return all [type]
    }
    return me
  }) (),
  output: {
    check: /** @suppress {globalThis} */ function (type) {
      // retrieve the block delegate
      var b_eyo = this.b_eyo
      var target = b_eyo.firstTarget
      var p5e = b_eyo.profile_p
      if (target) {
        return [p5e]
      }
      if (p5e === eYo.T3.Expr.set_display || p5e === eYo.T3.Expr.dict_display ) {
        return [eYo.T3.Expr.set_display, eYo.T3.Expr.dict_display]
      }
      return [p5e]
    }
  }
})

Object.defineProperties(eYo.DelegateSvg.Expr.enclosure.prototype, {
  profile_p : {
    get () {
      var p = this.getProfile()
      return this.profile_ === p
        ? this.profile_
        : (this.profile_ = p)
    },
    set (newValue) {
      this.profile_ = newValue
    }
  }
})

/**
 * getProfile.
 * @return {!Object} with `ans` key.
 */
eYo.DelegateSvg.Expr.enclosure.prototype.getProfile = eYo.Decorate.onChangeCount(
  'getProfile',
  function () {
    // this may be called very very early when
    // neither `data` nor `slots` may exist yet
    if (this.data && this.slots) {
      var variant = this.variant_p
      if (variant === eYo.Key.PAR) {
        return {ans: eYo.T3.Expr.parenth_form}
      }
      if (variant === eYo.Key.SQB) {
        return {ans: eYo.T3.Expr.list_display}
      }
      var target = this.firstTarget
      if (target) {
        if (target.type === eYo.T3.Expr.comprehension) {
          return {ans: eYo.T3.Expr.set_display}
        } else if (target.type === eYo.T3.Expr.dict_comprehension) {
          return {ans: eYo.T3.Expr.dict_display}
        } else if (this.block_.inputList.length < 4) {
            if (this.model.list.all(eYo.T3.Expr.set_display).indexOf(target.type) >= 0) {
              return {ans: eYo.T3.Expr.one_set_display}
            } else {
              return {ans: eYo.T3.Expr.one_dict_display}
            }
        } else if (this.model.list.all(eYo.T3.Expr.set_display).indexOf(target.type) >= 0) {
          return {ans: eYo.T3.Expr.set_display}
        } else {
          return {ans: eYo.T3.Expr.dict_display}
        }
      }
      return {ans: eYo.T3.Expr.one_dict_display}
    }
    return {ans: eYo.T3.Expr.parenth_form}
  }
)

/**
 * getOutCheck.
 * The check_ array of the output connection.
 * @param {!Object} profile
 */
eYo.DelegateSvg.Expr.enclosure.prototype.getOutCheck = function (profile) {
  return [profile]
}

/**
 * getBaseType.
 * The type depends on the variant and the modifiers.
 * As side effect, the subtype is set.
 */
eYo.DelegateSvg.Expr.enclosure.prototype.getBaseType = function () {
  return this.profile_p
}
;['parenth_form', 'list_display', 'set_display', 'dict_display', 'one_set_display', 'one_dict_display'].forEach(k => {
  eYo.DelegateSvg.Expr[k] = eYo.DelegateSvg.Expr.enclosure
  eYo.DelegateSvg.Manager.register(k)
})

eYo.DelegateSvg.List.T3s = [
  eYo.T3.Expr.identifier,
  eYo.T3.Expr.comprehension,
  eYo.T3.Expr.dict_comprehension,
  eYo.T3.Expr.key_datum,
  eYo.T3.Expr.optional_expression_list,
  eYo.T3.Expr.non_void_expression_list,
  eYo.T3.Expr.parenth_form,
  eYo.T3.Expr.list_display,
  eYo.T3.Expr.set_display,
  eYo.T3.Expr.dict_display,
  eYo.T3.Expr.slice_list,
  eYo.T3.Expr.dict_display,
  eYo.T3.Expr.with_item_list
]
