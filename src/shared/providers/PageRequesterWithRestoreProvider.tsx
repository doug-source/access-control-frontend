import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';
import { PageRequestWithRestoreAdapter } from '../adapters/PageRequestWithRestoreAdapter';
import { useHttpClient } from '../hooks/useHttpClient';
import { PageRequesterProvider } from './PageRequesterProvider';

import { PageRequesterWithRestoreContext } from '@/shared/contexts/PageRequesterWithRestoreContext';

interface PageRequesterWithRestoreProviderProps extends PropsWithChildren {
    requester?: ComponentPropsWithoutRef<
        typeof PageRequesterWithRestoreContext.Provider
    >['value'];
}

export const PageRequesterWithRestoreProvider = ({
    requester,
    children,
}: PageRequesterWithRestoreProviderProps) => {
    const httpClient = useHttpClient();
    const pageRequesterStored = useMemo(
        () => requester ?? new PageRequestWithRestoreAdapter(httpClient),
        [requester, httpClient]
    );
    return (
        <PageRequesterWithRestoreContext.Provider value={pageRequesterStored}>
            <PageRequesterProvider pageRequester={pageRequesterStored}>
                {children}
            </PageRequesterProvider>
        </PageRequesterWithRestoreContext.Provider>
    );
};
