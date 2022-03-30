# Tila Programming Language

### Precondition

- `NodeJS` version >= 14 installed and `npm` also.

### Running scanner

```bash
  npm install && npm start
```

- See the console.log
- Sample output:

```javascript
[
  { type: 'begin', value: 'begin' },
  { type: 'int', value: 'int' },
  { type: 'identifier', value: 'firstNumber' },
  { type: '=', value: '=' },
  { type: 'number', value: 25 },
  { type: ';', value: ';' },
  { type: 'int', value: 'int' },
  { type: 'identifier', value: 'secondNumber' },
  { type: '=', value: '=' },
  { type: 'number', value: 16 },
  { type: ';', value: ';' },
  { type: 'end', value: 'end' },
];
```

You can customize the sample file `src/code/sample.tila` and rerun `npm install && npm start` to check output tokens.
