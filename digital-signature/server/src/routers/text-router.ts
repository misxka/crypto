import express, { Request, Response } from 'express';
import bigInt from 'big-integer';

import { calculateReceivedHash, calculateSignature } from '../rsa/utils';
import { MurmurHash3 } from '../hash/murmur-hash-3';
import { generateRsaKey } from '../rsa/generate-keys';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { message, bitLength } = req.body;

  const murmurHash3 = new MurmurHash3(21);
  const hashValue = murmurHash3.hash(message);

  const { d, r, e } = generateRsaKey(bitLength);
  const signature = calculateSignature(hashValue, d, r);

  return res.status(200).send({ signature, d, r, e });
});

router.post('/check', (req: Request, res: Response) => {
  const { message, e, r, signature } = req.body;

  const murmurHash3 = new MurmurHash3(21);
  const actualHashValue = murmurHash3.hash(message);

  const calculatedHash = calculateReceivedHash(bigInt(signature), bigInt(e), bigInt(r));

  const isValid = calculatedHash.equals(actualHashValue);

  return res.status(200).send({ isValid });
});

export = router;
