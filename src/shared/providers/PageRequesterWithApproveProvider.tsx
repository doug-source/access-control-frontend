import { PageRequestWithApproveAdapter } from '@/shared/adapters/PageRequestWithApproveAdapter';
import { PageRequesterWithApproveContext } from '@/shared/contexts/PageRequesterWithApproveContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import {
    type ComponentPropsWithoutRef,
    type PropsWithChildren,
    useMemo,
} from 'react';
import { PageRequesterProvider } from './PageRequesterProvider';

interface PageRequesterWithApproveProviderProps extends PropsWithChildren {
    requester?: ComponentPropsWithoutRef<
        typeof PageRequesterWithApproveContext.Provider
    >['value'];
}

export const PageRequesterWithApproveProvider = ({
    requester,
    children,
}: PageRequesterWithApproveProviderProps) => {
    const httpClient = useHttpClient();
    const pageRequesterStored = useMemo(
        () => requester ?? new PageRequestWithApproveAdapter(httpClient),
        [requester, httpClient]
    );
    return (
        <PageRequesterWithApproveContext.Provider value={pageRequesterStored}>
            <PageRequesterProvider pageRequester={pageRequesterStored}>
                {children}
            </PageRequesterProvider>
        </PageRequesterWithApproveContext.Provider>
    );
};
