// Copyright 2007 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License")
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview A class for representing items in menus.
 * JL: the accelerator class has changed.
 *
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */

goog.provide('edY.MenuItem')
goog.provide('edY.MenuItemCode')
goog.provide('edY.MenuItemVar')
goog.provide('edY.Separator')

goog.require('goog.ui.MenuItem')
goog.require('goog.ui.Separator')
goog.require('edY.MenuItemRenderer')
goog.require('edY.SeparatorRenderer')

// goog.forwardDeclare('goog.ui.Menu'); // circular

/**
 * Class representing an item in a menu.
 *
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {*=} optModel Data/model associated with the menu item.
 * @param {goog.dom.DomHelper=} optDomHelper Optional DOM helper used for
 *     document interactions.
 * @param {goog.ui.MenuItemRenderer=} optRenderer Optional renderer.
 * @constructor
 * @extends {goog.ui.Control}
 */
edY.MenuItem = function (content, optModel, optDomHelper, optRenderer) {
  goog.ui.Control.call(
    this, content, optRenderer || edY.MenuItemRenderer.getInstance(),
    optDomHelper)
  this.setValue(optModel)
  this.setCheckable(false)
}
goog.inherits(edY.MenuItem, goog.ui.MenuItem)
goog.tagUnsealableClass(edY.MenuItem)

/**
 * The class set on an element that contains a parenthetical mnemonic key hint.
 * Parenthetical hints are added to items in which the mnemonic key is not found
 * within the menu item's caption itself. For example, if you have a menu item
 * with the caption "Record," but its mnemonic key is "I", the caption displayed
 * in the menu will appear as "Record (I)".
 *
 * @type {string}
 * @private
 */
edY.MenuItem.MNEMONIC_WRAPPER_CLASS_ =
    edY.MenuItemRenderer.CSS_CLASS + '-mnemonic-separator'

/**
 * The class set on an element that contains a keyboard accelerator hint.
 * @type {string}
 */
goog.ui.MenuItem.ACCELERATOR_CLASS = edY.MenuItemRenderer.CSS_CLASS + '-accel'

/**
 * Returns the text caption of the component while ignoring accelerators.
 * @override
 */
edY.MenuItem.prototype.getCaption = function () {
  var content = this.getContent()
  if (goog.isArray(content)) {
    var acceleratorClass = edY.MenuItem.ACCELERATOR_CLASS
    var mnemonicWrapClass = edY.MenuItem.MNEMONIC_WRAPPER_CLASS_
    var caption =
        goog.array
          .map(
            content,
            function (node) {
              if (goog.dom.isElement(node) &&
                      (goog.dom.classlist.contains(
                        /** @type {!Element} */ (node), acceleratorClass) ||
                       goog.dom.classlist.contains(
                         /** @type {!Element} */ (node),
                         mnemonicWrapClass))) {
                return ''
              } else {
                return goog.dom.getRawTextContent(node)
              }
            })
          .join('')
    return goog.string.collapseBreakingSpaces(caption)
  }
  return goog.ui.MenuItem.superClass_.getCaption.call(this)
}

/**
 * @return {?string} The keyboard accelerator text, or null if the menu item
 *     doesn't have one.
 */
edY.MenuItem.prototype.getAccelerator = function () {
  var dom = this.getDomHelper()
  var content = this.getContent()
  if (goog.isArray(content)) {
    var acceleratorEl = goog.array.find(content, function (e) {
      return goog.dom.classlist.contains(
        /** @type {!Element} */ (e), edY.MenuItem.ACCELERATOR_CLASS)
    })
    if (acceleratorEl) {
      return dom.getTextContent(acceleratorEl)
    }
  }
  return null
}

/**
 * Class representing an item in a menu.
 *
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {*=} optModel Data/model associated with the menu item.
 * @param {goog.dom.DomHelper=} optDomHelper Optional DOM helper used for
 *     document interactions.
 * @param {goog.ui.MenuItemRenderer=} optRenderer Optional renderer.
 * @constructor
 * @extends {goog.ui.Control}
 */
edY.MenuItem = function (content, optModel, optDomHelper, optRenderer) {
  goog.ui.Control.call(
    this, content, optRenderer || edY.MenuItemRenderer.getInstance(),
    optDomHelper)
  this.setValue(optModel)
}
goog.inherits(edY.MenuItem, goog.ui.MenuItem)
goog.tagUnsealableClass(edY.MenuItem)

/**
 * Class representing a piece of code in a menu.
 *
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {*=} optModel Data/model associated with the menu item.
 * @param {goog.dom.DomHelper=} optDomHelper Optional DOM helper used for
 *     document interactions.
 * @param {goog.ui.MenuItemRenderer=} optRenderer Optional renderer.
 * @constructor
 * @extends {goog.ui.MenuItem}
 */
edY.MenuItemCode = function (content, optModel, optDomHelper, optRenderer) {
  goog.ui.MenuItem.call(
    this, content, optModel,
    optDomHelper, optRenderer || edY.MenuItemCodeRenderer.getInstance())
}
goog.inherits(edY.MenuItemCode, goog.ui.MenuItem)
goog.tagUnsealableClass(edY.MenuItemCode)

/**
 * Class representing an item for a variable in a menu.
 *
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {String} action, string identifying the action.
 * @param {String} value, value associated to the action.
 * @constructor
 * @extends {edY.SimpleMenuItemCode}
 */
edY.SimpleMenuItemCode = function (content, action, value) {
  edY.SimpleMenuItemCode.superClass_.constructor.call(
    this, content, [action, value],
    undefined, edY.MenuItemCodeRenderer.getInstance())
}
goog.inherits(edY.SimpleMenuItemCode, edY.MenuItemCode)
goog.tagUnsealableClass(edY.SimpleMenuItemCode)

/**
 * Class representing an item for a variable in a menu.
 *
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {*=} optModel Data/model associated with the menu item.
 * @param {goog.dom.DomHelper=} optDomHelper Optional DOM helper used for
 *     document interactions.
 * @param {goog.ui.MenuItemRenderer=} optRenderer Optional renderer.
 * @constructor
 * @extends {goog.ui.MenuItem}
 */
edY.MenuItemVar = function (content, optModel, optDomHelper, optRenderer) {
  goog.ui.Control.call(
    this, content, optRenderer || edY.MenuItemVarRenderer.getInstance(),
    optDomHelper)
  this.setValue(optModel)
}
goog.inherits(edY.MenuItemVar, goog.ui.MenuItem)
goog.tagUnsealableClass(edY.MenuItemVar)

/**
 * Class representing a separator.  Although it extends {@link goog.ui.Control},
 * the Separator class doesn't allocate any event handlers, nor does it change
 * its appearance on mouseover, etc.
 * @param {goog.ui.MenuSeparatorRenderer=} optRenderer Renderer to render or
 *    decorate the separator; defaults to {@link edY.MenuSeparatorRenderer}.
 * @param {goog.dom.DomHelper=} optDomHelper Optional DOM helper, used for
 *    document interaction.
 * @constructor
 * @extends {goog.ui.Control}
 */
edY.Separator = function (optRenderer, optDomHelper) {
  edY.Separator.superClass_.constructor.call(
    this, optRenderer || edY.MenuSeparatorRenderer.getInstance(),
    optDomHelper)
}
goog.inherits(edY.Separator, goog.ui.Separator)
