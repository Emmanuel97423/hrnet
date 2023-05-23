/* @ts-ignore */
import React from 'react';
/* @ts-ignore */
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
// import App from './App.tsx';
import Home from './pages/Home/index.tsx';
import Employees from './pages/Employees';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,

    children: []
  },
  {
    path: '/employees',
    element: <Employees />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
