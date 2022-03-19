import express from 'express';
import cors from 'cors';
import textRouter from './routers/text-router';
import fileRouter from './routers/file-router';

const PORT = 8080;

export function startServer(app: express.Application): void {
  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json());

  app.use('/text', textRouter);
  app.use('/file', fileRouter);

  app.listen(PORT, () => process.stdout.write(`Server is running on port ${PORT}...\n`));
}
