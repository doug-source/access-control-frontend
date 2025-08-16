import { LoginErrorHandlerContext } from '@/shared/contexts/LoginErrorHandlerContext';
import { loginErrorHandlerInstance } from '@/shared/utils/globals';
import { ComponentPropsWithRef, PropsWithChildren, useMemo } from 'react';

interface LoginErrorHandlerProviderProps extends PropsWithChildren {
    handler?: ComponentPropsWithRef<
        typeof LoginErrorHandlerContext.Provider
    >['value'];
}

export const LoginErrorHandlerProvider = ({
    handler,
    children,
}: LoginErrorHandlerProviderProps) => {
    const handlerInstance = useMemo(
        () => handler ?? loginErrorHandlerInstance,
        [handler]
    );
    return (
        <LoginErrorHandlerContext.Provider value={handlerInstance}>
            {children}
        </LoginErrorHandlerContext.Provider>
    );
};
