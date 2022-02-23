import express, {
  Application,
} from 'express';
import cors from 'cors';
import { PDF } from './routes';
import redis from './services/redis';

const SERVER_URL = 'http://localhost';
const PORT = 8000;

const app: Application = express();
(async () => {
  await redis.connect();
})();

// For development purposes
app.use(cors());
app.use(express.json());

app.use('/api/pdf', PDF);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`PDFSearch API running at ${SERVER_URL}:${PORT}`);
});
