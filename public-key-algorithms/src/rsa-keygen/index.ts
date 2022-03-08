#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';

import { generateRandomPrimes, getOpenedExp, getClosedExp } from '../utils';

const options = yargs(process.argv).parseSync();

const { p, q } = generateRandomPrimes(512);
const r = p.multiply(q);
const phi = p.minus(1).multiply(q.minus(1));
const e = getOpenedExp(1, phi);
const d = getClosedExp(e, phi);

const msgD = chalk.red(`d: ${d.toString()}`);
const msgE = chalk.green(`e: ${e.toString()}`);
const msgR = chalk.yellow(`r: ${r.toString()}`);

console.log(msgD);
console.log(msgE);
console.log(msgR);
