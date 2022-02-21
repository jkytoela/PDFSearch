import express, {
  Application,
  Request,
  Response,
} from 'express';
import cors from 'cors';
import { PDF } from './routes';

const SERVER_URL = 'http://localhost';
const PORT = 8000;

const app: Application = express();

// For development purposes
app.use(cors());
app.use(express.json());

app.use('/api/pdf', PDF);

// eslint-disable-next-line arrow-body-style
app.get('/test', (req: Request, res: Response) => {
  return res.json({ message: 'OK' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`PDFSearch API running at ${SERVER_URL}:${PORT}`);
});
