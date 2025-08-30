import { UnauthenticatorContext } from '@/shared/contexts/UnauthenticatorContext';
import { loginBase } from '@/shared/utils/globals/login';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

interface UnauthenticatorProviderProps extends PropsWithChildren {
    unauthenticator?: ComponentPropsWithRef<
        typeof UnauthenticatorContext.Provider
    >['value'];
    token: string;
}

export const UnauthenticatorProvider = ({
    unauthenticator,
    token,
    children,
}: UnauthenticatorProviderProps) => {
    const instance = unauthenticator ?? loginBase.dispatcher;
    instance.setToken(token);
    return (
        <UnauthenticatorContext.Provider value={instance}>
            {children}
        </UnauthenticatorContext.Provider>
    );
};
