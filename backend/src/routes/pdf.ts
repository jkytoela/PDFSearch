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
import redis from '../services/redis';
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
 * Get all PDF's or search text from PDF's,
 * eg. /api/pdf?text=foobar
 */
router.get('/', async (req: Request, res: Response) => {
  const { text } = req.query;
  try {
    if (!text) {
      const pdfs = await db.all();
      return res.status(200).json(pdfs);
    }

    // Return cached response if it exists
    const cache = await redis.get(`${text}`);
    if (cache !== null) {
      return res.status(200).json(JSON.parse(cache));
    }

    // Get list of id's that match to the search
    const searchResults = await es.search(`${text}`);
    if (!searchResults) {
      redis.setEx(`${text}`, 600, JSON.stringify([]));
      return res.status(200).json([]);
    }

    // SearchResults contains IDs used in the DB
    const ids = searchResults.map((result) => result.id);

    // Get the PDFs
    const pdfs = await db.find(ids);

    // Merge highlights with PDFs
    const results = pdfs.map((item, i) => ({
      ...item,
      highlights: searchResults[i].highlights,
    }));

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
