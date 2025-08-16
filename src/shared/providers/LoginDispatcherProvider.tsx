import { LoginDispatcher } from '@/shared/adapters/LoginDispatcher';
import { LoginReceiver } from '@/shared/adapters/LoginReceiver';
import { LoginSuccessHandler } from '@/shared/adapters/LoginSuccessHandler';
import { GateDispatcherContext } from '@/shared/contexts/GateDispatcherContext';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAuthenticator } from '@/shared/hooks/useAuthenticator';
import { useLoginErrorHandler } from '@/shared/hooks/useLoginErrorHandler';
import { ComponentPropsWithRef, PropsWithChildren, useMemo } from 'react';

interface LoginDispatcherProviderProps extends PropsWithChildren {
    dispatcher?: ComponentPropsWithRef<typeof GateDispatcherContext>['value'];
}

export const LoginDispatcherProvider = ({
    dispatcher,
    children,
}: LoginDispatcherProviderProps) => {
    const auth = useAuth();
    const authenticator = useAuthenticator();
    const errorHandler = useLoginErrorHandler();
    const dispatcherInstance = useMemo(() => {
        return (
            dispatcher ??
            new LoginDispatcher(
                authenticator,
                new LoginReceiver(new LoginSuccessHandler(), errorHandler),
                auth
            )
        );
    }, [dispatcher, authenticator, errorHandler, auth]);
    return (
        <GateDispatcherContext.Provider value={dispatcherInstance}>
            {children}
        </GateDispatcherContext.Provider>
    );
};
