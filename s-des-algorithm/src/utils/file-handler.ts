import fs from 'fs';
import { Transform } from 'stream';
import { actions } from './constants';
import { Encrypter } from './encrypter';
import { getBinaryString, getStringFromBinary } from './string-converters';

const CHUNK_SIZE = 1000000; //1MB

type Options = {
  inputFilename: string;
  outputFilename: string;
  key1: number;
  key2: number;
  requiredAction: string;
};

export const encryptFileData = (options: Options) => {
  const { inputFilename, outputFilename, key1, key2, requiredAction } = options;

  const readStream = fs.createReadStream(inputFilename, { highWaterMark: CHUNK_SIZE });
  const writeStream = fs.createWriteStream(outputFilename);

  readStream.setEncoding('utf-8');

  const encryptStream = new Transform({
    transform(chunk, enc, cb) {
      const [binaryString, isBinaryDefault] = getBinaryString(chunk.toString());
      const encrypter = new Encrypter(binaryString, key1, key2);

      this.push(requiredAction === actions.encrypt ? encrypter.encrypt() : getStringFromBinary(encrypter.decrypt()));

      cb();
    }
  });

  readStream.on('open', function () {
    readStream.pipe(encryptStream).pipe(writeStream);
  });
};
