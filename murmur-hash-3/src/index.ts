#!/usr/bin/env node

import path from 'path';
import yargs from 'yargs';
import chalk from 'chalk';

import { MurmurHash3 } from './murmur-hash-3';
import { calculateFileHash } from './file-handler';

const SourceTypes = {
  file: 'file',
  cli: 'cli'
};

const options = yargs
  .options({
    v: { describe: "value (needed when 'cli' source type is selected)", type: 'string' },
    s: { describe: 'seed', type: 'number', demandOption: true },
    t: { describe: 'source type', choices: ['file', 'cli'] as const, type: 'string', demandOption: true },
    p: { alias: 'path', describe: "Path to file where the data is stored (ignored when 'cli' source option selected)", type: 'string' }
  })
  .parseSync();

const { v: input, s: seed, t: sourceType, p: inputFilename } = options;

let result: number;
switch (sourceType) {
  case SourceTypes.cli:
    const murmurHash3 = new MurmurHash3(seed);
    result = murmurHash3.hash(input);
    break;
  case SourceTypes.file:
    result = calculateFileHash({ inputFilename: path.join(__dirname, inputFilename), seed });
    break;
}

console.log(chalk.green(`Result: ${result.toString(16)}`));
