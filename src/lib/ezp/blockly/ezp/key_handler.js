/**
 * ezPython
 *
 * Copyright 2017 Jérôme LAURENS.
 *
 * License CeCILL-B
 */
/**
 * @fileoverview Block delegates for ezPython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('ezP.KeyHandler')

goog.require('ezP')
goog.require('goog.dom');
goog.require('goog.events.KeyCodes');
goog.require('goog.ui.KeyboardShortcutHandler');

/**
 * Key handler class.
 * For ezPython.
 * @param {!constructor} constructor is either a constructor or the name of a constructor.
 */
ezP.KeyHandler = {}

/**
 * Setup the shared key handler.
 * For ezPython.
 * @param {!constructor} constructor is either a constructor or the name of a constructor.
 */
ezP.KeyHandler.setup = function (document) {
  if (ezP.KeyHandler.shared) {
    return
  }
  ezP.KeyHandler.shared = new goog.ui.KeyboardShortcutHandler(document)

  ezP.KeyHandler.shared.registerShortcut('↓', goog.events.KeyCodes.DOWN);
  ezP.KeyHandler.shared.registerShortcut('↑', goog.events.KeyCodes.UP);
  ezP.KeyHandler.shared.registerShortcut('→', goog.events.KeyCodes.LEFT);
  ezP.KeyHandler.shared.registerShortcut('←', goog.events.KeyCodes.RIGHT);
  ezP.KeyHandler.shared.registerShortcut(' ', goog.events.KeyCodes.SPACE);
  // ezP.KeyHandler.shared.registerShortcut('ENTER', goog.events.KeyCodes.ENTER);
  
  ezP.KeyHandler.shared.listen(
    goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
      function(e) {
        var B = Blockly.selected
        if (B) {
        switch(e.identifier) {
          case ' ': ezP.MenuManager.shared().showMenu(B, e); return
          case '↓': B.ezp.selectBlockAfter(B); return
          case '↑': B.ezp.selectBlockBefore(B); return
          default:
          console.log('selected', e.identifier)
        }
      } else {
        console.log(e.identifier)
      }
    }
  )
}


