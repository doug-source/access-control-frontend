import { ViewerAdapter } from '@/shared/adapters/ViewerAdapter';
import { ViewerContext } from '@/shared/contexts/ViewerContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import { Outlet } from 'react-router';

interface ViewerProviderProps {
    viewer?: ComponentPropsWithoutRef<typeof ViewerContext.Provider>['value'];
}

export const ViewerProvider = ({ viewer }: ViewerProviderProps) => {
    const httpClient = useHttpClient();
    const viewerInstance = useMemo(
        () => viewer ?? new ViewerAdapter(httpClient),
        [viewer, httpClient]
    );
    return (
        <ViewerContext.Provider value={viewerInstance}>
            <Outlet />
        </ViewerContext.Provider>
    );
};
