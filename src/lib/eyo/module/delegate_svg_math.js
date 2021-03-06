/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */
/**
 * @fileoverview Math module blocks for edython.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */
'use strict'

goog.provide('eYo.DelegateSvg.Math')

goog.require('eYo.Msg')
goog.require('eYo.DelegateSvg.Stmt')

goog.require('eYo.DelegateSvg.List')
goog.require('eYo.DelegateSvg.Primary')

goog.require('eYo.Tooltip')
goog.require('eYo.FlyoutCategory')

goog.require('eYo.Model.math__module')

var doit = (() => {

var F = (name, title) => {
  var key = 'math__'+name
  title && (eYo.Tooltip.Title[key] = title)
  return {
    type: eYo.T3.Expr.call_expr,
    data: {
      name: name,
      holder: 'math',
      dotted: 0
    },
    title: key
  }
}
var F_k = (name, title) => {
  var key = 'math__'+name
  title && (eYo.Tooltip.Title[key] = title)
  return {
    type: eYo.T3.Expr.attributeref,
    data: {
      name: name,
      holder: 'math',
      dotted: 0
    },
    title: key
  }
}
eYo.FlyoutCategory.basic_math__module = [
  {
    type: eYo.T3.Stmt.import_stmt,
    data: {
      variant: eYo.Key.FROM_MODULE_IMPORT_STAR,
      from: 'math'
    }
  },
  F('sqrt', 'Racine carrée (square root)'),
  F('pow', 'Fonction puissance (power), préférer l\'opérateur ** pour les entiers'),
  F_k('pi', 'π (approximation)'),
  F('cos', 'Fonction cosinus'),
  F('sin', 'Fonction sinus'),
  F('tan', 'Fonction tangente'),
  F('hypot', 'Fonction hypothénuse (module), distance euclidienne à l\'origine'),
  F('atan2', 'Fonction angle polaire (argument)'),
  F('degrees', 'Pour convertir en degrés'),
  F('radians', 'Pour convertif en radians'),
  F_k('e', 'e (approximation de la constante d\'Euler)'),
  F('exp', 'Fonction exponentielle'),
  F('log', 'Fonction logarithme népérien, donner un deuxième argument pour changer de base'),
  F('log10', 'Fonction logarithme de base 10'),
  F('gcd', 'Plus grand diviseur commun (pgcd)'),
  F('floor', 'Partie entière par défaut'),
  F('ceil', 'Partie entière par excès'),
  F('trunc', 'Partie tronquée (parmi les deux parties entières, celles qui est le plus proche de 0) '),
  F('factorial', 'Factorielle (n!)'),
  F('acos', 'Fonction arc cosinus'),
  F('asin', 'Fonction arc sinus'),
  F('atan', 'Fonction arc tangente'),
  // F('phi', 'Fonction de répartition de la loi normale centrée réduite'),
  // F('fmod', 'modulo avec des nombres, préférer % pour des arguments entiers'),
  // F('fsum', 'Somme pour des nombres entiers ou non, tient compte de problèmes d\'arrondi'),
  // F('copysign', 'Copie le signe d\'un nombre sur l\'autre'),
  // F('fabs', 'Valeur absolue ou module'),
  // F('modf', 'Parties entière et fractionnaire'),
  // F('frexp', 'Représentation interne m * 2 ** e'),
  // F('ldexp', 'Renvoie  m * 2 ** e, fonction inverse de frexp'),
  // F('isclose', 'Teste si deux valeurs sont proches'),
  // F('isfinite', 'Teste si l\'argument est un nombre fini'),
  // F('isinf', 'Teste si l\'argument est infini (au sens informatique)'),
  // F('isnan', 'Teste si l\'argument n\'est pas un nombre (Not A Number)'),
  // F('cosh', 'Fonction cosinus hyperbolique (ch)'),
  // F('sinh', 'Fonction sinus hyperbolique (sh)'),
  // F('tanh', 'Fonction tangente hyperbolique (th)'),
  // F('acosh', 'Fonction arc cosinus hyperbolique (argch)'),
  // F('asinh', 'Fonction arc sinus hyperbolique (argsh)'),
  // F('atanh', 'Fonction arc tangente hyperbolique (argth)'),
  // F('expm1', 'Fonction exp(x) - 1, avec une meilleure précision près de 0'),
  // F('log1p', 'log(1 + x), avec une meilleure précision près de 0'),
  // F('log10', 'Fonction logarithme de base 10 avec une meilleure précision que (log(x, 10)'),
  // F('log2', 'Fonction logarithme de base 2 avec une meilleure précision que (log(x, 2)'),
  // F('erf', 'Fonction erreur de Gauss'),
  // F('erfc', 'Complément à 1 de la fonction erf'),
  // F('gamma', 'Fonction Gamma d\'Euler'),
  // F('lgamma', 'Logarithme népérien de la fonction Gamma')
]

var F = (name, title) => {
  var key = 'math__'+name
  title && (eYo.Tooltip.Title[key] = title)
  return {
    type: eYo.T3.Expr.call_expr,
    data: {
      name: name,
      holder: 'math',
      dotted: 1
    },
    title: key
  }
}
var F_k = (name, title) => {
  var key = 'math__'+name
  title && (eYo.Tooltip.Title[key] = title)
  return {
    type: eYo.T3.Expr.attributeref,
    data: {
      name: name,
      holder: 'math',
      dotted: 1
    },
    title: key
  }
}
eYo.FlyoutCategory.math__module = [
  {
    type: eYo.T3.Stmt.import_stmt,
    data: {
      variant: eYo.Key.IMPORT
    },
    slots: {
      import_module: {
        slots: {
          O: {
            type: eYo.T3.Expr.identifier,
            data: 'math',
          },
        },
      }
    }
  },
  F('sqrt', 'Racine carrée (square root)'),
  F('pow', 'Fonction puissance (power), préférer l\'opérateur ** pour les entiers'),
  F_k('pi', 'π (≅)'),
  F_k('tau', 'τ (≅ 2π)'),
  F('cos', 'Fonction cosinus'),
  F('sin', 'Fonction sinus'),
  F('tan', 'Fonction tangente'),
  F('hypot', 'Fonction hypothénuse (module), distance euclidienne à l\'origine'),
  F('atan2', 'Fonction angle polaire (argument)'),
  F('degrees', 'Pour convertir en degrés'),
  F('radians', 'Pour convertif en radians'),
  F_k('e', 'e (≅)'),
  F('exp', 'Fonction exponentielle'),
  F('log', 'Fonction logarithme népérien, donner un deuxième argument pour changer de base'),
  F('phi', 'Fonction de répartition de la loi normale centrée réduite'),
  F('gcd', 'Plus grand diviseur commun (pgcd)'),
  F('factorial', 'Factorielle (n!)'),
  F('floor', 'Partie entière par défaut'),
  F('ceil', 'Partie entière par excès'),
  F('trunc', 'Partie tronquée (parmi les deux parties entières, celles qui est le plus proche de 0) '),
  F('fmod', 'modulo avec des nombres, préférer % pour des arguments entiers'),
  F('fsum', 'Somme pour des nombres entiers ou non, tient compte de problèmes d\'arrondi'),
  F('copysign', 'Copie le signe d\'un nombre sur l\'autre'),
  F('fabs', 'Valeur absolue ou module'),
  F('modf', 'Parties entière et fractionnaire'),
  F('frexp', 'Représentation interne m * 2 ** e'),
  F('ldexp', 'Renvoie  m * 2 ** e, fonction inverse de frexp'),
  F('isclose', 'Teste si deux valeurs sont proches'),
  F('isfinite', 'Teste si l\'argument est un nombre fini'),
  F('isinf', 'Teste si l\'argument est infini (au sens informatique)'),
  F_k('inf', '∞'),
  F('isnan', 'Teste si l\'argument n\'est as un nombre (Not A Number)'),
  F_k('nan', 'nan (not a number)'),
  F('acos', 'Fonction arc cosinus'),
  F('asin', 'Fonction arc sinus'),
  F('atan', 'Fonction arc tangente'),
  F('cosh', 'Fonction cosinus hyperbolique (ch)'),
  F('sinh', 'Fonction sinus hyperbolique (sh)'),
  F('tanh', 'Fonction tangente hyperbolique (th)'),
  F('acosh', 'Fonction arc cosinus hyperbolique (argch)'),
  F('asinh', 'Fonction arc sinus hyperbolique (argsh)'),
  F('atanh', 'Fonction arc tangente hyperbolique (argth)'),
  F('expm1', 'Fonction exp(x) - 1, avec une meilleure précision près de 0'),
  F('log1p', 'log(1 + x), avec une meilleure précision près de 0'),
  F('log10', 'Fonction logarithme de base 10 avec une meilleure précision que log(x, 10)'),
  F('log2', 'Fonction logarithme de base 2 avec une meilleure précision que log(x, 2)'),
  F('erf', 'Fonction erreur de Gauss'),
  F('erfc', 'Complément à 1 de la fonction erf'),
  F('gamma', 'Fonction Gamma d\'Euler'),
  F('lgamma', 'Logarithme népérien de la fonction Gamma')
]

})()

goog.mixin(eYo.Tooltip.Title, {
  math__import_stmt: 'Importer le module math',
})

eYo.DelegateSvg.Math.T3s = [
  eYo.T3.Stmt.math__import_stmt,
  eYo.T3.Expr.math__call_expr,
  eYo.T3.Stmt.math__call_stmt,
  eYo.T3.Expr.math__const
]
