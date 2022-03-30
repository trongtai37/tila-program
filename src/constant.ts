export enum TokenType {
  // Single-character tokens.
  LEFT_PARENTHESIS = '(',
  RIGHT_PARENTHESIS = ')',
  SEMI_COLON = ';',

  // Keywords
  BEGIN = 'begin',
  END = 'end',
  PRINT = 'print',
  INT = 'int',
  WHILE = 'while',
  DO = 'do',

  // Operators
  PLUS = '+',
  MINUS = '-',
  STAR = '*',
  SLASH = '/',
  EQUAL = '=',

  // Literals
  IDENTIFIER = 'identifier',
  NUMBER = 'number',

  EOF = 'eof',
}
