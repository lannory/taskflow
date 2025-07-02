import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskReduser from './store/Tasks/TasksSlice.js';
import AuthReducer from './store/Auth/AuthSlice.js';
import projectsReducer from './store/projects/projectsSlice.js';
import UsersReducer from './store/Users/usersSlice.js'
import SettingsReducer from './store/Settings/settingsSlice.js';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    tasks: taskReduser,
    projects: projectsReducer,
    users: UsersReducer,
    settings: SettingsReducer,
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)