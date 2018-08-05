var reserved = function (value) {
  return '<span class="eyo-code-reserved">' + value + '</span>'
}

var placeholder = function (value) {
  return '<span class="eyo-code-placeholder">' + value + '</span>'
}

var comment = function (value) {
  return '<span class="eyo-code-comment">' + value + '</span>'
}

var nom = placeholder('nom')

export default {
  hello: 'Bonjour monde',
  name_value: nom + ' = …',
  name_annotation_value: nom + ': … = …',
  target_value: '…, … = …, …',
  name: nom,
  name_definition: nom + '=…',
  name_alias: nom + ' ' + reserved('as') + ' ' + placeholder('alias'),
  star: reserved('*'),
  star_name: reserved('*') + nom,
  star_star_name: reserved('**') + nom,
  name_annotation: nom + ':…',
  star_name_annotation: reserved('*') + nom + ':...',
  name_annotation_definition: nom + ':…=…',
  code: 'code',
  code_comment: 'code # commentaire',
  expression: '…',
  expression_comment: '… ' + comment('# commentaire'),
  comment: comment('# commentaire'),
  name_expressions: nom + ' {operator} …',
  target_expressions: '… {operator} …',
  import: reserved('import') + ' ' + placeholder('module'),
  from_module_import: reserved('from') + ' ' + placeholder('module') + ' ' + reserved('import') + '…',
  from_module_import_star: reserved('from') + ' ' + placeholder('module') + ' ' + reserved('import *'),
  bytes: 'octets'
}
