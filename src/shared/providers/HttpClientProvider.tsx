import { HttpClientContext } from '@/shared/contexts/HttpClientContext';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

interface HttpClientProviderProps extends PropsWithChildren {
    client: NonNullable<
        ComponentPropsWithRef<typeof HttpClientContext>['value']
    >;
}

export const HttpClientProvider = ({
    client,
    children,
}: HttpClientProviderProps) => (
    <HttpClientContext value={client}>{children}</HttpClientContext>
);
