import { ForgotPasswordHandlerContext } from '@/shared/contexts/ForgotPasswordHandlerContext';
import { useContext } from 'react';

export const useForgotPasswordHandler = () => {
    const forgotPasswordHandler = useContext(ForgotPasswordHandlerContext);
    if (forgotPasswordHandler === null) {
        throw new Error('Invalid ForgotPasswordHandler!');
    }
    return forgotPasswordHandler;
};
