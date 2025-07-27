import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { createContext } from 'react';

export const HttpClientContext = createContext<HttpClient | null>(null);
