/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

/**
 * @fileoverview Webpack loader to inflate, eventually.
 * @author jerome.laurens@u-bourgogne.fr (Jérôme LAURENS)
 */

// import pako from 'pako'

// THIS DOES NOT WORK

module.exports = function (content, map, meta) {
  // assert(content instanceof Buffer)
  // console.error("eyo-loader: ", content)
  // var inflate
  // try {
  //   // is it compressed ?
  //   inflate = this.pako.ungzip(content)
  // } catch (err) {
  //   // I guess not
  //   inflate = content
  // }
  // var xml = [
  //   '<?xml version="1.0" encoding="utf-8"?>',
  //   '<edython xmlns="urn:edython:1.0" xmlns:eyo="urn:edython:1.0">',
  //   '<workspace>',
  //   '<content>',
  //   // '<s eyo="start_stmt" comment="Avec des listes" xmlns="urn:edython:1.0" xmlns:eyo="urn:edython:1.0">',
  //   // '<s eyo="stmt" comment="Une liste est une collection ordonnée d’objets" flow="next">',
  //   // '<s eyo="assignment" name="liste" flow="next">',
  //   // '<x eyo="list" slot="assigned">',
  //   // '<x eyo="square_bracket" slot="O">',
  //   // '<x eyo="literal" slot="O">1</x>',
  //   // '<x eyo="literal" slot="f">\'+\'</x>',
  //   // '<x eyo="literal" slot="r">1</x>',
  //   // '<x eyo="literal" slot="x">\'=\'</x>',
  //   // '<x eyo="literal" slot="{">2</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'La liste est\'</x>',
  //   // '<x eyo="identifier" name="liste" slot="r">',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="stmt" comment="Le premier élément a pour rang 0" flow="next">',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'Le premier élément est\'</x>',
  //   // '<x eyo="slicing" slot="r">',
  //   // '<x eyo="identifier" name="liste" slot="primary">',
  //   // '</x>',
  //   // '<x eyo="list" slot="slice">',
  //   // '<x eyo="literal" slot="O">0</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'La longueur de la liste est\'</x>',
  //   // '<x eyo="call" name="len" ary="1" slot="r">',
  //   // '<x eyo="identifier" name="liste" slot="unary">',
  //   // '</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="stmt" comment="Le dernier élément a pour rang la longueur - 1" flow="next">',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'Le dernier élément est\'</x>',
  //   // '<x eyo="slicing" slot="r">',
  //   // '<x eyo="identifier" name="liste" slot="primary">',
  //   // '</x>',
  //   // '<x eyo="list" slot="slice">',
  //   // '<x eyo="a_expr" operator="-" slot="O">',
  //   // '<x eyo="call" name="len" ary="1" slot="lhs">',
  //   // '<x eyo="identifier" name="liste" slot="unary">',
  //   // '</x>',
  //   // '</x>',
  //   // '<x eyo="literal" slot="rhs">1</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'Ce dernier est aussi\'</x>',
  //   // '<x eyo="slicing" slot="r">',
  //   // '<x eyo="identifier" name="liste" slot="primary">',
  //   // '</x>',
  //   // '<x eyo="list" slot="slice">',
  //   // '<x eyo="literal" slot="O">-1</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="stmt" comment="Utiliser la méthode &quot;index&quot; pour trouver le rang" flow="next">',
  //   // '<s eyo="stmt" comment="Pour extraire une liste, utiliser &quot;:&quot;" flow="next">',
  //   // '<s eyo="assignment" name="liste1" flow="next">',
  //   // '<x eyo="list" slot="assigned">',
  //   // '<x eyo="slicing" slot="O">',
  //   // '<x eyo="identifier" name="liste" slot="primary">',
  //   // '</x>',
  //   // '<x eyo="list" slot="slice">',
  //   // '<x eyo="proper_slice" slot="O">',
  //   // '<x eyo="literal" slot="lower_bound">0</x>',
  //   // '<x eyo="literal" slot="upper_bound">2</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'Les éléments extraits:\'</x>',
  //   // '<x eyo="identifier" name="liste1" slot="r">',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="stmt" comment="On peut ajouter des éléments à la fin" flow="next">',
  //   // '<s eyo="expression_stmt" flow="next">',
  //   // '<x eyo="call" name="append" ary="1" slot="expression">',
  //   // '<x eyo="identifier" name="liste1" slot="expression">',
  //   // '</x>',
  //   // '<x eyo="literal" slot="unary">2</x>',
  //   // '</x>',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'Résultat:\'</x>',
  //   // '<x eyo="identifier" name="liste1" slot="r">',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="stmt" comment="On peut ajouter des éléments où on veut" flow="next">',
  //   // '<s eyo="expression_stmt" flow="next">',
  //   // '<x eyo="call" name="insert" ary="2" slot="expression">',
  //   // '<x eyo="identifier" name="liste1" slot="expression">',
  //   // '</x>',
  //   // '<x eyo="list" slot="binary">',
  //   // '<x eyo="literal" slot="O">2</x>',
  //   // '<x eyo="literal" slot="f">\'=\'</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'Résultat:\'</x>',
  //   // '<x eyo="identifier" name="liste1" slot="r">',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="expression_stmt" flow="next">',
  //   // '<x eyo="call" name="insert" ary="2" slot="expression">',
  //   // '<x eyo="identifier" name="liste1" slot="expression">',
  //   // '</x>',
  //   // '<x eyo="list" slot="binary">',
  //   // '<x eyo="literal" slot="O">2</x>',
  //   // '<x eyo="literal" slot="f">1</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'Résultat:\'</x>',
  //   // '<x eyo="identifier" name="liste1" slot="r">',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="stmt" comment="Les deux liste sont égales" flow="next">',
  //   // '<s eyo="if" flow="next">',
  //   // '<x eyo="builtin__object" value="True" slot="if">',
  //   // '</x>',
  //   // '<s eyo="print" flow="suite">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'Les listes ont le même contenu\'</x>',
  //   // '</x>',
  //   // '</s>',
  //   // '<s eyo="expression_stmt" flow="next">',
  //   // '<x eyo="call" name="insert" ary="2" slot="expression">',
  //   // '<x eyo="identifier" name="liste1" slot="expression">',
  //   // '</x>',
  //   // '<x eyo="list" slot="binary">',
  //   // '<x eyo="literal" slot="O">2</x>',
  //   // '<x eyo="literal" slot="f">\'=\'</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'Résultat:\'</x>',
  //   // '<x eyo="identifier" name="liste1" slot="r">',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="expression_stmt" flow="next">',
  //   // '<x eyo="call" name="insert" ary="2" slot="expression">',
  //   // '<x eyo="identifier" name="liste1" slot="expression">',
  //   // '</x>',
  //   // '<x eyo="list" slot="binary">',
  //   // '<x eyo="literal" slot="O">2</x>',
  //   // '<x eyo="literal" slot="f">1</x>',
  //   // '</x>',
  //   // '</x>',
  //   // '<s eyo="print" flow="next">',
  //   // '<x eyo="list" slot="arguments">',
  //   // '<x eyo="literal" slot="f">\'Résultat:\'</x>',
  //   // '<x eyo="identifier" name="liste1" slot="r">',
  //   // '</x>',
  //   // '</x>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   // '</s>',
  //   '<s eyo="assignment_stmt" x="200" y="200">',
  //   '</s>',
  //   '</content>',
  //   '</workspace>',
  //   '</edython>'
  // ].join('')
  // this.callback(null, xml, map, meta) // JSON.stringify(inflate)
  // return; // always return undefined when calling callback()
  return content
}
module.exports.raw = true
