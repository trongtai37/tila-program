const indent = (s: string, level: number) =>
  '    '.repeat(level).concat(s).concat('\n');

interface AST {
  toString(): string;
  indented(level: number): string;
}

class ProgramAST implements AST {
  private program: AST;

  constructor(program: AST) {
    this.program = program;
  }

  toString() {
    return this.program.toString();
  }

  indented(level: number) {
    return this.program.indented(level);
  }
}

class StatementsAST implements AST {
  private statements: AST[];

  constructor(statements: AST[]) {
    this.statements = statements;
  }

  toString() {
    return ''; // ???
  }

  indented(level: number) {
    return (
      indent('Statements', level) +
      this.statements.map((s) => s.indented(level + 1)).join('')
    );
  }
}

class WhileAST implements AST {
  private condition: AST;
  private body: AST;

  constructor(condition: AST, body: AST) {
    this.condition = condition;
    this.body = body;
  }

  toString() {
    return `while ${this.condition.toString()} do begin ${this.body.toString()} end`;
  }

  indented(level: number) {
    return (
      indent('Assignment', level) +
      this.condition.indented(level + 1) +
      this.condition.indented(level + 1)
    );
  }
}

class AssignmentAST implements AST {
  private expression: ExpressionAST;
  private identifier: IdentifierAST;

  constructor(identifier: IdentifierAST, expression: ExpressionAST) {
    this.identifier = identifier;
    this.expression = expression;
  }

  toString() {
    return `${this.identifier.toString()} = ${this.expression.toString()}`;
  }

  indented(level: number) {
    return (
      indent('Assignment', level) +
      this.identifier.indented(level + 1) +
      this.expression.indented(level + 1)
    );
  }
}

class PrintAST implements AST {
  private expression: ExpressionAST;

  constructor(expression: ExpressionAST) {
    this.expression = expression;
  }

  toString() {
    return `print ${this.expression.toString()}`;
  }

  indented(level: number) {
    return indent('Print', level) + this.expression.indented(level + 1);
  }
}

class DeclarationAST implements AST {
  private identifier: IdentifierAST;

  constructor(identifier: IdentifierAST) {
    this.identifier = identifier;
  }

  toString() {
    return `type ${this.identifier.toString()}`;
  }

  indented(level: number) {
    return indent('Declaration', level) + this.identifier.indented(level + 1);
  }
}

class BeginAST implements AST {
  toString() {
    return 'begin';
  }

  indented(level: number) {
    return indent('begin', level);
  }
}

class EndAST implements AST {
  toString() {
    return 'end';
  }

  indented(level: number) {
    return indent('end', level);
  }
}

class ExpressionAST implements AST {
  protected left: any;
  protected op: string;
  protected right: any;

  constructor(left: any, op: string, right: any) {
    this.left = left;
    this.op = op;
    this.right = right;
  }

  toString() {
    return `(${this.left.toString()}${this.op}${this.right.toString()})`;
  }

  indented(level: number) {
    return (
      indent(this.op, level) +
      this.left.indented(level + 1) +
      this.right.indented(level + 1)
    );
  }
}

class ComparisonAST extends ExpressionAST implements AST {
  toString() {
    return `${this.left.toString()}${this.op}${this.right.toString()}`;
  }
}

class NumberAST implements AST {
  private number: number;
  constructor(number: number) {
    this.number = number;
  }

  toString() {
    return this.number.toString();
  }

  indented(level: number) {
    return indent(this.toString(), level);
  }
}

class IdentifierAST implements AST {
  private identifier: string;
  constructor(identifier: string) {
    this.identifier = identifier;
  }

  toString() {
    return this.identifier;
  }

  indented(level: number) {
    return indent(this.identifier, level);
  }
}
