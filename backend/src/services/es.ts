/* eslint-disable no-underscore-dangle */
import { Client } from '@elastic/elasticsearch';
import { ESSource, ESSearchBody } from '../types';

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
  const response = await client.search<ESSource, ESSearchBody>({
    index: DEFAULT_INDEX,
    query: {
      match: { data: str },
    },
    highlight: {
      fragment_size: 20,
      fields: { data: {} },
    },
  });

  // Get ID's stored in DB and highlights
  // TODO: Read more about ES types and fix those code smells
  const result = response.hits.hits.map(({ _source, highlight }) => ({
    id: _source!.id,
    highlights: highlight!.data,
  }));

  return result;
}
