import { Client } from 'minio';
import { options, policy } from '../constants/minioConfig';

const BUCKET_NAME = 'pdfs';
const client = new Client(options);

export async function upload(filename: string, buffer: Buffer) {
  const exists = await client.bucketExists(BUCKET_NAME);
  if (!exists) {
    await client.makeBucket(BUCKET_NAME, 'us-east-1');
    client.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
  }
  client.putObject(BUCKET_NAME, filename, buffer);
}

/**
 * This doesn't work with the current Docker/MinIO setup
 * How to setup the network in docker-compose,
 * so that the presigned url is correct & accessible from the host?
 */
export async function getUrl(objectName: string) {
  return client.presignedGetObject(BUCKET_NAME, objectName);
}
