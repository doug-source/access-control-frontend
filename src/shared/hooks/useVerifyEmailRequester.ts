import { VerifyEmailRequesterContext } from '@/shared/contexts/VerifyEmailRequesterContext';
import { useContext } from 'react';

export const useVerifyEmailRequester = () => {
    const verifyEmailRequester = useContext(VerifyEmailRequesterContext);
    if (verifyEmailRequester === null) {
        throw new Error('Invalid VerifyEmailRequester!');
    }
    return verifyEmailRequester;
};
