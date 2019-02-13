import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CommunityContextProvider } from './store';

ReactDOM.render(
  <CommunityContextProvider>
    <App />
  </CommunityContextProvider>, 
  document.getElementById('root')
);