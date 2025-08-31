import { SignDispatchContext } from '@/shared/contexts/SignDispatchContext';
import { useContext } from 'react';

export const useSignDispatch = () => {
    const dispatch = useContext(SignDispatchContext);
    if (dispatch === null) {
        throw new Error('Invalid SignDispatch');
    }
    return dispatch;
};
