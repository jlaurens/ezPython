/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */
/**
 * @fileoverview Statistics module blocks for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.DelegateSvg.Statistics')

goog.require('eYo.Msg')
goog.require('eYo.DelegateSvg.Stmt')

goog.require('eYo.DelegateSvg.List')
goog.require('eYo.DelegateSvg.Primary')

goog.require('eYo.Tooltip')
goog.require('eYo.FlyoutCategory')

/*
    'pstdev': 7,
    'stdev': 9,
    'median_high': 4,
    'pvariance': 8,
    'variance': 10,
    'median_low': 3,
    'median': 2,
    'median_grouped': 5,
    'StatisticsError': 11,
    'mode': 6,
    'mean': 0,
    'harmonic_mean': 1
 */

var doit = (() => {

var F = (name, title) => {
  var key = 'statistics__'+name
  title && (eYo.Tooltip.Title[key] = title)
  return {
    type: eYo.T3.Expr.call_expr,
    data: {
      name: name,
      holder: 'statistics',
      dotted: 0
    },
    title: key
  }
}

eYo.FlyoutCategory.basic_statistics__module = [
  {
    type: eYo.T3.Stmt.import_stmt,
    from_d: 'statistics',
    variant_d: eYo.Key.FROM_MODULE_IMPORT_STAR,
    title: 'statistics__import_stmt'
  },
  F('mode', 'Mode de l\'argument, une séquence ou un itérateur, en tant que valeur représentative.'),
  F('mean', 'Moyenne arithmétique de l\'argument, une séquence ou un itérateur.'),
  F('harmonic_mean', 'Moyenne harmonique de l\'argument, une séquence ou un itérateur.'),
  F('median', 'Valeur médiane de l\'argument, une séquence ou un itérateur.'),
  F('median_high', 'Valeur médiane (sans moyenne et par excès) de l\'argument, une séquence ou un itérateur.'),
  F('median_low', 'Valeur médiane (sans moyenne et par défaut) de l\'argument, une séquence ou un itérateur.'),
  F('median_grouped', 'Valeur médiane de l\'argument, une séquence ou un itérateur avec répétitions possibles.'),
  F('pstdev', 'Écart type d\'une population'),
  F('pvariance', 'Variance d\'une population'),
  F('stdev', 'Écart type d\'un échantillon d\'une population'),
  F('variance', 'Variance d\'un échantillon d\'une population'),
  F('StatisticsError', 'Exception spécifique au module `statistics`')
]

var F = (name, title) => {
  var key = 'statistics__'+name
  title && (eYo.Tooltip.Title[key] = title)
  return {
    type: eYo.T3.Expr.call_expr,
    data: {
      name: name,
      holder: 'statistics',
      dotted: 1
    },
    title: key
  }
}

eYo.FlyoutCategory.statistics__module = [
  {
    type: eYo.T3.Stmt.import_stmt,
    variant_d: eYo.Key.IMPORT,
    import_module_s: {
      slots: {
        O: {
          type: eYo.T3.Expr.identifier,
          data: 'statistics'
        }
      }
    }
  },
  F('mode'),
  F('mean'),
  F('harmonic_mean'),
  F('median'),
  F('median_high'),
  F('median_low'),
  F('median_grouped'),
  F('pstdev'),
  F('pvariance'),
  F('stdev'),
  F('variance'),
  F('StatisticsError')
]

})()

goog.mixin(eYo.Tooltip.Title, {
  statistics__import_stmt: 'Importer le module statistics',
})

eYo.DelegateSvg.Fractions.T3s = [
  eYo.T3.Fraction
]
