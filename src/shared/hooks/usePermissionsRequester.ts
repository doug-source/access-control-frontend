import { PermissionsRequesterContext } from '@/shared/contexts/PermissionsRequesterContext';
import { useContext } from 'react';

export const usePermissionsRequester = () =>
    useContext(PermissionsRequesterContext);
