import { UnauthenticatorContext } from '@/shared/contexts/UnauthenticatorContext';
import { useContext } from 'react';

export const useUnauthenticator = () => {
    const unauthenticator = useContext(UnauthenticatorContext);
    if (unauthenticator === null) {
        throw new Error('Invalid Unauthenticator!');
    }
    return unauthenticator;
};
