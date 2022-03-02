import * as React from 'react';
import { Box } from '@chakra-ui/react';
import Layout from './components/Layout';
import { usePdfs } from './features/pdfs/api/getPdfs';
import type { PDF } from './features/pdfs/validations';
import { store } from './store';

const DummyHighlight = ({ item } : { item: string }) => (
  <Box as="p"
    dangerouslySetInnerHTML={{ __html: item }}
    fontSize="0.75rem"
    ml="1rem"
    sx={{
      em: {
        color: 'red',
        bg: 'yellow',
      }
    }}
  />
);

const Result = ({ pdf }: { pdf: PDF }) => (
  <Box display="flex" flexDir="column">
    <Box as="p" fontWeight="bold">{pdf.filename}</Box>
    {pdf.highlights?.map((item) => <DummyHighlight key={item} item={item} />)}
  </Box>
);

const TempResults = ({ data }: { data: PDF[] }) => (
  <Box display="flex" flexDir="column" gap="0.5rem">
    {data.map((pdf) => <Result key={pdf.id} pdf={pdf} />)}
  </Box>
);

export default function App() {
  const { searchText } = store.useState();
  const { data } = usePdfs({ text: searchText });

  return (
    <Layout>
      { data ? <TempResults data={data} /> : <p>Loading...</p>}
    </Layout>
  );
}
