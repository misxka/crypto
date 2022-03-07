#!/usr/bin/env node

import bigInt from 'big-integer';
import chalk from 'chalk';
import yargs from 'yargs';

import { getClosedExp } from '../utils';

const options = yargs(process.argv)
  .usage('Usage: -n <name>')
  .options({
    p: { describe: 'p-key', type: 'string', demandOption: true },
    q: { describe: 'q-key', type: 'string', demandOption: true },
    e: { describe: 'e-key', type: 'string', demandOption: true }
  })
  .parseSync();

const { p: pInput, q: qInput, e: eInput } = options;

const p = bigInt(pInput);
const q = bigInt(qInput);
const e = bigInt(eInput);

const r = p.multiply(q);
const phi = p.minus(1).multiply(q.minus(1));
const d = getClosedExp(e, phi);

const msgD = chalk.red(`  "d": ${d.toString()}`);
const msgR = chalk.yellow(`  "r": ${r.toString()}`);
const privateKey = `Private Key: {\n${msgD}\n${msgR}\n}`;

console.log(privateKey);
