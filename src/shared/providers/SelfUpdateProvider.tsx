import { SelfUpdateAdapter } from '@/shared/adapters/SelfUpdateAdapter';
import { SelfUpdateContext } from '@/shared/contexts/SelfUpdateContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import {
    type ComponentPropsWithRef,
    type PropsWithChildren,
    useMemo,
} from 'react';

interface SelfUpdateProviderProps extends PropsWithChildren {
    updater?: ComponentPropsWithRef<typeof SelfUpdateContext>['value'];
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
        <SelfUpdateContext value={updaterInstance}>
            {children}
        </SelfUpdateContext>
    );
};
