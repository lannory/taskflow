import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './store/projectsSlice.js'

const store = configureStore({
  reducer: {
    projects: projectsReducer
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)