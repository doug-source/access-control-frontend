import { ResetPasswordHandlerContext } from '@/shared/contexts/ResetPasswordHandlerContext';
import { useContext } from 'react';

export const useResetPasswordHandler = () => {
    const resetPasswordHandler = useContext(ResetPasswordHandlerContext);
    if (resetPasswordHandler === null) {
        throw new Error('Invalid ResetPasswordHandler!');
    }
    return resetPasswordHandler;
};
