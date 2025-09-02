import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { UnauthenticatorProvider } from '@/shared/providers/UnauthenticatorProvider';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import type { PropsWithChildren } from 'react';

interface WrapAppProvidersProps extends PropsWithChildren {
    token: string;
}

export const WrapAppProviders = ({
    token,
    children,
}: WrapAppProvidersProps) => (
    <HttpClientProvider client={httpClientInstance}>
        <UnauthenticatorProvider token={token}>
            {children}
        </UnauthenticatorProvider>
    </HttpClientProvider>
);
