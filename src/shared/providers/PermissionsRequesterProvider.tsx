import { PermissionsAdapter } from '@/shared/adapters/PermissionsAdapter';
import { PermissionsRequesterContext } from '@/shared/contexts/PermissionsRequesterContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';

interface PermissionsRequesterProviderProps extends PropsWithChildren {
    requester?: ComponentPropsWithoutRef<
        typeof PermissionsRequesterContext.Provider
    >['value'];
}

export const PermissionsRequesterProvider = ({
    requester,
    children,
}: PermissionsRequesterProviderProps) => {
    const httpClient = useHttpClient();
    const permissionsRequesterStored = useMemo(
        () => requester ?? new PermissionsAdapter(httpClient),
        [requester, httpClient]
    );
    return (
        <PermissionsRequesterContext.Provider
            value={permissionsRequesterStored}
        >
            {children}
        </PermissionsRequesterContext.Provider>
    );
};
