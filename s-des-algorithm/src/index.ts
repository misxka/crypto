#!/usr/bin/env node

import yargs from 'yargs';
import chalk from 'chalk';
import path from 'path';

import { getBinaryString, getStringFromBinary, splitChunks } from './utils/string-converters';
import { actions } from './utils/constants';
import { KeyGen } from './utils/keygen';
import { Encrypter } from './utils/encrypter';
import { createCliOutput } from './utils/output-formatter';
import { encryptFileData } from './utils/file-handler';

const options = yargs(process.argv)
  .options({
    k: { alias: 'key', describe: 'Input key (10 bits length)', type: 'string', demandOption: true },
    v: { alias: 'value', describe: 'Value to be encrypted/decrypted', type: 'string' },
    a: { alias: 'action', describe: 'Action to be done', choices: ['encrypt', 'decrypt'] as const, demandOption: true },
    s: { alias: 'source', describe: 'Source of data', choices: ['file', 'cli'] as const, demandOption: true },
    p: { alias: 'path', describe: "Path to file where the data is stored (ignored when 'cli' source option selected)", type: 'string' },
    o: { alias: 'output-path', describe: "Path to file where the data should be stored (ignored when 'cli' source option selected)", type: 'string' }
  })
  .parseSync();

const { a: requiredAction, k: inputKey, v: inputString, s: sourceType, p: inputFilename, o: outputFilename } = options;

const keyGen = new KeyGen(inputKey);
const [key1, key2] = keyGen.generateKeys();

if (sourceType === 'file') {
  encryptFileData({
    inputFilename: path.join(__dirname, inputFilename),
    outputFilename: path.join(__dirname, outputFilename),
    key1,
    key2,
    requiredAction
  });
} else {
  const [binaryString, isBinaryDefault] = getBinaryString(inputString);
  const encrypter = new Encrypter(binaryString, key1, key2);

  const result = requiredAction === actions.encrypt ? encrypter.encrypt() : encrypter.decrypt();
  const msgBox1 = createCliOutput('Binary result:\n' + result, chalk.yellow, 'green');
  console.log(msgBox1);

  if (requiredAction === actions.decrypt) {
    const textResult = getStringFromBinary(result);

    const msgBox2 = createCliOutput('Text result:\n' + textResult, chalk.magenta, 'green');
    console.log(msgBox2);
  }
}
