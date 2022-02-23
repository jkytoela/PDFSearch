/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import {
  Express,
  Request,
  Response,
  Router,
} from 'express';
import multer from 'multer';
import extract from '../services/tika';
import * as minio from '../services/minio';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Handle PDF uploads
 */
router.post('/', upload.array('files'), async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const textContent: string[] = [];
  await Promise.all(
    files.map(async (file) => {
      // const text = await extract(file.buffer);
      minio.upload(file.originalname, file.buffer);
    }),
  );

  return res.send(textContent.join(''));
});

/**
 * Search text from PDF's
 * /api/pdf/?contains=foobar
 */
router.get('/', async (req: Request, res: Response) => {
  const { contains } = req.query;
  if (!contains || !contains?.length) {
    return res.status(400).json({ message: 'Invalid query' });
  }

  return res.status(200).json({ message: contains });
});

export default router;
