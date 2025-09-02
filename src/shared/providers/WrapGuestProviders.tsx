import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import { type PropsWithChildren } from 'react';

export const WrapGuestProviders = ({ children }: PropsWithChildren) => (
    <HttpClientProvider client={httpClientInstance}>
        {children}
    </HttpClientProvider>
);
