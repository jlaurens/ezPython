/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */
/**
 * @fileoverview utilities for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.FieldHelper')

goog.require('eYo.XRE')
goog.require('eYo.Size')
goog.require('eYo.Field')

/**
 * Class for an editable text field helper.
 * @param {eYo.TextInputField} owner  The owner of the field.
 * @constructor
 */
eYo.FieldHelper = function (field) {
  this.field_ = field
  field.eyo = this
  this.size = new eYo.Size(0, 1)
  this.reentrant = {}
  this.model = {}
}

Object.defineProperties(
  eYo.FieldHelper.prototype,
  {
    b_eyo: {
      get () {
        return this.field_.sourceBlock_.eyo
      }
    },
    textElement: {
      get () {
        return this.field_.textElement_
      }
    }
  }
)
/**
 * Whether the field of the receiver starts with a separator.
 */
eYo.FieldHelper.prototype.startsWithSeparator = function () {
  // if the text is void, it can not change whether
  // the last character was a letter or not
  var text = this.field_.getDisplayText_()
  if (text.length) {
    if (this.field_.name === 'separator'
      || (this.model && this.model.separator)
      || eYo.XRE.operator.test(text[0])
      || eYo.XRE.delimiter.test(text[0])
      || text[0] === '.'
      || text[0] === ':'
      || text[0] === ','
      || text[0] === ';') {
      // add a separation before
      return true
    }
  }
}

/**
 * Late delegate.
 */
eYo.FieldHelper.prototype.getDlgt = function () {
  return this.field_.sourceBlock_.eyo
}

/**
 * Default method to start editing.
 * @this {Object} is a field owning an helper
 */
eYo.FieldHelper.onStartEditing = function () {
}

/**
 * Default method to end editing.
 * @this {Object} is a field owning an helper
 */
eYo.FieldHelper.onEndEditing = function () {
  var newValue = this.getValue()
  this.eyo.data.fromField(newValue)
}

/**
 * Validate the keyed data of the source block.
 * Asks the data object to do so.
 * The bound data must exist.
 * @param {Object} txt
 */
eYo.FieldHelper.prototype.validate = function (txt) {
  var v = this.data.validate(goog.isDef(txt) ? txt : this.field_.getValue())
  return v === null ? v : (goog.isDef(v) && goog.isDef(v.validated) ? v.validated : txt)
}

/**
 * Validate the keyed data of the source block.
 * Asks the data object to do so.
 * The bound data must exist.
 * @param {Object} txt
 */
eYo.FieldHelper.prototype.validateIfData = function (txt) {
  if (this.data) {
    return this.validate(txt)
  }
  return txt
}

/**
 * Set the entire dom class list.
 * @param {!String} class_name
 */
eYo.FieldHelper.prototype.set_css_class = function (class_name) {
  var e = this.field_.textElement_
  if (e) {
    goog.dom.classlist.removeAll(e, goog.dom.classlist.get(e))
    goog.dom.classlist.add(e, class_name)
  }
}

/**
 * Will render the field.
 * We can call `this.willRender()` from the model.
 */
eYo.FieldHelper.prototype.willRender = function () {
  var f = this.model && eYo.Decorate.reentrant_method.call(this, 'model_willRender', this.model.willRender)
  if (f) {
    f.call(this)
  } else {
    var field = this.field_
    var root = field.getSvgRoot()
    if (root && field.isVisible()) {
      if (field.eyo.placeholder) {
        goog.dom.classlist.add(field.textElement_, 'eyo-code-placeholder')
      } else {
        goog.dom.classlist.remove(field.textElement_, 'eyo-code-placeholder')
      }
      if (field.eyo.isComment) {
        goog.dom.classlist.add(field.textElement_, 'eyo-code-comment')
      } else {
        goog.dom.classlist.remove(field.textElement_, 'eyo-code-comment')
      }
    }
  }
}
