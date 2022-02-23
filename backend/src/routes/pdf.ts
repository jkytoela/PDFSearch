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
import * as db from '../services/db';
import * as es from '../services/es';
import { BUCKET_NAME } from '../constants/minioConfig';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Handle PDF uploads
 */
router.post('/', upload.array('files'), async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files.length) {
    return res.status(400).json({ message: 'No files provided' });
  }

  try {
    await Promise.all(
      files.map(async (file) => {
        // Create record in the database
        const record = await db.savePDF(file.originalname, BUCKET_NAME, file.size);

        // Upload file to minIO
        minio.upload(file.originalname, file.buffer);

        // Extract texts from the PDF
        const text = await extract(file.buffer);

        // Index texts to ElasticSearch
        es.index(record.id, text);
      }),
    );

    return res.status(201).json({ status: 'Success' });
  } catch (error) {
    return res.status(500).json(JSON.stringify(error));
  }
});

/**
 * Search text from PDF's
 * /api/pdf?text=foobar
 */
router.get('/', async (req: Request, res: Response) => {
  const { text } = req.query;
  if (!text || !text?.length) {
    return res.status(400).json({ message: 'Invalid query' });
  }

  // Get list of id's that match to the search
  const ids = await es.search(`${text}`);
  if (!ids) {
    return res.status(200).json([]);
  }

  // Get the PDFs
  const data = await db.find(ids);
  return res.status(200).json(data);
});

export default router;
