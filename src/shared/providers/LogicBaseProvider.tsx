import { LogicBaseContext } from '@/shared/contexts/LogicBaseContext';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

interface LogicBaseProviderProps extends PropsWithChildren {
    base: ComponentPropsWithRef<typeof LogicBaseContext.Provider>['value'];
}

export const LogicBaseProvider = ({
    base,
    children,
}: LogicBaseProviderProps) => (
    <LogicBaseContext value={base}>{children}</LogicBaseContext>
);
