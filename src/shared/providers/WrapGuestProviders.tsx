import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { type PropsWithChildren } from 'react';

export const WrapGuestProviders = ({ children }: PropsWithChildren) => {
    return <HttpClientProvider>{children}</HttpClientProvider>;
};
