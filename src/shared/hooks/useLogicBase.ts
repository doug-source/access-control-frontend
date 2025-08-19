import { LogicBaseContext } from '@/shared/contexts/LogicBaseContext';
import type { LogicBase } from '@/shared/types/Responsabilities/LogicBase';
import type { LogicBaseStates } from '@/shared/types/Responsabilities/States';
import { type Context, useContext } from 'react';

export const useLogicBase = <E, T extends LogicBaseStates>() => {
    const base = useContext(
        LogicBaseContext as Context<LogicBase<E, T> | null>
    );
    if (base === null) {
        throw new Error('LogicBase invalid');
    }
    return base;
};
