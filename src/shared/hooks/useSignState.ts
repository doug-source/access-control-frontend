import { SignStateContext } from '@/shared/contexts/SignStateContext';
import { useContext } from 'react';

export const useSignState = () => {
    const state = useContext(SignStateContext);
    if (state === null) {
        throw new Error('Invalid SignState');
    }
    return state;
};
