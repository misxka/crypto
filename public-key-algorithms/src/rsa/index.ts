#!/usr/bin/env node

import yargs from 'yargs';
import path from 'path';
import chalk from 'chalk';

import { getCharCodesFromString, encrypt, getStringFromCharCodes, decrypt, getStringFromBigints, getBigIntsFromString } from '../utils';
import { actions } from './constants';
import bigInt from 'big-integer';
import { encryptFileData } from './file-handler';

const options = yargs(process.argv)
  .options({
    v: { alias: 'value', describe: 'Value to be encrypted/decrypted', type: 'string' },
    a: { alias: 'action', describe: 'Action to be done', choices: ['encrypt', 'decrypt'] as const, demandOption: true },
    s: { alias: 'source', describe: 'Source of data', choices: ['file', 'cli'] as const, demandOption: true },
    i: { alias: 'input-path', describe: "Path to file where the data is stored (ignored when 'cli' source option selected)", type: 'string' },
    o: { alias: 'output-path', describe: "Path to file where the data should be stored (ignored when 'cli' source option selected)", type: 'string' },
    d: { describe: 'd-key', type: 'string' },
    r: { describe: 'r-key', type: 'string' },
    e: { describe: 'e-key', type: 'string' }
  })
  .parseSync();

const { a: requiredAction, v: inputString, s: sourceType, i: inputFilename, o: outputFilename, d: dInput, r: rInput, e: eInput } = options;

const d = bigInt(dInput);
const r = bigInt(rInput);
const e = bigInt(eInput);

if (sourceType === 'file') {
  encryptFileData({
    inputFilename: path.join(__dirname, inputFilename),
    outputFilename: path.join(__dirname, outputFilename),
    e,
    r,
    d,
    requiredAction
  });
} else {
  let result = '';

  if (requiredAction === actions.encrypt) {
    const encodedMessage = getCharCodesFromString(inputString);
    const encryptedMessage = encrypt(encodedMessage, e, r);

    result = getStringFromBigints(encryptedMessage);
  } else {
    const encodedMessage = getBigIntsFromString(inputString);
    const decryptedMessage = decrypt(
      encodedMessage.map(c => bigInt(c)),
      d,
      r
    );

    result = getStringFromCharCodes(decryptedMessage);
  }

  console.log(chalk.green('Result: ' + result));
}
