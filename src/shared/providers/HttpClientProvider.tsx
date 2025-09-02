import { HttpClientContext } from '@/shared/contexts/HttpClientContext';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import type { PropsWithChildren } from 'react';

export const HttpClientProvider = ({ children }: PropsWithChildren) => (
    <HttpClientContext value={httpClientInstance}>{children}</HttpClientContext>
);
