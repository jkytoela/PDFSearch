/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import {
  Request,
  Response,
  Router,
} from 'express';

const router = Router();

/**
 * Handle PDF uploads
 */
router.post('/', async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'OK' });
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
