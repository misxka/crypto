import express, { Request, Response } from 'express';
import multer from 'multer';

import { generateRsaKey } from '../rsa/generate-keys';
import { calculateReceivedHash, calculateSignature } from '../rsa/utils';
import { MurmurHash3 } from '../hash/murmur-hash-3';
import bigInt from 'big-integer';

const upload = multer();

const router = express.Router();

router.post('/', upload.single('file'), (req: Request, res: Response) => {
  const { bitLength } = req.body;

  const murmurHash3 = new MurmurHash3(21);
  const hashValue = murmurHash3.hash(req.file.buffer.toString());

  const { d, r, e } = generateRsaKey(bitLength);
  const signature = calculateSignature(hashValue, d, r);

  return res.status(200).send({ signature, d, r, e });
});

router.post('/check', upload.single('file'), (req: Request, res: Response) => {
  const { e, r, signature } = req.body;

  const murmurHash3 = new MurmurHash3(21);
  const actualHashValue = murmurHash3.hash(req.file.buffer.toString());

  const calculatedHash = calculateReceivedHash(bigInt(signature), bigInt(e), bigInt(r));

  const isValid = calculatedHash.equals(actualHashValue);

  return res.status(200).send({ isValid });
});

export = router;
