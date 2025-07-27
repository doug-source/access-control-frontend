import { InputRefContext } from '@/shared/contexts/InputRefContext';
import { useContext } from 'react';

export const useInputRef = () => {
    const inputRef = useContext(InputRefContext);
    if (inputRef === null) {
        throw new Error('Invalid InputRef!');
    }
    return inputRef;
};
