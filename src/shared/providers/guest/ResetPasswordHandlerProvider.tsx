import { PasswordAdapter } from '@/shared/adapters/PasswordAdapter';
import { ResetPasswordHandlerContext } from '@/shared/contexts/ResetPasswordHandlerContext';
import { useHttpClient } from '@/shared/hooks/useHttpClient';
import { ComponentPropsWithoutRef, PropsWithChildren, useMemo } from 'react';

interface ResetPasswordHandlerProviderProps extends PropsWithChildren {
    handler?: ComponentPropsWithoutRef<
        typeof ResetPasswordHandlerContext.Provider
    >['value'];
}

export const ResetPasswordHandlerProvider = ({
    handler,
    children,
}: ResetPasswordHandlerProviderProps) => {
    const httpClient = useHttpClient();
    const resetPasswordHandler = useMemo(
        () => handler ?? new PasswordAdapter(httpClient),
        [handler, httpClient]
    );
    return (
        <ResetPasswordHandlerContext.Provider value={resetPasswordHandler}>
            {children}
        </ResetPasswordHandlerContext.Provider>
    );
};
