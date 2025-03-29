import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './page/App';
import './global.scss';
import { Provider } from './components/context/Context';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
