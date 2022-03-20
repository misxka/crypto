import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import sharp from 'sharp';
import { splitChunks } from './utils';

const PORT = 8080;

const upload = multer();

export function startServer(app: express.Application): void {
  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json());

  app.use('/hide', upload.single('image'), async (req: Request, res: Response) => {
    let { message } = req.body;

    message += '\r';
    const messageBits = message
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('')
      .split('');

    const { data, info } = await sharp(req.file.buffer).raw().toBuffer({ resolveWithObject: true });

    for (let i = 0; i < messageBits.length; i++) {
      data[i] = ((data[i] >>> 1) << 1) + parseInt(messageBits[i]);
    }

    const customizedImage = await sharp(data, { raw: info }).png().toBuffer();

    return res.status(200).set({ 'Content-Type': req.file.mimetype }).send(customizedImage);
  });

  app.use('/retrieve', upload.single('image'), async (req: Request, res: Response) => {
    const { data, info } = await sharp(req.file.buffer).raw().toBuffer({ resolveWithObject: true });

    const messageBits = [];

    for (let i = 0; i < Math.ceil(data.length / 8); i++) {
      for (let j = 0; j < 8; j++) {
        messageBits[i] = [];
      }
    }

    let message = '';

    for (let i = 0; i < Math.ceil(data.length / 8); i++) {
      for (let j = 0; j < 8; j++) {
        messageBits[i][j] = data[i * 8 + j].toString(2).padStart(8, '0').at(7);
      }
      const symbol = String.fromCharCode(parseInt(messageBits[i].join(''), 2));

      if (symbol === '\r') break;
      message += symbol;
    }

    return res.status(200).send({ message });
  });

  app.listen(PORT, () => process.stdout.write(`Server is running on port ${PORT}...\n`));
}
