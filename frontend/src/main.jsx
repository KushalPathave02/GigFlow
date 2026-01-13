import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import axios from 'axios';
import App from './App.jsx';

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
