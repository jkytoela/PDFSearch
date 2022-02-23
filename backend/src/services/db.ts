import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function savePDF(filename: string, bucket: string, fileSize: number) {
  const res = await prisma.pdf.upsert({
    where: { filename },
    create: {
      filename,
      bucket,
      fileSize,
    },
    update: {},
  });

  return res;
}

export async function find(ids: number[]) {
  return prisma.pdf.findMany({
    where: {
      id: { in: ids },
    },
  });
}

export async function all() {
  return prisma.pdf.findMany();
}
