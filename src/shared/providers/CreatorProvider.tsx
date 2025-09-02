import { StoreAdapter } from '@/shared/adapters/StoreAdapter';
import { SuperAdminCreatorContext } from '@/shared/contexts/SuperAdminCreatorContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import type { SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import { type PropsWithChildren, useMemo } from 'react';

interface CreatorProviderProps extends PropsWithChildren {
    creator?: SuperAdminCreator;
}

export const CreatorProvider = ({
    creator,
    children,
}: CreatorProviderProps) => {
    const httpClient = useHttpClient();
    const creatorInstance = useMemo(
        () => creator ?? new StoreAdapter(httpClient),
        [creator, httpClient]
    );
    return (
        <SuperAdminCreatorContext value={creatorInstance}>
            {children}
        </SuperAdminCreatorContext>
    );
};
