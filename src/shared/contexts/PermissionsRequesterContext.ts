import { type PermissionsRelationRequester } from '@/shared/types/Contracts/PermissionsRelationRequester';
import { createContext } from 'react';

export const PermissionsRequesterContext =
    createContext<PermissionsRelationRequester | null>(null);
