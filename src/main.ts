import { scanTokens } from './scanner';
import * as fs from 'fs';
import * as path from 'path';

const CODE_PATH = 'code/sample.tila';

const rawString = fs.readFileSync(path.resolve(__dirname, CODE_PATH), 'utf-8');

const tokens = scanTokens(rawString);

console.log(tokens);
