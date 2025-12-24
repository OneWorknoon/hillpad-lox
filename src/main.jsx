import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config';

//main

const clientId = config.GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <Router basename=''>
        <App />
      </Router>
    </Provider>
    </GoogleOAuthProvider>

  </React.StrictMode>
);
