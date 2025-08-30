import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import type { PropsWithChildren } from 'react';
import { UnauthenticatorProvider } from './UnauthenticatorProvider';

interface WrapAppProvidersProps extends PropsWithChildren {
    token: string;
}

export const WrapAppProviders = ({
    token,
    children,
}: WrapAppProvidersProps) => {
    return (
        <HttpClientProvider>
            <UnauthenticatorProvider token={token}>
                {children}
            </UnauthenticatorProvider>
        </HttpClientProvider>
    );
};
