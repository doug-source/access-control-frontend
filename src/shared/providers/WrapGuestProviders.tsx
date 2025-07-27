import { AuthenticatorProvider } from '@/shared/providers/boxes/AuthenticatorProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { ReactNode } from 'react';

type WrapGuestProvidersProps = {
    children: ReactNode;
};

export const WrapGuestProviders = ({ children }: WrapGuestProvidersProps) => (
    <HttpClientProvider>
        <AuthenticatorProvider>{children}</AuthenticatorProvider>
    </HttpClientProvider>
);
