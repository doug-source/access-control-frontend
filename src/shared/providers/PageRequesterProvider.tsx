import { PageRequestAdapter } from '@/shared/adapters/PageRequestAdapter';
import { PageRequesterContext } from '@/shared/contexts/PageRequesterContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import type { PageRequester } from '@/shared/types/Contracts/PageRequester';
import { type PropsWithChildren, useMemo } from 'react';

interface PageRequesterProviderProps extends PropsWithChildren {
    pageRequester?: PageRequester;
}

export const PageRequesterProvider = ({
    pageRequester,
    children,
}: PageRequesterProviderProps) => {
    const httpClient = useHttpClient();
    const pageRequesterStored = useMemo(
        () => pageRequester ?? new PageRequestAdapter(httpClient),
        [httpClient, pageRequester]
    );
    return (
        <PageRequesterContext value={pageRequesterStored}>
            {children}
        </PageRequesterContext>
    );
};
