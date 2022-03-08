#!/usr/bin/env node

import yargs from 'yargs';
import chalk from 'chalk';

import { MurmurHash3 } from './murmur-hash-3';

const options = yargs
  .options({
    v: { describe: 'value', type: 'string', demandOption: true },
    s: { describe: 'seed', type: 'number', demandOption: true }
  })
  .parseSync();

const { v: input, s: seed } = options;

const murmurHash3 = new MurmurHash3(seed);
console.log(chalk.green(`Result: ${murmurHash3.hash(input).toString(16)}`));
