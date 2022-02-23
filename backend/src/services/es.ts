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

type Source = {
  id: number;
  data: string;
};

type SearchBody = {
  index: string;
  query: {
    match: { data: string };
  };
  highlight: {
    'fragment_size': string;
    fields: {
      data: unknown;
    };
  };
};

export async function search(str: string) {
  await client.indices.refresh({ index: DEFAULT_INDEX });
  const response = await client.search<Source, SearchBody>({
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
