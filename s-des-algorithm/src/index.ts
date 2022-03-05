#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import yargs from 'yargs';

import { getBinaryString, splitChunks } from './utils/string-converters';
import { actions } from './utils/constants';
import { KeyGen } from './utils/keygen';
import { Encrypter } from './utils/encrypter';

const options = yargs(process.argv)
  .usage('Usage: -n <name>')
  .options({
    k: { alias: 'key', describe: 'Input key (10 bits length)', type: 'string', demandOption: true },
    v: { alias: 'value', describe: 'Value to be encrypted/decrypted', type: 'string', demandOption: true },
    a: { alias: 'action', describe: "Action to be done: 'encrypt' or 'decrypt'", choices: ['encrypt', 'decrypt'] as const, demandOption: true }
  })
  .parseSync();

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderColor: 'green'
};

const requiredAction = options.a;

const inputKey = options.k;
const keyGen = new KeyGen(inputKey);
const [key1, key2] = keyGen.generateKeys();

const inputString = options.v;
const [binaryString, isBinaryDefault] = getBinaryString(inputString);
const encrypter = new Encrypter(binaryString, key1, key2);

const result = requiredAction === actions.encrypt ? encrypter.encrypt() : encrypter.decrypt();
const formattedBinary = chalk.yellow.bold('Binary result:\n' + result);
const msgBox1 = boxen(formattedBinary, boxenOptions);
console.log(msgBox1);

if (requiredAction === actions.decrypt) {
  const textResult = splitChunks(result)
    .map(elem => String.fromCharCode(parseInt(elem, 2)))
    .join('');

  const formattedText = chalk.magenta.bold('Text result:\n' + textResult);
  const msgBox2 = boxen(formattedText, boxenOptions);
  console.log(msgBox2);
}
