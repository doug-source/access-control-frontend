import { AuthenticatorContext } from '@/shared/contexts/AuthenticatorContext';
import { useContext } from 'react';

export const useAuthenticator = () => {
    const authenticator = useContext(AuthenticatorContext);
    if (authenticator === null) {
        throw new Error('Invalid Authenticator!');
    }
    return authenticator;
};
