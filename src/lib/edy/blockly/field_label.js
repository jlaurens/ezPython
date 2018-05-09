/**
 * ezPython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License CeCILL-B
 */
/**
 * @fileoverview Non-editable text field for hard coded python code.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('edY.FieldLabel')

goog.require('Blockly.FieldLabel')
goog.require('edY.Block')

/**
 * Class for a non-editable field.
 * The only purpose is to start with a different height.
 * @param {string} text The initial content of the field.
 * @param {string=} optClass Optional CSS class for the field's text.
 * @extends {Blockly.Field}
 * @constructor
 */
edY.FieldLabel = function (text, optClass) {
  edY.FieldLabel.superClass_.constructor.call(this, text, optClass)
  this.size_ = new goog.math.Size(0, edY.Font.height)
  this.edy = {}
}
goog.inherits(edY.FieldLabel, Blockly.FieldLabel)

/**
 * Install this text on a block.
 */
edY.FieldLabel.prototype.init = function () {
  if (this.textElement_) {
    // Text has already been initialized once.
    return
  }
  // Build the DOM.
  this.textElement_ = Blockly.utils.createSvgElement('text',
    {'class': 'edy-label', 'y': edY.Font.totalAscent}, null)
  if (this.class_) {
    goog.dom.classlist.add(this.textElement_, this.class_)
  }
  if (this.edy.css_class) {
    goog.dom.classlist.add(this.textElement_, this.edy.css_class)
  }
  if (this.edy.tile) {
    this.edy.tile.getSvgRoot().appendChild(this.textElement_)
  } else {
    this.sourceBlock_.getSvgRoot().appendChild(this.textElement_)
  }

  // Configure the field to be transparent with respect to tooltips.
  this.textElement_.tooltip = this.sourceBlock_
  Blockly.Tooltip.bindMouseEvents(this.textElement_)
  // Force a render.
  this.render_()
}

/**
 * Updates the width of the field. This calls getCachedWidth which won't cache
 * the approximated width on IE/Edge when `getComputedTextLength` fails. Once
 * it eventually does succeed, the result will be cached.
 **/
Blockly.Field.prototype.updateWidth = function () {
  var width = Blockly.Field.getCachedWidth(this.textElement_)
  if (this.borderRect_) {
    this.borderRect_.setAttribute('width', width+2*edY.Style.Edit.padding_h)
  }
  this.size_.width = width
}

/**
 * Adds an anchor to let the source block's delegate know
 * when the value has changed.
 * @param {string} newValue New value.
 */
edY.FieldLabel.prototype.setValue = function(newValue) {
  var oldValue = this.getText()
  edY.FieldLabel.superClass_.setValue.call(this, newValue)
  if (this.name) {
    var block = this.sourceBlock_
    if (block && block.edy.fieldValueDidChange) {
      block.edy.fieldValueDidChange(block, this.name, oldValue)
    }
  }
}