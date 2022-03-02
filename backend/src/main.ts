/* eslint-disable no-console */
import express, {
  Application,
} from 'express';
import cors from 'cors';
import { PDF } from './routes';
import redis from './services/redis';

const SERVER_URL = 'http://localhost';
const PORT = 8000;

async function startServer() {
  const app: Application = express();
  await redis.connect();

  app.use(cors());
  app.use(express.json());

  app.use('/api/pdf', PDF);

  app.listen(PORT, () => {
    console.info(`PDFSearch API listening at ${SERVER_URL}:${PORT}`);
  }).on('error', (error) => {
    console.error(error);
    process.exit(1);
  });
}

startServer();
