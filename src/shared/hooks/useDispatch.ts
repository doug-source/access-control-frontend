import { DispatchContext } from '@/shared/contexts/DispatchContext';
import type { ActionDispatchList } from '@/shared/types/Reducers/ActionsList';
import type { AD } from '@/shared/types/Utils';
import { useContext } from 'react';

export const useDispatch = <T>() => {
    return useContext<AD<ActionDispatchList<T>>>(DispatchContext);
};
