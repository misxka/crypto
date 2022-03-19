import express from 'express';
import { startServer } from './index';

async function startApp() {
  try {
    const app = express();
    startServer(app);
  } catch (error) {
    console.error(error);
  }
}

startApp();

process.on('unhandledRejection', (reason: Error, promise: Promise<unknown>) => {
  console.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

process.on('uncaughtException', (error: Error) => {
  console.error(error);
  process.exit(1);
});
