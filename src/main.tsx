// import { StrictMode } from 'react';
import { BuildRoutes } from '@/shared/components/atoms/BuildRoutes';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <AuthProvider>
        <BuildRoutes />
    </AuthProvider>
    // </StrictMode>
);
