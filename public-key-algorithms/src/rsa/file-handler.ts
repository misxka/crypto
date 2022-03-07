import bigInt from 'big-integer';
import fs from 'fs';
import { Transform } from 'stream';
import { actions } from './constants';
import { decrypt, encrypt, getBigIntsFromString, getCharCodesFromString, getStringFromBigints, getStringFromCharCodes } from '../utils';

const CHUNK_SIZE = 10000000;

type Options = {
  inputFilename: string;
  outputFilename: string;
  e: bigInt.BigInteger;
  r: bigInt.BigInteger;
  d: bigInt.BigInteger;
  requiredAction: string;
};

export const encryptFileData = (options: Options) => {
  const { inputFilename, outputFilename, e, r, d, requiredAction } = options;

  const readStream = fs.createReadStream(inputFilename, { highWaterMark: CHUNK_SIZE });
  const writeStream = fs.createWriteStream(outputFilename);

  const encryptStream = new Transform({
    transform(chunk, enc, cb) {
      let result = '';

      if (requiredAction === actions.encrypt) {
        const encodedMessage = getCharCodesFromString(chunk.toString());
        const encryptedMessage = encrypt(encodedMessage, e, r);

        result = getStringFromBigints(encryptedMessage);
      } else {
        const encodedMessage = getBigIntsFromString(chunk.toString());
        const decryptedMessage = decrypt(
          encodedMessage.map(c => bigInt(c)),
          d,
          r
        );

        result = getStringFromCharCodes(decryptedMessage);
      }

      this.push(result);

      cb();
    }
  });

  readStream.on('open', function () {
    readStream.pipe(encryptStream).pipe(writeStream);
  });
};
