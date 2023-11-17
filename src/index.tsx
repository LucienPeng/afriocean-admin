import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/all.scss';
import App from './App';

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
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
