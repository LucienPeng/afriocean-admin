import './Styles/all.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { persistor, store } from './Store/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { initializeApp } from 'firebase/app';
import App from './App';
import { DeviceMetadataProvider } from './Components/Common/DeviceMetadataProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const firebaseConfig = {
  apiKey: 'AIzaSyCJ60NHH41ezonKasX_lTaF2Otfj1NTons',
  authDomain: 'afriocean-admin.firebaseapp.com',
  projectId: 'afriocean-admin',
  storageBucket: 'afriocean-admin.appspot.com',
  messagingSenderId: '671851195009',
  appId: '1:671851195009:web:fab56e45c697910b6c7b80',
  measurementId: 'G-8EQFST1F45',
};

export const firebase = initializeApp(firebaseConfig);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <DeviceMetadataProvider>
              <App />
            </DeviceMetadataProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
