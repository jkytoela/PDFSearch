import got from 'got';
import getStream from 'get-stream';
import { Readable as ReadableStream } from 'stream';

const tikaUrl = 'http://tika:9998/tika';

function toReadableStream(value: Buffer) {
  return new ReadableStream({
    read() {
      this.push(value);
      this.push(null);
    },
  });
}

/**
 * Extract text from a document
 * @param input Buffer to read text from
 * @return Extracted text
 */
export default async function extract(input: Buffer) {
  const stream = toReadableStream(input);
  const tikaStream = got.stream.put(tikaUrl, {
    headers: {
      Accept: 'text/plain',
    },
  });

  return getStream(stream.pipe(tikaStream));
}
