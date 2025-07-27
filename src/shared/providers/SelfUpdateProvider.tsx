import { SelfUpdateAdapter } from '@/shared/adapters/SelfUpdateAdapter';
import { SelfUpdateContext } from '@/shared/contexts/SelfUpdateContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';

interface SelfUpdateProviderProps extends PropsWithChildren {
    updater?: ComponentPropsWithoutRef<
        typeof SelfUpdateContext.Provider
    >['value'];
}

export const SelfUpdateProvider = ({
    updater,
    children,
}: SelfUpdateProviderProps) => {
    const httpClient = useHttpClient();
    const updaterInstance = useMemo(
        () => updater ?? new SelfUpdateAdapter(httpClient),
        [updater, httpClient]
    );
    return (
        <SelfUpdateContext.Provider value={updaterInstance}>
            {children}
        </SelfUpdateContext.Provider>
    );
};
