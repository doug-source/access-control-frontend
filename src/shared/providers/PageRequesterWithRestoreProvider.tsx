import { PageRequestWithRestoreAdapter } from '@/shared/adapters/PageRequestWithRestoreAdapter';
import { PageRequesterWithRestoreContext } from '@/shared/contexts/PageRequesterWithRestoreContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import {
    type ComponentPropsWithoutRef,
    type PropsWithChildren,
    useMemo,
} from 'react';

interface PageRequesterWithRestoreProviderProps extends PropsWithChildren {
    requester?: ComponentPropsWithoutRef<
        typeof PageRequesterWithRestoreContext
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
        <PageRequesterWithRestoreContext value={pageRequesterStored}>
            <PageRequesterProvider pageRequester={pageRequesterStored}>
                {children}
            </PageRequesterProvider>
        </PageRequesterWithRestoreContext>
    );
};
