import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');

ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes />
        <ToastContainer theme="colored" />
      </Router>
    </QueryClientProvider>
  </StrictMode>,
  rootElement
);
