import type { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { LogicBaseContext } from '../contexts/LogicBaseContext';

interface LogicBaseProviderProps extends PropsWithChildren {
    base: ComponentPropsWithRef<typeof LogicBaseContext.Provider>['value'];
}

export const LogicBaseProvider = ({
    base,
    children,
}: LogicBaseProviderProps) => (
    <LogicBaseContext.Provider value={base}>
        {children}
    </LogicBaseContext.Provider>
);
