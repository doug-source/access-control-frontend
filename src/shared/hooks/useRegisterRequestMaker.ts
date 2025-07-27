import { RegisterRequestMakerContext } from '@/shared/contexts/RegisterRequestMakerContext';
import { useContext } from 'react';

export const useRegisterRequestMaker = () => {
    const registerRequestMaker = useContext(RegisterRequestMakerContext);
    if (registerRequestMaker === null) {
        throw new Error('Invalid RegisterRequestMaker!');
    }
    return registerRequestMaker;
};
