import { DispatchContext } from '@/shared/contexts/DispatchContext';
import { useContext } from 'react';
import { ActionDispatchList } from '../types/Reducers/ActionsList';

export const useDispatch = <T>() => {
    return useContext<ActionDispatchList<T>>(DispatchContext);
};
