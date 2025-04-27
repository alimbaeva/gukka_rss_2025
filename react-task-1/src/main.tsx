import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ProviderContext } from './components/context/Context';
import './global.scss';
import App from './page/app/App';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ProviderContext>
          <App />
        </ProviderContext>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
