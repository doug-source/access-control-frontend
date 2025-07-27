import { HttpClientContext } from '@/shared/contexts/HttpClientContext';
import { useContext } from 'react';

export const useHttpClient = () => {
    const httpClient = useContext(HttpClientContext);
    if (httpClient === null) {
        throw new Error('Invalid HttpClient!');
    }
    return httpClient;
};
