const LETTER_REGEX = /[a-zA-Z]/;
const WHITESPACE_REGEX = /\s+/;
const NUMBER_REGEX = /^[0-9]+$/;
const IDENTIFIER_REGEX = /^[\w]+[\d]*$/;

export const isLetter = (character: string) => LETTER_REGEX.test(character);

export const isWhitespace = (character: string) =>
  WHITESPACE_REGEX.test(character);

export const isNumber = (character: string) => NUMBER_REGEX.test(character);

export const isIdentifier = (character: string) =>
  IDENTIFIER_REGEX.test(character);
