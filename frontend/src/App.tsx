import * as React from 'react';
import Layout from './components/Layout';
import { usePdfs } from './features/pdfs/api/getPdfs';

export default function App() {
  const query = usePdfs({ text: '' });
  console.log(query.data);
  return (
    <Layout>
      Hello
    </Layout>
  );
}
