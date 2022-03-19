import fs from 'fs';
import { MurmurHash3 } from './murmur-hash-3';

type Options = {
  inputFilename: string;
  seed: number;
};

export const calculateFileHash = (options: Options) => {
  const { inputFilename, seed } = options;

  const fileContent = fs.readFileSync(inputFilename, { encoding: 'utf-8' });

  const murmurHash3 = new MurmurHash3(seed);
  return murmurHash3.hash(fileContent);
};
