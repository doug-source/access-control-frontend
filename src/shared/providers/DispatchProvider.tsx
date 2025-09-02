import { DispatchContext } from '@/shared/contexts/DispatchContext';
import type { ActionDispatchList } from '@/shared/types/Reducers/ActionsList';
import type { AD } from '@/shared/types/Utils';
import type { PropsWithChildren } from 'react';

interface DispatchProviderProps extends PropsWithChildren {
    dispatch: AD<ActionDispatchList>;
}

export const DispatchProvider = ({
    children,
    dispatch,
}: DispatchProviderProps) => (
    <DispatchContext value={dispatch}>{children}</DispatchContext>
);
