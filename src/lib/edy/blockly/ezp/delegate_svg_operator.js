/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License CeCILL-B
 */
/**
 * @fileoverview BlockSvg delegates for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('edY.DelegateSvg.Operator')

goog.require('edY.DelegateSvg.Expr')

/**
 * Class for a DelegateSvg, [...] op ... block.
 * Multiple ops.
 * Abstract class.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Expr.makeSubclass('Operator', {
  data: {
    operator: { // only one field with that key
      synchronize: true,
    },
  },
  tiles: {
    rhs: {
      order: 2,
      fields: {
        operator: '',
      },
      hole_value: 'name',
    },
  },
}, edY.DelegateSvg)

/**
 * Get the content for the menu item.
 * @param {!Blockly.Block} block The block.
 * @param {string} op op is the label
 * @private
 */
edY.DelegateSvg.Operator.prototype.makeTitle = /* function (block, op) {
} */ undefined

/**
 * When the block is just a wrapper, returns the wrapped target.
 * @param {!Blockly.Block} block owning the delegate.
 */
edY.DelegateSvg.Operator.prototype.getMenuTarget = function(block) {
  return block
}

/**
 * Populate the context menu for the given block.
 * @param {!Blockly.Block} block The block.
 * @param {!edY.MenuManager} mgr mgr.menu is the menu to populate.
 * @private
 */
edY.DelegateSvg.Operator.prototype.populateContextMenuFirst_ = function (block, mgr) {
  var yorn = mgr.populateProperties(block, 'operator')
  return edY.DelegateSvg.Operator.superClass_.populateContextMenuFirst_.call(this, block, mgr) || yorn
}

//////////////////////  u_expr_s3d  /////////////////////////

/**
 * Class for a DelegateSvg, unary op ... block.
 * u_expr_s3d.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Operator.makeSubclass('u_expr_s3d', {
  data: {
    operator: {
      all: ['-', '+', '~'],
    },
  },
  tiles: {
    rhs: {
      check: edY.T3.Expr.Check.u_expr,
    },
  },
})

/**
 * Get the content for the menu item.
 * @param {!Blockly.Block} block The block.
 * @param {string} op op is the operator
 * @private
 */
edY.DelegateSvg.Expr.u_expr_s3d.prototype.makeTitle = function (block, op) {
  return op+' …'
}

/**
 * Class for a DelegateSvg, ... op ... block.
 * Multiple ops.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Operator.makeSubclass('Binary',{
  tiles: {
    lhs: {
      order: 1,
      hole_value: 'name',
    },
  },
}, edY.DelegateSvg)

/**
 * Get the content for the menu item.
 * @param {!Blockly.Block} block The block.
 * @param {string} op op is the operator
 * @private
 */
edY.DelegateSvg.Binary.prototype.makeTitle = function (block, op) {
  return '… '+ op +' …'
}

