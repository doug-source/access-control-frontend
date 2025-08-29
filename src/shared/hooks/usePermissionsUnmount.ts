import { useEffect } from 'react';
import { usePermissionsRequester } from './usePermissionsRequester';

export const usePermissionsUnmount = () => {
    const permissionsRequester = usePermissionsRequester();
    useEffect(() => {
        return () => {
            permissionsRequester?.abortRequest();
        };
    }, [permissionsRequester]);
};
