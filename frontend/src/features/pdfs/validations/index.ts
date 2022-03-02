import * as z from 'zod';

export const PDF = z.object({
  id: z.number(),
  filename: z.string(),
  bucket: z.string(),
  fileSize: z.number(),
  createdAt: z.string(),
  highlights: z.string().array().optional(),
});

export const PDFResponse = z.array(PDF);

export type PDF = z.infer<typeof PDF>;