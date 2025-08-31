// import { StrictMode } from 'react';
import { BuildRoutes } from '@/shared/components/atoms/BuildRoutes';
import { SignProvider } from '@/shared/providers/SignProvider';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <SignProvider>
        <BuildRoutes />
    </SignProvider>
    // </StrictMode>
);
