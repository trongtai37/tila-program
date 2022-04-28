import { TokenType } from './constant';
import { Token } from './model';

export const parser = (tokens: Token[]) => {
  let current = -1;

  function walk() {
    const token = tokens[++current];

    if (!token) return;

    if (token.type === TokenType.END) {
      return {
        type: 'End',
        value: token.value,
      };
    }

    if (token.type === TokenType.SEMI_COLON) {
      return {
        type: 'Semicolon',
        value: token.value,
      };
    }

    if (token.type === TokenType.NUMBER) {
      const nextToken = tokens[current + 1];

      if (
        [
          TokenType.MINUS,
          TokenType.PLUS,
          TokenType.EXPO,
          TokenType.SLASH,
        ].includes(nextToken.type)
      ) {
        ++current;

        const next = walk();
        if (next?.type !== 'Expression') {
          throw new Error(`Expect an expression after ${nextToken.value}`);
        }

        return {
          type: 'Expression',
          kind: 'Equation',
          params: [token, nextToken, next],
        };
      }

      return {
        type: 'Expression',
        kind: 'NumberLiteral',
        value: token.value,
      };
    }

    if (token.type === TokenType.IDENTIFIER) {
      const nextToken = tokens[current + 1];

      if (
        [
          TokenType.MINUS,
          TokenType.PLUS,
          TokenType.EXPO,
          TokenType.SLASH,
        ].includes(nextToken.type)
      ) {
        ++current;
        const next = walk();
        if (next?.type !== 'Expression') {
          throw new Error(`Expect an expression after ${nextToken.value}`);
        }

        return {
          type: 'Expression',
          kind: 'Equation',
          params: [token, nextToken, next],
        };
      }

      if (nextToken.type === TokenType.EQUAL) {
        ++current;
        const next = walk();

        if (next?.type !== 'Expression') {
          throw new Error(`Expect an expression after ${nextToken.value}`);
        }

        const assignmentNode = {
          type: 'Assignment',
          params: [token, nextToken, next],
        };

        const statementNode = {
          type: 'Statement',
          params: [assignmentNode],
        };

        return statementNode;
      }

      return {
        type: 'Expression',
        kind: 'Identifier',
        value: token.value,
      };
    }

    if (token.type === TokenType.INT) {
      const nextToken = tokens[++current];

      if (nextToken.type !== TokenType.IDENTIFIER) {
        throw new Error('Expect an identifier after type declaration.');
      }

      const declarationNode = {
        type: 'Declaration',
        params: [
          {
            dataType: token,
            identifier: nextToken,
          },
        ],
      };

      const statementNode = {
        type: 'Statement',
        params: [declarationNode],
      };

      return statementNode;
    }

    if (token.type === TokenType.LEFT_PARENTHESIS) {
      const next = walk();
      const nextNext = tokens[++current];

      if (nextNext.type !== TokenType.RIGHT_PARENTHESIS) {
        throw new Error('Expect ) following after an (');
      }

      if (next.type !== 'Expression') {
        throw new Error('Expect an expression between (...)');
      }

      return {
        type: 'Expression',
        kind: 'Parenthesis',
        params: [next],
      };
    }

    if (token.type === TokenType.PRINT) {
      const next = walk();

      if (next.type !== 'Expression') {
        throw new Error(`Expect an expression after 'print'`);
      }

      const statementNode = {
        type: 'Statement',
        params: [token, next],
      };

      return statementNode;
    }

    if (token.type === TokenType.WHILE) {
      const next = walk();

      if (next.type !== 'Expression') {
        throw new Error('Expect an expression after "while"');
      }

      const foundDo = tokens[++current];
      if (foundDo.type !== TokenType.DO) {
        throw new Error('Expect a "do" after "while"');
      }

      const foundBegin = tokens[++current];
      if (foundBegin.type !== TokenType.BEGIN) {
        throw new Error('Expect a "begin" after "do"');
      }

      const statementsNode = {
        type: 'Statements',
        params: [] as any[],
      };

      while (true) {
        const nextStatement = walk();

        if (nextStatement.type === 'End') {
          return {
            type: 'Statement',
            params: [
              {
                type: 'Loop',
                params: [next, statementsNode],
              },
            ],
          };
        }

        if (nextStatement.type !== 'Statement') {
          throw new Error('Expect a statement between "begin" and "end"');
        }

        const nextSemi = walk();
        if (nextSemi.type !== 'Semicolon') {
          throw new Error('Expect ; after a statement');
        }

        nextStatement && statementsNode.params.push(nextStatement);
      }
    }

    if (token.type === TokenType.BEGIN) {
      const statementsNode = {
        type: 'Statements',
        params: [] as any[],
      };

      while (current < tokens.length) {
        const currentToken = tokens[current + 1];

        if (!currentToken) {
          throw new Error('Expect a "end" following a "begin"');
        }

        if (currentToken?.type === TokenType.END) {
          ++current;
          return {
            type: 'Program',
            params: [statementsNode],
          };
        }

        const next = walk();
        const nextSemi = walk();

        if (next?.type !== 'Statement') {
          throw new Error('Expect a statement between "begin" and "end"');
        }

        if (nextSemi?.type !== 'Semicolon') {
          throw new Error('Expect ; after a statement');
        }

        next && statementsNode.params.push(next);
      }

      return {
        type: 'Program',
        params: [statementsNode],
      };
    }
  }

  const ast: { type: string; body: any[] } = {
    type: 'Program',
    body: [],
  };

  try {
    while (current < tokens.length) {
      ast.body.push(walk());
    }
  } catch (error: any) {
    console.error(`Syntax Error: ${error.message}`);
  }

  return ast;
};
