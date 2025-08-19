import { DispatchContext } from '@/shared/contexts/DispatchContext';
import type { ActionDispatchList } from '@/shared/types/Reducers/ActionsList';
import type { AD } from '@/shared/types/Utils';
import type { ReactNode } from 'react';

interface DispatchProviderProps {
    children: ReactNode;
    dispatch: AD<ActionDispatchList>;
}

export const DispatchProvider = ({
    children,
    dispatch,
}: DispatchProviderProps) => (
    <DispatchContext.Provider value={dispatch}>
        {children}
    </DispatchContext.Provider>
);
