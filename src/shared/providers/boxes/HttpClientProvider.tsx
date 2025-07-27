import { HttpClientContext } from '@/shared/contexts/HttpClientContext';
import { httpClientInstance } from '@/shared/utils/globals';
import { type ReactNode } from 'react';

interface HttpClientProviderProps {
    children: ReactNode;
}

export const HttpClientProvider = ({ children }: HttpClientProviderProps) => (
    <HttpClientContext.Provider value={httpClientInstance}>
        {children}
    </HttpClientContext.Provider>
);
