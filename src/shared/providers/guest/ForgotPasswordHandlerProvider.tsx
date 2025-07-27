import { PasswordAdapter } from '@/shared/adapters/PasswordAdapter';
import { ForgotPasswordHandlerContext } from '@/shared/contexts/ForgotPasswordHandlerContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';

interface ForgotPasswordHandlerProviderProps extends PropsWithChildren {
    handler?: ComponentPropsWithoutRef<
        typeof ForgotPasswordHandlerContext.Provider
    >['value'];
}

export const ForgotPasswordHandlerProvider = ({
    handler,
    children,
}: ForgotPasswordHandlerProviderProps) => {
    const httpClient = useHttpClient();
    const forgotPasswordHandler = useMemo(
        () => handler ?? new PasswordAdapter(httpClient),
        [handler, httpClient]
    );
    return (
        <ForgotPasswordHandlerContext.Provider value={forgotPasswordHandler}>
            {children}
        </ForgotPasswordHandlerContext.Provider>
    );
};
