import { ViewerAdapter } from '@/shared/adapters/ViewerAdapter';
import { ViewerContext } from '@/shared/contexts/ViewerContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import { type ComponentPropsWithRef, useMemo } from 'react';
import { Outlet } from 'react-router';

interface ViewerProviderProps {
    viewer?: ComponentPropsWithRef<typeof ViewerContext>['value'];
}

export const ViewerProvider = ({ viewer }: ViewerProviderProps) => {
    const httpClient = useHttpClient();
    const viewerInstance = useMemo(
        () => viewer ?? new ViewerAdapter(httpClient),
        [viewer, httpClient]
    );
    return (
        <ViewerContext value={viewerInstance}>
            <Outlet />
        </ViewerContext>
    );
};
