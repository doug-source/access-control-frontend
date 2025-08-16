import { useContext } from 'react';
import { LoginErrorHandlerContext } from '../contexts/LoginErrorHandlerContext';

export const useLoginErrorHandler = () => {
    const handler = useContext(LoginErrorHandlerContext);
    if (handler === null) {
        throw new Error('LoginErrorHandler invalid!');
    }
    return handler;
};
