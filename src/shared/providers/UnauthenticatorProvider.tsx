import { UnauthenticatorContext } from '@/shared/contexts/UnauthenticatorContext';
import { loginBase } from '@/shared/utils/globals/login';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

interface UnauthenticatorProviderProps extends PropsWithChildren {
    unauthenticator?: ComponentPropsWithRef<
        typeof UnauthenticatorContext.Provider
    >['value'];
}

export const UnauthenticatorProvider = ({
    unauthenticator,
    children,
}: UnauthenticatorProviderProps) => (
    <UnauthenticatorContext.Provider
        value={unauthenticator ?? loginBase.dispatcher}
    >
        {children}
    </UnauthenticatorContext.Provider>
);
