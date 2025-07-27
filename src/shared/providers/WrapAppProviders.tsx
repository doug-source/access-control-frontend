import { AuthenticatorProvider } from '@/shared/providers/boxes/AuthenticatorProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { type ReactNode } from 'react';

type WrapAppProvidersProps = {
    children: ReactNode;
};

export const WrapAppProviders = ({ children }: WrapAppProvidersProps) => (
    <HttpClientProvider>
        <AuthenticatorProvider>{children}</AuthenticatorProvider>
    </HttpClientProvider>
);
