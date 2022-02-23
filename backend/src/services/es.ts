/* eslint-disable no-underscore-dangle */
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://elasticsearch:9200',
});

const DEFAULT_INDEX = 'pdfs';

/**
 * @param id - id in postgresql
 * @param data - text from pdf
 */
export async function index(id: number, data: string) {
  await client.index({
    index: DEFAULT_INDEX,
    document: { id, data },
  });
}

export async function search(str: string) {
  await client.indices.refresh({ index: DEFAULT_INDEX });
  const result = await client.search<{ id: number; data: string }>({
    index: DEFAULT_INDEX,
    query: {
      match: { data: str },
    },
  });

  // Get only ID's from the results, because that's the only thing we need
  const ids = result.hits.hits.map((hit) => hit._source!.id);

  // Remove duplicates
  return [...new Set(ids)];
}
