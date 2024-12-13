import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Container/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './Storage/Redux/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51O3ZNzSH0WwoHKxCoIRYMJEtBZmmeyUZt6HMksGejNJYUFOR7IuLZc6r3qIcYgoHz20uhcH2hGHvcJJbJtNq0ZmT00ne4WvA2w');
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* Wrap with PersistGate */}
      <BrowserRouter>
        <ToastContainer />
        <Elements stripe={stripePromise}>
        <App />
        </Elements>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);