/**
 * Convenient model maker.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Binary.makeModel = function(operators, check1, check3, operatorIndex) {
  return {
    data: {
      operator: {
        all: operators,
        default: operatorIndex || 0,
      },
    },
    tiles: {
      lhs: {
        check: edY.T3.Expr.Check[check1]
      },
      rhs: {
        check: edY.T3.Expr.Check[check3]
      },
    },
  }
}

/**
 * Class for a DelegateSvg, m_expr_s3d block.
 * Multiple ops.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Binary.makeSubclass(
  'm_expr_s3d',
  edY.DelegateSvg.Binary.makeModel(
    ['*', '//', '/', '%', '@'],
    'm_expr',
    'u_expr',
  )
)

/**
 * Class for a DelegateSvg, a_expr_s3d block.
 * Multiple ops.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Binary.makeSubclass(
  'a_expr_s3d',
  edY.DelegateSvg.Binary.makeModel(
    ['+', '-'],
    'a_expr',
    'm_expr',
  ),
)

/**
 * Class for a DelegateSvg, shift_expr_s3d block.
 * Multiple ops.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Binary.makeSubclass(
  'shift_expr_s3d',
  edY.DelegateSvg.Binary.makeModel(
    ['<<', '>>'],
    'shift_expr',
    'a_expr',
  ),
)

/**
 * Class for a DelegateSvg, and_expr_s3d block.
 * Multiple ops.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Binary.makeSubclass(
  'and_expr_s3d',
  edY.DelegateSvg.Binary.makeModel(
    ['&'],
    'and_expr',
    'shift_expr',
  ),
)

/**
 * Class for a DelegateSvg, xor_expr_s3d block.
 * Multiple ops.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Binary.makeSubclass(
  'xor_expr_s3d',
  edY.DelegateSvg.Binary.makeModel(
    ['^'],
    'xor_expr',
    'and_expr',
  ),
)

/**
 * Class for a DelegateSvg, or_expr_s3d block.
 * Multiple ops.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Binary.makeSubclass(
  'or_expr_s3d',
  edY.DelegateSvg.Binary.makeModel(
    ['|'],
    'or_expr',
    'or_expr',
  ),
)

/**
 * Class for a DelegateSvg, number_comparison block.
 * Multiple ops. This is not a list of comparisons, more like a tree.
 * Maybe we should make a flat version in order to compare the blocks
 * if necessary ever.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Binary.makeSubclass(
  'number_comparison',
  edY.DelegateSvg.Binary.makeModel(
    ['<', '>', '==', '>=', '<=', '!='],
    'comparison',
    'comparison',
  ),
)
console.log('where is the operator displayed ?')
/**
 * Class for a DelegateSvg, object_comparison block.
 * Multiple ops. This is not a list of comparisons, more like a tree.
 * Maybe we should make a flat version in order to compare the blocks
 * if necessary ever.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Binary.makeSubclass('object_comparison', {
  data: {
    operator: {
      all: ['is', 'is not', 'in', 'not in'],
      default: 2,
    },
  },
  tiles: {
    lhs: {
      check: edY.T3.Expr.Check.comparison
    },
    rhs: {
      css_class: 'edy-code-reserved',
      check: edY.T3.Expr.Check.comparison
    },
  },
})

/**
 * Get the content for the menu item.
 * @param {!Blockly.Block} block The block.
 * @param {string} op op is the operator
 * @private
 */
edY.DelegateSvg.Expr.object_comparison.prototype.makeTitle = function (block, op) {
  return edY.Do.createSPAN(op, 'edy-code-reserved')
}

/**
 * Class for a DelegateSvg, or_test_s3d block.
 * Multiple ops.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
console.warn('Check the css-class below, does it belong there?')
edY.DelegateSvg.Binary.makeSubclass('or_test_s3d', {
  data: {
    operator: {
      all: ['or'],
    }
  },
  tiles: {
    lhs: {
      check: edY.T3.Expr.Check.or_test
    },
    rhs: {
      fields: {
        operator: {
          css: 'reserved',
        },
      },
      check: edY.T3.Expr.Check.and_test
    },
  },
})

/**
 * Class for a DelegateSvg, and_test_s3d block.
 * Multiple ops.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Binary.makeSubclass('and_test_s3d', {
  data: {
    operator: {
      all: ['and'],
    }
  },
  tiles: {
    lhs: {
      check: edY.T3.Expr.Check.and_test
    },
    rhs: {
      fields: {
        operator: {
          css: 'reserved',
        }
      },
      check: edY.T3.Expr.Check.not_test
    },
  },
})

///////// power ////////
/**
 * Class for a DelegateSvg, power_s3d block.
 * power_s3d ::= await_or_primary "**" u_expr
 * This one is not a binary.
 * For edython.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @constructor
 */
edY.DelegateSvg.Operator.makeSubclass('power_s3d', {
  data: {
    operator: {
      default: '**',
    },
  },
  tiles: {
    lhs: {
      order: 1,
      check: edY.T3.Expr.Check.await_or_primary,
      hole_value: 'name',
    },
    rhs: {
      order: 2,
      check: edY.T3.Expr.Check.u_expr,
      hole_value: 'power',
    },
  },
})

edY.DelegateSvg.Operator.T3s = [
  edY.T3.Expr.u_expr_s3d,
  edY.T3.Expr.m_expr_s3d,
  edY.T3.Expr.a_expr_s3d,
  edY.T3.Expr.shift_expr_s3d,
  edY.T3.Expr.and_expr_s3d,
  edY.T3.Expr.xor_expr_s3d,
  edY.T3.Expr.or_expr_s3d,
  edY.T3.Expr.number_comparison,
  edY.T3.Expr.object_comparison,
  edY.T3.Expr.or_test_s3d,
  edY.T3.Expr.and_test_s3d,
  edY.T3.Expr.power_s3d,
]