import * as React from 'react';
import Layout from './components/Layout';
import { usePdfs } from './features/pdfs/api/getPdfs';
import { store } from './store';

export default function App() {
  const { searchText } = store.useState();
  const query = usePdfs({ text: searchText });
  console.log(query.data);
  return (
    <Layout>
      Hello
    </Layout>
  );
}
