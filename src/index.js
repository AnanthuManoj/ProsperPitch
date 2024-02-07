import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ProfileContext from './contextShare/ProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <ProfileContext> <BrowserRouter><App /></BrowserRouter></ProfileContext>
  </React.StrictMode>
);

