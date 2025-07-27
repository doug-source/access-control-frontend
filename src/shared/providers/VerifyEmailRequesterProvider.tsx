import { VerifyEmailAdapter } from '@/shared/adapters/VerifyEmailAdapter';
import { VerifyEmailRequesterContext } from '@/shared/contexts/VerifyEmailRequesterContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';

interface VerifyEmailRequesterProviderProps extends PropsWithChildren {
    requester?: ComponentPropsWithoutRef<
        typeof VerifyEmailRequesterContext.Provider
    >['value'];
}

export const VerifyEmailRequesterProvider = ({
    requester,
    children,
}: VerifyEmailRequesterProviderProps) => {
    const httpClient = useHttpClient();
    const verifyEmailMaker = useMemo(
        () => requester ?? new VerifyEmailAdapter(httpClient),
        [requester, httpClient]
    );
    return (
        <VerifyEmailRequesterContext.Provider value={verifyEmailMaker}>
            {children}
        </VerifyEmailRequesterContext.Provider>
    );
};
