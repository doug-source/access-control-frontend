import { AuthenticatorContext } from '@/shared/contexts/AuthenticatorContext';
import { authenticatorInstance as authenticatorExternal } from '@/shared/utils/globals';
import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';

interface AuthenticatorProviderProps extends PropsWithChildren {
    authenticator?: ComponentPropsWithoutRef<
        typeof AuthenticatorContext.Provider
    >['value'];
}

export const AuthenticatorProvider = ({
    authenticator,
    children,
}: AuthenticatorProviderProps) => {
    const authenticatorInstance = useMemo(
        () => authenticator ?? authenticatorExternal,
        [authenticator]
    );
    return (
        <AuthenticatorContext.Provider value={authenticatorInstance}>
            {children}
        </AuthenticatorContext.Provider>
    );
};
