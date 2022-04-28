import { TokenType } from './constant';
import { Token } from './model';
import { isIdentifier, isLetter, isNumber, isWhitespace } from './utility';

export const scanTokens = (rawString: string) => {
  const tokens: Token[] = [];
  let cursor = 0;

  while (cursor < rawString.length) {
    const character = rawString.charAt(cursor);

    switch (character) {
      case TokenType.LEFT_PARENTHESIS:
        tokens.push({
          type: TokenType.LEFT_PARENTHESIS,
          value: character,
        });
        cursor++;
        continue;

      case TokenType.RIGHT_PARENTHESIS:
        tokens.push({
          type: TokenType.RIGHT_PARENTHESIS,
          value: character,
        });
        cursor++;
        continue;

      case TokenType.SEMI_COLON:
        tokens.push({
          type: TokenType.SEMI_COLON,
          value: character,
        });
        cursor++;
        continue;

      case TokenType.PLUS:
        tokens.push({
          type: TokenType.PLUS,
          value: character,
        });
        cursor++;
        continue;

      case TokenType.MINUS:
        tokens.push({
          type: TokenType.MINUS,
          value: character,
        });
        cursor++;
        continue;

      case TokenType.STAR:
        tokens.push({
          type: TokenType.STAR,
          value: character,
        });
        cursor++;
        continue;

      case TokenType.SLASH:
        tokens.push({
          type: TokenType.SLASH,
          value: character,
        });
        cursor++;
        continue;

      case TokenType.EQUAL:
        tokens.push({
          type: TokenType.EQUAL,
          value: character,
        });
        cursor++;
        continue;

      case TokenType.EXPO:
        tokens.push({
          type: TokenType.EXPO,
          value: character,
        });
        cursor++;
        continue;
    }

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      let number = character;

      while (isNumber(rawString.charAt(++cursor))) {
        number += rawString.charAt(cursor);
      }

      tokens.push({
        type: TokenType.NUMBER,
        value: Number(number),
      });

      continue;
    }

    if (isLetter(character)) {
      let symbol = character;

      while (isLetter(rawString.charAt(++cursor))) {
        symbol += rawString.charAt(cursor);
      }

      switch (symbol) {
        case TokenType.BEGIN:
          tokens.push({
            type: TokenType.BEGIN,
            value: symbol,
          });
          continue;

        case TokenType.END:
          tokens.push({
            type: TokenType.END,
            value: symbol,
          });
          continue;

        case TokenType.PRINT:
          tokens.push({
            type: TokenType.PRINT,
            value: symbol,
          });
          continue;

        case TokenType.INT:
          tokens.push({
            type: TokenType.INT,
            value: symbol,
          });
          continue;

        case TokenType.WHILE:
          tokens.push({
            type: TokenType.WHILE,
            value: symbol,
          });
          continue;

        case TokenType.DO:
          tokens.push({
            type: TokenType.DO,
            value: symbol,
          });
          continue;
      }

      if (isIdentifier(symbol)) {
        tokens.push({
          type: TokenType.IDENTIFIER,
          value: symbol,
        });
        continue;
      }

      throw new Error(`${character} at cursor ${cursor} is not valid`);
    }

    throw new Error(`${character} at cursor ${cursor} is not valid`);
  }

  return tokens;
};
