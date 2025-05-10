import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ShopContextProvider } from './context/ShopContext.jsx';
import AppProvider from './context/AppContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <AppProvider>
                <App />
          </AppProvider>
      </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>
);
