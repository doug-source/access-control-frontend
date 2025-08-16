import { GateDispatcherContext } from '@/shared/contexts/GateDispatcherContext';
import { useAuth } from '@/shared/hooks/useAuth';
import { loginDispatcherInstance } from '@/shared/utils/globals';
import {
    type ComponentPropsWithRef,
    type PropsWithChildren,
    useMemo,
} from 'react';

interface LoginDispatcherProviderProps extends PropsWithChildren {
    dispatcher?: ComponentPropsWithRef<typeof GateDispatcherContext>['value'];
}

export const LoginDispatcherProvider = ({
    dispatcher,
    children,
}: LoginDispatcherProviderProps) => {
    const auth = useAuth();
    const dispatcherInstance = useMemo(() => {
        return dispatcher ?? loginDispatcherInstance.setPath(auth);
    }, [dispatcher, auth]);
    return (
        <GateDispatcherContext.Provider value={dispatcherInstance}>
            {children}
        </GateDispatcherContext.Provider>
    );
};
