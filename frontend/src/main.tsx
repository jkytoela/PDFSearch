import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/react-query';
import { store } from './store';

import './index.css';
import App from './App';

const StoreProvider = store.Provider;

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
