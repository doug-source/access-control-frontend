import { routeList } from '@shared/routes/index.tsx';
// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';

const router = createBrowserRouter(routeList);

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <RouterProvider router={router} />
    // </StrictMode>
);
