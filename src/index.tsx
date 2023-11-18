import './Styles/all.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { persistor, store } from './Store/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCJ60NHH41ezonKasX_lTaF2Otfj1NTons',
  authDomain: 'afriocean-admin.firebaseapp.com',
  projectId: 'afriocean-admin',
  storageBucket: 'afriocean-admin.appspot.com',
  messagingSenderId: '671851195009',
  appId: '1:671851195009:web:fab56e45c697910b6c7b80',
  measurementId: 'G-8EQFST1F45',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
