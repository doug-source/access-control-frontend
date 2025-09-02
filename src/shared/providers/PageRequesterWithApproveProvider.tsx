import { PageRequestWithApproveAdapter } from '@/shared/adapters/PageRequestWithApproveAdapter';
import { PageRequesterWithApproveContext } from '@/shared/contexts/PageRequesterWithApproveContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import {
    type ComponentPropsWithoutRef,
    type PropsWithChildren,
    useMemo,
} from 'react';

interface PageRequesterWithApproveProviderProps extends PropsWithChildren {
    requester?: ComponentPropsWithoutRef<
        typeof PageRequesterWithApproveContext
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
        <PageRequesterWithApproveContext value={pageRequesterStored}>
            <PageRequesterProvider pageRequester={pageRequesterStored}>
                {children}
            </PageRequesterProvider>
        </PageRequesterWithApproveContext>
    );
};
